const Carousel = function (options) {

    options = (options) || null;

    let wrapperId,
        wrapper,
        slideToShow,
        slideToScroll,
        wrapperImages,
        imgWidthAvg,
        imgParent,
        countImg,
        allImages,
        totalWidth,
        styleParentImg,
        buttonNext,
        buttonPrev,
        firstElm = 0,
        translateX,
        speed,
        dotesSelector;

    function setParams() {
        wrapperId = options.id;
        wrapper = document.getElementById(options.id);

        slideToShow = (options.slideToShow) || 5;
        slideToScroll = (options.slideToShow) || 5;

        speed = options.speed || 500;

        wrapperImages = wrapper.querySelector('ul');
        imgParent = wrapperImages.querySelector('li');
        styleParentImg = window.getComputedStyle(imgParent);

        buttonNext = wrapper.querySelector('.carousel-nav-next');
        buttonPrev = wrapper.querySelector('.carousel-nav-prev');

        dotesSelector = wrapper.querySelector('.carousel-nav-dots');

        allImages = wrapperImages.querySelectorAll('img');
        countImg = allImages.length;

        translateX = 0;

        return true;
    }

    function resizeScreen() {
        setSlideParamByScreen();
        calcImgWidth();
        drawDotes();
    }

    function setSlideParamByScreen() {

        let screenWidth = screen.width;

        if (screenWidth <= 425) {
            slideToShow = 1;
            slideToScroll = 1;
        } else if (screenWidth <= 768) {
            slideToShow = 3;
            slideToScroll = 3;
        }

    }

    function drawDotes() {
        let html = '';

        for (let i = 0; i <= Math.floor(countImg / slideToScroll); i++) {
            html += `<li data-part="${i}"><button></button></li>`;
        }

        dotesSelector.innerHTML = html;
        dotesSelector.querySelector('button').classList.add('active');
    }

    function calcImgWidth() {
        let widthWrap = wrapper.clientWidth,
            parentMarginRight = parseInt(styleParentImg.marginRight);

        imgWidthAvg = Math.ceil(widthWrap / slideToShow);
        imgWidthAvg = imgWidthAvg - parentMarginRight;

        totalWidth = (imgWidthAvg + parentMarginRight) * countImg;

        allImages.forEach(
            function (item, index, array) {
                item.style.width = imgWidthAvg + 'px';
            });
    }

    function initNavEvent() {
        buttonNext.addEventListener('click', moveCarouselEvent);
        buttonPrev.addEventListener('click', moveCarouselEvent);

        dotesSelector.querySelectorAll('button')
            .forEach(function (item, inddex, array) {
                item.addEventListener('click', dotesNavigation);
            });
    }

    function dotesNavigation() {
        firstElm = this.parentElement.dataset.part * slideToScroll;

        dotesSelector.querySelectorAll('button')
            .forEach(function (item, inddex, array) {
                item.classList.remove('active');
            });
        this.classList.add('active');

        moveCarousel();
    }

    function moveCarousel() {
        if (firstElm === 0) {
            translateX = 0;
        } else {
            let imgTohide = 0;

            for (let i = 0; i < firstElm; i++) {
                imgTohide += parseInt(allImages[i].style.width);
                imgTohide += parseInt(styleParentImg.marginRight);
            }

            imgTohide *= -1;
            translateX = imgTohide;
        }

        wrapperImages.style.transform = `translateX(${translateX}px)`;
    }

    function moveCarouselEvent(event) {

        let imgToScroll = (event.target.classList.contains('carousel-nav-prev')) ?
            slideToScroll * (-1) :
            slideToScroll;

        firstElm = firstElm + imgToScroll;

        if (firstElm < 0) {

            let partSlide = Math.floor(countImg / slideToScroll);

            if (slideToScroll * partSlide === countImg) {
                firstElm = countImg - slideToScroll;
            } else {
                firstElm = slideToScroll * partSlide;
            }
        }

        firstElm = (firstElm > countImg) ? 0 : firstElm;

        moveCarousel();

        dotesSelector.querySelectorAll('button')
            .forEach(function (item, inddex, array) {
                if (item.parentElement.dataset.part == firstElm / slideToShow) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
    }

    const init = function () {
        if (!options || !options.id) {
            return null;
        }

        setParams();
        setSlideParamByScreen();
        calcImgWidth();

        drawDotes();

        initNavEvent();

        wrapperImages.style.width = totalWidth + 'px';
        wrapperImages.style.transform = `translateX(${translateX}px)`;
        wrapperImages.style.transition = `transform ${speed}ms ease`;

        window.addEventListener('resize', resizeScreen);
    }();
}

