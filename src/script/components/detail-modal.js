import { html, css } from "../utils/helper";
import ApiGateway from "../data/api-gateway";

class DetailModal extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
    }

    set category(category){
        this._category = category;
    }

    set id(id){
        this.render(id);
    }

    connectedCallback(){
        //if no-scroll class exists in body, dont toggle
        if(!document.querySelector("body").classList.contains("no-scroll")) document.querySelector("body").classList.toggle("no-scroll");
    }

    disconnectedCallback(){
        //if there is still a modal on the screen dont toggle
        if(!document.querySelector("detail-modal")) document.querySelector("body").classList.toggle("no-scroll");
    }

    async render(id){
        let style = css`
        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
        }
        
        :host{
            display:block;
        }

        ::selection{
            color:var(--secondary);
            background:var(--primary-accent);
        }
        
        ::-webkit-scrollbar{
            width:.5rem;
        }
        
        ::-webkit-scrollbar-track{
            background:var(--primary);
        }
        
        ::-webkit-scrollbar-thumb{
            background: var(--primary-accent);
            border-radius:.25rem;
        }

        .background{
            width:100%;
            height:100%;
            position:fixed;
            top:0;
            left:0;
            z-index:1000;
            overflow-x: hidden;
            overflow-y: auto;
            background:rgba(0,0,0,.4);
            backdrop-filter:blur(.25rem);
        }

        .modal{
            width:90%;
            background:rgba(18,18,18,0.9);
            backdrop-filter:blur(.5rem);
            margin:0 auto;      
            color:#f4f4f4;
        }

        @media only screen and (max-width:600px){
            .modal{
                width:100%;
            }
        }

        .modal-header{
            display:flex;
            height:60px;
            align-items:center;
            justify-content:flex-start;
            background:rgba(18,18,18,.5);
            padding:0 1rem;
            z-index:30;
        }
        
        .modal-header svg{
            transition:100ms;
            margin-right:1rem;
        }

        .modal-header svg:hover,
        .modal-header svg:focus{
            cursor:pointer;
            background:var(--secondary);
        }

        .modal-content{
            display:grid;
            padding:1rem;
            grid-template-columns:repeat(auto-fit, minmax(20rem,1fr));
            grid-template-rows: auto;
            gap:1rem;
            grid-auto-flow: row;
        }

        .modal-content img{
            width:100%;
        }

        .details{
            grid-row:1/2;
            color:#f4f4f4;
            grid-column:2/span 2;
        }

        dl{
            display:grid;
            margin:2rem auto;
            grid-template-columns:30% auto;
        }

        dl dt{
            font-weight:500;
        }
    
        .paragraph{
            margin: 1rem auto;
        }

        .paragraph p + p{
            margin-top:.25rem
            margin-bottom:1rem;
        }

        .similar-wrapper{
            grid-row:3;
            grid-column: 1/5;
        }

        .similar-items{
            display:grid;
            grid-template-columns:repeat(auto-fit, minmax(13rem, 1fr));
            grid-auto-flow:row;
            gap:1rem;
        }
        `;
        this._shadowRoot.appendChild(style);

        await ApiGateway.getItem(this._category, id).then(result =>{
            ApiGateway.getGenre(this._category).then(genres => {
                this._shadowRoot.append(this.template(result, genres));
            });
        });
    }

    template(item, genres){
        let template = html`
        <div class="modal">
            <div class="modal-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <h2>Item Details</h2>
            </div>
            <div class="modal-content">
                <img src='https://image.tmdb.org/t/p/original/${item.poster_path}'/>
                <div class="details">
                    <h1>${item.title || item.name}</h1>
                    <h5>${item.genres}</h5>
                    <p>${item.tagline || ''}</p>

                    <dl>
                        <dt>Rating</dt>
                        <dd>${item.vote_average} (${item.vote_count} votes)</dd>
                        <dt>Status</dt>
                        <dd>${item.status}</dd>
                        <dt>Release Date</dt>
                        <dd>${item.date}</dd>
                        <dt>Directors</dt>
                        <dd>${item.directors}</dd>
                    </dl>

                    <div class="paragraph">
                        <p>Description</p>
                        <p>${item.overview}</p>
                    </div>

                    <div class="paragraph">
                        <p>Keywords</p>
                        <p>${item.keywords}</p>
                    </div>
                </div>
                <div class="similar-wrapper">
                    <h3>Similar</h3>
                    <div class="similar-items"></div>
                </div>
            </div>
        </div>
        `;

        template.className="background";         
        template.querySelector(".modal-header svg").addEventListener("click", ()=>{
            this.remove();
        });

        item.similar.forEach(item => {
            let card = document.createElement("item-card");
            item = ApiGateway.replaceGenre(item, genres);
            item.date = item.first_air_date || item.release_date;
            item.date = item.date.substr(0,4);
            card.content=item;
            template.querySelector(".similar-items")
                .append(card);    
        });

        return template;
    }
}

customElements.define("detail-modal", DetailModal)