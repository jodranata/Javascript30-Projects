//rules
//overall) scroll through the web, when we encounter image, it will slide in
//slide in >> is adding a css class called active, where opacity changed to 1 and and translateX(0);
//1) we need to get the image DOM;
//2) Know when/where to add the class
    //2.1) window.scrollY value to know the position of our scroll >> user scroll
    //2.2)window.innerHeight value to know the position of our image >> image in the web
    //2.3) image.height value to know how much of the image need to be scrolled/passed before we add the class
    //2.4) slidePos = (window.scrollY + window.innerHeight) - image.height/2 (halfway the image we want to add the classes)
    //2.5 if when we scroll pass halfway the image(slidePos) is bigger than the image.offsetTop(the top of the image based on website position) meaning we indeed scrolled past it, it will add the "active" class
//3) Know When/where to remove the class
    //3.1) remove "active" class when we have passed the bottom of the image
    //3.2)imageBottom = image.offsetTop + imange.height; (browse on offsetTop property)
    //3.3) if window.scrollY (if we scroll) > imageBottom (passed the bottom of the image) we'll remove "active" class


const slidingImages = document.querySelectorAll('.content img');
const contentContainer = document.querySelectorAll('.content');

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
function slideImage(e) {
    slidingImages.forEach(image => {
        //position image based on viewport
        const imagePosTop = image.getBoundingClientRect().top; 
        const imagePosBottom = image.getBoundingClientRect().bottom;
        //slide in position >> at half of the image based on viewPort
        const slidePos = (imagePosTop + window.scrollY) - (image.height*1.8); 
        //condition of slide in
        const isHalfWay = window.scrollY > slidePos; 
        const isNotScrolledPassed = window.scrollY < (imagePosBottom + window.scrollY - image.height/2);
        console.log(`
        scroll position: ${window.scrollY}
        scroll slide: ${slidePos}
        scroll remove: ${(imagePosBottom + window.scrollY - image.height/2)}
        image pos top: ${imagePosTop}
        `);
        
        if (isHalfWay && isNotScrolledPassed) {
            image.classList.add('active');
        } else {
            image.classList.remove('active');
        }
        
    });
}
window.addEventListener('scroll', debounce(slideImage));


// //scrolled past half of the image, it will start sliding
// const slidePos = (window.scrollY + window.innerHeight) - image.height/2;
// //bottom of the image.
// const imageBottom = image.offsetTop + image.height + window.innerHeight;
// console.log(window.scrollY);
// //slide conditon
// const isHalfWay = slidePos > image.offsetTop; //scrolled halfway the image
// const isNotScrolledPassed = (window.scrollY - window.innerHeight) < imageBottom; //hasn't scrolled passed the image
// if (isHalfWay && isNotScrolledPassed) {
//     image.classList.add('active');
// } else {
//     image.classList.remove('active');
// }