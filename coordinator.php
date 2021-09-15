<?php 

  function checkCoords($x, $y, $r) {
    return ($x >= 0 && $y >= 0 && $x <= $r && $y <= $r) ||
      ($x <= 0 && $y >= 0 && $x * $x + $y * $y <= ($r * $r) / 4) ||
      ($x <= 0 && $y <= 0 && $y >= -$x - $r/2);
  }

  $x_array = array();
  $empty = false;
  foreach ($_GET as $key => $value) {
    if ($key === "empty") $empty = $value;
    elseif ($key === "Y") $y = $value;
    elseif ($key === "R") $r = $value;
    elseif ($value === "on") array_push($x_array, $key);
  }

  $result = "<table><tbody><tr><th>X</th><th>Y</th><th>R</th><th>result</th></tr>";
  foreach ($x_array as $x) {
    $result .= "<tr><td>".$x."</td><td>".$y."</td><td>".$r."</td><td>".
      (checkCoords($x, $y, $r) ? "true" : "false")."</td></tr>";
  }
  $result .= "</tbody></table>";

  if ($empty) echo "<img src=\"static/areas.png\">";
  else echo $result;
?>
