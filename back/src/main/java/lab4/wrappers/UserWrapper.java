package lab4.wrappers;

import lab4.entities.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@RequiredArgsConstructor
public class UserWrapper {
    @NotNull
    private String email;
    private String username;
    @NotNull
    private String password;

    public User toUser(PasswordEncoder encoder) {
        return new User(this.email, this.username, encoder.encode(this.password));
    }
}
