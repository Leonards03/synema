import { html, css } from "../utils/helper";

class ItemSlider extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:"open"});
    }

    set contents(contents){
        this.render(contents);
    }

    render(contents){
        this._shadowRoot.innerHTML=``;
        let style = css`
        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
        }

        .slider{
            overflow-x:hidden;
            height:100vh;
            width:100%;
            display:flex;
            scroll-behavior: smooth;
            scroll-snap-type: x mandatory;
        }
        
        ::selection{
            color:#f4f4f4;
            background:var(--primary-accent);
        }

        .slide{
            position:relative;
            width:100%;
            height:100%;
            flex-shrink:0;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            color:#f4f4f4;
        }

        .slide-info{
            width:40%;
            color:#f4f4f4;
            padding:1rem;
            border-radius:.24rem;
            background:rgba(18,18,18,.1);
            backdrop-filter:blur(.25rem);
            position:absolute;
            bottom:10%;
            left:10%;
            transform:translate(-20%,10%);
            filter: brightness(100%);
        }

        .slide-info .overview{
            line-height:1.5rem;
            text-align:justify;
            text-justify:auto;
            margin-top:1rem;
        }

        .slide-info button{
            width:13rem;
            height:2.5rem;
            border-radius:.25rem;
            margin-top:2rem;
            background:var(--primary-accent);
            border:none;
            outline:none;
            color:#f4f4f4;
            filter: brightness(80%);
            transition:100ms;
        }

        .slide-info button:hover{
            filter: brightness(100%);
        }

        .slide::before{
            content:'';
            position:absolute;
            top:0;
            width:100%;
            height:100%;
            background:rgba(18,18,18,.4);
        }

        .slider-nav{
            display:flex;
            flex-direction:column;
            position:absolute;
            top:50%;
            right:0;
            width:2.5rem;
            z-index:4;
            text-align:center;
            transform:translateY(-50%);
            background: rgba(12,12,12,.4);
        }

        .slider-nav .dot{
            color:#f4f4f4;
            text-decoration:none;
        }
        
        .dot{
            width:.75rem;
            height:.75rem;
            background:#f4f4f4;
            margin:.25rem auto;
            border-radius:100%;
            filter:brightness(70%) grayscale(100%);
        }

        .dot:hover,
        .active{
            filter:brightness(100%) grayscale(0%);
        }
        `;

        let navs = document.createElement("nav");
        navs.innerHTML=(`
        <a href="#slide-0"><div class="dot active"></div></a>
        <a href="#slide-1"><div class="dot"></div></a>
        <a href="#slide-2"><div class="dot"></div></a>
        <a href="#slide-3"><div class="dot"></div></a>
        <a href="#slide-4"><div class="dot"></div></a>
        `);
        navs.className='slider-nav';

        let container = html``;
        container.className="slider";

        this._shadowRoot.appendChild(style);
        this._shadowRoot.appendChild(navs);
        this._shadowRoot.appendChild(container);

        contents.forEach((content, index)=>{

            let template = html`
            <div class="slide-info">
                <h1>${content.title||content.name}</h1>
                <p class="card-subtitle">${content.genres} | ${content.date}</p>
                <p class="overview">${content.overview}</p>
                <button>View More</button>
            </div>
            `;
            template.className = `slide`;
            template.id=`slide-${index}`;
            template.name=`slide-${index}`;

            template.style=`
            background-image:url("https://image.tmdb.org/t/p/original/${content.backdrop_path}")
            `;

            template.querySelector("button").addEventListener("click", ()=>{
                this.showModal(content.id, content.title? "movie":"tv");
            });
            container.appendChild(template);
        });

        let navLinks = navs.querySelectorAll("a");
        navLinks.forEach((link, index)=> {
            link.addEventListener("click", e =>{
                e.preventDefault();
                let target = this._shadowRoot.querySelector(`#slide-${index}`);
                target.scrollIntoView();

                this._shadowRoot.querySelector(".active").classList.toggle("active");
                link.firstElementChild.classList.toggle("active");
            })
        });
    }

    showModal(id, category){
        let modal = document.createElement("detail-modal");
        modal.category = category;
        modal.id = id;
        document.querySelector("body").append(modal);
    }
}

customElements.define("item-slider", ItemSlider);