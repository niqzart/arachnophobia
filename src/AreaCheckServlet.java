import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AreaCheckServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String pageTitle = "potato";

        PrintWriter out = response.getWriter();
        // Формируем HTML
        out.println("<html>");
        out.println("<head>");
        out.println("<title>" + pageTitle + "</title>");
        out.println("</head>");
        out.println("<body bgcolor='white'>");
        out.println("<h3>" + pageTitle + "</h3>");
        out.println("<p>");
        out.println("Hello, world!");
        out.println("</p>");
        out.println("</body>");
        out.println("</html>");

    }

}
