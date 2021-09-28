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
    select,
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
      Нестеров Николай Константинович
    </div>
    <div id="center-panel">
      P3230
    </div>
    <div id="right-panel">
      Вариант: 30011
    </div>
  </div>

  <div id="content">
    <form action="coordinator.php" method="GET" target="result" onsubmit="onSubmit()">
      <p>Input the data</p>
      <p class="checkboxes var-p" id="x-p">
        <label>
          <span id="main-label">X:</span>
        </label>
        <label>
          <span>-5</span>
          <input type="checkbox" name=-5 id="X-5" onclick="hideErrorMessages()">
        </label>
        <label>
          <span>-4</span>
          <input type="checkbox" name=-4 id="X-4" onclick="hideErrorMessages()">
        </label>
        <label>
          <span>-3</span>
          <input type="checkbox" name=-3 id="X-3" onclick="hideErrorMessages()">
        </label>
        <label>
          <span>-2</span>
          <input type="checkbox" name=-2 id="X-2" onclick="hideErrorMessages()">
        </label>
        <label>
          <span>-1</span>
          <input type="checkbox" name=-1 id="X-1" onclick="hideErrorMessages()">
        </label>
        <label>
          <span>0</span>
          <input type="checkbox" name=0 id="X+0" onclick="hideErrorMessages()">
        </label>
        <label>
          <span>1</span>
          <input type="checkbox" name=1 id="X+1" onclick="hideErrorMessages()">
        </label>
        <label>
          <span>2</span>
          <input type="checkbox" name=2 id="X+2" onclick="hideErrorMessages()">
        </label>
        <label>
          <span>3</span>
          <input type="checkbox" name=3 id="X+3" onclick="hideErrorMessages()">
        </label>
      </p>
      <p id="y-p" class="var-p">
        <span id="main-label">Y:</span>
        <input class="text-input" name="Y" oninput="onInputY()" id="y-input">
      </p>
      <p id="r-p" class="var-p">
        <span id="main-label">R:</span>
        <select name="R" value="" id="r-select" onclick="hideErrorMessages()">
          <option value=""></option>
          <option value=1>1</option>
          <option value=1.5>1.5</option>
          <option value=2>2</option>
          <option value=2.5>2.5</option>
          <option value=3>3</option>
        </select>
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