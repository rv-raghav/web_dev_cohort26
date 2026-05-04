import Jokes from "./jokes-viewer-application/Jokes.jsx"
import Meals from "./meals-listing-interface/Meals.jsx"
import Products from "./product-listing-interface/Products.jsx"
import Quotes from "./quotes-listing-application/Quotes.jsx"
import Cat from "./random-cat-viewer/Cat.jsx"
import Youtube from "./youtube-video-listing-ui/Youtube.jsx"
function Home() {
    return (
        <div>
            <h2>Home Component</h2>
            <Jokes />
            <Meals />
            <Products />
            <Quotes />
            <Cat />
            <Youtube />
            
        </div>
    )
}

export default Home