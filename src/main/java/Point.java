public class Point {
    private final double x;
    private final double y;
    private final int r;
    private final boolean inside;

    private static boolean isInside(double x, double y, int r) {
        if (x >= r) return false;
        if (x >= 0) return y >= 0 && y <= r / 2.;
        return y >= Math.min(-2 * x - 1, 0) && y <= Math.sqrt(r * r - x * x);
    }

    public Point(double x, double y, int r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inside = isInside(x, y, r);
        Runnable test = () -> {};
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public int getR() {
        return r;
    }

    public boolean isInside() {
        return inside;
    }
}
