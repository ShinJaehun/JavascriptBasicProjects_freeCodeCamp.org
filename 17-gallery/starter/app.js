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
    
    this.container.addEventListener('click', function(e){
      // console.log(e.target)
      // <img
      //   src="./images/nature-1.jpeg"
      //   title="nature-1"
      //   class="img"
      //   data-id="1"
      //   alt="nature-1"
      // />
      if (e.target.classList.contains('img')) {
        this.openModal(e.target, this.list)
        // 그럼... 여기서 this는 container가 아니라 Gallery class가 되어야지
      }
    }.bind(this))

  }

  openModal(selectedImage, list) {
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