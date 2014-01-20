
function changeImage(event,course_id,user_id,pseudonym_user_id)
  {
      for (var i=0;i<document.getElementsByClassName('star').length;i++){
          document.getElementsByClassName('star')[i].src = "/images/messages/star.png"
      }

    if(event.target.src == location.origin+"/images/messages/star.png"){

        updatePsuedonym(course_id,user_id,pseudonym_user_id,"selected");
        document.getElementById("star-image"+course_id).src = "/images/messages/star-lit.png";
      }else{
        updatePsuedonym(course_id,user_id,pseudonym_user_id,"deselected");
        document.getElementById("star-image"+course_id).src = "/images/messages/star.png";
      }
  }


function updatePsuedonym(course_id,user_id,pseudonym_user_id,status){
   var url =   location.origin+"/users/"+user_id+"/pseudonyms/"+pseudonym_user_id+"/update_favourite_course";
   $.ajaxJSON(url, 'PUT', {favourite_course_id:course_id,pseudonym_id: pseudonym_user_id,status: status}, function(data){

   });


}


