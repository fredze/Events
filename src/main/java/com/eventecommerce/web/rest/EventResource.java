package com.eventecommerce.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eventecommerce.domain.Category;
import com.eventecommerce.domain.Event;
import com.eventecommerce.repository.CategoryRepository;
import com.eventecommerce.repository.EventRepository;
import com.eventecommerce.service.CategoryService;
import com.eventecommerce.service.EventService;
import com.eventecommerce.web.rest.errors.BadRequestAlertException;
import com.eventecommerce.web.rest.util.HeaderUtil;
import com.eventecommerce.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Event.
 */
@RestController
@RequestMapping("/api")
public class EventResource {

    private final Logger log = LoggerFactory.getLogger(EventResource.class);

    private static final String ENTITY_NAME = "event";

    private final EventService eventService;
    private EventRepository eventRepository;
    private CategoryService categoryRepository;

    public EventResource(EventService eventService, EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }

    /**
     * GET  /events-pages :  find events by category
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/events-category")
    @Timed
    public ResponseEntity<List<Event>> getEventsByCategory(
        @RequestParam(name="cat") Long idcat,
        Pageable pageable
    ) {
        Page<Event> items = eventRepository.findByCategory(idcat, pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(items, "/api/events-category");
        return new ResponseEntity<>(items.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("events-category-count")
    public ResponseEntity<Integer> countEventsByCategory(
        @RequestParam(name="id") Long idcat
    ) {
        Integer count = eventRepository.countByCategory(idcat);

        // HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(items, "/api/events-category");
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    /**
     * GET  /events-pages :  fetch last events
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/events-pages")
    @Timed
    public ResponseEntity<List<Event>> getEventsPaginate(
        @RequestParam(name="page", defaultValue = "0") int page,
        @RequestParam(name="size", defaultValue = "4") int size
    ) {
        Page<Event> items = eventRepository.findByNamePaginate(PageRequest.of(page, size));

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(items, "/api/events-pages");
        return new ResponseEntity<>(items.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/events-search")
    @Timed
    public ResponseEntity<List<Event>> searchEvents(
        @RequestParam(name="name", defaultValue = "") String name,
        @RequestParam(name="dateFrom", defaultValue = "") String dateFrom,
        @RequestParam(name="dateTo", defaultValue = "") String dateTo,
        Pageable pageable
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate ldFrom = null;
        LocalDate ldTo = null;
        Page<Event> items;

        if (!dateFrom.isEmpty()) {
            ldFrom = LocalDate.parse(dateFrom, formatter);
        }

        if (!dateTo.isEmpty()) {
            ldTo = LocalDate.parse(dateTo, formatter);
        }

        if (name.isEmpty()) {
            if (ldFrom != null && ldTo != null) {
                items = eventRepository.findByDate(ldFrom, ldTo, pageable);
            } else if (ldFrom != null) {
                items = eventRepository.findByDateBegin(ldFrom, pageable);
            } else if (ldTo != null) {
                items = eventRepository.findByDateEnd(ldTo, pageable);
            } else {
                // Error
                items = eventService.findAll(pageable);
            }
        } else {
            String nName = name.toUpperCase();
            if (ldFrom != null && ldTo != null) {
                items = eventRepository.findByNameDate(nName, ldFrom, ldTo, pageable);
            } else if (ldFrom != null) {
                items = eventRepository.findByNameDateBegin(nName, ldFrom, pageable);
            } else if (ldTo != null) {
                items = eventRepository.findByNameDateEnd(nName, ldTo, pageable);
            } else {
                items = eventRepository.findByNameIgnoreCaseContaining(nName, pageable);
            }
        }

        log.debug("REST request to get a page of Events by {} date " + dateFrom + " " + dateTo, name);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(items, "/api/events-by-name-date");
        return new ResponseEntity<>(items.getContent(), headers, HttpStatus.OK);
    }

    /**
     * POST  /events : Create a new event.
     *
     * @param event the event to create
     * @return the ResponseEntity with status 201 (Created) and with body the new event, or with status 400 (Bad Request) if the event has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/events")
    @Timed
    public ResponseEntity<Event> createEvent(@RequestBody Event event) throws URISyntaxException {
        log.debug("REST request to save Event : {}", event);
        if (event.getId() != null) {
            throw new BadRequestAlertException("A new event cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Event result = eventService.save(event);
        return ResponseEntity.created(new URI("/api/events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /events : Updates an existing event.
     *
     * @param event the event to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated event,
     * or with status 400 (Bad Request) if the event is not valid,
     * or with status 500 (Internal Server Error) if the event couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/events")
    @Timed
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) throws URISyntaxException {
        log.debug("REST request to update Event : {}", event);
        if (event.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Event result = eventService.save(event);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, event.getId().toString()))
            .body(result);
    }

    /**
     * GET  /events : get all the events.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of events in body
     */
    @GetMapping("/events")
    @Timed
    public ResponseEntity<List<Event>> getAllEvents(Pageable pageable) {
        log.debug("REST request to get a page of Events");
        Page<Event> page = eventService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/events");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /events/:id : get the "id" event.
     *
     * @param id the id of the event to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the event, or with status 404 (Not Found)
     */
    @GetMapping("/events/{id}")
    @Timed
    public ResponseEntity<Event> getEvent(@PathVariable Long id) {
        log.debug("REST request to get Event : {}", id);
        Optional<Event> event = eventService.findOne(id);
        return ResponseUtil.wrapOrNotFound(event);
    }

    /**
     * DELETE  /events/:id : delete the "id" event.
     *
     * @param id the id of the event to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/events/{id}")
    @Timed
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        log.debug("REST request to delete Event : {}", id);
        eventService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
