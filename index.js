class Slide {
  constructor(img, caption){
    this.img = img;
    this.caption = caption;
    this.index;
  }

setIndex(value){
  this.index = value
}

getIndex(){
  return this.index;
}

createSlide(){
  return `<div class="slides fade"><img src="${this.img}" alt=""><div class="text">${this.caption}</div></div>`
}
createDot(fn){
  const dot = document.createElement('span');
  dot.className = 'dot';
  dot.dataset.index = this.index;
  dot.addEventListener('click', fn)
  return dot;
}
}

class Slider {
  constructor(){
    this.slideIndex;
    this.slides = [];
    this.container = document.createElement('div');
    this.slidesall = document.createElement('div');
    this.prev = document.createElement('a');
    this.next = document.createElement('a');
    this.dotcontainer = document.createElement('div');
    (()=>{
      this.container.className = 'slider-container';
      this.slidesall.className = 'slides-all';
      this.prev.className = 'prev';
      this.prev.innerHTML = '&#10094;'
      this.next.className = 'next'
      this.next.innerHTML = '&#10095;'
      this.dotcontainer.className = 'dot-container'

      this.container.append(this.slidesall, this.prev, this.next, this.dotcontainer)
    })()

    this.prev.addEventListener('click', this.prevSlide)
    this.next.addEventListener('click', this.nextSlide)
  }
  
  getSlideIndex(){
    return this.slideIndex
  }

  setSlideIndex(value){
    this.slideIndex = value;
  }

  incrementIndex(){
    this.slideIndex +=1;
    if(this.getSlideIndex()>this.getSlides().length-1) this.setSlideIndex(0);
  }

  decrementIndex(){
    this.slideIndex -=1;
    if(this.getSlideIndex()<0) this.setSlideIndex(this.getSlides().length-1)
  }

  setSlides(slides){
    let temp = slides.map(slide=> Object.assign(new Slide, slide))
    temp.forEach((slide, index)=>{
      slide.setIndex(index)
    })
    this.slides = temp;
  }

  getSlides(){
    return this.slides
  }

  addSlide(newSlide){
    if(this.slides.find(slide => slide.img === newSlide.img)) return;
    this.slides.push(newSlide);
    newSlide.setIndex(this.slides.length-1);
  }

  onload(){
    this.slides.forEach((slide)=>{
      this.dotcontainer.append(slide.createDot(this.currentSlide))
    })
    this.chooseSlide(0);
    this.dot(0);
  }

  dot(index){
    const dots = this.dotcontainer.children
    for (let dot of dots){
      dot.classList.remove('active');
    }
    dots[index].classList.add('active')
  }

  chooseSlide(index){
    const slide = this.slides[index];
    this.slidesall.innerHTML = slide.createSlide(slide.img)
    this.setSlideIndex(index)
    this.dot(index)
    log(this.getSlideIndex())
  }
  //Listeners
  currentSlide = (e)=>{
    const index = e.target.dataset.index;
    this.chooseSlide(index)
  }

  nextSlide = () => {
    this.incrementIndex();
    this.chooseSlide(this.getSlideIndex())
  }

  prevSlide = () => {
    this.decrementIndex();
    this.chooseSlide(this.getSlideIndex())
  }

  //--------------------------------------------
  appendTo(element){
    element.append(this.container)
  }
}

const addSlider = function(arr, element){
  const slider = new Slider();
  slider.setSlides(arr);
  slider.onload();
  slider.appendTo(element);

  return slider;
}
//----------------------------------------------------------------------------------------
const array = [
  {
    img:'./imgs/1.jpg',
    caption: 'Forest',
  },
  {
    img:'./imgs/2.jpg',
    caption: 'Mountains',
  },
  {
    img:'./imgs/3.jpg',
    caption: 'Polar circle',
  },
  {
    img:'./imgs/4.jpg',
    caption: 'River',
  },
]
const slider = addSlider(array, document.body)

const otherSlider = addSlider(array, document.body)

const anotherSlider = addSlider(array, document.body)

function timeout(){
  slider.nextSlide();
  setTimeout(timeout, 5000)
}
function secTimeout(){
  otherSlider.prevSlide();
  setTimeout(secTimeout, 1000)
}

timeout();
//secTimeout()
