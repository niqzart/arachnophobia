package lab4.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.http.HTTPException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    static class JwtFilter extends OncePerRequestFilter {

        private final JwtProvider jwtProvider;
        private final String[] paths = {"", "/", "/api/users/signin/", "/api/users/signup/"};

        public JwtFilter(JwtProvider jwtProvider) {
            this.jwtProvider = jwtProvider;
        }

        @Override
        protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
                throws ServletException, IOException {
            String token = jwtProvider.resolveToken(req);
            try {
                if (token != null && jwtProvider.validateToken(token)) {
                    Authentication auth = jwtProvider.getAuthentication(token);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (HTTPException ex) {
                SecurityContextHolder.clearContext();
                res.resetBuffer();
                res.setStatus(ex.getStatusCode());
                PrintWriter out = res.getWriter();
                out.write("{\"message\": \"Authorization error\"}");
                return;
            }
            chain.doFilter(req, res);
        }

        @Override
        protected boolean shouldNotFilter(HttpServletRequest request) {
            return Arrays.asList(paths).contains(request.getServletPath());
        }
    }

    private final JwtProvider jwtProvider;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        http.httpBasic().disable();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests()
                .antMatchers("/api/users/signin/").permitAll()
                .antMatchers("/api/users/signup/").permitAll()
                .antMatchers("/api/**").authenticated()
                .antMatchers("/main").authenticated()
                .anyRequest().permitAll();
        JwtFilter customFilter = new JwtFilter(jwtProvider);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
