import { toggleClass, removeClass, addClass } from "./functions";

export default function badgeConstructor() {
    const input = document.querySelector(".name"),
        posField = document.querySelector('.post'),
        postName = document.querySelector('.post-name'),
        postListItems = document.querySelectorAll('.post .list__item'),
        brandField = document.querySelector('.brand'),
        brandName = document.querySelector('.brand-name'),
        brandListItems = document.querySelectorAll('.brand .list__item'),
        list = document.querySelector('.list'),
        badge = document.querySelector('.badge'),
        badgePost = document.querySelector('.badge__pos'),
        badgeName = document.querySelector('.badge__name'),
        printBtn = document.querySelector('.print')

    let inputFlag = false,
        postFlag = false,
        brandFlag = false;



    try {
        init();
    } catch (error) {
        console.error(error);
    }

    function init() {
        inputName().then(() => {
            inputFlag = true;
            console.log(inputFlag)
        })
        setPost().then(() => {
            postFlag = true;
            console.log(postFlag)
        });
        setBrand().then(() => {
            brandFlag = true;
            console.log(brandFlag)
        });
    }

    function inputName() {
        return new Promise((success, error) => {
            input.addEventListener('input', () => {
                let text = input.value.trim();
                !(text.trim() === 0) ? inputFlag = true : inputFlag = false;
                badgeName.textContent = text;
                btnStyle(printBtn);
                success()

            })
        })

    }

    function setPost() {
        return new Promise((success, error) => {
            posField.onclick = () => {
                toggleClass(posField, 'active');
                setItem(posField, postListItems, postName, badgePost, badge)
                btnStyle(printBtn);
                success()
            }
        })
    }

    function setBrand() {
        return new Promise((success, error) => {
            brandField.onclick = () => {
                toggleClass(brandField, 'active');
                setItem(brandField, brandListItems, brandName, badgePost, badge)
                // brandFlag = true;
                btnStyle(printBtn);
                success()
            }
        })
    }



    function btnStyle(btn) {
        if (inputFlag && postFlag && brandFlag) {
            btn.style.opacity = '1';
            btn.onclick = () => {
                window.print()
            }
        }
    }

    function setItem(parent, listItems, label, badgeLabel, badge, {
        brand = '.brand',
        brandActiveClass = 'brand__active',
        activeClass = 'list__item-active',
        listItemActiveClass = 'list .list__item-active',
        value = '3'
    } = {}) {
        listItems.forEach((el, index) => {
            el.onclick = () => {
                let self = el;
                let name = self.textContent;
                let lastActive = parent.querySelector(`.${activeClass}`);
                if (self.dataset.value) {
                    badgeLabel.textContent = name;
                    if (!document.querySelector(brand).className.includes(brandActiveClass) && self.dataset.value === value) {
                        addClass(document.querySelector(brand), brandActiveClass);
                    } else {
                        if (document.querySelector(brand).className.includes(brandActiveClass)) {
                            removeClass(document.querySelector(brand), brandActiveClass)
                        }
                    }
                }
                if (self.dataset.logo) {
                    let currentClass = badge.className;
                    badge.className = currentClass.replace(currentClass, `badge ${self.dataset.logo}`)
                }
                label.textContent = name;
                if (lastActive) {
                    removeClass(lastActive, activeClass);
                }
                addClass(self, activeClass);
            }
        })
    }

}