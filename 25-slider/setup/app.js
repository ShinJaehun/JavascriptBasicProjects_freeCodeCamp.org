import data from './data.js'

const container = document.querySelector('.slide-container')
const nextBtn = document.querySelector('.next-btn')
const prevBtn = document.querySelector('.prev-btn')

if (data.length === 1) {
    // 아이템이 하나면 굳이 전환할 필요 없으니 
    nextBtn.style.display = 'none'
    prevBtn.style.display = 'none'
}

let people = [...data]
if (data.length === 2) { // ???
    // 아이템이 둘이면 사본을 만들어???
    // 둘만 있으면... 하나가 active 하나는 last라서
    // 버튼을 눌러 전환하려면 next가 필요한데 next가 없어서 문제가 됨
    people = [...data, ...data]
}

container.innerHTML = people.map((person, slideIndex) => {
    const { img, name, job, text } = person
    let position = 'next'
    if (slideIndex === 0) {
        position = 'active'
    }
    if (slideIndex === people.length - 1) {
        position = 'last'
    }
    if (data.length <= 1) { // ??? 아이템이 하나뿐이라면...
        position = 'active'
    }

    return `<article class="slide ${position}">
                <img src=${img} class="img" alt="${name}"/>
                <h4>${name}</h4>
                <p class="title">${job}</p>
                <p class="text">${text}</p>
                <div class="quote-icon">
                    <i class="fas fa-quote-right"></i>
                </div>
            </article>`
}).join('')

const startSlider = (type) => {
    const active = document.querySelector('.active')
    const last = document.querySelector('.last')
    let next = active.nextElementSibling
    if (!next) {
        // active가 가장 마지막 item인 경우 첫 item이 next로...
        next = container.firstElementChild
    }
    active.classList.remove('active')
    last.classList.remove('last')
    next.classList.remove('next') // prev를 누르면 next가 하나 삭제되는데 여기서 없어지는 듯...

    if (type === 'prev') {
        active.classList.add('next')
        last.classList.add('active')
        next = last.previousElementSibling
        console.log(next)

        if (!next) {
          next = container.lastElementChild
        }
        next.classList.remove('next')
        next.classList.add('last')
        return
    }
    active.classList.add('last')
    last.classList.add('next')
    next.classList.add('active')
    
}

nextBtn.addEventListener('click', () => {
    startSlider()
})

prevBtn.addEventListener('click', () => {
    startSlider('prev')
})