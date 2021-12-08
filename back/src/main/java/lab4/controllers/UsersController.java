package lab4.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lab4.repos.UserRepository;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/users/")
public class UsersController {
    @Autowired
    private UserRepository repository;
}
