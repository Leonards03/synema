import { html, css } from "../utils/helper";
import ApiGateway from "../data/api-gateway";

class ContentTabs extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:"open"});
        this._activeTab = "movie";
        this._activeContent = {
            "movie":"discover",
            "tv": "discover"
        }
    }

    set contents(contents){
        this._contents = contents;
        this.render(...contents);
    }

    set tab(tabName){
        this._activeTab = tabName;
        this._shadowRoot.querySelector(".active").classList.toggle("active");
        this._shadowRoot.querySelector(`.tab-pane.${tabName}`).classList.toggle("active");
        this._shadowRoot.querySelector(".nav-link.selected").classList.toggle("selected");
        this._shadowRoot.querySelector(`.nav-link[data-content=${this._activeContent[tabName]}]`)
            .classList.toggle("selected");

    }

    render(movies, shows){
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
            color:#f4f4f4;
            background:var(--primary-accent);
        }

        .tabs{
            width:100%;
            position:relative;
        }

        .tab-pane{
            width:100%;
            padding:1rem;
            display:none;
            position:absolute;
            top:0;
            transition:300ms;
        }

        .tab-pane.active{
            display:grid;
            column-gap:1.25rem;
            row-gap:1.75rem;
            grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
            grid-template-rows: auto 1fr;
            grid-auto-rows: min-content;
        }

        h1{
            color:var(--primary--accent);
        }

        .navs{
            list-style:none;
            display:flex;
            width:100%;
            height:100%;
            align-items:center;
            justify-content:flex-start;
            padding:1rem 1.5rem;
            overflow-x:auto;
            scroll:hidden;
        }

        .nav-item{
            margin-right:1.5rem;
        }

        .nav-link{
            color:var(--secondary); 
            font-size:1.5rem;
            font-weight:500;
            text-decoration:none;
            transition:200ms;
        }
        
        .nav-link:hover,
        .selected{
            color:var(--primary-accent);
        }
        `;
        
        let container = html`
        <ul class="navs">
            <li class="nav-item"><a href="#" class="nav-link selected" data-content="discover">Discover</a></li>
            <li class="nav-item"><a href="#" class="nav-link" data-content="popular">Popular</a></li>
            <li class="nav-item"><a href="#" class="nav-link" data-content="top_rated">Top Rated</a></li>
        </ul>
        `;

        let tabs = html``; // create div elements
        tabs.className = "tabs";

        let moviesContainer = html``;
        moviesContainer.className="tab-pane movie";
        let showsContainer = html``;
        showsContainer.className="tab-pane tv";

        tabs.appendChild(moviesContainer);
        tabs.appendChild(showsContainer);

        container.appendChild(tabs);

        this.populate(moviesContainer, movies);
        this.populate(showsContainer, shows);

        this._shadowRoot.appendChild(style);
        this._shadowRoot.appendChild(container);

        moviesContainer.classList.toggle("active");

        this._shadowRoot.querySelector("a").addEventListener("click", e =>{
            e.preventDefault();
        });

        let navLinks = this._shadowRoot.querySelectorAll(".nav-link");

        navLinks.forEach(link => {
            link.addEventListener("click", e =>{
                // prevents link default behaviour
                e.preventDefault();

                // state for whats content are activated
                this._activeContent[this._activeTab] = link.dataset.content;

                // toggle selected class
                this._shadowRoot.querySelector(".selected").classList.toggle("selected");
                link.classList.toggle("selected");
                
                if(link.dataset.content === "discover"){
                    let activeTab = this._shadowRoot.querySelector(`.tab-pane.${this._activeTab}`);
                    ApiGateway.getDiscover(this._activeTab).then(result =>{
                        this.populate(activeTab, result);
                    });
                }
                else
                {
                    ApiGateway.getItems(this._activeTab, link.dataset.content)
                    .then(result => {
                        let activeTab = this._shadowRoot.querySelector(`.tab-pane.${this._activeTab}`);
                        this.populate(activeTab, result);
                    });
                }
            });
        });
    }

    populate(elements, items){
        elements.innerHTML='';
        items.forEach(item => {
            let card = document.createElement("item-card");
            card.content = item;
            elements.appendChild(card);
        });
    }
}

customElements.define("content-tabs", ContentTabs);