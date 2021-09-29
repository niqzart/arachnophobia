<%@page contentType="text/html" pageEncoding="UTF-8" %>

<head>
  <meta charset="utf-8" />
  <title>Lab 1</title>
  <script src="static/validator.js"></script>
  <style>
    body {
      /* this will be cascaded */
      margin: 0;
      background-color: rgb(70, 70, 70);
      color: white;
      user-select: none;
    }

    #header {
      /* id selector */
      background-color: cornflowerblue;
      padding: 10px 10px 30px 10px;
      border-bottom: 1px solid black;
    }

    #header div {
      /* inherited by all text inside header */
      float: left;
      font-size: 20px;
      font-family: sans-serif;
    }

    #left-panel {
      width: 33%;
      text-align: left;
    }

    #center-panel {
      width: 34%;
      text-align: center;
    }

    #right-panel {
      width: 33%;
      text-align: right;
    }

    #content {
      text-align: center;
    }

    p {
      margin: 1% 0;
      text-align: center;
    }

    input,
    button,
    .text-input {
      height: 30px;
      background-color: gray;
      border-color: white;
      color: white;
    }

    select {
      /* element selector */
      width: 40.6%;
    }

    .text-input {
      /* class selector */
      width: 40%;
    }

    #send-button {
      width: 20%;
    }

    #main-label {
      font-weight: bold;
      margin-right: 1%;
    }

    #message {
      color: red;
    }

    input {
      width: 30px;
    }

    .checkboxes label>span {
      font-family: serif;
    }

    .checkboxes input,
    .checkboxes label span {
      /* selector the last one */
      vertical-align: middle;
    }

    input:hover,
    select:hover {
      /* pseudo class selector */
      border-color: khaki;
    }

    iframe {
      margin-top: 7%;
      width: 70%;
      height: 400px;
    }
  </style>
</head>

<body>
  <div id="header">
    <div id="left-panel">
      Нестеров
    </div>
    <div id="center-panel">
      P3230
    </div>
    <div id="right-panel">
      Вариант: 30311
    </div>
  </div>

  <div id="content">
    <form action="coordinator.php" method="GET" target="result" onsubmit="onSubmit()">
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
            <input type="checkbox" name="<%=x %>" id="X<%=x %>" onclick="hideErrorMessages()">
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

        <% for (int r = 0; r < 6; r++) { %>
        <button name="<%=r %>" id="R<%=r %>" onclick="onInputR(<%=r %>)"><%=r %></button>
        <%}%>

      </p>
      <p>
        <input type="submit" id="send-button">
      </p>
      <p id="message" style="visibility: hidden"></p>
    </form>

    <iframe name="result" src="coordinator.php?empty=true">
      server crashed
    </iframe>

  </div>
</body>

</html>