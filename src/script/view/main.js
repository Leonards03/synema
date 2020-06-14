import ApiGateway from "../data/api-gateway";

const main = async () => {
    await ApiGateway.loadFeeds().then(results=>{
        let backdropMovie = document.querySelector("item-slider#movie");
        backdropMovie.contents = results[0].slice(0,5);
        backdropMovie.classList.toggle("visible");
        
        let backdropTv = document.querySelector("item-slider#tv");
        backdropTv.contents = results[1].slice(0,5);

        let contentTabs = document.querySelector("content-tabs");
        contentTabs.contents = results;
    });
}

export default main;
