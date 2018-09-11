package com.eventecommerce.web.rest;

import com.eventecommerce.EventsEcommerceApp;

import com.eventecommerce.domain.EventOrder;
import com.eventecommerce.repository.EventOrderRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.eventecommerce.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.eventecommerce.domain.enumeration.StateEventOrder;
/**
 * Test class for the EventOrderResource REST controller.
 *
 * @see EventOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventsEcommerceApp.class)
public class EventOrderResourceIntTest {

    private static final Double DEFAULT_TOTAL_PRICE = 1D;
    private static final Double UPDATED_TOTAL_PRICE = 2D;

    private static final LocalDate DEFAULT_CREATE_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATE_AT = LocalDate.now(ZoneId.systemDefault());

    private static final StateEventOrder DEFAULT_STATE_EVENT_ORDER = StateEventOrder.CONFIRMED;
    private static final StateEventOrder UPDATED_STATE_EVENT_ORDER = StateEventOrder.CANCELLED;

    @Autowired
    private EventOrderRepository eventOrderRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEventOrderMockMvc;

    private EventOrder eventOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventOrderResource eventOrderResource = new EventOrderResource(eventOrderRepository);
        this.restEventOrderMockMvc = MockMvcBuilders.standaloneSetup(eventOrderResource)
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
    public static EventOrder createEntity(EntityManager em) {
        EventOrder eventOrder = new EventOrder()
            .totalPrice(DEFAULT_TOTAL_PRICE)
            .createAt(DEFAULT_CREATE_AT)
            .stateEventOrder(DEFAULT_STATE_EVENT_ORDER);
        return eventOrder;
    }

    @Before
    public void initTest() {
        eventOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createEventOrder() throws Exception {
        int databaseSizeBeforeCreate = eventOrderRepository.findAll().size();

        // Create the EventOrder
        restEventOrderMockMvc.perform(post("/api/event-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventOrder)))
            .andExpect(status().isCreated());

        // Validate the EventOrder in the database
        List<EventOrder> eventOrderList = eventOrderRepository.findAll();
        assertThat(eventOrderList).hasSize(databaseSizeBeforeCreate + 1);
        EventOrder testEventOrder = eventOrderList.get(eventOrderList.size() - 1);
        assertThat(testEventOrder.getTotalPrice()).isEqualTo(DEFAULT_TOTAL_PRICE);
        assertThat(testEventOrder.getCreateAt()).isEqualTo(DEFAULT_CREATE_AT);
        assertThat(testEventOrder.getStateEventOrder()).isEqualTo(DEFAULT_STATE_EVENT_ORDER);
    }

    @Test
    @Transactional
    public void createEventOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventOrderRepository.findAll().size();

        // Create the EventOrder with an existing ID
        eventOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventOrderMockMvc.perform(post("/api/event-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventOrder)))
            .andExpect(status().isBadRequest());

        // Validate the EventOrder in the database
        List<EventOrder> eventOrderList = eventOrderRepository.findAll();
        assertThat(eventOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEventOrders() throws Exception {
        // Initialize the database
        eventOrderRepository.saveAndFlush(eventOrder);

        // Get all the eventOrderList
        restEventOrderMockMvc.perform(get("/api/event-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].totalPrice").value(hasItem(DEFAULT_TOTAL_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].createAt").value(hasItem(DEFAULT_CREATE_AT.toString())))
            .andExpect(jsonPath("$.[*].stateEventOrder").value(hasItem(DEFAULT_STATE_EVENT_ORDER.toString())));
    }
    
    @Test
    @Transactional
    public void getEventOrder() throws Exception {
        // Initialize the database
        eventOrderRepository.saveAndFlush(eventOrder);

        // Get the eventOrder
        restEventOrderMockMvc.perform(get("/api/event-orders/{id}", eventOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eventOrder.getId().intValue()))
            .andExpect(jsonPath("$.totalPrice").value(DEFAULT_TOTAL_PRICE.doubleValue()))
            .andExpect(jsonPath("$.createAt").value(DEFAULT_CREATE_AT.toString()))
            .andExpect(jsonPath("$.stateEventOrder").value(DEFAULT_STATE_EVENT_ORDER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEventOrder() throws Exception {
        // Get the eventOrder
        restEventOrderMockMvc.perform(get("/api/event-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEventOrder() throws Exception {
        // Initialize the database
        eventOrderRepository.saveAndFlush(eventOrder);

        int databaseSizeBeforeUpdate = eventOrderRepository.findAll().size();

        // Update the eventOrder
        EventOrder updatedEventOrder = eventOrderRepository.findById(eventOrder.getId()).get();
        // Disconnect from session so that the updates on updatedEventOrder are not directly saved in db
        em.detach(updatedEventOrder);
        updatedEventOrder
            .totalPrice(UPDATED_TOTAL_PRICE)
            .createAt(UPDATED_CREATE_AT)
            .stateEventOrder(UPDATED_STATE_EVENT_ORDER);

        restEventOrderMockMvc.perform(put("/api/event-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEventOrder)))
            .andExpect(status().isOk());

        // Validate the EventOrder in the database
        List<EventOrder> eventOrderList = eventOrderRepository.findAll();
        assertThat(eventOrderList).hasSize(databaseSizeBeforeUpdate);
        EventOrder testEventOrder = eventOrderList.get(eventOrderList.size() - 1);
        assertThat(testEventOrder.getTotalPrice()).isEqualTo(UPDATED_TOTAL_PRICE);
        assertThat(testEventOrder.getCreateAt()).isEqualTo(UPDATED_CREATE_AT);
        assertThat(testEventOrder.getStateEventOrder()).isEqualTo(UPDATED_STATE_EVENT_ORDER);
    }

    @Test
    @Transactional
    public void updateNonExistingEventOrder() throws Exception {
        int databaseSizeBeforeUpdate = eventOrderRepository.findAll().size();

        // Create the EventOrder

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventOrderMockMvc.perform(put("/api/event-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventOrder)))
            .andExpect(status().isBadRequest());

        // Validate the EventOrder in the database
        List<EventOrder> eventOrderList = eventOrderRepository.findAll();
        assertThat(eventOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEventOrder() throws Exception {
        // Initialize the database
        eventOrderRepository.saveAndFlush(eventOrder);

        int databaseSizeBeforeDelete = eventOrderRepository.findAll().size();

        // Get the eventOrder
        restEventOrderMockMvc.perform(delete("/api/event-orders/{id}", eventOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EventOrder> eventOrderList = eventOrderRepository.findAll();
        assertThat(eventOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EventOrder.class);
        EventOrder eventOrder1 = new EventOrder();
        eventOrder1.setId(1L);
        EventOrder eventOrder2 = new EventOrder();
        eventOrder2.setId(eventOrder1.getId());
        assertThat(eventOrder1).isEqualTo(eventOrder2);
        eventOrder2.setId(2L);
        assertThat(eventOrder1).isNotEqualTo(eventOrder2);
        eventOrder1.setId(null);
        assertThat(eventOrder1).isNotEqualTo(eventOrder2);
    }
}
