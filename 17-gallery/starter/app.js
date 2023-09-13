function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

class Gallery {
  constructor(element) {
    this.container = element
    this.list = [...element.querySelectorAll('.img')]
    // 여기서 사용된 ...의 의미는???? 뭐 몽땅 다 받는다는거지?

    // console.log(this.list)
    // [img.img, img.img, img.img] // 이게 아마 img(elemental).img(class) 뭐 이런건가? => 맞음

    this.modal = getElement('.modal')
    this.modalImg = getElement('.main-img');
    this.imageName = getElement('.image-name');
    this.modalImages = getElement('.modal-images');
    this.closeBtn = getElement('.close-btn');
    this.nextBtn = getElement('.next-btn');
    this.prevBtn = getElement('.prev-btn');

    this.closeModal = this.closeModal.bind(this)
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this)

  //   // 당연히 이 this는 container를 가리키기 때문에 class 내부의 값에 접근할 수 없음
  //   this.container.addEventListener('click', function(e){
  //     console.log(this) 
  //     this.setMainImage(e.target)
  //     this.modalImages.innerHTML = this.list.map(function(image){
  //       return `<img 
  //                 src="${image.src}"
  //                 title="${image.title}"
  //                 data-id="${image.dataset.id}"
  //                 class="${selectedImage.dataset.id === image.dataset.id
  //                    ? 'modal-img selected'
  //                    : 'modal-img'}" 
  //               />`
  //     }).join('')
  //   })

      // bind를 하면 얘기가 달라지지...
    // this.container.addEventListener('click', function(e){
    //   // console.log(e.target)
    //   // <img
    //   //   src="./images/nature-1.jpeg"
    //   //   title="nature-1"
    //   //   class="img"
    //   //   data-id="1"
    //   //   alt="nature-1"
    //   // />
    //   if (e.target.classList.contains('img')) {
    //     this.openModal(e.target, this.list)
    //     // 그럼... 여기서 this는 container가 아니라 Gallery class가 되어야지
    //   }
    // }.bind(this))

    // bind가 없을 때는 oM이 function인 것도 모르는데...
    // bind를 넣어주면 정상적으로 동작함...
    // 근데 여기에서는 arrow function이나 정상적인 function이나 호출하는데 차이가 없음!
    this.container.addEventListener('click', function(e){
      if (e.target.classList.contains('img')) {
        // this.oM(e.target, this.list)
        this.openModal(e.target, this.list)
      }
    }.bind(this))
  }

  oM = (selectedImage, list) => {
    // console.log(this)
    // Gallery 
    this.setMainImage(selectedImage)
    this.modalImages.innerHTML = list.map(function(image){
      return `<img 
                src="${image.src}"
                title="${image.title}"
                data-id="${image.dataset.id}"
                class="${selectedImage.dataset.id === image.dataset.id
                   ? 'modal-img selected'
                   : 'modal-img'}" 
              />`
    }).join('')
    this.modal.classList.add('open')
  }

  openModal(selectedImage, list) {
    // console.log(this)
    // Gallery 
    this.setMainImage(selectedImage)
    this.modalImages.innerHTML = list.map(function(image){
      return `<img 
                src="${image.src}"
                title="${image.title}"
                data-id="${image.dataset.id}"
                class="${selectedImage.dataset.id === image.dataset.id
                   ? 'modal-img selected'
                   : 'modal-img'}" 
              />`
    }).join('')
    this.modal.classList.add('open')

    this.closeBtn.addEventListener('click', this.closeModal)
    this.nextBtn.addEventListener('click', this.nextImage);
    this.prevBtn.addEventListener('click', this.prevImage);

    this.modalImages.addEventListener('click', this.chooseImage)
  }

  setMainImage(selectedImage) {
    this.modalImg.src = selectedImage.src
    this.imageName.textContent = selectedImage.title
  }

  closeModal(){
    // console.log(this) 
    // bind가 없으면 this는 closeBtn, bind가 있으면 Gallery class object
    this.modal.classList.remove('open')
    this.nextBtn.removeEventListener('click', this.nextImage);
    this.prevBtn.removeEventListener('click', this.prevImage);
  
  }

  nextImage() {
    const selected = this.modalImages.querySelector('.selected')
    console.log(selected)
    
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;
    // nextElementSibling, nextElementChild
    // next를 받다가 null인 경우 first element로?
    selected.classList.remove('selected')
    next.classList.add('selected')
    this.setMainImage(next)
  }

  prevImage(){
    const selected = this.modalImages.querySelector('.selected')
    console.log(selected)
  
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;
    // previousElementSibling, lastElementChild
    // prev를 받다가 null인 경우 last element로?

    selected.classList.remove('selected')
    prev.classList.add('selected')
    this.setMainImage(prev)
  }

  chooseImage(e){
    if (e.target.classList.contains('modal-img')) {
      const selected = this.modalImages.querySelector('.selected')

      selected.classList.remove('selected')
      this.setMainImage(e.target)
      e.target.classList.add('selected')
    }
  }
}

const nature = new Gallery(getElement('.nature'))
const cities = new Gallery(getElement('.city'))

