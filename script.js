let load_finished = false;
let skills_visible = false;

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
        opacity: 0,
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
            opacity: 0,
            easing: 'linear'
        }).finished.then(function () {
            $('.preloader').hide();
        });
    }, 750);
    setTimeout(scroll_indicator_animation, 2750);
}

function reveal_skills() {
    skills_visible = true;
    anime({
        targets: '.skills li',
        // duration: 500,
        scale: [0, 1],
        delay: anime.stagger(30)
    })
}

function check_for_load() {
    if (!load_finished) {
        anime({
            targets: '.preload-greeter',
            duration: 1500,
            keyframes: [
                {color: '#b0b0b0'},
                {color: '#000000'}
            ],
            easing: 'linear'
        }).finished.then(check_for_load);
    }
    else {
        reveal_page();
    }
}

$(document).ready(setTimeout(function enter() {
    anime({
        targets: '.preload-greeter',
        duration: 500,
        opacity: 1,
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

$(window).on("load", function() {
    load_finished = true;
    let skills_observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting === true && skills_visible === false) {
            reveal_skills();
        }
    }, {threshold: [0.25]});
    skills_observer.observe(document.querySelector('.skills ul'))
});