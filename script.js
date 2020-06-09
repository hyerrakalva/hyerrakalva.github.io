let load_finished = false;
let skills_visible = false;
let experience_visible = false;
let project_visible = false;
let contact_visible = false;
let slide_counter = {
    "experience": 0,
    "projects": 0
};
let slide_name = {
    'experience': 'work',
    'projects': 'project'
};
let animation_lock = false;

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
    anime({
        targets: '.loading-circle',
        duration: 500,
        marginLeft: ['10px', '-14.5px'],
        marginRight: ['10px', '-14.5px'],
        opacity: [1, 0],
        easing: 'cubicBezier(1.000, -0.455, 0.890, 0.665)'
    });
    setTimeout(function () {
        $("body").css("overflow-y", "scroll");
        anime({
            targets: '.headshot img',
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
    setTimeout(scroll_indicator_animation, 2000);
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

function reveal_experience() {
    experience_visible = true;
    anime({
        targets: '.experience .slideshow',
        duration: 750,
        translateY: [45, 0],
        easing: 'linear'
    })
    anime({
        targets: '.experience .slideshow, .experience .dot-container',
        duration: 500,
        opacity: [0, 1],
        easing: 'linear'
    });
}

function reveal_projects() {
    project_visible = true;
    anime({
        targets: '.projects .slideshow',
        duration: 750,
        translateY: [45, 0],
        easing: 'linear'
    });
    anime({
        targets: '.projects .slideshow, .projects .dot-container',
        duration: 500,
        opacity: [0, 1],
        easing: 'linear'
    });
}

function reveal_contact() {
    contact_visible = true;
    anime({
        targets: '.contact-header',
        duration: 500,
        translateY: [70, 0],
        easing: 'easeOutQuint'
    }).finished.then(function () {
        anime({
            targets: '.contact a',
            duration: 1000,
            marginLeft: ['30px', '7px'],
            marginRight: ['30px', '7px'],
            opacity: [0, 1],
            easing: 'easeOutQuint'
        });
    });
    anime({
        targets: '.contact-header',
        duration: 750,
        opacity: [0, 1]
    })
}

function check_for_load() {
    if (!load_finished) {
        anime({
            targets: '.loading-circle',
            keyframes: [
                {translateY: -50, easing: 'cubicBezier(0.445, 0.050, 0.550, 0.950)'},
                {translateY: 0, easing: 'cubicBezier(0.470, 0.000, 0.745, 0.715)'},
                {translateY: 50, easing: 'cubicBezier(0.390, 0.575, 0.565, 1.000)'},
                {translateY: 0, easing: 'spring(1, 80, 10, 0)', duration: 700},
            ],
            delay: anime.stagger(110),
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
    setTimeout(function () {
        anime({
            targets: '.loading-animation',
            duration: 250,
            opacity: 1,
            easing: 'linear'
        });
        anime({
            targets: '.loading-circle',
            keyframes: [
                {translateY: -50, easing: 'cubicBezier(0.445, 0.050, 0.550, 0.950)'},
                {translateY: 0, easing: 'cubicBezier(0.470, 0.000, 0.745, 0.715)'},
                {translateY: 50, easing: 'cubicBezier(0.390, 0.575, 0.565, 1.000)'},
                {translateY: 0, easing: 'spring(1, 80, 10, 0)', duration: 700},
            ],
            delay: anime.stagger(110),
        }).finished.then(check_for_load);
    }, 250);
}, 100));

$(window).on("load", function() {
    load_finished = true;
    let skills_observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting === true && skills_visible === false) {
            reveal_skills();
        }
    }, {threshold: [0.25]});
    let experience_observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting === true && experience_visible === false) {
            reveal_experience();
        }
    }, {threshold: [0.25]});
    let projects_observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting === true && project_visible === false) {
            reveal_projects();
        }
    }, {threshold: [0.25]});
    let contact_observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting === true && contact_visible === false) {
            reveal_contact();
        }
    }, {threshold: [1]});
    skills_observer.observe(document.querySelector('.skills ul'));
    experience_observer.observe(document.querySelector('.experience .slideshow'));
    projects_observer.observe(document.querySelector('.projects .slideshow'));
    contact_observer.observe(document.querySelector('.contact-header'));
});

function set_slide(slide_num, section, direction) {
    if (animation_lock) {
        return;
    }
    else {
        animation_lock = true;
        $("body").css("overflow-x", "hidden");
    }
    if (direction === 100) {
        console.assert(slide_counter[section] !== undefined);
        if (slide_counter[section] < slide_num) {
            direction = 1;
        }
        else if (slide_counter[section] > slide_num) {
            direction = -1;
        }
        else {
            return;
        }
    }
    console.assert(direction === 1 || direction === -1);

    let dots = $('.' + section + ' .dot-container')[0].children;
    dots[slide_counter[section]].classList.remove('active');
    dots[slide_num].classList.add('active');

    anime({
        targets: '.' + section + ' .' + slide_name[section] + '.visible',
        duration: 250,
        translateX: [0, -45 * direction],
        easing: 'linear'
    });
    anime({
        targets: '.' + section + ' .' + slide_name[section] + '.visible',
        duration: 250,
        endDelay: 250,
        opacity: [1, 0],
        easing: 'linear'
    }).finished.then(function () {
        let slides = $('.' + slide_name[section]);
        slides[slide_counter[section]].classList.remove('visible');
        slides[slide_num].classList.add('visible');
        anime({
            targets: '.' + section + ' .' + slide_name[section] + '.visible img',
            duration: 1000,
            scale: [1.1, 1.0],
            easing: 'easeOutCubic'
        })
        anime({
            targets: '.' + section + ' .' + slide_name[section] + '.visible',
            duration: 250,
            translateX: [45 * direction, 0],
            easing: 'linear'
        });
        anime({
            targets: '.' + section + ' .' + slide_name[section] + '.visible',
            duration: 250,
            opacity: [0, 1],
            easing: 'linear'
        }).finished.then(function () {
            $("body").css("overflow-x", "auto");
            animation_lock = false;
        });
        slide_counter[section] = slide_num;
    });
}

function arrow_navigate(section, direction) {
    let index_to_navigate = slide_counter[section];
    let length = document.getElementsByClassName(section)[0].children[2].childElementCount;
    if (direction === 1) {
        if (++index_to_navigate === length) {
            index_to_navigate = 0;
        }
    }
    else if (direction === -1) {
        if (--index_to_navigate === -1) {
            index_to_navigate = length - 1;
        }
    }
    else {
        console.assert(false);
    }
    set_slide(index_to_navigate, section, direction);
}