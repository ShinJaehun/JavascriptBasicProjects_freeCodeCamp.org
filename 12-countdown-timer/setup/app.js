const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')

// console.log(items)
// NodeList(4) [h4.days, h4.hours, h4.mins, h4.secs]

let tempDate = new Date()
let tempYear = tempDate.getFullYear()
let tempMonth = tempDate.getMonth()
let tempDay = tempDate.getDate()
let tempHours = tempDate.getHours()
let tempMinutes = tempDate.getMinutes()

// let futureDate = new Date(2023,8,5,13,39,0)

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 23, 59, 0)
// add 10 days fro today!

// let futureDate = new Date(2024,4,24,11,30,0)
// console.log(futureDate)
// 4월이 아니라 5월! zero based index
// Sun May 24 2024 11:30:00 GMT+0900 (한국 표준시)

const year = futureDate.getFullYear()
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()
let month = futureDate.getMonth()
month = months[month]
// console.log(months[month])

const date = futureDate.getDate()
const weekday = weekdays[futureDate.getDay()]

giveaway.textContent = `giveaway ends on ${year} ${month} ${date} ${weekday} ${hours}:${minutes}`

// future time in ms
const futureTime = futureDate.getTime()
// console.log(futureTime)

function getRemainingTime(){
  const today = new Date().getTime()
  // console.log(today)
  const t = futureTime - today
  // console.log(t)

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000
  // console.log(oneDay)
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000

  let days = t / oneDay
  days = Math.floor(days)
  // console.log(days)

  // let hours = t / oneHour // all the hours
  let hours = (t % oneDay) / oneHour
  hours = Math.floor(hours)
  // console.log(hours)

  let minutes = Math.floor((t % oneHour) / oneMinute)
  let seconds = Math.floor((t % oneMinute) / 1000)

  // set values array
  const values = [days, hours, minutes, seconds]

  function format(item) {
    // function({function(){}})
    if (item < 10) {
      return item = `0${item}`
    } else {
      return item
    }
  }

  items.forEach(function(item, index){
    item.innerHTML = format(values[index])
  })

  if (t < 0) { // 카운트 다운이 끝나면...
    clearInterval(countdown)
    deadline.innerHTML = `<h4 class="expired">sorry, this giveway has expired</h4>`
  }
}

let countdown = setInterval(getRemainingTime, 1000) // 1초에 한번씩...

getRemainingTime()