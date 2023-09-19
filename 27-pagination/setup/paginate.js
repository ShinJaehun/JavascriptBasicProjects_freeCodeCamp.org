const paginate = (followers) => {
    const itemsPerPage = 10
    const numberOfPages = Math.ceil(followers.length / itemsPerPage)

    const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
        // 의도하지 않았지만 loop를 돌게 됨
        // index가 numberOfPages에 가까워질때까지
        // console.log(index)
        const start = index * itemsPerPage
        return followers.slice(start, start + itemsPerPage) 
    }) 
    return newFollowers
}

export default paginate
