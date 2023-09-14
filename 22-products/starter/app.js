console.log('products starter');

const url = 'https://course-api.com/javascript-store-products'
const productsDOM = document.querySelector('.products-center')

const fetchProducts = async () => {
    productsDOM.innerHTML = '<div class="loading"></div>'
    try {
        const resp = await fetch(url)
        const data = await resp.json() // 둘 다 await을 써야 하는구나...
        return data
    } catch (error) {
        productsDOM.innerHTML = '<p class="error">there was an error</p>'
    }
}

const displayProducts = (list) => {
    const productList = list.map((product) => {
        // console.log(product)
        // {
        //     "id": "recjMK1jgTb2ld7sv",
        //     "fields": {
        //         "company": "liddy",
        //         "colors": [
        //             "#f15025"
        //         ],
        //         "price": 2199,
        //         "name": "emperor bed",
        //         "image": [
        //             {
        //                 "id": "attiwrd7gSI1oGxRK",
        //                 "width": 1280,
        //                 "height": 720,
        //                 "url": "https://course-api.com/images/store/product-8.jpeg",
        //                 "filename": "product-6.jpg",
        //                 "size": 178908,
        //                 "type": "image/jpeg",
        //                 "thumbnails": {
        //                     "small": {
        //                         "url": "https://course-api.com/images/store/product-8.jpeg",
        //                         "width": 64,
        //                         "height": 36
        //                     },
        //                     "large": {
        //                         "url": "https://course-api.com/images/store/product-8.jpeg",
        //                         "width": 910,
        //                         "height": 512
        //                     },
        //                     "full": {
        //                         "url": "https://course-api.com/images/store/product-8.jpeg",
        //                         "width": 3000,
        //                         "height": 3000
        //                     }
        //                 }
        //             }
        //         ]
        //     }
        // }

        // const { id } = product.id // 이렇게 쓰는 거 아님
        const { id } = product
        const { name: title, price } = product.fields
        const { url: img } = product.fields.image[0]
        const formatPrice = price / 100

        return `<a class="single-product" href="product.html?id=${id}&name=john&age=25">
                    <img src="${img}" class="single-product-img img" alt="${title}" />
                    <footer>
                    <h5 class="name">${title}</h5>
                    <span class="price">$${formatPrice}</span>
                    </footer>
                </a>`
    }).join('')

    productsDOM.innerHTML = `<div class="products-container">
                                ${productList}
                            </div>`
}

const start = async () => {
    const data = await fetchProducts()
    displayProducts(data)
}

start()