// set up variables for elements

const getElem = function (selector) {
  return document.querySelector(selector);
};
const getAllElem = function (selector) {
  return document.querySelectorAll(selector);
};
// get class for elements
const getCls = function (element) {
  return element.getAttribute('class');
};
// set class for elements
const setCls = function (element, cls) {
  return element.setAttribute('class', cls);
};

// add class to elements
const addCls = function (element, cls) {
  const baseCls = getCls(element);
  if (baseCls.indexOf(cls) === -1) {
    setCls(element, baseCls + ' ' + cls); // add space in between classes
  }
  return;
};
// remove class for elements
const delCls = function (element, cls) {
  const baseCls = getCls(element);
  if (baseCls.indexOf(cls) > -1) {
    setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
  }
  return;
};

const screenAnimateElements = {
  '.screen-1': [
    '.screen-1__heading',
    '.screen-1__phone',
    '.screen-1__shadow',
  ],
  '.screen-2': [
    '.screen-2__heading',
    '.screen-2__subheading',
    '.screen-2__phone',
    '.screen-2__point_i_1',
    '.screen-2__point_i_2',
    '.screen-2__point_i_3',
  ],
  '.screen-3': [
    '.screen-3__heading',
    '.screen-3__phone',
    '.screen-3__subheading',
    '.screen-3__features',
  ],
  '.screen-4': [
    '.screen-4__heading',
    '.screen-4__subheading',
    '.screen-4__type__item_i_1',
    '.screen-4__type__item_i_2',
    '.screen-4__type__item_i_3',
    '.screen-4__type__item_i_4',
  ],
  '.screen-5': [
    '.screen-5__heading',
    '.screen-5__subheading',
    '.screen-5__bg',
  ]

};

function setScreenAnimateInit(screenCls) {
  const screen = document.querySelector(screenCls); // get the screen element
  const animateElements = screenAnimateElements[screenCls]; // get the elements for animation
    for(let i=0; i<animateElements.length; i++){
      const element = document.querySelector(animateElements[i]);
      const baseCls = element.getAttribute('class');
      element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
    }
}

// Step1: initialization
window.onload = function () {

  //  set init for all elements
  for(let k in screenAnimateElements){
    if(k === '.screen-1'){
      continue;
    }
    setScreenAnimateInit(k);
  }
  // console.log('onload')

};
// step2：set the scroll bar
function playScreenAnimateDone(screenCls){
  const screen = document.querySelector(screenCls); // get the screen element
  const animateElements = screenAnimateElements[screenCls]; // get all the elements need to animate
    for(let i=0; i<animateElements.length; i++){
      const element = document.querySelector(animateElements[i]);
      const baseCls = element.getAttribute('class');
      element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
    }
}
//  Step2-sub：initialize section 1 animation（1. skipScreenAnimateInit 2.skip init ）

setTimeout(function(){playScreenAnimateDone('.screen-1');},100);


const navItems = getAllElem('.header__nav-item');
const outLineItems = getAllElem('.outline__item');


// 滑动门
const navTip = getElem('.header__nav-tip');
const switchNavItemsActive = function (idx) {
  let i;
  for (i = 0; i < navItems.length; i++) {
    // console.log(navItems[i]);
    delCls(navItems[i], 'header__nav-item_status_active');
    navTip.style.left = 0 + 'px';

  }
  addCls(navItems[idx], 'header__nav-item_status_active');
  navTip.style.left = (idx * 70) + 'px';


  for (i = 0; i < outLineItems.length; i++) {
    delCls(outLineItems[i], 'outline__item_status_active');
  }
  addCls(outLineItems[idx], 'outline__item_status_active');
};

window.onscroll = function () {

  var top  = document.body.scrollTop;

  //   2.1 nav bar appearance change
  if( top > 100 ){
      addCls( getElem('.header'),'header_status_black' );
  }else{
      delCls( getElem('.header'),'header_status_black' );

      switchNavItemsActive(0);
  }

  if(top > 800 ){
      addCls( getElem('.outline'),'outline_status_in' );}
  // }else{
  //     delCls( getElem('.outline'),'outline_status_in' );
  // }

  if( top > ( 800 - 100) ){
    playScreenAnimateDone('.screen-2');

    switchNavItemsActive(1);
  }
  if( top > ( 800*2 - 100) ){
    playScreenAnimateDone('.screen-3');
    switchNavItemsActive(2); 
  }
  if( top > ( 800*3 - 100) ){
    playScreenAnimateDone('.screen-4');
    switchNavItemsActive(3); 
  }
  if( top > ( 800*4 - 100) ){
    playScreenAnimateDone('.screen-5');
    switchNavItemsActive(4); 
  }
};

//  Step 3 Binding of the main navigation bar and the floating shortcut navigation

// 3.1 main navigation bar - jump to sections

const setNavJump = function (i, lib) {
  const elem = lib[i];
  elem.onclick = function () {
    document.body.scrollTop = i * 800 + 1;
  }
};

let i;
for(i = 0; i<navItems.length; i++){
  setNavJump(i,navItems);
}
// 3.2  floating nav - jump to sections

for(i = 0; i<outLineItems.length; i++){
  setNavJump(i,outLineItems);
}
// 3.3 two-way binding，back to onscrollTop（move navIntes、outLineItems to top）、add clear css function
const setTip = function (idx, lib) {


  lib[idx].onmouseover = function () {
    // console.log(this, idx);
    navTip.style.left = (idx * 76) + 'px';
  };
  let currentIdx = 0;
  lib[idx].onmouseout = function () {
    // console.log(currentIdx);
    for (let i = 0; i < lib.length; i++) {
      if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
        currentIdx = i;
        break;
      }
    }
    navTip.style.left = (currentIdx * 76) + 'px';
  }

};

for(i = 0; i<navItems.length; i++){
  setTip(i,navItems);
}
