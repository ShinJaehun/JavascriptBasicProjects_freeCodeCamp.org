const productDOM = document.querySelector('.product');
const url = 'https://course-api.com/javascript-store-single-product';

/*
<a class="single-product" href="product.html?id=${id}&name=john&age=25">
  <img src="${img}" class="single-product-img img" alt="${title}" />
    <footer>
      <h5 class="name">${title}</h5>
      <span class="price">$${formatPrice}</span>
    </footer>
</a>
*/

const fetchProduct = async () => {
    try {
        productDOM.innerHTML = '<h4 class="product-loading">Loading... </h4>'
        const params = new URLSearchParams(window.location.search)
        // console.log(params) // size 3  인 이유는...
        // for (const p of params) {
        //     console.log(p)
        // }
        // 그니까 넘기는 쪽에서도 이상한 params가 붙었어...
        // [
        //     "id",
        //     "rec8kkCmSiMkbkiko"
        // ]
        // [
        //     "name",
        //     "john"
        // ]
        // [
        //     "age",
        //     "25"
        // ]
        
        const id = params.get('id') // 그니까 id만 받아와서
        const response = await fetch(`${url}?id=${id}`) // api server에 호출
        const data = await response.json()
        return data
    } catch (error) {
        productDOM.innerHTML = '<p class="error">There was a problem loading the product. Please try again.</p>'
    }
}

const displayProduct = (product) => {
    const { company, colors, description, name: title, price, image } = product.fields
    const { url: img } = image[0]
    document.title = title.toUpperCase()

    const colorsList = colors.map((color) => {
        return `<span class="product-color" style="background: ${color}"></span>`
    }).join('')

    productDOM.innerHTML =  `<div class="product-wrapper">
                                <img src="${img}" class="img" alt="${title}" />
                                <div class="product-info">
                                    <h3>${title}</h3>
                                    <h5>${company}</h5>
                                    <span>${price / 100}</span>
                                    <div class="colors">
                                        ${colorsList}
                                    </div>
                                    <p>
                                        ${description}
                                    </p>
                                    <button class="btn">add to cart</button>
                                </div>
                            </div>`
}

const start = async () => {
    const data = await fetchProduct()
    displayProduct(data)
}

start()