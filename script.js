'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

// Functions

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Handling Events

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({
    behavior: 'auto',
  });
});

///////////////////////////////////////
// !Page Navigation

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('data-ref');
//     const targetSection = document.querySelector(id);

//     targetSection.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   } else {
//     false;
//   }
// });

//todo My Soulution
const linksHolder = document.querySelector('.nav__links');
linksHolder.addEventListener('click', function (e) {
  // Avoiding Refresh
  e.preventDefault();

  // Gaurd Clause
  if (!e.target.classList.contains('nav__link')) return false;

  // Main Reason
  const id = e.target.dataset.ref.slice(1);

  let targetSection = document.getElementById(id);

  targetSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

///////////////////////////////////////
//! Tabbed Component

// const tabbedComponent = function (e) {
//   const clicked = e.target.closest('.operations__tab');

//   // Guard Clause
//   if (!clicked) return;

//   //Removing active from all tabs
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));

//   //Activate tab
//   clicked.classList.add('operations__tab--active');

//   //Select the matched content area
//   const contentArea = document.querySelector(
//     `.operations__content--${clicked.dataset.tab}`
//   );

//   //Removing active from all content tabs
//   tabsContent.forEach(c => c.classList.remove('operations__content--active'));

//   //Activate content area
//   contentArea.classList.add('operations__content--active');
// };

// tabsContainer.addEventListener('click', tabbedComponent);

// tabs = document.querySelectorAll('.operations__tab');
// tabsContainer = document.querySelector('.operations__tab-container');
// tabsContent = document.querySelectorAll('.operations__content');
// todo My Solution

// Adding Active Class To The First Elements (Btn,Content)
tabs[0].classList.add('operations__tab--active');
tabsContent[0].classList.add('operations__content--active');

const tabbedComponentHandle = function (e) {
  const clickedTab = e.target.closest('.operations__tab');
  // Guard Clause
  if (!clickedTab) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');

  const tabNum = clickedTab.dataset.tab;
  const contentArea = document.querySelector(`.operations__content--${tabNum}`);
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  contentArea.classList.add('operations__content--active');
};
tabsContainer.addEventListener('click', tabbedComponentHandle);
///////////////////////////////////////
// !Menu fade animations (183)

// const handleHover = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
// const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => (el !== link ? (el.style.opacity = this) : false));

//     logo.style.opacity = this;
//   }
// };
// //Passing an "argument" into handler
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));
//todo: My Solution

const handleHover = function (e) {
  const link = e.target;
  if (!link.classList.contains('nav__link')) return;
  const allLinks = nav.querySelectorAll('.nav__link');
  const logo = document.getElementById('logo');
  allLinks.forEach(el => (el !== link ? (el.style.opacity = this) : false));
  logo.style.opacity = this;
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// !Sticky navigation bar

// const header = document.querySelector('.header');
// const navHeight = nav.getBoundingClientRect().height;
// const stickyNav = function (entries) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,(
// });

// headerObserver.observe(header);
//? My Solution

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const observerCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(
  observerCallback,
  observerOptions
);
headerObserver.observe(header);

///////////////////////////////////////
// !Reveal Sections lecture (186)
// const allSections = document.querySelectorAll('.section');

// const revealSection = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove('section--hidden');
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(sec => {
//   sectionObserver.observe(sec);
//   sec.classList.add('section--hidden');
// });
//?  My Solution
const allSections = document.querySelectorAll('.section');
const sectionObserverCallback = function (entries, observe) {
  const [entry] = entries;
  // Gaurd Clasue
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};

const sectionObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15,
};

const sectionsObserver = new IntersectionObserver(
  sectionObserverCallback,
  sectionObserverOptions
);

allSections.forEach(sec => {
  sectionsObserver.observe(sec);
  sec.classList.add('section--hidden');
});
///////////////////////////////////////
// !Lazy Loading Images

// const imgTargets = document.querySelectorAll('.features__img');

// const loadImg = function (entries, observer) {
//   const [entry] = entries;
//   //Gaurd clause
//   if (!entry.isIntersecting) return;
//   //Replace the Source
//   entry.target.src = entry.target.dataset.src;

//   //End observing
//   observer.unobserve(entry.target);

//   entry.target.addEventListener('load', function (e) {
//     //Remove lazy class
//     entry.target.classList.remove('lazy-img');
//   });
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   // SO the user will not NOTICE the lazy loading
//   rootMargin: '200px',
// });

// imgTargets.forEach(img => imgObserver.observe(img));
//? My Solution
const imgTargets = document.querySelectorAll('.features__img');
const imgsObserverCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  observer.unobserve(entry.target);
  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });
};
const imgObserverOption = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};
const imgsObserver = new IntersectionObserver(
  imgsObserverCallback,
  imgObserverOption
);
imgTargets.forEach(img => {
  imgsObserver.observe(img);
});

///////////////////////////////////////
//  Slider Component (188,189)
const slider = function () {
  //Holding Variables
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  const maxSlide = slides.length;
  let curSlide = 0;

  //Nested Functions
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `
      <button class="dots__dot" data-slide="${i}"></button>
      `
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //EventHandlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      btnRight.click();
    } else if (e.key === 'ArrowLeft') {
      btnLeft.click();
    }
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
