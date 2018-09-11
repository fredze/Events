package com.eventecommerce.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.eventecommerce.domain.enumeration.StateEventOrder;

/**
 * A EventOrder.
 */
@Entity
@Table(name = "event_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EventOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "create_at")
    private LocalDate createAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "state_event_order")
    private StateEventOrder stateEventOrder;

    public EventOrder() {
    }

    public EventOrder(Double totalPrice, LocalDate createAt, StateEventOrder stateEventOrder) {
        this.totalPrice = totalPrice;
        this.createAt = createAt;
        this.stateEventOrder = stateEventOrder;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public EventOrder totalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public EventOrder createAt(LocalDate createAt) {
        this.createAt = createAt;
        return this;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public StateEventOrder getStateEventOrder() {
        return stateEventOrder;
    }

    public EventOrder stateEventOrder(StateEventOrder stateEventOrder) {
        this.stateEventOrder = stateEventOrder;
        return this;
    }

    public void setStateEventOrder(StateEventOrder stateEventOrder) {
        this.stateEventOrder = stateEventOrder;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EventOrder eventOrder = (EventOrder) o;
        if (eventOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eventOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EventOrder{" +
            "id=" + getId() +
            ", totalPrice=" + getTotalPrice() +
            ", createAt='" + getCreateAt() + "'" +
            ", stateEventOrder='" + getStateEventOrder() + "'" +
            "}";
    }
}
