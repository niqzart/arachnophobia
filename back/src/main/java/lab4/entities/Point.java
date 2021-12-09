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
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "x", nullable = false)
    private Double x;

    @Column(name = "y", nullable = false)
    private Double y;

    @Column(name = "r", nullable = false)
    private double r;

    @Column(name = "result", nullable = false)
    private Boolean result = false;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Point(double x, double y, double r, boolean result, User user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.user = user;
    }
}