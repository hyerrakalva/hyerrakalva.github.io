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
