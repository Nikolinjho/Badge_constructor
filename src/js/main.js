import ElementQueries from 'css-element-queries/src/ElementQueries';

// import {toggleClass, hasClass, removeClass, addClass, toggleDisplay } from "./components/functions";
import badgeConstructor from "./components/badgeConstructor";

window.addEventListener('load', () => {
    // медиа выражения на основе ширины элементов, а не окна
    ElementQueries.init();

 
    new badgeConstructor();  

})

