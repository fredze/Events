package com.eventecommerce.web.rest;

import com.eventecommerce.EventsEcommerceApp;

import com.eventecommerce.domain.EventOrderLine;
import com.eventecommerce.repository.EventOrderLineRepository;
import com.eventecommerce.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.eventecommerce.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EventOrderLineResource REST controller.
 *
 * @see EventOrderLineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventsEcommerceApp.class)
public class EventOrderLineResourceIntTest {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    @Autowired
    private EventOrderLineRepository eventOrderLineRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEventOrderLineMockMvc;

    private EventOrderLine eventOrderLine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventOrderLineResource eventOrderLineResource = new EventOrderLineResource(eventOrderLineRepository);
        this.restEventOrderLineMockMvc = MockMvcBuilders.standaloneSetup(eventOrderLineResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EventOrderLine createEntity(EntityManager em) {
        EventOrderLine eventOrderLine = new EventOrderLine()
            .quantity(DEFAULT_QUANTITY)
            .price(DEFAULT_PRICE);
        return eventOrderLine;
    }

    @Before
    public void initTest() {
        eventOrderLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createEventOrderLine() throws Exception {
        int databaseSizeBeforeCreate = eventOrderLineRepository.findAll().size();

        // Create the EventOrderLine
        restEventOrderLineMockMvc.perform(post("/api/event-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventOrderLine)))
            .andExpect(status().isCreated());

        // Validate the EventOrderLine in the database
        List<EventOrderLine> eventOrderLineList = eventOrderLineRepository.findAll();
        assertThat(eventOrderLineList).hasSize(databaseSizeBeforeCreate + 1);
        EventOrderLine testEventOrderLine = eventOrderLineList.get(eventOrderLineList.size() - 1);
        assertThat(testEventOrderLine.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testEventOrderLine.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createEventOrderLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventOrderLineRepository.findAll().size();

        // Create the EventOrderLine with an existing ID
        eventOrderLine.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventOrderLineMockMvc.perform(post("/api/event-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventOrderLine)))
            .andExpect(status().isBadRequest());

        // Validate the EventOrderLine in the database
        List<EventOrderLine> eventOrderLineList = eventOrderLineRepository.findAll();
        assertThat(eventOrderLineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEventOrderLines() throws Exception {
        // Initialize the database
        eventOrderLineRepository.saveAndFlush(eventOrderLine);

        // Get all the eventOrderLineList
        restEventOrderLineMockMvc.perform(get("/api/event-order-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventOrderLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getEventOrderLine() throws Exception {
        // Initialize the database
        eventOrderLineRepository.saveAndFlush(eventOrderLine);

        // Get the eventOrderLine
        restEventOrderLineMockMvc.perform(get("/api/event-order-lines/{id}", eventOrderLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eventOrderLine.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEventOrderLine() throws Exception {
        // Get the eventOrderLine
        restEventOrderLineMockMvc.perform(get("/api/event-order-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEventOrderLine() throws Exception {
        // Initialize the database
        eventOrderLineRepository.saveAndFlush(eventOrderLine);

        int databaseSizeBeforeUpdate = eventOrderLineRepository.findAll().size();

        // Update the eventOrderLine
        EventOrderLine updatedEventOrderLine = eventOrderLineRepository.findById(eventOrderLine.getId()).get();
        // Disconnect from session so that the updates on updatedEventOrderLine are not directly saved in db
        em.detach(updatedEventOrderLine);
        updatedEventOrderLine
            .quantity(UPDATED_QUANTITY)
            .price(UPDATED_PRICE);

        restEventOrderLineMockMvc.perform(put("/api/event-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEventOrderLine)))
            .andExpect(status().isOk());

        // Validate the EventOrderLine in the database
        List<EventOrderLine> eventOrderLineList = eventOrderLineRepository.findAll();
        assertThat(eventOrderLineList).hasSize(databaseSizeBeforeUpdate);
        EventOrderLine testEventOrderLine = eventOrderLineList.get(eventOrderLineList.size() - 1);
        assertThat(testEventOrderLine.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testEventOrderLine.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingEventOrderLine() throws Exception {
        int databaseSizeBeforeUpdate = eventOrderLineRepository.findAll().size();

        // Create the EventOrderLine

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventOrderLineMockMvc.perform(put("/api/event-order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventOrderLine)))
            .andExpect(status().isBadRequest());

        // Validate the EventOrderLine in the database
        List<EventOrderLine> eventOrderLineList = eventOrderLineRepository.findAll();
        assertThat(eventOrderLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEventOrderLine() throws Exception {
        // Initialize the database
        eventOrderLineRepository.saveAndFlush(eventOrderLine);

        int databaseSizeBeforeDelete = eventOrderLineRepository.findAll().size();

        // Get the eventOrderLine
        restEventOrderLineMockMvc.perform(delete("/api/event-order-lines/{id}", eventOrderLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EventOrderLine> eventOrderLineList = eventOrderLineRepository.findAll();
        assertThat(eventOrderLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EventOrderLine.class);
        EventOrderLine eventOrderLine1 = new EventOrderLine();
        eventOrderLine1.setId(1L);
        EventOrderLine eventOrderLine2 = new EventOrderLine();
        eventOrderLine2.setId(eventOrderLine1.getId());
        assertThat(eventOrderLine1).isEqualTo(eventOrderLine2);
        eventOrderLine2.setId(2L);
        assertThat(eventOrderLine1).isNotEqualTo(eventOrderLine2);
        eventOrderLine1.setId(null);
        assertThat(eventOrderLine1).isNotEqualTo(eventOrderLine2);
    }
}
