// import { toggleClass, removeClass, addClass } from './functions';

export default class Badge {
    constructor(input, post, brand, printBtn) {
        this.inputName = document.querySelector(input);
        this.post = document.querySelector(post);
        this.brand = document.querySelector(brand);
        this.printBtn = document.querySelector(printBtn);

        this.name = '';
        this.posName = '';
        this.color = '#2D2D2D';
        this.borderColor = '#E10718';
        this.defaultColor = '#2D2D2D';
        this.defaultName = 'Ваше имя';

        this.nameNodes = document.querySelectorAll('.badge__name');
        this.fieldNodes = document.querySelectorAll('.builder__field-name');
        this.listNodes = document.querySelectorAll('.list');
        this.resNameNode = document.querySelector('.preview .badge__name');
        this.posNodes = document.querySelectorAll('.badge__pos');
        this.logoNodes = document.querySelectorAll('.badge__image img');
        this.borderNodes = document.querySelectorAll('.badge__bottom');

        this.printNode = document.querySelector('.print');
        this.printNameNodes = this.printNode.querySelectorAll('.badge__name');
        this.printLogoNodes = this.printNode.querySelectorAll('.badge__image img');
        // this.printBorder = this.print.querySelector('.badge__bottom')

        this.currentList = null;
        this.posColor = '#2D2D2D';

        try {
            this.init();
        } catch (e) {
            throw e;
        }
    }
    init() {
        this.setName();
        this.setPost();
    }
    setName() {
        this.inputName.addEventListener('input', e => {
            this.name = e.target.value.trim();

            if (this.name) {
                this.nameNodes.forEach(element => {
                    element.textContent = this.name;
                    element.style.color = this.color;
                });
            } else {
                this.nameNodes.forEach(element => {
                    element.textContent = this.defaultName;
                    element.style.color = null;
                });
            }

            if (this.name.length > 8) {
                this.resNameNode.style.fontSize = '40px';
                this.printNameNodes.forEach(element => {
                    element.style.fontSize = '30pt';
                });
            } else {
                this.resNameNode.style.fontSize = null;
                this.printNameNodes.forEach(element => {
                    element.style.fontSize = null;
                });
            }

            if (this.allowPrint()) {
                this.setPrint();
            } else {
                this.printBtn.style.opacity = 0.5;
                this.printBtn.removeEventListener('click', this.print);
            }
        });
    }
    setPost() {
        this.fieldNodes.forEach(element => {
            element.addEventListener('click', () => {
                element.classList.toggle('active');
                this.currentList = element;
            });
        });
        this.handleList();
    }
    handleList() {
        this.listNodes.forEach(element => {
            element.addEventListener('click', e => {
                const item = e.target;
                const titleNode = this.currentList.parentNode.querySelector('.name');
                titleNode.dataset.value = item.textContent;
                item.dataset.color ? (this.color = titleNode.dataset.color) : '';
                this.posName = item.textContent;
                titleNode.textContent = this.posName;

                if (this.currentList.classList.contains('post')) {
                    this.posNodes.forEach(element => {
                        element.textContent = this.posName;
                        element.style.color = this.posColor;
                    });
                    if (item.dataset.spec === '1') {
                        this.brand.classList.add('brand__active');
                    } else {
                        this.brand.classList.remove('brand__active');
                    }
                }

                if (item.dataset.logo) {
                    this.logoNodes.forEach(element => {
                        element.src = `../img/${item.dataset.logo}.svg`;
                    });
                    this.color = item.dataset.color;
                    this.borderColor = item.dataset.border
                    console.log(this.color);

                    if (this.name) {
                        this.nameNodes.forEach(element => {
                            element.style.color = this.color;
                        });
                    }
                    this.borderNodes.forEach(element => {
                        element.style.background = this.borderColor;
                    });
                }

                if (this.allowPrint()) {
                    this.setPrint();
                } else {
                    this.printBtn.style.opacity = 0.5;
                    this.printBtn.removeEventListener('click', this.print);
                }
            });
        });
    }

    print() {
        window.print();
    }
    setPrint() {
        this.printBtn.style.opacity = 1;
        this.printBtn.addEventListener('click', this.print);
    }
    allowPrint() {
        if (this.brand.classList.contains('brand__active')) {
            if (this.name && this.post.querySelector('.name').dataset.value && this.brand.querySelector('.name').dataset.value) {
                return true;
            }
        } else {
            if (this.name && this.post.querySelector('.name').dataset.value) {
                return true;
            }
        }
        return false;
    }
}

// export default class Badge {
//     constructor(input, post, brand, printBtn) {
//         this.inputName = document.querySelector(input);
//         this.post = document.querySelector(post);
//         this.brand = document.querySelector(brand);
//         this.printBtn = document.querySelector(printBtn)

