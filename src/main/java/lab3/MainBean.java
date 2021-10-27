package lab3;

import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.util.List;


@ManagedBean(name = "mainBean")
@SessionScoped
public class MainBean implements Serializable {
    private String x = "0";
    private String y = "0";
    private String r = "1";
    private String sessionID;

    private DBKeeper keeper;

    @PostConstruct
    public void init() {
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        sessionID = session.getId();
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
        keeper = new DBKeeper();
        keeper.init();

        return keeper.findBySession(sessionID);
    }

    public void addPoint() {
        System.out.println("HEY HEY");
        // PrimeFaces.current().executeScript("console.log(" + x + ", " + y + ", " + r + ")");

        keeper = new DBKeeper();
        keeper.init();

        Point point = new Point(Integer.parseInt(x), Integer.parseInt(y), Integer.parseInt(r), sessionID);
        System.out.println(keeper.add(point));
    }
}
