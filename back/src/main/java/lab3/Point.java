package lab3;

import javax.persistence.*;

@Table(name = "point")
@Entity
public class Point {
    private static boolean isInside(double x, double y, double r) {
        if (x >= r) return false;
        if (x > 0) return y >= 0 && y <= r / 2.;
        return y >= Math.min(-2 * x - 1, 0) && y <= Math.sqrt(r * r - x * x);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "x", nullable = false)
    private Double x;

    @Column(name = "y", nullable = false)
    private Double y;

    @Column(name = "r", nullable = false)
    private double r;

    @Column(name = "inside", nullable = false)
    private Boolean inside = false;

    @Column(name = "session", nullable = false)
    private String session;

    public Point() {
    }

    public Point(double x, double y, double r, String session) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inside = isInside(x, y, r);
        this.session = session;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public Boolean getInside() {
        return inside;
    }

    public void setInside(Boolean inside) {
        this.inside = inside;
    }

    public Double getR() {
        return r;
    }

    public void setR(Integer r) {
        this.r = r;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}