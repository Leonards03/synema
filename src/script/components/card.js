import { html, css } from "../utils/helper";

class Card extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:"open"});
    }

    set content(content){
        this.render(content);
    }

    render(content){
        let style = css`
        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
        }

        p::selection{
            color:#f4f4f4;
            background:var(--primary-accent);
        }

        .card{
            position:relative;
            height:1fr;
            border-radius:.5rem;
            overflow:hidden;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .card:hover{
            // cursor:pointer;
        }

        .card > picture > img{
            width:100%;
            object-fit:contain;
            transform:scale(1.1);
            transition: transform 200ms;
        }
        
        .card:hover > picture > img,
        .card:focus > picture > img{
            transform:scale(1.2);
            filter:blur(.25rem);
        }

        .card::before{
            content:'';
            position:absolute;
            top:0;
            width:100%;
            height:100%;
            transform:scaleY(0);
            background:rgba(18,18,18,0);
            transition:300ms;
            z-index:1;
        }

        .card:hover::before{
            content:'';
            position:absolute;
            top:0;
            transform:scaleY(1);
            background:rgba(18,18,18,.8);
        }

        .card .card-info{
            position:absolute;
            width:90%;
            top:1rem;
            left:1rem;
            transform:scaleY(0);
            color:var(--secondary);
            transition:250ms;
            z-index:2;
        }

        .card:hover .card-info{
            transform:scaleY(1);
        }

        .card-title{
            font-size:1.25rem;
            font-weight:500;
            color:var(--primary-accent);
        }

        .card-subtitle{
            font-size:.9rem;
            margin-bottom:1rem;
        }

        .view{
            color:var(--primary-accent);
            filter:brightness(80%);
        }

        .view:hover{
            filter:brightness(100%);
        }
        `;

        let template = html`
            <picture>
                <source media="(max-width: 200px)" srcset="https://image.tmdb.org/t/p/w185/${content.poster_path}">
                <source media="(max-width: 342px)" srcset="https://image.tmdb.org/t/p/w342/${content.poster_path}">
                <source media="(min-width: 500px)" srcset="https://image.tmdb.org/t/p/w500/${content.poster_path}">
                <img src="https://image.tmdb.org/t/p/w342/${content.poster_path}" alt="${content.title || content.name}">
            </picture>
            <div class="card-info">
                <p class="card-title">${content.title || content.name}</p>
                <p class="card-subtitle">${content.genres} | ${content.date}</p>
                <p class="card-text">${this.trimText(content.overview,100)}</p>
                <a href="" class="view">View More</a>
            </div>
        `;
        template.className="card";

        this._shadowRoot.appendChild(style);
        this._shadowRoot.appendChild(template);
        
        this._shadowRoot.querySelector("a").addEventListener("click", e =>{
            e.preventDefault();
            this.showModal(content.id, content.title ? "movie":"tv");
        });


    }

    showModal(id, category){
        let modal = document.createElement("detail-modal");
        modal.category = category;
        modal.id = id;
        document.querySelector("body").append(modal);
    }

    trimText(text, length){
        if(text.length > length){
            let temp = text.substring(length).indexOf(' ');
            return `${text.substr(0,temp+length)}...`;
        }
        return text;
    }
}

customElements.define("item-card",Card);
