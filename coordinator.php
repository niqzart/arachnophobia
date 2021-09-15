<?php 
  foreach ($_GET as $key => $value) {
    if ($key === "Y" || $key === "R") {
      echo "<h5>".$value."</h5>";
    } elseif ($value === "on") {
      echo "<h5>".$key."</h5>";
    }
  }
?>