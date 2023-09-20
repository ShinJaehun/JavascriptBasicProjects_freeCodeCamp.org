const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const formDOM = document.querySelector('.form')
const inputDOM = document.querySelector('.form-input')
const resultsDOM = document.querySelector('.results')

formDOM.addEventListener('submit', (e) => {
    e.preventDefault() // 근데 이거 정확히 무슨 일 하는지 좀 알아둘 필요가 있음!
    const value = inputDOM.value
    if (!value) {
        resultsDOM.innerHTML = 
            '<div class="error">please enter valid search term</div>'
        return
    }
    fetchPages(value)
})

const fetchPages = async (searchValue) => {
    resultsDOM.innerHTML = '<div class="loading"></div>'
    try {
        const response = await fetch(`${url}${searchValue}`)
        const data = await response.json()
        // console.log(data)
        // {
        //     "batchcomplete": "",
        //     "continue": {
        //         "sroffset": 20,
        //         "continue": "-||"
        //     },
        //     "query": {
        //         "searchinfo": {
        //             "totalhits": 17987,
        //             "suggestion": "line",
        //             "suggestionsnippet": "line"
        //         },
        //         "search": [
        //             {
        //                 "ns": 0,
        //                 "title": "Linux",
        //                 "pageid": 6097297,
        //                 "size": 108316,
        //                 "wordcount": 9791,
        //                 "snippet": "<span class=\"searchmatch\">Linux</span> (/ˈlɪnʊks/ LIN-uuks) is a family of open-source Unix-like operating systems based on the <span class=\"searchmatch\">Linux</span> kernel, an operating system kernel first released",
        //                 "timestamp": "2023-09-19T00:27:41Z"
        //             },
        //             {
        //                 "ns": 0,
        //                 "title": "Linux distribution",
        //                 "pageid": 18212,
        //                 "size": 54682,
        //                 "wordcount": 5414,
        //                 "snippet": "A <span class=\"searchmatch\">Linux</span> distribution (often abbreviated as distro) is an operating system made from a software collection that includes the <span class=\"searchmatch\">Linux</span> kernel, and often a",
        //                 "timestamp": "2023-09-16T22:51:01Z"
        //             },
        // ...
        const results = data.query.search // data 구조 확인 필요
        if (results.length < 1) {
            resultsDOM.innerHTML = 
                '<div class="error">no matching results. please try again</div>'
            return
        }
        renderResults(results)
    } catch(error) {
        resultsDOM.innerHTML = 
                '<div class="error">ERROR</div>'
    }
}

const renderResults = (list) => {
    const cardList = list.map((item) => {
        const { title, snippet, pageid } = item
        return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
                    <h4>${title}</h4>
                    <p>${snippet}</p>
                </a>`
    }).join('')
    resultsDOM.innerHTML = `<div class="articles">${cardList}</div>`
}