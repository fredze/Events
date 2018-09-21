package com.eventecommerce.repository;

import com.eventecommerce.domain.EventOrderLine;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;


/**
 * Spring Data  repository for the EventOrderLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventOrderLineRepository extends JpaRepository<EventOrderLine, Long> {

    @Query("SELECT l FROM EventOrderLine l INNER join l.eventOrder e WHERE e.id = :idOrder")
    List<EventOrderLine> findEventsOrderByEventOrderLine(@Param("idOrder") Long idOrder);

}
