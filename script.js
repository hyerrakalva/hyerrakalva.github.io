let load_finished = false;

$(window).on("load", function() {
    console.log('Finished loading');
    console.log(performance.now())
    load_finished = true;
});

$(window).on('beforeunload', function() {
    $('body').hide();
    $(window).scrollTop(0);
});

function scroll_indicator_animation() {
    $('.scroll-reminder').css("cursor", "initial");
    anime({
        targets: '.scroll-reminder',
        duration: 400,
        opacity: 1,
        easing: 'linear'
    });
    anime({
        targets: '.mouse-svg',
        duration: 1000,
        loop: 2,
        top: ['40px', '0px'],
        easing: 'linear',
        changeBegin: function () {
            anime({
                targets: '.mouse-svg',
                duration: 250,
                opacity: 1,
                endDelay: 400,
                easing: 'linear'
            }).finished.then(function () {
                anime({
                    targets: '.mouse-svg',
                    duration: 250,
                    opacity: 0,
                    easing: 'linear'
                });
            })
        }
    }).finished.then(function () {
        anime({
            targets: '.mouse-svg',
            duration: 2000,
            top: ['40px', '0px'],
            easing: 'easeOutCubic'
        });
        anime({
            targets: '.mouse-svg',
            duration: 250,
            opacity: 1,
            easing: 'linear'
        });
    });
}

function reveal_page() {
    anime({
        targets: '.preload-greeter',
        duration: 500,
        opacity: '0',
        easing: 'linear'
    });
    anime({
        targets: '.preload-greeter',
        duration: 500,
        top: '-150px',
        easing: 'easeInCirc'
    });
    setTimeout(function () {
        $("body").css("overflow-y", "scroll");
        anime({
            targets: 'img',
            duration: 1000,
            scale: [1.15, 1],
            easing: 'easeOutCubic'
        });
        anime({
            targets: '.preloader',
            duration: 500,
            opacity: '0',
            easing: 'linear'
        }).finished.then(function () {
            $('.preloader').hide();
        });
    }, 750);
    setTimeout(scroll_indicator_animation, 2750);
}

$(document).ready(setTimeout(function enter() {
    console.log("Executed greeter animation at " + performance.now());
    anime({
        targets: '.preload-greeter',
        duration: 500,
        opacity: '100%',
        easing: 'linear'
    });
    anime({
        targets: '.preload-greeter',
        duration: 500,
        top: '-50px',
        easing: 'easeOutCirc'
    });
    setTimeout(check_for_load, 1250);
}, 100));
