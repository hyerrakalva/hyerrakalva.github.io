let load_animation = 0;

function testAnimation() {
    anime({
        targets: 'h1',
        opacity: '1',
        duration: 1000,
        easing: 'linear',
    });
    anime({
        targets: '.loading-animation',
        opacity: '1',
        delay: 1000,
        duration: 300,
        easing: 'linear',

    });
    anime({
        targets: '.loading-animation',
        translateY: [50, 0],
        delay: 1000,
        duration: 1000,
        easing: 'easeOutElastic(1, 0.5)',
        complete: function() {
            anime({
                targets: '.loading-circle',
                loop: true,
                keyframes: [
                    {translateY: -50, easing: 'cubicBezier(0.445, 0.050, 0.550, 0.950)'},
                    {translateY: 0, easing: 'cubicBezier(0.470, 0.000, 0.745, 0.715)'},
                    {translateY: 50, easing: 'cubicBezier(0.390, 0.575, 0.565, 1.000)'},
                    {translateY: 0, easing: 'spring(1, 80, 10, 0)', duration: 700},
                ],
                delay: anime.stagger(100),
                loopComplete: function(anim) {
                    load_animation++;
                    if (load_animation === 5) {
                        anime({
                            targets: 'h2',
                            opacity: '1',
                            duration: 2000,
                            easing: 'linear',
                        });
                    }
                },
                // duration: 800
            });
        }
    });

}