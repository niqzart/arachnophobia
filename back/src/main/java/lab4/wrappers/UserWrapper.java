package lab4.wrappers;

import lab4.entities.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

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

    public User toUser() {
        return new User(this.email, this.username, this.password);
    }
}
