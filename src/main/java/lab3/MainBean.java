package lab3;

import org.primefaces.PrimeFaces;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.util.List;


@SessionScoped
@ManagedBean(name = "mainBean")
public class MainBean implements Serializable {
    private String x = "0";
    private String y = "0";
    private String r = "1";

    private String xc;
    private String yc;
    private String sessionID;

    private final DBKeeper keeper = new DBKeeper();

    private void drawPoint(Point point) {
        PrimeFaces.current().executeScript(String.format("drawPoint(%f, %f, %f, %s)",
                point.getX(), point.getY(), Double.parseDouble(r), point.getInside().toString()));
    }

    @PostConstruct
    public void init() {
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        sessionID = session.getId();
        keeper.init();
    }

    public String getX() {
        return x;
    }

    public String getY() {
        return y;
    }

    public String getR() {
        return r;
    }

    public void setX(String x) {
        System.out.println("HEY x " + x);
        this.x = x;
    }

    public void setY(String y) {
        System.out.println("HEY y " + y);
        this.y = y;
    }

    public void setR(String r) {
        System.out.println("HEY r " + r);
        this.r = r;
    }

    public List<Point> getPoints() {
        List<Point> points = keeper.findBySession(sessionID);
        PrimeFaces.current().executeScript("fillCanvas(" + r + ")");
        for (Point point : points) drawPoint(point);
        return points;
    }

    public String getXc() {
        return xc;
    }

    public void setXc(String xc) {
        this.xc = xc;
    }

    public String getYc() {
        return yc;
    }

    public void setYc(String yc) {
        this.yc = yc;
    }

    private void addPoint(double x, double y, double r, String sessionID) {
        Point point = new Point(x, y, r, sessionID);
        keeper.add(point);
        drawPoint(point);
    }

    public void addFormPoint() {
        System.out.println("HEY HEY");
        addPoint(Double.parseDouble(x), Double.parseDouble(y), Double.parseDouble(r), sessionID);
    }

    public void addCanvasPoint() {
        System.out.println("YEH YEH");
        double r = Double.parseDouble(this.r);
        addPoint(Double.parseDouble(xc) * r, Double.parseDouble(yc) * r, r, sessionID);
    }
}
