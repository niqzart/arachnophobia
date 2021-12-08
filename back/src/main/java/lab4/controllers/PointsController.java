package lab4.controllers;

import lab4.entities.Point;
import lab4.entities.User;
import lab4.repos.PointRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("api/points")
public class PointsController implements WebMvcConfigurer {
    @Getter
    @Setter
    @RequiredArgsConstructor
    static class PointWrapper {
        @NotNull
        @Min(-3)
        @Max(3)
        private Double x;
        @NotNull
        @Min(-5)
        @Max(3)
        private Double y;
        @NotNull
        @Positive
        @Max(3)
        private Double r;
        @NotNull
        private Boolean result;

        public PointWrapper(Point point) {
            this.x = point.getX();
            this.y = point.getY();
            this.r = point.getR();
            this.result = point.getResult();
        }

        public Point toPoint(User user) {
            return new Point(this.getX(), this.getY(), this.getR(), this.getResult(), user);
        }
    }

    @Autowired
    private PointRepository repository;

    @GetMapping("/")
    public ResponseEntity<?> getPointList() {
        return ResponseEntity.ok().body(repository.findAll().stream().map(PointWrapper::new));
    }

    @PostMapping(value = "/", consumes = {"application/json"})
    public ResponseEntity<?> createPoint(@Valid @RequestBody PointWrapper point, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("{\"message\": \"Wrong parameters\"}");
        }
        repository.save(point.toPoint(null));
        return ResponseEntity.ok().body("{\"message\": \"OK\"}");
    }
}
