package com.eventecommerce.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eventecommerce.domain.EventOrderLine;
import com.eventecommerce.repository.EventOrderLineRepository;
import com.eventecommerce.web.rest.errors.BadRequestAlertException;
import com.eventecommerce.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EventOrderLine.
 */
@RestController
@RequestMapping("/api")
public class EventOrderLineResource {

    private final Logger log = LoggerFactory.getLogger(EventOrderLineResource.class);

    private static final String ENTITY_NAME = "eventOrderLine";

    private final EventOrderLineRepository eventOrderLineRepository;

    public EventOrderLineResource(EventOrderLineRepository eventOrderLineRepository) {
        this.eventOrderLineRepository = eventOrderLineRepository;
    }

    /**
     * POST  /event-order-lines : Create a new eventOrderLine.
     *
     * @param eventOrderLine the eventOrderLine to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eventOrderLine, or with status 400 (Bad Request) if the eventOrderLine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/event-order-lines")
    @Timed
    public ResponseEntity<EventOrderLine> createEventOrderLine(@RequestBody EventOrderLine eventOrderLine) throws URISyntaxException {
        log.debug("REST request to save EventOrderLine : {}", eventOrderLine);
        if (eventOrderLine.getId() != null) {
            throw new BadRequestAlertException("A new eventOrderLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventOrderLine result = eventOrderLineRepository.save(eventOrderLine);
        return ResponseEntity.created(new URI("/api/event-order-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /event-order-lines : Updates an existing eventOrderLine.
     *
     * @param eventOrderLine the eventOrderLine to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eventOrderLine,
     * or with status 400 (Bad Request) if the eventOrderLine is not valid,
     * or with status 500 (Internal Server Error) if the eventOrderLine couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/event-order-lines")
    @Timed
    public ResponseEntity<EventOrderLine> updateEventOrderLine(@RequestBody EventOrderLine eventOrderLine) throws URISyntaxException {
        log.debug("REST request to update EventOrderLine : {}", eventOrderLine);
        if (eventOrderLine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EventOrderLine result = eventOrderLineRepository.save(eventOrderLine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eventOrderLine.getId().toString()))
            .body(result);
    }

    /**
     * GET  /event-order-lines : get all the eventOrderLines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of eventOrderLines in body
     */
    @GetMapping("/event-order-lines")
    @Timed
    public List<EventOrderLine> getAllEventOrderLines() {
        log.debug("REST request to get all EventOrderLines");
        return eventOrderLineRepository.findAll();
    }

    /**
     * GET  /event-order-lines/:id : get the "id" eventOrderLine.
     *
     * @param id the id of the eventOrderLine to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eventOrderLine, or with status 404 (Not Found)
     */
    @GetMapping("/event-order-lines/{id}")
    @Timed
    public ResponseEntity<EventOrderLine> getEventOrderLine(@PathVariable Long id) {
        log.debug("REST request to get EventOrderLine : {}", id);
        Optional<EventOrderLine> eventOrderLine = eventOrderLineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eventOrderLine);
    }

    /**
     * DELETE  /event-order-lines/:id : delete the "id" eventOrderLine.
     *
     * @param id the id of the eventOrderLine to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/event-order-lines/{id}")
    @Timed
    public ResponseEntity<Void> deleteEventOrderLine(@PathVariable Long id) {
        log.debug("REST request to delete EventOrderLine : {}", id);

        eventOrderLineRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
