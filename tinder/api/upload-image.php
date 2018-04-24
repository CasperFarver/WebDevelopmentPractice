<?php
//Upload image API

  //Getting file name
  $sFileName = $_FILES['imgToUpload']['name'];

  //Location
  $sLocation = "../img/users/" . $sFileName;
  $iUploadOk = 1;
  $sImageFileType = pathinfo($sLocation,PATHINFO_EXTENSION);

  //Check image format
  if($sImageFileType != "jpg" && $sImageFileType != "png" 
    && $sImageFileType != "jpeg" && $sImageFileType != "gif") {
      $iUploadOk = 0;
    }

  if($iUploadOk == 0) {
    echo 'error 0';
  } else {
    //Upload file
    if(move_uploaded_file($_FILES['imgToUpload']['tmp_name'],$sLocation)) {
      echo $sLocation;
    } else {
      echo 0;
    }
  }  

?>