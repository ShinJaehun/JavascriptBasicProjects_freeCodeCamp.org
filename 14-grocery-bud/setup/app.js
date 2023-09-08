// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option
let editElement
let editFlag = false
let editID = ""

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem)
clearBtn.addEventListener('click', clearItems)

// 이렇게 할 수 없다! => element 추가한 다음에 넣어야?
// const deleteBtn = document.querySelector('.delete-btn')
// console.log(deleteBtn)

// load items
window.addEventListener('DOMContentLoaded', setupItems)

// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault() // 근데 이건 자꾸 왜 하는거야?
    // console.log(grocery.value)
    const value = grocery.value
    // if (!value) {
    //     console.log('value is falsy')
    // }
    const id = new Date().getTime().toString() // 당연히 serious project에서는 이렇게 하면 안돼!
    // console.log(id)

    // if (value !== '' && editFlag === false) {
    if (value && !editFlag) {
        createListElement(id, value)
        // // console.log('add item to the list')
        // const element = document.createElement('article')
        // // add class
        // element.classList.add('grocery-item')
        // // add id
        // const attr = document.createAttribute('data-id')
        // attr.value = id
        // element.setAttributeNode(attr)
        // element.innerHTML = `<p class="title">${value}</p>
        //     <div class="btn-container">
        //       <button class="edit-btn" type="button">
        //         <i class="fas fa-edit"></i>
        //       </button>
        //       <button class="delete-btn" type="button">
        //         <i class="fas fa-trash"></i>
        //       </button>
        //     </div>`

        // const deleteBtn = element.querySelector('.delete-btn')
        // const editBtn = element.querySelector('.edit-btn')
        // deleteBtn.addEventListener('click', deleteItem)
        // editBtn.addEventListener('click', editItem)

        // // append child
        // list.appendChild(element)
        displayAlert('item added to the list', 'success')
        // show container
        container.classList.add('show-container')
        // add to local storage
        addToLocalStorage(id, value)
        // set back to default
        setBackToDefault()
    // } else if (value !== '' && editFlag === true) {
    } else if (value && editFlag) {
        // console.log('editing')
        editElement.innerHTML = value
        displayAlert("value changed", "success")
        // edit local storage
        editLocalStorage(editId, value)
        setBackToDefault()
        // addToLocalStorage()
    } else {
        // console.log('empty value')
        // alert.textContent = "empty value"
        // alert.classList.add('alert-danger')
        displayAlert("please enter value", "danger")
    }
}

// display alert
function displayAlert(text, action) {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)

    // remove alert
    setTimeout(function(){
        alert.textContent = ''
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}

// clear item
function clearItems(){
    const items = document.querySelectorAll('.grocery-item')
    if (items.length > 0) {
        items.forEach(function(item){
            list.removeChild(item)
        })
    }
    container.classList.remove("show-container")
    displayAlert("empty list", "danger")
    setBackToDefault()
    localStorage.removeItem('list')
}

function deleteItem(e){
    // console.log('item deleted')
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)
    if (list.children.length === 0) {
        container.classList.remove('show-container')
    }
    displayAlert('item removed', 'danger')
    setBackToDefault()
    // remove from local storage
    removeFromLocalStorage(id)
}

function editItem(e){
    // console.log('edit item')
    const element = e.currentTarget.parentElement.parentElement
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling
    // set form value
    grocery.value = editElement.innerHTML
    editFlag = true
    editId = element.dataset.id
    submitBtn.textContent = "edit"
}

// set back to default
function setBackToDefault() {
    // console.log('set back to default')
    grocery.value = ''
    editFlag = false
    editId = ''
    submitBtn.textContent = "submit"
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    // console.log('added to local storage')
    // const grocery = {id: id, value: value}
    const grocery = {id, value}
    let items = getLoalStorage()
    // console.log(items)
    items.push(grocery)
    localStorage.setItem('list', JSON.stringify(items))
}

function removeFromLocalStorage(id) {
    let items = getLoalStorage()
    items = items.filter(function(item){
        if (item.id !== id) {
            return item
        }
    })
    localStorage.setItem('list', JSON.stringify(items))
}

function editLocalStorage(id, value) {
    let items = getLoalStorage()
    items = items.map(function(item){
        if (item.id === id) {
            item.value = value
        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(items))

}

function getLoalStorage() {
    return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : []
}
// localStorage.setItem('orange', JSON.stringify(['item', 'item2']))
// const oranges = JSON.parse(localStorage.getItem('orange'))
// console.log(oranges)
// localStorage.removeItem('orange')

// ****** SETUP ITEMS **********
function setupItems() {
    let items = getLoalStorage()
    if (items.length > 0) {
        items.forEach(function(item){
            createListElement(item.id, item.value)
        })
        container.classList.add('show-container')
    }
}

function createListElement(id, value) {
    const element = document.createElement('article')
    element.classList.add('grocery-item')
    const attr = document.createAttribute('data-id')
    attr.value = id
    element.setAttributeNode(attr)
    element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button class="edit-btn" type="button">
            <i class="fas fa-edit"></i>
          </button>
          <button class="delete-btn" type="button">
            <i class="fas fa-trash"></i>
          </button>
        </div>`

    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)
    list.appendChild(element)
}