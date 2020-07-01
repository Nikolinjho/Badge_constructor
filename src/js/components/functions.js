
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

function toggleDisplay(element) {
    if (getComputedStyle(element, null).display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}


function toggleClass(el, className) {
    el.classList.toggle(className);
}

export {toggleClass, hasClass, removeClass, addClass, toggleDisplay};