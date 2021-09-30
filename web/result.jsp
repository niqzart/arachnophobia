<%@ page import="lab.Point" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Collections" %>
<%@ page language="java" contentType="text/html" session="false"%>
<html>

<head>
  <meta charset="utf-8" />
  <style> <%@include file="styles.css" %> </style>
</head>

<body>
  <table class="result-table">
    <tbody>
      <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Result</th>
      </tr>
      <%
        HttpSession session = request.getSession(false);
        ArrayList<Point> points = (ArrayList<Point>) session.getAttribute("points");
        Collections.reverse(points);
        for (Point point : points) {
      %>
        <tr>
          <th><%=point.x %></th>
          <th><%=point.y %></th>
          <th><%=point.r %></th>
          <th><%=point.inside %></th>
        </tr>
      <%}%>
    </tbody>
  </table>
</body>

</html>