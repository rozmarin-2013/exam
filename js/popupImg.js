const PopupImg = function (options) {
    function getPopUpWrapper() {
        let popUpWrapper = document.createElement('div');
        popUpWrapper.classList.add('popup-wrapper');
        popUpWrapper.innerHTML = `
            <div class="popup">
                <div class="popup-header">
                    <div class="container">
                        <div class="popup-header-counter">
                        </div>
                        <div class="popup-header-close">
                            <button class="popup-header-close-button">x</button>
                        </div>
                    </div>
                </div>
                
                <div class="popup-container">
                    <div class="container">
                        <div class="popup-container-img">
                        </div>
                    </div>
                </div>
                <div class="popup-button-section">
                    <div class="container">
                        <button class="popup-button popup-button-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40"><defs><path id="adview_prev_slide_icon" d="M15.097 27.097l7.084-7-7.084-7.194L17 11l9 9.097L17 29z"></path></defs><g fill="none" fill-rule="evenodd" transform="matrix(-1 0 0 1 40 0)"><rect width="40" height="40" fill="#000" fill-opacity="0.4" rx="4" style="mix-blend-mode: multiply;"></rect><use fill="#FFF" xlink:href="#adview_prev_slide_icon"></use></g></svg></button>
                        <button class="popup-button popup-button-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40"><defs><path id="adview_next_icon" d="M15.097 27.097l7.084-7-7.084-7.194L17 11l9 9.097L17 29z"></path></defs><g fill="none" fill-rule="evenodd"><rect width="40" height="40" fill="#000" fill-opacity="0.4" rx="4" style="mix-blend-mode: multiply;"></rect><use fill="#FFF" xlink:href="#adview_next_icon"></use></g></svg></button>
                   </div>
                </div>
            </div>
        `;
        return popUpWrapper;
    }

    function movieImg(event) {
        let indexShowImg = this.dataset.siblInd;
        imgContainer.style.opacity = '0';

        setTimeout(() => {
            Array.from(images).find(function (item, index, array) {
                if (item.dataset.ind == indexShowImg) {
                    imgContainer.innerHTML = '';
                    item.click();
                    return true;
                }
            });
        }, 500)
    }

    function close() {
        popUpWrapper.style.display = 'none';
        imgContainer.innerHTML = '';
    }

    function imgLoad(event) {
        naturalImgWidth = this.width;
        naturalImgHeight = this.height;
    }

    function openPopup(event) {
        let cloneImg = this.cloneNode(true);

        popUpWrapper.style.display = 'block';

        popUpWrapper.querySelector('.popup-header-counter').innerHTML = `${+this.dataset.ind + 1}/${images.length}`;

        cloneImg.style.width = '';
        cloneImg.addEventListener('load', imgLoad);
        imgContainer.append(cloneImg);

        let countImg = images.length;

        let prev = +this.dataset.ind - 1
        prevButton.dataset.siblInd = (prev < 0) ? (countImg - 1) : prev;

        let next = +this.dataset.ind + 1;
        nextButton.dataset.siblInd = (next >= countImg) ? 0 : next

        setTimeout(function () {
            let widthContainer = imgContainer.clientWidth,
                heightScreen = document.body.clientHeight,
                ratio = 0.8,
                width = naturalImgWidth,
                height = naturalImgHeight;

            if (naturalImgHeight > heightScreen) {
                height = heightScreen * ratio + 'px';
                width = 'auto';
            } else if (naturalImgWidth > widthContainer) {
                width = widthContainer * ratio + 'px';
                height = 'auto';
            }

            cloneImg.style.width = width;
            cloneImg.style.height = height;

            imgContainer.style.marginTop = '5%';
            imgContainer.style.opacity = '1';
        }, 100);
    }

    function initEventsClick() {
        images.forEach(function (item, index, array) {
            item.addEventListener('click', openPopup);
            item.dataset.ind = index;
        })

        nextButton.addEventListener('click', movieImg)
        prevButton.addEventListener('click', movieImg);

        popUpWrapper.querySelector('.popup-header-close-button').addEventListener('click', close);
    }

    let id,
        imgWrapper,
        popUpWrapper = getPopUpWrapper(),
        nextButton = popUpWrapper.querySelector('.popup-button-next'),
        prevButton = popUpWrapper.querySelector('.popup-button-prev'),
        imgContainer = popUpWrapper.querySelector('.popup-container-img'),
        images = [],
        naturalImgWidth = null,
        naturalImgHeight = null;

    function init(options) {

        if (!options || !options.id) {
            return null;
        }
        id = options.id;

        imgWrapper = document.getElementById(id);
        images = imgWrapper.querySelectorAll('img');

        document.body.appendChild(popUpWrapper);

        initEventsClick();
    }

    init(options);
}