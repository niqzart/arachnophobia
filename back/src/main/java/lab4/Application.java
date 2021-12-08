package lab4;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import lab4.repos.PointRepository;
import lab4.repos.UserRepository;

@RestController
@EnableAutoConfiguration
public class Application {
    @Autowired
    private PointRepository pointRepository;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/main")
    ModelAndView mainPage() {
        return new ModelAndView("forward:/");
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
