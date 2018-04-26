<?php
//Upload image API

  $sUsername = $_POST['username'];

  if(isset($_FILES['imgToUpload']['type'])) {

    $sValidExtensions = array("jpeg", "jpg", "png");
    $sTemporary = explode(".", $_FILES['imgToUpload']['name']);
    $sFileExtension = end($sTemporary);

    if((($_FILES['imgToUpload']['type'] == "image/png") || ($_FILES['imgToUpload']['type'] == "image/jpg")
      || ($_FILES['imgToUpload']['type'] == "image/jpeg")) && ($_FILES['imgToUpload']['size'] < 1000000) //Approx. 1mb files can be uploaded.
      && in_array($sFileExtension, $sValidExtensions)) {

        if($_FILES['imgToUpload']['error'] > 0) {

          echo '{"status" : "error", "message" : "An error occured while you were trying to upload"}';
        } else {

          if(file_exists("../img/users/" . $_FILES['imgToUpload']['name'])) {

            echo '{"status" : "error", "message" : "File already exists"}';
          } else {

            $sSourcePath = $_FILES['imgToUpload']['tmp_name'];
            $sImageName = uniqid() . $_FILES['imgToUpload']['name'];
            $sTargetPath = "../img/users/" . $sImageName;
            move_uploaded_file($sSourcePath, $sTargetPath);

            $sFileName = '../txt/users.txt';
            $sajUsers = file_get_contents($sFileName);
            $ajUsers = json_decode($sajUsers);

            for ($i=0; $i < count($ajUsers); $i++) { 
              
              if($ajUsers[$i]->username == $sUsername) {

                //Set/save image to profile & change imageSet to 'true'
                $ajUsers[$i]->imageURL = "../tinder/img/users/" . $sImageName;
                $ajUsers[$i]->imageSet = true;

                //Update array and turn it back into a string
                $sajUsers = json_encode($ajUsers);
                file_put_contents($sFileName, $sajUsers);

                echo '{"status" : "success", "message" : "Image was uploaded with success", "imageURL" : "' . $sImageName . '"}';
                exit;

              }

            }

            echo '{"status" : "error", "message" : "Username does not exist"}';
            exit;

            // echo "<span id='success'>Image Uploaded Successfully...!!</span><br/>";
            // echo "<br/><b>File Name:</b> " . $_FILES['imgToUpload']['name'] . "<br>";
            // echo "<b>Type:</b> " . $_FILES['imgToUpload']['type'] . "<br>";
            // echo "<b>Size:</b> " . ($_FILES['imgToUpload']['size'] / 1024) . " kB<br>";
            // echo "<b>Temp file:</b> " . $_FILES['imgToUpload']['tmp_name'] . "<br>";
          }
        }
      } else {
        echo '{"status" : "error", "message" : "Invalid file size or type"}';
      }

  }  

?>