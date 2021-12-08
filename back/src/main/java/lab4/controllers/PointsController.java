package lab4.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lab4.repos.PointRepository;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/points")
public class PointsController {
    @Autowired
    private PointRepository repository;

    @GetMapping("/")
    public ResponseEntity<?> getPointList() {
        return ResponseEntity.ok().body("lols");
    }
}
