<%@page contentType="text/html" pageEncoding="UTF-8" %>

<head>
  <meta charset="utf-8" />
  <title>Lab 2</title>
  <script type="text/javascript"> <%@include file="validator.js" %> </script>
  <script type="text/javascript"> <%@include file="canvaser.js" %> </script>
  <style> <%@include file="styles.css" %> </style>
</head>

<body>
  <div id="header">
    <div id="left-panel">
      Нестеров Николай
    </div>
    <div id="center-panel">
      P3230
    </div>
    <div id="right-panel">
      Вариант: 30311
    </div>
  </div>

  <table id="content">
    <tbody>
      <tr>
        <td>
          <form action="" method="POST" target="result" onsubmit="onSubmit()">
            <p>Input the data</p>
            <p class="checkboxes var-p" id="x-p">
              <label>
                <span id="main-label">X:</span>
              </label>
      
              <% for (float x = -2; x < 2.5; x += 0.5) { %>
                <label>
                  <span>
                    <%if (x % 1 == 0) {%>
                      <%=(int)x %>
                    <%} else {%>
                      <%=x %>
                    <%} %>
                  </span>
                  <input 
                    type="checkbox" 
                    name="<%=x %>" 
                    id="X<%=x %>" 
                    onclick="hideErrorMessages()"
                  >
                </label>
                <% if (x == -0.5) { %><br><%}%>
              <%}%>
      
            </p>
            <p id="y-p" class="var-p">
              <span id="main-label">Y:</span>
              <input class="text-input" name="Y" oninput="onInputY()" id="y-input">
            </p>
            <p id="r-p" class="var-p">
              <span id="main-label">R:</span>
      
              <% for (int r = 1; r < 6; r++) { %>
              <button 
                type="button" 
                name="<%=r %>" 
                id="R<%=r %>" 
                onclick="if (onInputR(<%=r %>)) fillCanvas()"
              >
                <%=r %>
              </button>
              <%}%>
      
              <input name="R" id="r-input" style="display: none;" value="">
            </p>
            <p>
              <input type="submit" id="send-button">
            </p>
            <p id="message" style="visibility: hidden"></p>
          </form>
        </td>
        <td>
          <canvas id="point-area" onclick="onClickCanvas()"></canvas>
        </td>
      </tr>
      <tr><td colspan="2">
        <iframe name="result" src="">
          server crashed
        </iframe>
      </td></tr>
    </tbody>
  </table>
</body>

</html>