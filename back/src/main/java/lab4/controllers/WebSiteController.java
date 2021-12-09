package lab4.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class WebSiteController {
    @RequestMapping("/main")
    ModelAndView mainPage() {
        Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return new ModelAndView((user == null || user.equals("anonymousUser")) ? "redirect:/" : "forward:/");
    }
}
