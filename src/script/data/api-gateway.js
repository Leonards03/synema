const API_KEY = "8da39aac35e5ec9d00c0baa4763ce206";

class ApiGateway {
    static getDiscover(category){
        return new Promise((resolve, reject)=>{
            fetch(`https://api.themoviedb.org/3/discover/${category}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(responseJson => responseJson.results)
            .then(items =>{
                this.getGenre(category).then(genres => {
                    items = items.map(item => {
                        item = this.replaceGenre(item,genres);
                        item.date = item.first_air_date || item.release_date;
                        item.date = item.date.substr(0,4);
                        return item;
                    });
                    resolve(items);
                });
            })
            .catch(err => reject(`uhh ohh ${err}`));
        });
    }

    static getItems(category, type){
        return new Promise((resolve, reject)=>{
            fetch(`https://api.themoviedb.org/3/${category}/${type}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(responseJson => responseJson.results)
            .then(items =>{
                this.getGenre(category).then(genres => {
                    items = items.map(item => {
                        item = this.replaceGenre(item,genres);
                        item.date = item.first_air_date || item.release_date;
                        item.date = item.date.substr(0,4);
                        return item;
                    });
                    resolve(items);
                });
            })
            .catch(err => reject(`uhh ohh ${err}`));
        })
    }

    static getItem(category, id){
        return new Promise((resolve, reject)=>{
            fetch(`https://api.themoviedb.org/3/${category}/${id}?api_key=${API_KEY}&append_to_response=similar%2Ccredits%2Ckeywords`)
            .then(response => response.json())
            .then(responseJson =>{
                responseJson.genres = responseJson.genres.map(genre => genre.name).join(", ");
                responseJson.date = responseJson.first_air_date || responseJson.release_date;
                responseJson.similar = responseJson.similar.results.slice(0,5);

                responseJson.keywords = responseJson.keywords.results || responseJson.keywords.keywords;
                responseJson.keywords = responseJson.keywords.map(keyword => keyword.name).join(", ");
                
                if(responseJson.created_by){
                    responseJson.directors = responseJson.created_by.map(creator => creator.name).join(", ");
                }
                else{
                    responseJson.directors = responseJson.credits.crew.find(crew => crew.job == "Director").name;
                }

                delete responseJson.credits;
                resolve(responseJson);
            })
            .catch(err => reject(`uhh ohh ${err}`));
        })
    }
    
    static getGenre(category){
        return new Promise((resolve, reject) => {
            fetch(`https://api.themoviedb.org/3/genre/${category}/list?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(responseJson => {
                let genres={};
                responseJson.genres.forEach(genre => genres[genre.id] = genre.name);
                resolve(genres);
            })
            .catch(err => reject(`uhh ohh ${err}`));
        })
    }

    static replaceGenre(item, genres){
        let genre_id = item.genre_ids[0];
        item.genres = genres[genre_id];
        delete item.genre_ids;

        return item;
    }

    static async loadFeeds() {
        let movie = this.getDiscover("movie");
        let shows = this.getDiscover("tv");

        return await Promise.all([movie,shows]);
    }
}

export default ApiGateway;