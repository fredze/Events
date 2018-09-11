package com.eventecommerce.repository;

import com.eventecommerce.domain.EventOrderLine;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EventOrderLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventOrderLineRepository extends JpaRepository<EventOrderLine, Long> {

}
