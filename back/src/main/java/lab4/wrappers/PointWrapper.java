package lab4.wrappers;

import lab4.entities.Point;
import lab4.entities.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
@RequiredArgsConstructor
public class PointWrapper {
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
