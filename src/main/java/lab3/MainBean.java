package lab3;

import javax.annotation.PostConstruct;
import javax.faces.bean.SessionScoped;
import javax.faces.bean.ManagedBean;
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
    private String sessionID;

    private final DBKeeper keeper = new DBKeeper();

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
        return keeper.findBySession(sessionID);
    }

    public void addPoint() {
        System.out.println("HEY HEY");
        Point point = new Point(Integer.parseInt(x), Double.parseDouble(y), Double.parseDouble(r), sessionID);
        System.out.println(keeper.add(point));
    }
}
