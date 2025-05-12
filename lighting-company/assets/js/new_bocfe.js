$(function() {
    if (!placeholderSupport()) { // 判断浏览器是否支持 placeholder
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    };
})
// 默认obj为执行元素
function Hover(obj, classname) {
    obj.hover(function() {
        $(this).addClass(classname)
    }, function() {
        $(this).removeClass(classname)
    })
}
//返回顶部方法
function backTop(obj) {
    obj.on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 600, 'easeInOutQuad');
    });
}

// TAB
// 默认焦点样式 .cur
// 为防止xp系统opacity可能出现的锯齿或边缘模糊， 默认.tabbox效果.show() / .hide()
// 拓展.tabbox成opacity， 需在.tabbox上加上 data-effect="true"
function Tab(tabBtn, tabBox) {
    var tabbl = true;
    tabBtn.eq(0).addClass("cur")
    tabBox.eq(0).show()
    tabBtn.click(function() {
        var n = $(this).index();
        $(this).addClass("cur").siblings().removeClass("cur")
        if (tabBox.attr("data-effect") == "true") {
            if (!tabbl) {
                return
            }
            tabbl = false;
            tabBox.eq(n).stop().fadeIn(800).siblings().stop().fadeOut(800, function() {
                tabbl = true;
            })
        } else {
            tabBox.eq(n).show().siblings().hide()
        }
    })
}


// 视频全屏 / 视频充满整个父级 (video获取宽高有问题)
function videoFull(obj, width, height) {
    var $video = obj

    function resizeBg() {
        $video.attr("width", "").attr("height", "").attr("style", "")
        var boxR = $('.top-video').outerWidth() / $('.top-video').outerHeight(),
            objR = width / height;

        if (objR < boxR) {
            $video.attr("width", "100%")
            var videoHeight = $video.width() / objR
            var top = -(videoHeight - $('.top-video').outerHeight()) / 2 > 0 ? 0 : -(videoHeight - $('.top-video').outerHeight()) / 2
            $video.css("margin-top", top);
        } else {
            $video.attr("height", "100%")
            var videoWidth = $video.height() * objR
            var left = -(videoWidth - $('.top-video').outerWidth()) / 2 > 0 ? 0 : -(videoWidth - $('.top-video').outerWidth()) / 2
            $video.css("margin-left", left);
        }
    }
    $(window).resize(resizeBg).trigger("resize");
}



function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}


function visual_button_scroll_down(obj) {
    obj.on('click', function() {
        var target = $(this).attr('data-id');
        var target_top = $(target).offset().top;
        $('html,body').animate({
            scrollTop: target_top
        }, 600, 'easeInOutQuad');
        return false;
    });
}
var isFirst = true;

function scrollAni() {

    $('.anim_emt').each(function() {
        var _this = $(this);
        if (_this.offset().top > $(window).scrollTop() + $(window).height() || _this.offset().top < $(window).scrollTop() - _this.outerHeight()) {
            // _this.removeClass('start');
        } else if ($(window).scrollTop() > _this.offset().top - $(window).height() * 0.95) {
            _this.addClass('start visb');

            if ($("#ci-particles").length >= 1) {
                if (isFirst) {
                    initScene();
                    isFirst = false
                }
            }
        }
    });
    $(window).scroll(function() {
        $('.anim_emt').each(function() {
            var _this = $(this);
            if (_this.offset().top > $(window).scrollTop() + $(window).height() || _this.offset().top < $(window).scrollTop() - _this.outerHeight()) {
                // _this.removeClass('start');
            } else if ($(window).scrollTop() > _this.offset().top - $(window).height() * 0.95) {
                _this.addClass('start visb');

                // $(_this)
                // startScramble('.i-img-list.animate .home-dec');
                if ($("#ci-particles").length >= 1) {
                    if (isFirst) {
                        initScene();
                        isFirst = false
                    }
                }

            }
        });

    });
}

