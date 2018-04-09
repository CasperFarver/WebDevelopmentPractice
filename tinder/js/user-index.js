$(document).ready(function() {

  $.ajax({
    "method" : "GET",
    "url" : "../tinder/api/get-users.php",
    "dataType" : "JSON",
  }).done(function(data) {
    
    //Storing sessionID (which is = to userID) from localStorage into variable
    var sUserID = localStorage.getItem("sessionID");

    //Looping through the list of users                
    for (let i = 0; i < data.length; i++) {
      if (sUserID == data[i].id) {
        console.log(sUserID);   //Only for test
        
        //Makes link in navbar visible, if imageSet is true
        if (data[i].imageSet == true) {
          $(".navbar-brand").css({"visibility" : "visible"}) ;
          //Fetch image if it is set
          $('#img-profile').attr("src", data[i].imageURL); 
        } else {
          swal({
            title: "Attention!",
            text: "You must upload an image in order to see other users.",
            icon: "info",
            button: "I understand!"
          });
        }
        
        //Fetch other values for profile for specific user and change them in the markup
        //Check if description is set - NOT mandatory
        if (data[i].description !== '') {
          $('#txt-profile-description').html(data[i].description);  
        }
        $('#txt-firstName').attr("value", data[i].firstName);
        $('#txt-lastName').attr("value", data[i].lastName);
        //Check if female or male
        if (data[i].gender == 'male') {
          $('#img-gender').attr("src", "img/male.png");  
        } else {
          $('#img-gender').attr("src", "img/female.png");
        }
        //Check gender - male or female
        if (data[i].gender == 'male') {
          $('#opt-gender-firstValue').html("<option>Male</option>");
          $('#opt-gender-secondValue').html("<option>Female</option>");
        } else {
          $('#opt-gender-firstValue').html("<option>Female</option>");
          $('#opt-gender-secondValue').html("<option>Male</option>"); 
        }
        //Check interested in - male, female or both
        if (data[i].interestedIn == 'male') {
          $('#opt-interestedIn-firstValue').html("<option>Male</option>");
          $('#opt-interestedIn-secondValue').html("<option>Female</option>");
          $('#opt-interestedIn-thirdValue').html("<option>Both</option>");  
        } else if (data[i].interestedIn == 'female') {
          $('#opt-interestedIn-firstValue').html("<option>Female</option>");
          $('#opt-interestedIn-secondValue').html("<option>Male</option>");
          $('#opt-interestedIn-thirdValue').html("<option>Both</option>");  
        } else {
          $('#opt-interestedIn-firstValue').html("<option>Both</option>");
          $('#opt-interestedIn-secondValue').html("<option>Male</option>");
          $('#opt-interestedIn-thirdValue').html("<option>Female</option>"); 
        }
        $('#num-age').attr("value", data[i].age);
        $('#num-phoneNumber').attr("value", data[i].phoneNumber);
        $('#txt-email').attr("value", data[i].email);
        

        break;
      } 
    }

  }).fail(function() {
    console.log('{"status" : "error", "message" : "Something went wrong, trying to retrieve the data"}');
  });

});