/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function(){
   // Sticky footer
  var bumpIt = function() {
      $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);
  // FitVids init
  $("#main").fitVids();

  // init sticky sidebar
  $(".sticky").Stickyfill();

  var stickySideBar = function(){
    var show = $(".author__urls-wrapper button").length === 0 ? $(window).width() > 1024 : !$(".author__urls-wrapper button").is(":visible");
    // console.log("has button: " + $(".author__urls-wrapper button").length === 0);
    // console.log("Window Width: " + windowWidth);
    // console.log("show: " + show);
    //old code was if($(window).width() > 1024)
    if (show) {
      // fix
      Stickyfill.rebuild();
      Stickyfill.init();
      $(".author__urls").show();
    } else {
      // unfix
      Stickyfill.stop();
      $(".author__urls").hide();
    }
  };

  stickySideBar();

  $(window).resize(function(){
    stickySideBar();
  });

  // Follow menu drop down

  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").fadeToggle("fast", function() {});
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // init smooth scroll
  $("a").smoothScroll({offset: -20});

  // add lightbox class to all image links
  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

});



const pidge_style = document.createElement('style');
pidge_style.textContent = `
  .pop-image {
    position: fixed;
    pointer-events: none;
    transform: translate(-50%, -50%);
    animation: popIn 0.6s ease forwards;
  }

@keyframes popIn {
    0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
    60%  { opacity: 1; transform: translate(-50%, -50%) scale(1.5) rotate(var(--rotation)); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(1)   rotate(var(--rotation)); }
  }
`;
document.head.appendChild(pidge_style);

const popfunc = (x,y) => {
  const img = document.createElement('img');
  img.src = '/images/pidge.png';
  img.classList.add('pop-image');
  img.style.left = x + 'px';
  img.style.top = y + 'px';
  img.style.width = parseInt(Math.random()*100 + 10) + 'px';

  // Random rotation between -30 and 30 degrees
  const maxRotation = 360*2;
  const rotation = Math.random() * maxRotation - maxRotation/2;
  img.style.setProperty('--rotation', `${rotation}deg`);


  document.body.appendChild(img);
  img.addEventListener('animationend', () => img.remove());
};

['click', 'touchstart', 'touchend'].forEach(eventType => {
  document.body.addEventListener(eventType, (e) => {
    const touch = e.touches?.[0] || e.changedTouches?.[0];
    const x = touch ? touch.clientX : e.clientX;
    const y = touch ? touch.clientY : e.clientY;
    
    popfunc(x,y);
    // rest of your code using x and y
  });
});
let lastFired = 0;
document.body.addEventListener('touchmove', (e) => {
  const now = Date.now();
  if (now - lastFired < 100) return; // only fire every 100ms
  lastFired = now;

  const touch = e.touches[0];
  popfunc(touch.clientX, touch.clientY);
  // rest of your code...
});

