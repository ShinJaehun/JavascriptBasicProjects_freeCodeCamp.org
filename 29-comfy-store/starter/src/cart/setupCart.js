// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count')
const cartItemsDOM = getElement('.cart-items')
const cartTotalDOM = getElement('.cart-total')

let cart = getStorageItem('cart')

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id)

  if (!item) {
    let product = findProduct(id)

    product = { ...product, amount: 1 } // 기존 product 정보에 amount가 추가
    cart = [ ...cart, product ] // 기존 cart에 새로 추가된 product 추가
    // console.log(cart)
    // [{
    //   "id": "rec43w3ipXvP28vog",
    //   "featured": true,
    //   "name": "high-back bench",
    //   "price": 999,
    //   "company": "ikea",
    //   "colors": [
    //       "#f15025",
    //       "#222"
    //   ],
    //   "image": "https://course-api.com/images/store/product-1.jpeg",
    //   "amount": 1
    // }]
    addToCartDOM(product)
  } else {
    const amount = increaseAmount(id)
    const items = [ ...cartItemsDOM.querySelectorAll('.cart-item-amount') ]
    const newAmount = items.find((value) => value.dataset.id === id)
    // console.log(newAmount)
    // <p class="cart-item-amount" data-id="rec43w3ipXvP28vog">2</p>
    newAmount.textContent = amount
    // console.log(cart)
  }

  displayCartItemCount()

  displayCartTotal()
  
  setStorageItem('cart', cart)
  openCart()

};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount)
  }, 0)
  cartItemCountDOM.textContent = amount
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount)
  }, 0)
  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`
}

function increaseAmount(id) {
  let newAmount
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1
      cartItem = { ...cartItem, amount: newAmount}
    }
    return cartItem // 일치하는 거 없으면 그대로 간다는 거?
  })
  return newAmount
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}


function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', (e) => {
    const element = e.target
    const parent = e.target.parentElement
    const id = e.target.dataset.id
    const parentID = e.target.parentElement.dataset.id
    // 근데 이거 가만 생각해보면 cart-item의 id나 cart-item-increase/decrease-btn id나 다 같지 않나?

    if (element.classList.contains('cart-item-remove-btn')){
      removeItem(id)

      // console.log(element.parentElement)
      // <div>
      //     <h4 class="cart-item-name">entertainment center</h4>
      //     <p class="cart-item-price">$29.98</p>
      //     <button class="cart-item-remove-btn" data-id="recvKMNR3YFw0bEt3">remove</button>
      // </div>

      // console.log(element.parentElement.parentElement)
      // <article class="cart-item" data-id="recvKMNR3YFw0bEt3">
      //   <img src="https://course-api.com/images/store/product-10.jpeg" class="cart-item-img" alt="entertainment center">  
      //   <div>
      //       <h4 class="cart-item-name">entertainment center</h4>
      //       <p class="cart-item-price">$29.98</p>
      //       <button class="cart-item-remove-btn" data-id="recvKMNR3YFw0bEt3">remove</button>
      //   </div>

      //   <div>
      //       <button class="cart-item-increase-btn" data-id="recvKMNR3YFw0bEt3">
      //       <i class="fas fa-chevron-up"></i>
      //       </button>
      //       <p class="cart-item-amount" data-id="recvKMNR3YFw0bEt3">4</p>
      //       <button class="cart-item-decrease-btn" data-id="recvKMNR3YFw0bEt3">
      //       <i class="fas fa-chevron-down"></i>
      //       </button>
      //   </div>
      // </article>

      element.parentElement.parentElement.remove()
    }

    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
      // cart-item-amount 수정
    }

    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID)
      if (newAmount === 0) {
        removeItem(parentID)
        parent.parentElement.parentElement.remove()
      } else {
        parent.previousElementSibling.textContent = newAmount
        // cart-item-amount 수정
      }
    }

    displayCartItemCount()
    displayCartTotal()
    setStorageItem('cart', cart)

  })
}

const init = () => {
  displayCartItemCount()
  displayCartTotal()
  displayCartItemsDOM()
  setupCartFunctionality()
}

init()