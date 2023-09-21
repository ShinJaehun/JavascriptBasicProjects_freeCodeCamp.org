import { formatPrice, getElement } from '../utils.js';
const cartItemsDOM = getElement('.cart-items')

const addToCartDOM = ({ id, name, price, image, amount }) => {
    // product 뭐 이렇게 쓰는 대신에 필요한 것만 가지고 온다는 거야?
    const article = document.createElement('article')
    article.classList.add('cart-item')
    article.setAttribute('data-id', id)
    article.innerHTML = `<img src="${image}" class="cart-item-img" alt="${name}" />  
                            <div>
                                <h4 class="cart-item-name">${name}</h4>
                                <p class="cart-item-price">${formatPrice(price)}</p>
                                <button class="cart-item-remove-btn" data-id="${id}">remove</button>
                            </div>

                            <div>
                                <button class="cart-item-increase-btn" data-id="${id}">
                                <i class="fas fa-chevron-up"></i>
                                </button>
                                <p class="cart-item-amount" data-id="${id}">${amount}</p>
                                <button class="cart-item-decrease-btn" data-id="${id}">
                                <i class="fas fa-chevron-down"></i>
                                </button>
                            </div>`
    // console.log(article)
    // <article class="cart-item" data-id="recmg2a1ctaEJNZhu">
    //     <img src="https://course-api.com/images/store/product-9.jpeg" class="cart-item-img" alt="utopia sofa">  
    //     <div>
    //         <h4 class="cart-item-name">utopia sofa</h4>
    //         <p class="cart-item-price">undefined</p>
    //         <button class="cart-item-remove-btn" data-id="recmg2a1ctaEJNZhu">remove</button>
    //     </div>

    //     <div>
    //         <button class="cart-item-increase-btn" data-id="recmg2a1ctaEJNZhu">
    //         <i class="fas fa-chevron-up"></i>
    //         </button>
    //         <p class="cart-item-amount" data-id="recmg2a1ctaEJNZhu">1</p>
    //         <button class="cart-item-decrease-btn" data-id="recmg2a1ctaEJNZhu">
    //         <i class="fas fa-chevron-down"></i>
    //         </button>
    //     </div>
    // </article>
    cartItemsDOM.appendChild(article)

};

export default addToCartDOM;
