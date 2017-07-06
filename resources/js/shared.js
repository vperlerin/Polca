window.onbeforeunload = function(e) {
    $('#logo').addClass('rubberBand animated');
};

$(function() {
     
    // Flashee on Homepage
    flashee(); 
    
    // Year on Copy / footer
    $('#year').text(new Date().getFullYear());  
    
    // Slidedown effect
    $('#page').slideDown(150);
    
    
    // Load next page
    $('a.jump').click(function() {
        var $t = $(this);
        $('#page').slideUp(150,function() { 
            window.location.href = $t.attr('href');
        });
        return false;
    }); 

    // Go back to homepage after 5 minutes of inactivity
    setTimeout(function() {
        window.location.href = '/';
    }, 500000);
    
}); 