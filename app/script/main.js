let myWidth = window.innerWidth,
    myHeight = window.innerHeight;
console.log(`width ${myWidth} \n height ${myHeight}`);

document.querySelector('html').style.overflowY = 'hidden';

window.onload = function () {

    setTimeout(() => {
        document.querySelector('.loader').style.cssText = 'opacity: 0; z-index: -5;';
        document.querySelector('html').style.overflowY = 'scroll';
    }, 1500);

    /*
        increase date
     */

    let today = new Date(),
        tomorrow = new Date(),
        day,
        month,
        year,
        i = 3,
        period = document.querySelectorAll('h6 output'),
        catalogPeriod = document.querySelectorAll('.catalog__block-model ul li p output');

    tomorrow.setDate(today.getDate() + i);

    day = tomorrow.getDate() > 9 ? tomorrow.getDate() : `0${tomorrow.getDate()}`;
    month = tomorrow.getMonth() + 1 > 9 ? tomorrow.getMonth() + 1 : `0${tomorrow.getMonth() + 1}`;
    year = tomorrow.getFullYear();

    for(let i = 0; i < period.length; i++) {
        period[i].innerHTML = `${day}.${month}.${year.toString().slice(2)}`;
    }

    for(let i = 0; i < catalogPeriod.length; i++) {
        catalogPeriod[i].innerHTML = `${year}-${year + 1}`
    }

    document.querySelector('h6.address output').innerHTML = year;


    /*
        fancybox settings
     */

    $.fancybox.defaults.loop = true;
    $.fancybox.defaults.animationEffect = "fade";

    /*
        form styler
     */

    $(function () {
        $('select').styler({
            selectSmartPositioning: false
        });
    });

    /*
        review slider
     */

    $('.review__content-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 0,
        speed: 300,
        arrow: true,
        prevArrow: $('.prev-arrow'),
        nextArrow: $('.next-arrow')
    });

    /*
        send feedback
     */

    const bodyFilter = document.querySelector('.body-filter'),
        openFeedback = document.querySelector('p.send'),
        closeFeedback = document.querySelector('span.close'),
        feedback = document.querySelector('.feedback'),
        feedbackTitle = document.querySelector('.feedback p'),
        feedbackForm = document.querySelector('.feedback form'),
        inputValue = document.querySelector('.feedback form input'),
        textareaValue = document.querySelector('.feedback form textarea'),
        changeForm = () => {
            inputValue.value = '';
            textareaValue.value = '';
            feedbackTitle.style.display = 'none';
            feedbackForm.style.display = 'block';
        },
        toggleFeedback = (toggle) => {
            if(toggle === false) {
                document.querySelector('html').style.overflowY = 'hidden';
                bodyFilter.style.cssText = 'z-index: 9999; background: rgba(0, 0, 0, 0.8)';
                feedback.style.cssText = 'opacity: 1; z-index: 99999;   transform: translate(-50%, -50%) rotateX(0deg);';
            } else {
                document.querySelector('html').style.overflowY = 'scroll';
                bodyFilter.style.cssText = 'z-index: -5; background: rgba(0, 0, 0, 0)';
                feedback.style.cssText = 'opacity: 0; z-index: -5;   transform: translate(-50%, -50%) rotateX(-90deg);';
                setTimeout(changeForm, 500);
            }
        };

    inputValue.addEventListener('change', () => {
        inputValue.value;
    });

    textareaValue.addEventListener('change', () => {
        textareaValue.value;
    });

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        feedback.style.opacity = '0';
        setTimeout(() => {
            feedbackForm.style.display = 'none';
            feedbackTitle.style.display = 'block';
        }, 500);
        setTimeout(() => {
            feedback.style.opacity = '1'
        },600);
    });

    openFeedback.addEventListener('click', () => {
        toggleFeedback(false);
    });

    closeFeedback.addEventListener('click', () => {
        toggleFeedback(true);
    });

    bodyFilter.addEventListener('click', () => {
        toggleFeedback(true);
    });

    /*
        toggle bucket
     */

    const toggleBucket = () => {
        let bucket = document.querySelector('a.bucket'),
            topOfWindow = window.pageYOffset + innerHeight,
            catalogTopPosition = document.querySelector('.catalog').offsetTop,
            photoTopPosition = document.querySelector('.photo').offsetTop;

        if(topOfWindow > catalogTopPosition && topOfWindow < photoTopPosition) {
            bucket.style.cssText = 'opacity: 0; z-index: -5';
        } else {
            bucket.style.cssText = 'opacity: 1; z-index: 999';
        }
    }

    /*
        slow scroll
     */

    const slowScroll = (href) => {
        $('a.to-order, a.bucket').on('click', function () {
            $('html, body').animate({scrollTop: href}, 800);
            return false;
        });
    }

    if(/iPhone|iPod|Android/i.test(navigator.userAgent)) {
        let href = $('#mobileorder').offset().top > $('#mobile-order').offset().top ? $('#mobileorder').offset().top - innerHeight : $('#mobile-order').offset().top;
        slowScroll(href);

        window.addEventListener('scroll', () => {
            toggleBucket();
        });
        window.addEventListener('resize', () => {
            toggleBucket();
        });
    } else {
        let href = $('#catalog').offset().top;
        slowScroll(href);
    }
};
