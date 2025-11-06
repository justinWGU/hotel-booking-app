package edu.wgu.d387_sample_code.rest;
import edu.wgu.d387_sample_code.entity.TimeConversion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;

// call time convert method
@RestController
public class TimeController {

    private TimeConversion timeConversion;

    @Autowired
    public TimeController(TimeConversion timeConversion) {
        this.timeConversion = timeConversion;
    }

    // return converted time string
    @CrossOrigin("http://localhost:4200")
    @GetMapping("/time")
    public ArrayList<String> getTime() {
        System.out.println("Time conversion: " + timeConversion.convertTime().toString());
        return timeConversion.convertTime();
    }
}
