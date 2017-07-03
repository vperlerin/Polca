 /*
 * Blinking buttons on index
 */ 
 function flashee() {
             
            setInterval(function() {
              var $links =   $('#main-buttons a');
              var total_link = $links.length;
              var index = 0;
              if($('#main-buttons a.active').length==0) {
                    $('#main-buttons a:first').addClass('active');
              } else {
                    // Get index of active
                   index = $('.col-but a.active').index('.col-but a');
                   $('.col-but a.active').removeClass('active');
                   $($('.col-but a').get(index+1)).addClass('active');
              }
            } ,5000);
             
}    