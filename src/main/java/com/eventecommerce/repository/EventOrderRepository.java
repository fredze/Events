package com.eventecommerce.repository;

import com.eventecommerce.domain.EventOrder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EventOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventOrderRepository extends JpaRepository<EventOrder, Long> {

}
