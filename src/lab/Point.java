package lab;

public class Point {
    public final double x;
    public final double y;
    public final int r;
    public final boolean inside;

    public Point(double x, double y, int r) {
        this.x = x;
        this.y = y;
        this.r = r;
        boolean inside = (x >= 0) && (x <= r / 2.) && (y >= 2 * x - r) && (y <= r);
        inside = inside || ((x <= 0) && (y <= 0) && (x * x + y * y <= r * r / 4.));
        this.inside = inside;
    }
}