//         this.name = ''
//         this.posName = ''
//         this.names = document.querySelectorAll('.badge__name');
//         this.field = document.querySelectorAll('.builder__field-name');
//         this.list = document.querySelectorAll('.list');
//         this.resNode = document.querySelector('.preview .badge__name');
//         this.resPost = document.querySelectorAll('.badge__pos');
//         this.resLogo = document.querySelectorAll('.badge__image img');
//         this.resBorder = document.querySelectorAll('.badge__bottom');

//         this.printNode = document.querySelector('.print');
//         this.printNameNode = this.printNode.querySelectorAll('.badge__name');
//         this.printLogo = this.printNode.querySelectorAll('.badge__image img');
//         // this.printBorder = this.print.querySelector('.badge__bottom')

//         this.currentList = null;

//         try {
//             this.init();
//         } catch (e) {
//             throw e;
//         }
//     }
//     init() {
//         this.setName();
//         this.setPost();
//     }
//     setName() {
//         this.inputName.addEventListener('input', () => {
//             this.name = this.inputName.value.trim();
//             if (this.name) {
//                 this.names.forEach(element => {
//                     element.textContent = this.name;
//                     element.style.color = '#2D2D2D'
//                 });
//             } else {
//                 this.names.forEach(element => {
//                     element.textContent = 'Ваше имя';
//                     element.style.color = null
//                 });
//             }

//             if (this.name.length > 8) {
//                 this.resNode.style.fontSize = '40px';
//                 this.printNameNode.forEach(element => {
//                     element.style.fontSize = '30pt';
//                 });
//             } else {
//                 this.resNode.style.fontSize = '48px ';
//                 this.printNameNode.forEach(element => {
//                     element.style.fontSize = '35pt';
//                 });
//             }

//             if (this.allowPrint()){
//                 this.setPrint()
//             } else {
//                 this.printBtn.style.opacity = 0.5
//                 this.printBtn.removeEventListener('click', this.print)
//             }
//         });
//     }
//     setPost() {
//         this.field.forEach(element => {
//             element.addEventListener('click', () => {
//                 element.classList.toggle('active');
//                 this.currentList = element;
//             });
//         });
//         this.list.forEach(element => {
//             element.addEventListener('click', e => {
//                 const item = e.target;
//                 const posNode = this.currentList.parentNode.querySelector('.name');
//                 this.posName = item.textContent;
//                 posNode.textContent = this.posName;
//                 posNode.dataset.value = this.posName
//                 posNode.dataset.color = this.posName
//                 if (this.currentList.classList.contains('post')){
//                     this.resPost.forEach(element => {
//                         element.textContent = this.posName;
//                         element.style.color = '#2D2D2D'
//                     });
//                 }
//                 if (item.dataset.spec == 1) {
//                     this.brand.classList.add('brand__active');
//                 } else {
//                     if (item.dataset.spec == 0) {
//                         this.brand.classList.remove('brand__active');
//                     }
//                 }

//                 if (item.dataset.logo) {
//                     this.resLogo.forEach(element => {
//                         element.src = `/img/${item.dataset.logo}${item.dataset.ext}`;
//                     });
//                     this.printLogo.forEach(element => {
//                         element.src = `/img/${item.dataset.logo}@print${item.dataset.ext}`;
//                     });
//                     if (this.name){
//                         this.resNode.style = `color: ${item.dataset.color}`;
//                         this.printNameNode.forEach(element => {
//                             element.style = `color: ${item.dataset.color}`;
//                         });
//                     }
//                     this.resBorder.forEach(element => {
//                         element.style = `background: ${item.dataset.color}`;
//                     });
//                 } else {
//                     this.resLogo.forEach(element => {
//                         element.src = `/img/default.svg`;
//                     });
//                     this.printLogo.forEach(element => {
//                         element.src = `/img/default@print.svg`;
//                     });
//                     if (this.name){
//                         this.resNode.style.color = '#2D2D2D'
//                         this.printNameNode.forEach(element => {
//                             element.style.color = '#2D2D2D'
//                         });

//                     }
//                     // this.resBorder.forEach(element => {
//                     //     element.removeAttribute('style');
//                     // });
//                 }

//                 if (this.allowPrint()){
//                     this.setPrint()
//                 } else {
//                     this.printBtn.style.opacity = 0.5
//                     this.printBtn.removeEventListener('click', this.print)
//                 }
//             });
//         });
//     }
//     print(){
//         window.print()
//     }
//     setPrint() {
//         this.printBtn.style.opacity = 1
//         this.printBtn.addEventListener('click', this.print)
//     }
//     allowPrint(){
//         if (this.brand.classList.contains('brand__active')){
//             if (this.name && this.post.querySelector('.name').dataset.value && this.brand.querySelector('.name').dataset.value) {
//                 return true
//             }
//         } else {
//             if (this.name && this.post.querySelector('.name').dataset.value ) {
//                 return true
//             }
//         }
//         return false
//     }
// }
