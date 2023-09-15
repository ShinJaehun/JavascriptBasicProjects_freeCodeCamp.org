import fetchDrinks from "./fetchDrinks.js"
import displayDrinks from "./displayDrinks.js"
import setDrink from './setDrink.js'

const showDrinks = async (url) => {
    const data = await fetchDrinks(url)
    // console.log(data)
    // {drinks: Array(25)}
    // drinks
    // : 
    // (25) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // [[Prototype]]
    // : 
    // Object

    const section = await displayDrinks(data)
    if (section) {
        setDrink(section)
    }
}

export default showDrinks