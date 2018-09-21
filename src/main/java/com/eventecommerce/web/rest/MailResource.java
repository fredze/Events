package com.eventecommerce.web.rest;


import com.codahale.metrics.annotation.Timed;
import com.eventecommerce.domain.*;
import com.eventecommerce.repository.EventOrderLineRepository;
import com.eventecommerce.repository.UserRepository;
import com.eventecommerce.security.SecurityUtils;
import com.eventecommerce.service.MailService;
import com.eventecommerce.service.UserService;
import com.eventecommerce.web.rest.errors.BadRequestAlertException;
import com.eventecommerce.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MailResource {

    private final Logger log = LoggerFactory.getLogger(MailResource.class);

    private static final String ENTITY_NAME = "email";

    private  MailService mailService;

    private static EventOrderLineRepository eventOrderLineRepository;

   // private SecurityUtils securityUtils;

    private static UserRepository userRepository;

    public MailResource(MailService mailService,UserRepository userRepository,EventOrderLineRepository eventOrderLineRepository) {
        this.eventOrderLineRepository = eventOrderLineRepository;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    @PostMapping("/send-order-email")
    @Timed
    public void sendOrderEmail(@RequestBody Mail email) throws URISyntaxException {
        log.debug("REST request to save Category : {}",email);

        String test = SecurityUtils.getCurrentUserLogin().get();
        String userEmail = userRepository.findEmailByLogin(test);

       log.debug("login =========== "+test);
       log.debug("user email =========== "+userEmail);
       List<EventOrderLine> ordersLine = eventOrderLineRepository.findEventsOrderByEventOrderLine(email.getIdOrder());

        String result ="";
        Double total = 0.0;

       for (EventOrderLine l : ordersLine)
        {
            result += "****" +'\n'+
                        "Evènement : "+l.getEvent().getName()+'\n'+
                        "Nombre de places : "+l.getQuantity()+'\n'+
                        "Prix unitaire : "+l.getPrice()+'\n'
                   +"*****"+'\n';
            total = l.getPrice();
        }

        result += "\\========= Prix total : '"+total+"  ===========/";

        if (email.getIdOrder() == null) {
            throw new BadRequestAlertException("Email without an idorder", ENTITY_NAME, "idexists");
        }

        log.debug("user email =========== "+result);
        User user = new User();
        user.setEmail(userEmail);
        user.setLogin("alfred");
        user.setLastName("alfred");
        user.setFirstName("alfred");
        user.setActivated(true);
        user.setLangKey("en");
        //mailService.sendEmail(email.getTo(),email.getSubject(),result,email.isMultipart(),email.isHtml());
        //mailService.sendEmailFromTemplate(user,"mail/orderEmail","email.activation.title");
        mailService.sendOrderEmailFromTemplate(user,ordersLine,ordersLine.get(0).getEventOrder().getTotalPrice(),"mail/orderEmail","email.order.title");
    }
}
