$(document).ready(function() {

  $.ajax({
    "method" : "GET",
    "url" : "../tinder/api/get-users.php",
    "dataType" : "JSON",
  }).done(function(data) {
    
    //Storing sessionID (which is = to userID) from localStorage into variable
    var sUserID = localStorage.getItem("sessionID");

    //Template for markup
    var sTemplate = `
                      <div class="container">
                        <img src="{{imageURL}}" alt"Profile image">
                        <h1>{{firstName}}</h1>
                      </div>
                    `;

    //Looping through the list of users                
    for (let i = 0; i < data.length; i++) {
      if (sUserID == data[i].id) {
        console.log(sUserID);   //Only for test
        
        //Makes link in navbar visible, if imageSet is true
        if (data[i].imageSet == true) {
          $(".navbar-brand").css({"visibility" : "visible"})  
        }
        

        //Copy of the template
        var sTemplateCopy = sTemplate;

        //Replacing placeholders in template with values retrieved from the user.
        sTemplateCopy = sTemplateCopy.replace('{{imageURL}}', data[i].imageURL);
        sTemplateCopy = sTemplateCopy.replace('{{firstName}}', data[i].firstName);

        //.html() overwrites the existing content of the div - append just adds to it.
        //Usage of append is good for empty div containers.
        $('#profile').html(sTemplateCopy);

        break;
      } 
    }

  }).fail(function() {
    console.log('{"status" : "error", "message" : "Something went wrong, trying to retrieve the data"}');
  });

});