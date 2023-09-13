console.log('numbers project');

const items = [...document.querySelectorAll('.number')]
// console.log(items)
// (5) [span.number, span.number, span.number, span.number, span.number]
// console.log(typeof(items))
// object

const items2 = document.querySelectorAll('.number')
// console.log(items2)
// NodeList(5) [span.number, span.number, span.number, span.number, span.number]
// console.log(typeof(items2))
// object

const updateCount = (el) => {
    const value = parseInt(el.dataset.value)
    const increment = Math.ceil(value / 1000)

    let initialValue = 0

    const increaseCount = setInterval(() => {
        initialValue += increment
        if (initialValue > value) {
            el.textContent = `${value}+`
            console.log(this) // window
            console.log(increaseCount) // 아마 count 시간(초) 같다
            clearInterval(increaseCount)
            return
        }

        el.textContent = `${initialValue}`
    }, 1)
}

items.forEach((item) => {
    updateCount(item)
})