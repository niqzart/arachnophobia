package lab4.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "points")
public class Point {
    private static boolean isInside(double x, double y, double r) {
        if (x >= r) return false;
        if (x > 0) return y >= 0 && y <= r / 2.;
        return y >= Math.min(-2 * x - 1, 0) && y <= Math.sqrt(r * r - x * x);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "x", nullable = false)
    private Double x;

    @Column(name = "y", nullable = false)
    private Double y;

    @Column(name = "r", nullable = false)
    private double r;

    @Column(name = "inside", nullable = false)
    private Boolean inside = false;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Point(double x, double y, double r, User user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inside = isInside(x, y, r);
        this.user = user;
    }
}