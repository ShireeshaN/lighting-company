$(function() {
    // 图片lazy加载
    $(".lazy").lazyload();
    window.addEventListener('scroll', function(event) {
        var depth, layer, layers, movement, topDistance, translate3d, _i, _len;
        topDistance = this.pageYOffset;
        // console.log(topDistance);
        layers = document.querySelectorAll("[data-type='parallax']");
        // console.log(layers);
        for (_i = 0, _len = layers.length; _i < _len; _i++) {
            layer = layers[_i];
            depth = layer.getAttribute('data-depth');
            movement = -(topDistance * depth);
            translate3d = 'translate3d(0, ' + movement + 'px, 0)';
            layer.style['-webkit-transform'] = translate3d;
            layer.style['-moz-transform'] = translate3d;
            layer.style['-ms-transform'] = translate3d;
            layer.style['-o-transform'] = translate3d;
            layer.style.transform = translate3d;
        }
    });
})

$(function() {
    scrollAni();
    $(".m-bocweb-header3 .header2 .hamburger").on("click", function() {
        if ($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            $(".m-bocweb-header3 .warp-nav").stop(true, false).hide(0);
            $("body,html").removeClass("ovh");
            $(".m-bocweb-header3 .header2 .nav .li").removeClass("animate");
            if (!$(".m-bocweb-header3").hasClass("on")) {
                $(".m-bocweb-header3").removeClass("active");
            }
            $(".header2 .h-right span").html("MENU");
        } else {
            $(this).addClass("is-active");
            $(".m-bocweb-header3 .warp-nav").stop(true, false).show(0);
            $("body,html").addClass("ovh");
            $(".m-bocweb-header3 .header2 .nav .li").addClass("animate");
            if (!$(".m-bocweb-header3").hasClass("on")) {
                $(".m-bocweb-header3").addClass("active");
            }
            $(".header2 .h-right span").html("COLSE");
        }
    })
    var _colSpan = $('.m-bocweb-header3 .header2 .nav .li');
    var _len = _colSpan.length;
    var i = 0;
    for (i; i < _len; i++) {
        _colSpan.eq(i).css({
            'transition-delay': 0.1 + 0.04 * (i + 1) + 's'
        });
    }


    $(".m-bocweb-header3 .header2 .sub-tit").on('click', function() {
        if ($(this).siblings('.sec-list').is(':hidden')) {
            $(this).addClass('on');
            $(this).siblings('.sec-list').stop().slideDown();
            $(this).parent().siblings('li').children('.sec-list').stop().slideUp().siblings('.tit').removeClass('on');
        } else {
            $(this).removeClass('on');
            $(this).siblings('.sec-list').stop().slideUp();
        }
    });

    $(".searchbtn").on('click', function() {
        $(".search-alert2").stop().fadeIn(300);
        $("body,html").addClass('ovh');
    });
    $(".search-alert2 .close").on('click', function() {
        $(".search-alert2").stop().hide();
        $("body,html").removeClass('ovh');
    });

    var target_top = $(window).scrollTop();
    if (target_top > 100) {
        $(".warp-header4").addClass("active");
    } else {
        $(".warp-header4").removeClass("active");
    }
    $(window).scroll(function() {
        var target_top = $(window).scrollTop();

        if (target_top > 100) {
            $(".warp-header4").addClass("active");
        } else {
            $(".warp-header4").removeClass("active");
        }
    });

    backTop($(".backbtn"));


    $(".header4 .leftbox .li").hover(function() {
        $(this).find(".sub-list").stop().slideDown();
    }, function() {
        $(this).find(".sub-list").stop().slideUp();
    })
})
//页面加载
// $('#loading').imagesLoaded({ background: true })
// .progress( function( instance, image ) {    //progress事件，在每一张图片加载完成时都触发一次
//     var box=$('#num');
//     imgNum = (imgNum+1)>=100?100:(imgNum+1);
//     box.text(imgNum);
// })
// .always( function( instance ) {
//     var box=$('#num');
//     var timer = setInterval(function () {
//         if(imgNum<100){
//             imgNum += Math.round(Math.random());
//             box.text(imgNum);
//         }else{
//             setTimeout(function () {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
//                 $('#loading').fadeOut(1500,function () {

//                 });
//             },1000);
//             clearInterval(timer);
//         }
//     },10);
// });

//about
  // Fade-in animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
  //about


  //  <!--product-banner-wrapper, product-item start-->
 const container = document.getElementById("scrollContainer");
const row = document.getElementById("iconRow");

const icons = row.innerHTML;
row.innerHTML += icons; // Duplicate the row to create a seamless effect

let currentIndex = 0;
const scrollSpeed = 2000; // Interval time for scroll speed (in ms)
const maxIcons = row.children.length / 2;

function scrollRow() {
  if (currentIndex < maxIcons) {
    row.style.transform = `translateX(-${currentIndex * 280}px)`; // Adjusted for 260px + gap
    currentIndex++;
  } else {
    currentIndex = 0;
    row.style.transition = 'none';
    row.style.transform = 'translateX(0)';
    setTimeout(() => {
      row.style.transition = 'transform 1s ease-in-out';
    }, 50);
  }
}

setInterval(scrollRow, scrollSpeed);

  //  <!--product-banner-wrapper, product-item end-->
//map

const dots = [
  document.querySelector('.quan1'),
  document.querySelector('.quan2'),
  document.querySelector('.quan3'),
  document.querySelector('.quan4'),
  document.querySelector('.quan5'),
  document.querySelector('.quan6'),
  document.querySelector('.quan7'),
];

const planes = [
  document.querySelector('.plane1'),
  document.querySelector('.plane2'),
  document.querySelector('.plane3'),
];

function movePlane(plane, startIndex) {
  let index = startIndex;

  function moveNext() {
    const dot = dots[index];
    const rect = dot.getBoundingClientRect();
    const container = document.querySelector('.imgbox').getBoundingClientRect();

    const left = rect.left - container.left;
    const top = rect.top - container.top;

    plane.style.left = `${left}px`;
    plane.style.top = `${top}px`;

    index = (index + 1) % dots.length;
    setTimeout(moveNext, 2000);
  }

  moveNext();
}

window.onload = () => {
  movePlane(planes[0], 0);
  movePlane(planes[1], 2);
  movePlane(planes[2], 4);
};
//map end

//lightonoffanimation start



//active inactive

const subLinks = document.querySelectorAll('.sub-links a');
  const category = document.getElementById('pixel-category');

  subLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all sub-links
      subLinks.forEach(l => l.classList.remove('active'));

      // Add active class to the clicked one
      this.classList.add('active');

      // Ensure category remains active
      category.classList.add('active');
    });
  });
//active inactive


//mobile dropdown catogories
  function toggleCategories() {
    const catList = document.getElementById('mobileCategories');
    catList.classList.toggle('open');
  }
  //mobile


 