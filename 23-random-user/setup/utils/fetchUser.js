const URL = 'https://randomuser.me/api/'

const getUser = async () => {
    const response = await fetch(URL)
    const data = await response.json()

    const person = data.results[0]

    const { phone, email } = person
    const { large:image } = person.picture
    // large라는 요소를 image로 사용하겠다.
    const { password } = person.login
    const { first, last } = person.name
    const { age } = person.dob
    // const { dob: { age } } = person
    // 왜 굳이 이렇게 사용하시나요???

    // console.log(`${first} ${last}`)
    // console.log(age)

    const { number, name} = person.location.street
    // const {
    //     street: { number, name },
    //   } = person.location;
    // 왜 굳이 이렇게 사용하시나요???

    // console.log(`${number} ${name}`)

    return {
        image, phone, email, password, age, street: `${number} ${name}`, name: `${first} ${last}`
    }
}

export default getUser