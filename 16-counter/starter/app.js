class Counter {
    constructor(element, value) {
        this.counter = document.querySelector(element)
        this.value = value

        this.increaseBtn = this.counter.querySelector('.increase')
        this.resetBtn = this.counter.querySelector('.reset')
        this.decreaseBtn = this.counter.querySelector('.decrease')
        this.valueDOM = this.counter.querySelector('.value')
        this.valueDOM.textContent = this.value
        // console.log(this.valueDOM)

        // console.log(this) // 여기서 this는 Counter()
        this.increase = this.increase.bind(this)
        this.increaseBtn.addEventListener('click', this.increase)

        // 그니까 이것만으로는...
        // this.increaseBtn.addEventListener('click', function(){
        //     console.log(this) // this는 this.increaseBtn이지 머...
        //     this.value++
        //     this.valueDOM.textContent = this.value;
        // })

        // 그래서 이 뒤에 bind를 붙여야 함!!
        this.resetBtn.addEventListener('click', function(){
            // console.log(this) // bind가 붙음으로서 Counter
            this.value = 0
            this.valueDOM.textContent = this.value
        }.bind(this))
        // console.log(this.value)

        this.decrease = this.decrease.bind(this)
        this.decreaseBtn.addEventListener('click', this.decrease)
    }

    increase() {
        // console.log(this)
        // bind를 사용한 this는 Counter

        // bind를 사용하지 않은 this는 this.increaseBtn
        /* <button class=​"btn increase" value=​"1">​increase​</button>​ */

        this.value++
        // console.log(this.value)
        this.valueDOM.textContent = this.value
    }
    decrease() {
        this.value--
        this.valueDOM.textContent = this.value
    }
}

// console.log(this)
const firstCounter = new Counter('.first-counter', 100)
// console.log(firstCounter.counter)
// console.log(firstCounter.value)
const secondCounter = new Counter('.second-counter', 200)
