// console.log('filters project');

let filteredProducts = [...products]

// console.log(filteredProducts)

// products.constructor
// ƒ Array() { [native code] }

// filteredProducts.constructor
// ƒ Array() { [native code] }

const productsContainer = document.querySelector('.products-container')

const displayProducts = () => {
    if (filteredProducts.length < 1) {
        productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`
        return
    }

    productsContainer.innerHTML = filteredProducts.map((product) => {
        // 그니까 innerHTML은 기존에 있는거 전부 다 지워버리나봐!
        const { id, title, image, price } = product
        return `<article class="product" data-id="${id}">
                  <img src="${image}" class="product-img img" alt="" />
                  <footer>
                    <h5 class="product-name">${title}</h5>
                    <span class="product-price">${price}</span>
                  </footer>
                </article>`
    }).join('')
}

displayProducts()

const form = document.querySelector('.input-form')
const searchInput = document.querySelector('.search-input')

form.addEventListener('keyup', () => { // keyup? 검색어 입력이 끝나면 바로 event처리
    const inputValue = searchInput.value
    filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(inputValue)
    })
    displayProducts()
})

const companiesDOM = document.querySelector('.companies')
const displayButtons = () => {
    const buttons = [ 'all', ...new Set(products.map((product) => product.company)), ]
    // Set에 대해 알아둘 필요가 있따!
    console.log(buttons)

    companiesDOM.innerHTML = buttons.map((company) => {
        return `<button class="company-btn" data-id="${company}">${company}</button>`
    }).join('')
}

displayButtons()

companiesDOM.addEventListener('click', (e) => {
    const el = e.target
    if (el.classList.contains('company-btn')) {
        if (el.dataset.id === 'all') {
            filteredProducts = [...products]
        } else {
            filteredProducts = products.filter((product) => {
                return product.company === el.dataset.id
            })
        }
        searchInput.value = ''
        displayProducts()
    }
})