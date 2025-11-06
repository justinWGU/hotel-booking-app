package edu.wgu.d387_sample_code.rest;

import edu.wgu.d387_sample_code.entity.DisplayMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class MessagesController {
    Thread thread;
    DisplayMessage displayMessage;
    ArrayList<String> myArray = new ArrayList<String>();
    @Autowired
    public MessagesController (DisplayMessage displayMessage) {
        this.displayMessage = displayMessage;
    }

    @CrossOrigin("http://localhost:4200")
    @GetMapping("/messages")
    public ArrayList<String> message() {
        thread = new Thread(() -> myArray.add(displayMessage.getFrWelcomeMessage()));
        thread.start();
        thread = new Thread(() -> myArray.add(displayMessage.getEnWelcomeMessage()));
        thread.start();
        return myArray;
    }
}
