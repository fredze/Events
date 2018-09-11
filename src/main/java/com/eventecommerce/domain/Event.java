package com.eventecommerce.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.eventecommerce.domain.enumeration.StateEvent;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "responsable")
    private String responsable;

    @Column(name = "total_places")
    private Integer totalPlaces;

    @Column(name = "available_places")
    private Integer availablePlaces;

    @Column(name = "date_event")
    private LocalDate dateEvent;

    @Column(name = "place_event")
    private String placeEvent;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "state_event")
    private StateEvent stateEvent;

    @Column(name = "pricipal_picture")
    private String pricipalPicture;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Event name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public Event price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getResponsable() {
        return responsable;
    }

    public Event responsable(String responsable) {
        this.responsable = responsable;
        return this;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public Integer getTotalPlaces() {
        return totalPlaces;
    }

    public Event totalPlaces(Integer totalPlaces) {
        this.totalPlaces = totalPlaces;
        return this;
    }

    public void setTotalPlaces(Integer totalPlaces) {
        this.totalPlaces = totalPlaces;
    }

    public Integer getAvailablePlaces() {
        return availablePlaces;
    }

    public Event availablePlaces(Integer availablePlaces) {
        this.availablePlaces = availablePlaces;
        return this;
    }

    public void setAvailablePlaces(Integer availablePlaces) {
        this.availablePlaces = availablePlaces;
    }

    public LocalDate getDateEvent() {
        return dateEvent;
    }

    public Event dateEvent(LocalDate dateEvent) {
        this.dateEvent = dateEvent;
        return this;
    }

    public void setDateEvent(LocalDate dateEvent) {
        this.dateEvent = dateEvent;
    }

    public String getPlaceEvent() {
        return placeEvent;
    }

    public Event placeEvent(String placeEvent) {
        this.placeEvent = placeEvent;
        return this;
    }

    public void setPlaceEvent(String placeEvent) {
        this.placeEvent = placeEvent;
    }

    public String getDescription() {
        return description;
    }

    public Event description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public StateEvent getStateEvent() {
        return stateEvent;
    }

    public Event stateEvent(StateEvent stateEvent) {
        this.stateEvent = stateEvent;
        return this;
    }

    public void setStateEvent(StateEvent stateEvent) {
        this.stateEvent = stateEvent;
    }

    public String getPricipalPicture() {
        return pricipalPicture;
    }

    public Event pricipalPicture(String pricipalPicture) {
        this.pricipalPicture = pricipalPicture;
        return this;
    }

    public void setPricipalPicture(String pricipalPicture) {
        this.pricipalPicture = pricipalPicture;
    }

    public Category getCategory() {
        return category;
    }

    public Event category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
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
        Event event = (Event) o;
        if (event.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), event.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", responsable='" + getResponsable() + "'" +
            ", totalPlaces=" + getTotalPlaces() +
            ", availablePlaces=" + getAvailablePlaces() +
            ", dateEvent='" + getDateEvent() + "'" +
            ", placeEvent='" + getPlaceEvent() + "'" +
            ", description='" + getDescription() + "'" +
            ", stateEvent='" + getStateEvent() + "'" +
            ", pricipalPicture='" + getPricipalPicture() + "'" +
            "}";
    }
}