function startScramble(name) {
    $(name).each(function(i, item) {
        var newText = $(item).data('text') || $(item).text();
        var delay = Number($(item).data('delay')) || 0;
        setTimeout(function() {
            $(item).attr('data-text', newText);
            setScramble(item, [newText]);
        }, delay);

    });
}

function setScramble(text, phrase) {
    var count = 0;
    var scramble = new TextScramble(text);
    scramble.setText(phrase[count]);
    var doScramble = function doScramble() {
        scramble.setText(phrase[count]).then(function() {
            setTimeout(doScramble, 800);
        });
        count = (count + 1) % phrase.length;
    }
    //doScramble();
}


function btnhover(obj) {
    var ink, d, x, y;
    var ulbox = obj;
    ulbox.find("a").bind("click touchstart",
        function(e) {
            $(".ink").remove();
            if ($(this).children(".ink").length === 0) {
                $(this).prepend("<span class='ink'></span>")
            }
            ink = $(this).find(".ink");
            ink.removeClass("animate-ink");
            if (!ink.height() && !ink.width()) {
                d = Math.max($(this).outerWidth(), $(this).outerHeight());
                ink.css({
                    height: d,
                    width: d
                })
            }
            x = e.pageX - $(this).offset().left - ink.width() / 2;
            y = e.pageY - $(this).offset().top - ink.height() / 2;
            ink.css({
                top: y + 'px',
                left: x + 'px'
            }).addClass("animate-ink")
        })
}



// 图片加载 调用方法
// _PreLoadImg([
// 图片路径(数组形式)
// ],function(){

// })
function _PreLoadImg(b, e) {
    var c = 0,
        a = {},
        d = 0;
    for (src in b) {
        d++
    }
    for (src in b) {
        a[src] = new Image();
        a[src].onload = function() {
            if (++c >= d) {
                e(a)
            }
        };
        a[src].src = b[src]
    }
};


/*开始加载页面主体图片*/
// var _imgArr=[];// 选择器  路径  是否背景   
// $("[data-bg-src]").each(function(){
//     var arr=[$(this),$(this).attr('data-bg-src'),true];
//     _imgArr.push(arr);
// });
// $("[data-src]").each(function(){
//     var arr=[$(this),$(this).attr('data-src'),false];
//     _imgArr.push(arr);
// });
// console.log(_imgArr);
function _PreLoadImg2(b, e, isnum) {
    var c = 0,
        a = {},
        d = 0;
    for (src in b) {
        d++
    }

    for (i in b) {
        var j = i;
        var image = new Image();
        image.src = b[i][1];
        image.onload = function() {
            if (++c >= d) {
                e(a);
            }
            if (isnum) {
                // $('#qLoverlay .loadingcar2').css({
                //  'opacity': c / d
                // });

                $('.progressbar .num').text(parseInt(c / d) * 100);
            }
        };
        if (b[i][2]) {
            b[i][0].css({
                'background-image': 'url(' + b[i][1] + ')'
            });
        } else {
            b[i][0].attr('src', b[i][1]);
        }
    }
};


/*
var _id = getUrlParam("id");
if (_id == 6) {
   alert(0);
}
*/
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


// html版式
// <div class="video-content">
//     <div class="video-fixed">
//         <div class="videoboxs">
//             <div class="box">
//                 <video id="video" playsinline="" width="100%" height="100%" controls="" autoplay="" preload="none" src=""></video>
//             </div>
//             <div class="cha"></div>
//         </div>
//     </div>
// </div>
function clickVideo(selector) {
    var video = document.getElementById('video');
    selector.on('click', function() {
        var videoSrc = $(this).attr('data-src');
        console.log(videoSrc);
        $('#video').attr('src', videoSrc);
        $('.video-fixed').stop().fadeIn();
        video.play();
        e.stopPropagation();
        e.preventDefault();
    })
    $('.video-fixed .cha').on('click', function() {
        $('.video-fixed').stop().fadeOut();
        video.pause();
    })
    $(".video-fixed").on("click", function() {
        $(".video-fixed").fadeOut();
    })
    $(".video-fixed .videoboxs").on("click", function(e) {
        e.stopPropagation()
    })
}