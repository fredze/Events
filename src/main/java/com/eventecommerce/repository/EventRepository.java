package com.eventecommerce.repository;

import com.eventecommerce.domain.Category;
import com.eventecommerce.domain.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Event entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    /**
     * Find a events by searching with name of events
     * @param mc
     * @param pageable
     * @return
     */
    @Query("SELECT p FROM Event p where p.name like :x")
    Page<Event> findEventsByName(@Param("x")String mc, Pageable pageable);


}
