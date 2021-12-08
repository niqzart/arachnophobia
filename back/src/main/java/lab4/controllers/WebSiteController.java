package lab4.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class WebSiteController {
    @RequestMapping("/main")
    ModelAndView mainPage() {
        return new ModelAndView("forward:/");
    }
}
