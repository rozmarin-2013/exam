(() => {
    window.addEventListener('load', () => {

        let carousel = new Carousel({
            id: 'carousel1',
            slideToShow: 5,
            slideToScroll: 5,
            speed: 1000,
        });

        let popupImg = new PopupImg({
            id: 'popupImg1'
        })
    })
})();