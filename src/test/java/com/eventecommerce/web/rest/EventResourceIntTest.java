package com.eventecommerce.web.rest;

import com.eventecommerce.EventsEcommerceApp;

import com.eventecommerce.domain.Event;
import com.eventecommerce.repository.EventRepository;
import com.eventecommerce.service.EventService;
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

import com.eventecommerce.domain.enumeration.StateEvent;
/**
 * Test class for the EventResource REST controller.
 *
 * @see EventResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventsEcommerceApp.class)
public class EventResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final String DEFAULT_RESPONSABLE = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSABLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_TOTAL_PLACES = 1;
    private static final Integer UPDATED_TOTAL_PLACES = 2;

    private static final Integer DEFAULT_AVAILABLE_PLACES = 1;
    private static final Integer UPDATED_AVAILABLE_PLACES = 2;

    private static final LocalDate DEFAULT_DATE_EVENT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_EVENT = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PLACE_EVENT = "AAAAAAAAAA";
    private static final String UPDATED_PLACE_EVENT = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final StateEvent DEFAULT_STATE_EVENT = StateEvent.AVAILABLE;
    private static final StateEvent UPDATED_STATE_EVENT = StateEvent.UNAVAILABLE;

    private static final String DEFAULT_PRICIPAL_PICTURE = "AAAAAAAAAA";
    private static final String UPDATED_PRICIPAL_PICTURE = "BBBBBBBBBB";

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEventMockMvc;

    private Event event;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        final EventResource eventResource = new EventResource(eventService, eventRepository);
        this.restEventMockMvc = MockMvcBuilders.standaloneSetup(eventResource)
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
    public static Event createEntity(EntityManager em) {
        Event event = new Event()
            .name(DEFAULT_NAME)
            .price(DEFAULT_PRICE)
            .responsable(DEFAULT_RESPONSABLE)
            .totalPlaces(DEFAULT_TOTAL_PLACES)
            .availablePlaces(DEFAULT_AVAILABLE_PLACES)
            .dateEvent(DEFAULT_DATE_EVENT)
            .placeEvent(DEFAULT_PLACE_EVENT)
            .description(DEFAULT_DESCRIPTION)
            .stateEvent(DEFAULT_STATE_EVENT)
            .pricipalPicture(DEFAULT_PRICIPAL_PICTURE);
        return event;
    }

    @Before
    public void initTest() {
        event = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvent() throws Exception {
        int databaseSizeBeforeCreate = eventRepository.findAll().size();

        // Create the Event
        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isCreated());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeCreate + 1);
        Event testEvent = eventList.get(eventList.size() - 1);
        assertThat(testEvent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEvent.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testEvent.getResponsable()).isEqualTo(DEFAULT_RESPONSABLE);
        assertThat(testEvent.getTotalPlaces()).isEqualTo(DEFAULT_TOTAL_PLACES);
        assertThat(testEvent.getAvailablePlaces()).isEqualTo(DEFAULT_AVAILABLE_PLACES);
        assertThat(testEvent.getDateEvent()).isEqualTo(DEFAULT_DATE_EVENT);
        assertThat(testEvent.getPlaceEvent()).isEqualTo(DEFAULT_PLACE_EVENT);
        assertThat(testEvent.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEvent.getStateEvent()).isEqualTo(DEFAULT_STATE_EVENT);
        assertThat(testEvent.getPricipalPicture()).isEqualTo(DEFAULT_PRICIPAL_PICTURE);
    }

    @Test
    @Transactional
    public void createEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventRepository.findAll().size();

        // Create the Event with an existing ID
        event.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEvents() throws Exception {
        // Initialize the database
        eventRepository.saveAndFlush(event);

        // Get all the eventList
        restEventMockMvc.perform(get("/api/events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(event.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].responsable").value(hasItem(DEFAULT_RESPONSABLE.toString())))
            .andExpect(jsonPath("$.[*].totalPlaces").value(hasItem(DEFAULT_TOTAL_PLACES)))
            .andExpect(jsonPath("$.[*].availablePlaces").value(hasItem(DEFAULT_AVAILABLE_PLACES)))
            .andExpect(jsonPath("$.[*].dateEvent").value(hasItem(DEFAULT_DATE_EVENT.toString())))
            .andExpect(jsonPath("$.[*].placeEvent").value(hasItem(DEFAULT_PLACE_EVENT.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].stateEvent").value(hasItem(DEFAULT_STATE_EVENT.toString())))
            .andExpect(jsonPath("$.[*].pricipalPicture").value(hasItem(DEFAULT_PRICIPAL_PICTURE.toString())));
    }

    @Test
    @Transactional
    public void getEvent() throws Exception {
        // Initialize the database
        eventRepository.saveAndFlush(event);

        // Get the event
        restEventMockMvc.perform(get("/api/events/{id}", event.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(event.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.responsable").value(DEFAULT_RESPONSABLE.toString()))
            .andExpect(jsonPath("$.totalPlaces").value(DEFAULT_TOTAL_PLACES))
            .andExpect(jsonPath("$.availablePlaces").value(DEFAULT_AVAILABLE_PLACES))
            .andExpect(jsonPath("$.dateEvent").value(DEFAULT_DATE_EVENT.toString()))
            .andExpect(jsonPath("$.placeEvent").value(DEFAULT_PLACE_EVENT.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.stateEvent").value(DEFAULT_STATE_EVENT.toString()))
            .andExpect(jsonPath("$.pricipalPicture").value(DEFAULT_PRICIPAL_PICTURE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEvent() throws Exception {
        // Get the event
        restEventMockMvc.perform(get("/api/events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvent() throws Exception {
        // Initialize the database
        eventService.save(event);

        int databaseSizeBeforeUpdate = eventRepository.findAll().size();

        // Update the event
        Event updatedEvent = eventRepository.findById(event.getId()).get();
        // Disconnect from session so that the updates on updatedEvent are not directly saved in db
        em.detach(updatedEvent);
        updatedEvent
            .name(UPDATED_NAME)
            .price(UPDATED_PRICE)
            .responsable(UPDATED_RESPONSABLE)
            .totalPlaces(UPDATED_TOTAL_PLACES)
            .availablePlaces(UPDATED_AVAILABLE_PLACES)
            .dateEvent(UPDATED_DATE_EVENT)
            .placeEvent(UPDATED_PLACE_EVENT)
            .description(UPDATED_DESCRIPTION)
            .stateEvent(UPDATED_STATE_EVENT)
            .pricipalPicture(UPDATED_PRICIPAL_PICTURE);

        restEventMockMvc.perform(put("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvent)))
            .andExpect(status().isOk());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeUpdate);
        Event testEvent = eventList.get(eventList.size() - 1);
        assertThat(testEvent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEvent.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testEvent.getResponsable()).isEqualTo(UPDATED_RESPONSABLE);
        assertThat(testEvent.getTotalPlaces()).isEqualTo(UPDATED_TOTAL_PLACES);
        assertThat(testEvent.getAvailablePlaces()).isEqualTo(UPDATED_AVAILABLE_PLACES);
        assertThat(testEvent.getDateEvent()).isEqualTo(UPDATED_DATE_EVENT);
        assertThat(testEvent.getPlaceEvent()).isEqualTo(UPDATED_PLACE_EVENT);
        assertThat(testEvent.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEvent.getStateEvent()).isEqualTo(UPDATED_STATE_EVENT);
        assertThat(testEvent.getPricipalPicture()).isEqualTo(UPDATED_PRICIPAL_PICTURE);
    }

    @Test
    @Transactional
    public void updateNonExistingEvent() throws Exception {
        int databaseSizeBeforeUpdate = eventRepository.findAll().size();

        // Create the Event

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventMockMvc.perform(put("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEvent() throws Exception {
        // Initialize the database
        eventService.save(event);

        int databaseSizeBeforeDelete = eventRepository.findAll().size();

        // Get the event
        restEventMockMvc.perform(delete("/api/events/{id}", event.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Event.class);
        Event event1 = new Event();
        event1.setId(1L);
        Event event2 = new Event();
        event2.setId(event1.getId());
        assertThat(event1).isEqualTo(event2);
        event2.setId(2L);
        assertThat(event1).isNotEqualTo(event2);
        event1.setId(null);
        assertThat(event1).isNotEqualTo(event2);
    }
}
