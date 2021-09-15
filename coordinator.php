<?php 
  $x_array = array();
  foreach ($_GET as $key => $value) {
    if ($key === "Y") {
      $y = $value;
    } elseif ($key === "R") {
      $r = $value;
    } elseif ($value === "on") {
      array_push($x_array, $key);
    }
  }

  foreach ($x_array as $x) {
    echo $x;
  }

  echo $y;
  echo $r;
?>