package com.eventecommerce.repository;

import com.eventecommerce.domain.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

import java.util.List;


/**
 * Spring Data  repository for the Event entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Page<Event> findByNameIgnoreCaseContaining(String name, Pageable p);



    @Query("SELECT e FROM Event e WHERE UPPER(e.name) LIKE %:name% AND e.dateEvent > :dateFrom AND e.dateEvent < :dateTo")
    Page<Event> findByNameDate(@Param("name") String name, @Param("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo, Pageable p);
}
