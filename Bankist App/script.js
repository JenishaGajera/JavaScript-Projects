const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container'); // Assuming one container
const tabsContent = document.querySelectorAll('.operations__content'); // Assuming multiple content elements
const nav = document.querySelector('.nav');
const Section1 = document.querySelector('#section--1');


///////////////////////////////////////
// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  // Assuming all content elements have the 'operations__content' class
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  const activeContent = document.querySelector(`.operations__content--${clicked.dataset.tab}`);
  if (activeContent) { // Handle potential case where content element doesn't exist
    activeContent.classList.add('operations__content--active');
  }
});


///////////////////////////////////////
// Menu Fade Animation


//Dried code for these both EventHandlers
const handleHover = function(e, opacity){
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    //console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(sl => {
      if(sl !== link) sl.style.opacity = this;
    });  
    logo.style.opacity = this;
  }
};

//Passing arguments into handlers
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


/*
nav.addEventListener('mouseover', function (e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    //console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(sl => {
      if(sl !== link) sl.style.opacity = 0.5;
    });  
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout',function (e){
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    //console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(sl => {
      if(sl !== link) sl.style.opacity = 1;
    });  
    logo.style.opacity = 1;
  }
});*/

///////////////////////////////////////
// Sticky Navigation

/*const initialCoords = Section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function(e){
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky');
});*/

///////////////////////////////////////
// Sticky Navigation : Intersection Observer API
/*const obsCallback = function(entries, Observer){
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root : null,
  threshold: 0.1,
};

const Observer = new IntersectionObserver(obsCallback, obsOptions);
Observer.observ(Section1); */

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function(entries) {
  const [entry] = entries;
  console.log(entry);  // For debugging purposes

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,  // Observe relative to viewport
  threshold: 0.1, // Trigger callback when 10% of element is visible
  rootMargin: `-${navHeight}px`, // Adjust viewport for earlier/later triggering (experimental)
});

headerObserver.observe(header); // This line has the typo

///////////////////////////////////////
// Reveal Sections

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, Observer) {
  const [entry] = entries;
  console.log(entry);


  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  Observer.unobserve(entry.target);

};

const sectionObserver = new IntersectionObserver(revealSection, {
  root : null,
  threshold : 0.15,
});

allSections.forEach(function (section){
   sectionObserver.observe(section);
   section.classList.add('section--hidden');
});

///////////////////////////////////////
// Lazy Loading Images

const imageTargets = document.querySelectorAll('img[data-src]');

const loadingImg = function(entries, observer) {
  entries.forEach(entry => {

    if (!IntersectionObserver) return;

    // Replace the src attribute with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
  });
};

const imgObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
}); 

imageTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider componenets part-1

/* const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const maxSlide = slides.length;


//Slider
const Slider = document.querySelector('.slider');
Slider.style.transform = 'scale(0.4) translateX(-800px)';
Slider.style.overflow = 'visible';


//s is a current slide, i is an index which is start from 0
slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);
//0%, 100%, 200%, 300%

//Next Slide
btnRight.addEventListener('click', function () {
  if(curSlide === maxSlide - 1){
    curSlide = 0;
  }else
  {
    curSlide++;
  }
  
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
}); */
//curslide =1 : -100%, 0%, 100%, 200%


//Lets dry this code Slider Code
const slider = function () {
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlide = slides.length;


//Slider
//const Slider = document.querySelector('.slider');
//Slider.style.transform = 'scale(0.4) translateX(-800px)';
//Slider.style.overflow = 'visible';

//s is a current slide, i is an index which is start from 0
slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);
//0%, 100%, 200%, 300%

//Functions
const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML('beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot')
          .forEach(dot => dot.classList.remove('dots__dot--active'));
          document.querySelector(`.dots__dot[data-slide="${slide}"]`)
          .classList.add('dots__dot--active');
};


const gotoSlide = function(slide){
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );  
};


//gotoSlide(0);
//Next Slide
const nextSlide = function() {
  if(curSlide === maxSlide - 1){
    curSlide = 0;
  }else
  {
    curSlide++;
  }
  gotoSlide(curSlide);
activateDot(curSlide);
};

//Prev Slide
const prevSlide = function() {
  if(curSlide === 0)
  {
    curSlide = maxSlide - 1;
  }else{
    curSlide--;
  }
  gotoSlide(curSlide);
  activateDot(curSlide);
};


const init = function(){
  gotoSlide(0);
  createDots()
  activateDot(0);

}
init()



//Event Handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);


document.addEventListener('keydown', function (e) {
  if(e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotsContainer.addEventListener('click', function (e){
  if(e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoSlide(slide); 
    activateDot(slide);
  }
});
}
slider();












