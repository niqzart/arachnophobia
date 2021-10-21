import org.primefaces.PrimeFaces;

import javax.enterprise.context.SessionScoped;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@ManagedBean(name = "mainBean")
@SessionScoped
public class MainBean implements Serializable {
    private int x = 0;
    private String y = "0";
    private int r = 1;
    private List<Point> points;

    public MainBean() {
        points = new ArrayList<>();
    }

    public String getY() {
        return y;
    }

    public int getR() {
        return r;
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setX(int x) {
        System.out.println("HEY" + x);
        this.x = x;
    }

    public void setY(String y) {
        this.y = y;
    }

    public void setR(int r) {
        this.r = r;
    }

    public void addPoint() {
        System.out.println("HEY");
        PrimeFaces.current().executeScript("console.log(" + x + ", " + y + ", " + r + ")");
        Point point = new Point(x, Integer.parseInt(y), r);
        points.add(point);
    }
}
