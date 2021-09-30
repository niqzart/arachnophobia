public class Point {
    public final double x;
    public final double y;
    public final int r;
    public final boolean inside;

    public Point(double x, double y, int r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inside = false; // add the actual check
    }
}
