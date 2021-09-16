<?php 

  function wrap_html($html) {
    return "<html><head><meta charset=\"utf-8\" /><style>
      table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
        color: white;
      }

      td, th {
        border: 1px solid gray;
      }

      th {
        width: 12.5%;
        border-bottom: 2px solid gray;
      }

      .time-cell {
        width: 25%;
      }
      </style></head><body>".$html."</body></html>";
  }

  function checkCoords($x, $y, $r) {
    return ($x >= 0 && $y >= 0 && $x <= $r && $y <= $r) ||
      ($x <= 0 && $y >= 0 && $x * $x + $y * $y <= ($r * $r) / 4) ||
      ($x <= 0 && $y <= 0 && $y >= -$x - $r/2);
  }

  session_start();
  if (!array_key_exists("result_history", $_SESSION)) {
    $_SESSION["result_history"] = array();
  }
  
  $x_array = array();
  $empty = false;

  foreach ($_GET as $key => $value) {
    if ($key === "empty") $empty = $value;
    elseif ($key === "Y") $y = $value;
    elseif ($key === "R") $r = $value;
    elseif ($value === "on") array_push($x_array, $key);
  }

  $new_rows = 0;
  $result = "<table><tbody><tr><th>X</th><th>Y</th><th>R</th><th>Result</th>".
    "<th class=\"time-cell\">Stating Time</th><th class=\"time-cell\">Evaluation Time</th></tr>";
  
  foreach (array_reverse($x_array) as $x) {
    $start_time = microtime(true);
    $start_date = date("H:i:s");

    $check = checkCoords($x, $y, $r) ? "true" : "false";
    $eval_time = round(microtime(true) - $start_time, 8);

    array_push($_SESSION["result_history"], array($x, $y, $r, $check, $start_date, $eval_time));
    $new_rows += 1;
  }

  foreach (array_reverse($_SESSION["result_history"]) as $stuff) {
    if ($new_rows > 0) {
      $result .= "<tr style=\"color: lime;\">";
      $new_rows -= 1;
    } else $result .= "<tr>";

    foreach ($stuff as $element) $result .= "<td>".$element."</td>";
    $result .= "</tr>";
  }

  $result .= "</tbody></table>";

  if ($empty) echo "<img src=\"static/areas.png\">";
  else echo wrap_html($result);
?>
