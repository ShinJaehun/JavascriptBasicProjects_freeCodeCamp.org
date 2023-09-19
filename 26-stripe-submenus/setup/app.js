import sublinks from "./data.js";

const toggleBtn = document.querySelector('.toggle-btn')
const closeBtn = document.querySelector('.close-btn')
const sidebarWrapper = document.querySelector('.sidebar-wrapper')
const sidebar = document.querySelector('.sidebar-links')
const linkBtns = [...document.querySelectorAll('.link-btn')]
// => 이걸 굳이 [...]로 처리하는 이유는? 이게 없으면??

const submenu = document.querySelector('.submenu')
const hero = document.querySelector('.hero')
const nav = document.querySelector('.nav')

toggleBtn.addEventListener('click', () => {
    sidebarWrapper.classList.add('show')
})
closeBtn.addEventListener('click', () => {
    sidebarWrapper.classList.remove('show')
})

sidebar.innerHTML = sublinks.map((item) => {
    const { links, page } = item
    return `<article>
                <h4>${page}</h4>
                <div class="sidebar-sublinks">
                    ${links.map((link) => {
                        return `<a href="${link.url}">
                                    <i class="${link.icon}"></i>
                                    ${link.label}
                                </a>`
                    }).join('')}
                </div>
            </article>`
}).join('')

linkBtns.forEach((btn) => {
    btn.addEventListener('mouseover', (e) => {
        const text = e.currentTarget.textContent
        const tempBtn = e.currentTarget.getBoundingClientRect() // ?
        const center = (tempBtn.left + tempBtn.right) / 2 // ?
        const bottom = tempBtn.bottom - 3 // ?

        const tempPage = sublinks.find((link) => link.page === text)
        // console.log(tempPage)
        // Product를 over하면...
        // {page: 'products', links: Array(3)}
        // {label: 'payment', icon: 'fas fa-credit-card', url: 'products.html'}
        // {label: 'terminal', icon: 'fas fa-credit-card', url: 'products.html'}
        // {label: 'connect', icon: 'fas fa-credit-card', url: 'products.html'}

        if (tempPage) {
            const { page, links } = tempPage
            submenu.classList.add('show')
            submenu.style.left = `${center}px` // 근데 이게 왜 left가 되야하는걸까?
            submenu.style.top = `${bottom}px`

            let columns = 'col-2'
            if (links.length === 3) {
                columns = 'col-3'
            }
            if (links.length > 3) {
                columns = 'col-4'
            }
            submenu.innerHTML = `<section>
                                    <h4>${page}</h4>
                                    <div class="submenu-center ${columns}">
                                        ${links.map((link) => {
                                            return `<a href="${link.url}">
                                                        <i class="${link.icon}"></i>
                                                        ${link.label}
                                                    </a>`
                                        }).join('')}
                                    </div>
                                </section>`
        }
    })
})

hero.addEventListener('mouseover', (e) => {
    submenu.classList.remove('show')
})

nav.addEventListener('mouseover', (e) => {
    if (!e.target.classList.contains('link-btn')) {
        submenu.classList.remove('show')
    }
})