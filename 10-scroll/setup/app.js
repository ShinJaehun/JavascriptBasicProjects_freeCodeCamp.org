// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date')
date.innerHTML = new Date().getFullYear()

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle')
const linksContainer = document.querySelector('.links-container')
const links = document.querySelector('.links')

navToggle.addEventListener('click', function(){
    // linksContainer.classList.toggle('show-links') // show-links가 hard coded value...
    // const containerHeight = linksContainer.getBoundingClientRect()
    // console.log(containerHeight)
    // DOMRect {x: 24, y: 66, width: 289, height: 0, top: 66, …}
    const containerHeight = linksContainer.getBoundingClientRect().height

    // const linksHeight = links.getBoundingClientRect()
    // console.log(linksHeight)
    // DOMRect {x: 24, y: 66, width: 289, height: 201.5625, top: 66, …}
    const linksHeight = links.getBoundingClientRect().height
    
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`
    } else {
        linksContainer.style.height = 0
    }
})

// 이게 있기 때문에 사이즈가 커지거나 줄어들었을 때 height가 자동으로 변경됨
// comment out 한 다음 테스트해보면 height 크기가 변하지 않는 현상을 확인할 수 있다!
// .links-container {
//     height: auto !important;
//   }


// ********** fixed navbar ************
const navbar = document.getElementById('nav')
const topLink = document.querySelector('.top-link')

window.addEventListener('scroll', function(){
    // console.log(window.pageYOffset)
    const scrollHeight = window.pageYOffset
    const navHeight = navbar.getBoundingClientRect().height

    if (scrollHeight > navHeight) {
        navbar.classList.add('fixed-nav')
        // .fixed-nav {
        //     position: fixed;
        //     top: 0;
        //     left: 0;
        //     width: 100%;
        //     background: var(--clr-white);
        //     box-shadow: var(--light-shadow);
        //   }
    } else {
        navbar.classList.remove('fixed-nav')
    }

    if (scrollHeight > 500) {
        topLink.classList.add('show-link')
    } else {
        topLink.classList.remove('show-link')
    }
})

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link')
scrollLinks.forEach(function(link){
    link.addEventListener('click', function(e){
        // 기본 동작 중지
        e.preventDefault()

        // navigate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1)
        // console.log(id)
        const element = document.getElementById(id)
        // calculate the heights
        const navHeight = navbar.getBoundingClientRect().height
        const containerHeight = linksContainer.getBoundingClientRect().height
        const fixedNav = navbar.classList.contains('fixed-nav')
        let position = element.offsetTop - navHeight
        // 이게 그니까 fixed_nav 상태에서 nav bar 높이 만큼 가리는 거니까...
        // console.log(position)

        if (!fixedNav) {
            position = position - navHeight
        }

        if (navHeight > 82) {
            // navbar height
            position = position + containerHeight
        }
        window.scrollTo({
            left: 0, top: position,
        })

        linksContainer.style.height = 0
    })
})