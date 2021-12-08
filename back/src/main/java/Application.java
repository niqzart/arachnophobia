import repos.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@EnableAutoConfiguration
@EntityScan("entities")
@EnableJpaRepositories("repos")
public class Application {
    @Autowired
    private PointRepository repository;

    @RequestMapping("/main")
    ModelAndView mainPage() {
        return new ModelAndView("forward:/");
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
