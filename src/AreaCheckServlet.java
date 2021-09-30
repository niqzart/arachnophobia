import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import lab.Point;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class AreaCheckServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String stringX = request.getParameter("X");

        double y = Double.parseDouble(request.getParameter("Y"));
        int r = Integer.parseInt(request.getParameter("R"));

        if (stringX == null) {
            HttpSession session = request.getSession(false);
            ArrayList<Point> points;
            if (session == null) {
                points = new ArrayList<>();
                session = request.getSession();
            } else {
                ArrayList<Point> points_t = (ArrayList<Point>) session.getAttribute("points");
                if (points_t == null) {
                    points = new ArrayList<>();
                } else {
                    points = points_t;
                }
            }

            int sizeBefore = points.size();
            Map<String, Object> parameters = request.getParameterMap();
            parameters.forEach((key, value) -> {
                if (request.getParameter(key).equals("on")) {
                    double x = Double.parseDouble(key);
                    points.add(new Point(x, y, r));
                }
            });

            session.setAttribute("new-rows", points.size() - sizeBefore);
            session.setAttribute("points", points);
            request.getRequestDispatcher("result.jsp").forward(request, response);
        } else {
            double x = Double.parseDouble(stringX);
            response.getWriter().print(new Point(x, y, r).inside);
        }

    }

}
