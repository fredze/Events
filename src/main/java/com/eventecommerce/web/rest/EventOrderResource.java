package com.eventecommerce.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.eventecommerce.domain.EventOrder;
import com.eventecommerce.domain.EventOrderLine;
import com.eventecommerce.domain.enumeration.StateEventOrder;
import com.eventecommerce.repository.EventOrderLineRepository;
import com.eventecommerce.repository.EventOrderRepository;
import com.eventecommerce.service.EventService;
import com.eventecommerce.web.rest.errors.BadRequestAlertException;
import com.eventecommerce.web.rest.util.HeaderUtil;
import com.eventecommerce.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EventOrder.
 */
@RestController
@RequestMapping("/api")
public class EventOrderResource {

    private final Logger log = LoggerFactory.getLogger(EventOrderResource.class);

    private static final String ENTITY_NAME = "eventOrder";

    private final EventOrderRepository eventOrderRepository;

    private  EventOrderLineRepository eventOrderLineRepository;

    public EventOrderResource(EventOrderRepository eventOrderRepository) {
        this.eventOrderRepository = eventOrderRepository;
    }


    /**
     * POST  /event-orders : Create a new eventOrder.
     *
     * @return the ResponseEntity with status 201 (Created) and with body the new eventOrder, or with status 400 (Bad Request) if the eventOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/create-event-orders")
    @Timed
    public ResponseEntity<EventOrder> createEventOrderWithEventOrderLine(@RequestParam List<EventOrderLine> listEventOrderLine;
    ) throws URISyntaxException {
        Double totalPrice = 0.0;
        LocalDate date = LocalDate.now();

        for(EventOrderLine eLine : listEventOrderLine){
            totalPrice =+ eLine.getPrice();
        }

        EventOrder eventOrder = eventOrderRepository.save(new EventOrder(totalPrice,date,StateEventOrder.WAITING));
        for(EventOrderLine eLine : listEventOrderLine){
            eLine.setEventOrder(eventOrder);
            eventOrderLineRepository.save(eLine);
        }

        log.debug("REST request to save EventOrder with listorderLine: {}", eventOrder);
        if (eventOrder.getId() != null) {
            throw new BadRequestAlertException("A new eventOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return ResponseEntity.created(new URI("/api/create-event-orders/" + eventOrder.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, eventOrder.getId().toString()))
            .body(eventOrder);
    }

    /**
     * POST  /event-orders : Create a new eventOrder.
     *
     * @param eventOrder the eventOrder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eventOrder, or with status 400 (Bad Request) if the eventOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/event-orders")
    @Timed
    public ResponseEntity<EventOrder> createEventOrder(@RequestBody EventOrder eventOrder) throws URISyntaxException {
        log.debug("REST request to save EventOrder : {}", eventOrder);
        if (eventOrder.getId() != null) {
            throw new BadRequestAlertException("A new eventOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventOrder result = eventOrderRepository.save(eventOrder);
        return ResponseEntity.created(new URI("/api/event-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /event-orders : Updates an existing eventOrder.
     *
     * @param eventOrder the eventOrder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eventOrder,
     * or with status 400 (Bad Request) if the eventOrder is not valid,
     * or with status 500 (Internal Server Error) if the eventOrder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/event-orders")
    @Timed
    public ResponseEntity<EventOrder> updateEventOrder(@RequestBody EventOrder eventOrder) throws URISyntaxException {
        log.debug("REST request to update EventOrder : {}", eventOrder);
        if (eventOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EventOrder result = eventOrderRepository.save(eventOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eventOrder.getId().toString()))
            .body(result);
    }

    /**
     * GET  /event-orders : get all the eventOrders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of eventOrders in body
     */
    @GetMapping("/event-orders")
    @Timed
    public ResponseEntity<List<EventOrder>> getAllEventOrders(Pageable pageable) {
        log.debug("REST request to get a page of EventOrders");
        Page<EventOrder> page = eventOrderRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/event-orders");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /event-orders/:id : get the "id" eventOrder.
     *
     * @param id the id of the eventOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eventOrder, or with status 404 (Not Found)
     */
    @GetMapping("/event-orders/{id}")
    @Timed
    public ResponseEntity<EventOrder> getEventOrder(@PathVariable Long id) {
        log.debug("REST request to get EventOrder : {}", id);
        Optional<EventOrder> eventOrder = eventOrderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eventOrder);
    }

    /**
     * DELETE  /event-orders/:id : delete the "id" eventOrder.
     *
     * @param id the id of the eventOrder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/event-orders/{id}")
    @Timed
    public ResponseEntity<Void> deleteEventOrder(@PathVariable Long id) {
        log.debug("REST request to delete EventOrder : {}", id);

        eventOrderRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
