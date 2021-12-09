package lab4.controllers;

import lab4.entities.User;
import lab4.repos.PointRepository;
import lab4.wrappers.PointWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.validation.Valid;

@RestController
@RequestMapping("api/points")
public class PointsController implements WebMvcConfigurer {
    @Autowired
    private PointRepository repository;

    @GetMapping("/")
    public ResponseEntity<?> getPointList() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok().body(repository.findAllByUser(user).stream().map(PointWrapper::new));
    }

    @PostMapping(value = "/", consumes = {"application/json"})
    public ResponseEntity<?> createPoint(@Valid @RequestBody PointWrapper point, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("{\"message\": \"Wrong parameters\"}");
        }
        repository.save(point.toPoint((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        return ResponseEntity.ok().body("{\"message\": \"OK\"}");
    }
}
