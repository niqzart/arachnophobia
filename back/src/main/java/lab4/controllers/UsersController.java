package lab4.controllers;

import lab4.config.JwtProvider;
import lab4.entities.User;
import lab4.repos.UserRepository;
import lab4.wrappers.UserWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/users/")
public class UsersController {
    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    private final JwtProvider jwtProvider;
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signin/")
    public ResponseEntity<?> signin(@RequestBody @Valid UserWrapper wrapper) {
        User user = repository.findByEmail(wrapper.getEmail());
        if (user == null) {
            return ResponseEntity.ok().body("{\"message\": \"User not found\"}");
        }
        if (!passwordEncoder.matches(wrapper.getPassword(), user.getPassword())) {
            return ResponseEntity.ok().body("{\"message\": \"Wrong password\"}");
        }
        ResponseCookie resCookie = ResponseCookie.from("jwt", jwtProvider.createToken(user))
                .httpOnly(true).secure(true).path("/").maxAge(24 * 60 * 60).build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, resCookie.toString()).body("{\"message\": \"OK\"}");
    }

    @PostMapping("/signup/")
    public ResponseEntity<?> signup(@RequestBody @Valid UserWrapper wrapper) {
        if (repository.findByEmail(wrapper.getEmail()) != null) {
            return ResponseEntity.ok().body("{\"message\": \"Email in use\"}");
        }
        User user = wrapper.toUser(passwordEncoder);
        repository.save(user);
        ResponseCookie resCookie = ResponseCookie.from("jwt", jwtProvider.createToken(user))
                .httpOnly(true).secure(true).path("/").maxAge(24 * 60 * 60).build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, resCookie.toString()).body("{\"message\": \"OK\"}");
    }

    @PostMapping("/signout/")
    public ResponseEntity<?> signout() {
        ResponseCookie resCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true).secure(true).path("/").maxAge(0).build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, resCookie.toString()).body("{\"message\": \"OK\"}");
    }
}
