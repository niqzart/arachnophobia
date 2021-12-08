import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@EnableAutoConfiguration
public class Application {
    @RequestMapping("/main")
    ModelAndView home() {
        return new ModelAndView("forward:/");
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
