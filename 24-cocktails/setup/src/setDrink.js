const setDrink = (section) => {
    section.addEventListener('click', function(e) {
        // 빈 곳을 클릭했을 때
        // console.log(e.target)
        // <div class="section-center">
        //     <a href="drink.html">
        //         <article class="cocktail" data-id="17222">
        //             <img src="https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg" alt="A1">
        //             <h3>A1</h3>
        //         </article>
        //     </a>
        //     <a href="drink.html">
        //         <article class="cocktail" data-id="17225">
        //             <img src="https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg" alt="Ace">
        //             <h3>Ace</h3>
        //         </article>
        //     </a>
        //     <a href="drink.html">
        //         <article class="cocktail" data-id="13501">
        //             <img src="https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg" alt="ABC">
        //             <h3>ABC</h3>
        //         </article>
        //     </a>
        // ... 
       
        // console.log(e.target.parentElement)
        // <section class="section cocktails">
        //     <article class="loading hide-loading">
        //         <img src="./loading.gif" alt="loading">
        //     </article>
        //     <h2 class="title"></h2>
        //     <div class="section-center">
        //         <a href="drink.html">
        //             <article class="cocktail" data-id="17222">
        //                 <img src="https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg" alt="A1">
        //                 <h3>A1</h3>
        //             </article>
        //         </a>
        //         ...

        // console.log(e.target.parentElement.dataset)
        // DOMStringMap {}

        // item을 클릭했을 때
        // console.log(e.target)
        // <img src="https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg" alt="ACID">
        // console.log(e.target.parentElement)
        // <article class="cocktail" data-id="14610">
        //     <img src="https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg" alt="ACID">
        //     <h3>ACID</h3>
        // </article>
        const id = e.target.parentElement.dataset.id
        // console.log(id)
        localStorage.setItem('drink', id) // 이게 뭘까
    })
}

export default setDrink