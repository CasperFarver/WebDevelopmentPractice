<?php
//Upload image API

  //Check if data is correct - Is the file set? And is it bigger than the size of 0?
  if(isset($_FILES['imgToUpload']) && $_FILES['imgToUpload']['size'] > 0){
    echo '{"status" : "success", "message" : "image is set correctly"}';
  } else {
    echo '{"status" : "error", "message" : "image is NOT set correctly"}';

  }


?>