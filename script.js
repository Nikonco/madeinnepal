$( document ).ready(function() {
  
  
  
 
// Loader

  var infos = ['Capital: Kathmandu','Area: 147 181 km²','Continent: Asia','Currency : Nepalese Rupee','Population : 27,8 millions','Official language:	Nepali'];
  
  function loader(){
      var time = 0  ;

    $.each(infos,function(key,value){
      
      setTimeout( function(){ 
        $('.infos').fadeOut(function(){
          $(this).html(value);
        }).fadeIn(); 
        if( key == 5){
          $('#skip').fadeIn(500);
        }
      }, time  )
      time += 1500;

      
    });
    
    
  }
  
  loader();
  
  $('#skip').on('click',function(){
    $('.loader').fadeOut(500);
  })
 
//  Galerie

  String.prototype.filename=function(extension){
    var s= this.replace(/\\/g, '/');
    s= s.substring(s.lastIndexOf('/')+ 1);
    return extension? s.replace(/[?#].+$/, ''): s.split('.')[0];
  }


  $('.album img').on('click',function(){
    $('.pop-up img').show();
    $('.pop-up iframe').hide();
    $('.pop-up').fadeIn();
    
    url = $(this).attr('src');
    url = url.replace('small','big');
    $('.pop-up img').attr('src',url);
    
    line_height = $('.pop-up').height();
    console.log(line_height);
    $('.pop-up .inner').css('line-height', line_height+'px');
  })
  
  $('.pop-up').on('click',function(){
//     e.preventDefault();
    nextPhoto();  
    
  });
  
  function closePopup(){
    $('.pop-up').fadeOut(300,function(){
      $('.pop-up iframe').hide();
      $('.pop-up img').hide();
    });
  }
  
  $('.pop-up .close').on('click',function(e){
    e.stopPropagation(); // prevent the default action (scroll / move caret)
    $('#slider').width('65%');
    closePopup();
  })
  
  
  $('.full-screen').on('click',function(e){
    e.stopPropagation(); // prevent the default action (scroll / move caret)
    
    if($(this).hasClass('active') == true){
      $('#slider').width('100%');
      $(this).removeClass('active');
      $(this).html('-');
    } else{
      $('#slider').width('65%');
      $(this).addClass('active');
      $(this).html('+');
    }
  });
  
  function nextPhoto(){
    current = $('.pop-up img').attr('src').filename();
    next = parseInt(current) + 1;
    
    (next > $('.album img').length) ? next = 1 : next;
    
    $('.pop-up img').attr('src','album/big/'+next+'.jpg');
  }
  
  function previousPhoto(){
    current = $('.pop-up img').attr('src').filename();
    previous = parseInt(current) - 1;
    
    (previous == 0 ) ? previous = $('.album img').length : previous;
    
    $('.pop-up img').attr('src','album/big/'+previous+'.jpg');
  }
  
//     Keyboard

  $(document).keydown(function(e) {
      switch(e.which) {
          case 37: // left
          previousPhoto();
          break;
          
          case 39: // right
          nextPhoto();
          break;
          
          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  
//   Slider content

  var width = $('.cat:nth-child(2)').width();
  $('.cat:nth-child(2), .cat:nth-child(3)').css('left', width);
//   $('.cat.project img').width(width);

  //  Menu


  function slideContent(e,width){
    console.log(e);
    pages = $('.cat').length;
    previous = parseInt(menu) - 1;
    next = parseInt(menu) + 1;
    third = parseInt(menu) + 2;

    console.log(pages);
    console.log(menu);
    $('nav ul li.main.active').removeClass('active');
    $(e).addClass('active');
    
    $('.cat').removeClass('active');
    $('.cat:nth-child('+menu+')').addClass('active');

    
    if($('.cat:nth-child('+menu+')').css('left') != '0px'){
      if(menu == 2){
        $('.cat:nth-child('+menu+')').css('left', '0px');
        $('.cat:nth-child('+previous+')').css('left', '-'+width+'px');
        $('.cat:nth-child('+next+')').css('left', width+'px');
      }else if(menu == 1){
        $('.cat:nth-child('+next+'), .cat:nth-child('+third+')').css('left', width+'px');
        $('.cat:nth-child('+menu+')').css('left', '0');
      }else if(menu == pages){
        $('.cat:nth-child(1), .cat:nth-child('+previous+')').css('left', '-'+width+'px');
        $('.cat:nth-child('+menu+')').css('left', '0');
      }
      
    }
  };
    console.log(width);
  $('nav ul li.main').click(function(){
    menu = $(this).attr('data-id');
    slideContent(this, width);
  });


  
  
// Pop-up

$('.pop-up-on').on('click',function(){
  $('.pop-up').fadeIn(300,function(){
    $('iframe').css('display','inline-block');
  });
  line_height = $('.pop-up').height();
  console.log(line_height);
  $('.pop-up .inner').css('line-height', line_height+'px');
})


 
 
//  Random Background

 function setBackground(){
  $('.slider1').css('background-image', 'url(images/'+Math.floor((Math.random() * 6) + 1)+'.jpg)');
 };
 
 setBackground()
  
//   Slider
  i = 2;
  
  setInterval(function() {
    (i == 1) ? lastslide = 6 : lastslide = i-1;
    
    $('<div class="slide slider'+i+'" style="background-image:url(images/'+i+'.jpg)"></div>').insertAfter('.slider'+lastslide);
    $('.slider'+i).fadeIn(1000, function(){
      $('.slider'+lastslide).remove();
    });
    
    i += 1;
    
    if( i == 7){
      i = 1;
    }
    
  },5000);


// Audio

  $('#play-audio').on('click',function(){
    
    if($(this).hasClass('active')){
		  document.getElementById('audiotag1').pause();
      $(this).removeClass('active');
      $(this).css('background-image','url(images/icon/pause.png)')
    } else{
		  document.getElementById('audiotag1').play();
      $(this).addClass('active');
      $(this).css('background-image','url(images/icon/play.png)')
    }
  });

  
//   Mobile

  function mobileView(){
    if($(window).width() < 800){
      $('#newsletter').prependTo('#slider');
    }else{
      $('#newsletter').appendTo('#content')
    }
  } 
  
  mobileView();
  
  
//   Resize Window

  $( window ).resize(function() {
    mobileView();
  });

});