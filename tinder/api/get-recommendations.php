<?php
//API for getting all the recommendations

  $sFileName = '../txt/recommendations.txt';

  $sajRecommendations = file_get_contents($sFileName);
  $ajRecommendations = json_decode($sajRecommendations);

  //Check if it is an array
  if (!is_array) {
    echo '"status" : "error", "message" : "The data is not an array"';
    exit;
  }

  //Convert back to string and ensure the data via the UNICODE-flag
  $sajRecommendations = json_encode($ajRecommendations);

  //Echo back
  echo $sajRecommendations;

?>