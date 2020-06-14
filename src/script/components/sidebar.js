import { html, css } from '../utils/helper';
import synema_logo from '../../assets/Synema.png';

class SideBar extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'})
        let style = css`
            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
            }

            :host{
                display:block;    
            }
        
            #sidebar{
                width:3rem;
                height:100vh;
                position:fixed;
                top:0;
                left:0;
                background:var(--primary);
                color:var(--secondary);
                transition:width 300ms ease-in-out;
                z-index:4;
            }

            #sidebar:hover{
                width:12rem;
            }

            ul.navbar-nav{
                list-style:none;
                width:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
            }
            
            .nav-item{
                width:100%;
                box-sizing:border-box;
            }

            .nav-text{
                transform: scaleY(0);
                transition:200ms ease-out;
            }
                
            #sidebar:hover .nav-text{
                transform: scaleY(1);
            }

            .nav-link > svg{
                color:var(--secondary);
                min-width:2rem;
                margin: 0 .5rem;
            }

            .nav-link{
                color:var(--secondary);
                display:flex;
                align-items:center;
                height:3rem;
                text-decoration:none;
                filter: grayscale(100%) opacity(.6);
                transition:100ms;
            }

            .logo{
                display:flex;
                align-items:center;
                height:4rem;
            }

            .nav-link:hover{
                filter:grayscale(0) opacity(1);
                background:var(--primary-accent);
                opacity:1;
            }

            .active{
                transition: border 200ms ease-in-out;
                border-left: .25rem solid var(--primary-accent);
                filter:grayscale(0) opacity(1) ;
            }

            .logo img{
                width:3rem;
                height:3rem;
                transition:300ms;
                transform: rotate(0deg);
            }

            .logo svg{
                transform: scaleY(0);
                transition: 200ms ease-in-out;
            }

            .logo:hover img{
                transform:rotate(360deg);
            }

            #sidebar:hover .logo svg{
                transform:scaleY(1);
            }
        `;

        let template = html`
            <nav id="sidebar">   
                <ul class="navbar-nav">
                    <li class="nav-item logo">
                        <img src="${synema_logo}" alt="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="129.144" height="30.848" viewBox="0 0 129.144 30.848">
                            <g id="logo_md" transform="translate(10.176 8.592)">
                                <path id="syn_accent" d="M16.96-6.08c0-8.256-12.032-4.672-12.032-10.432,0-2.4,1.888-3.648,4.288-3.584,2.72.032,4.128,1.728,4.32,3.232h3.2c-.352-3.392-3.136-5.728-7.392-5.728-4.416,0-7.392,2.5-7.392,6.176,0,8.288,12.064,4.448,12.064,10.464,0,2.112-1.664,3.712-4.48,3.712-3.1,0-4.416-1.856-4.608-3.712h-3.1C1.888-2.272,5.056.224,9.536.224,14.368.224,16.96-2.912,16.96-6.08ZM27.9-3.328,22.4-17.536H19.168L26.24-.192,22.784,8.256h3.008l10.56-25.792H33.344ZM52.1,0h2.88V-10.336c0-5.024-3.1-7.52-7.168-7.52a6.478,6.478,0,0,0-5.632,2.816v-2.5H39.264V0h2.912V-9.7c0-3.776,2.048-5.632,5.024-5.632,2.944,0,4.9,1.824,4.9,5.408Z" transform="translate(-12 14)" fill="#f4841a"/>
                                <path id="ema_secondary" d="M9.92-15.36c3.008,0,5.568,1.888,5.536,5.312H4.384A5.431,5.431,0,0,1,9.92-15.36Zm8.192,9.952H14.976a4.819,4.819,0,0,1-4.928,3.232,5.513,5.513,0,0,1-5.7-5.5H18.368a15.785,15.785,0,0,0,.1-1.76,8.038,8.038,0,0,0-8.416-8.384c-5.12,0-8.672,3.488-8.672,9.024,0,5.568,3.68,9.088,8.672,9.088C14.4.288,17.216-2.208,18.112-5.408ZM47.616,0H50.5V-10.336c0-5.024-3.1-7.52-7.1-7.52a6.492,6.492,0,0,0-6.208,3.9,6.6,6.6,0,0,0-6.432-3.9,6.339,6.339,0,0,0-5.536,2.848v-2.528H22.3V0h2.912V-9.664c0-3.776,2.016-5.664,4.96-5.664,2.88,0,4.8,1.824,4.8,5.408V0h2.88V-9.664c0-3.776,2.016-5.664,4.96-5.664,2.88,0,4.8,1.824,4.8,5.408Zm6.56-8.832c0,5.44,3.616,9.12,8.288,9.12a7.324,7.324,0,0,0,6.56-3.552V0h2.944V-17.536H69.024v3.2A7.277,7.277,0,0,0,62.5-17.824C57.792-17.824,54.176-14.3,54.176-8.832ZM69.024-8.8c0,4.128-2.752,6.528-5.952,6.528s-5.92-2.432-5.92-6.56,2.72-6.464,5.92-6.464S69.024-12.864,69.024-8.8Z" transform="translate(47 14)" fill="#b0b5b5"/>
                            </g>
                        </svg>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link active" data-tab="movie">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-film">
                                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                                <line x1="7" y1="2" x2="7" y2="22"></line>
                                <line x1="17" y1="2" x2="17" y2="22"></line>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <line x1="2" y1="7" x2="7" y2="7"></line>
                                <line x1="2" y1="17" x2="7" y2="17"></line>
                                <line x1="17" y1="17" x2="22" y2="17"></line>
                                <line x1="17" y1="7" x2="22" y2="7"></line>
                            </svg>
                            <span class="nav-text">Movies</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link" data-tab="tv">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tv">
                                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                                <polyline points="17 2 12 7 7 2"></polyline>
                            </svg>
                            <span class="nav-text">TVs</span>
                        </a>
                    </li>
                </ul>
            </nav>
        `;

        this._shadowRoot.append(style);
        this._shadowRoot.append(template);

        let navLinks = this._shadowRoot.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", e =>{
                e.preventDefault();
                this._shadowRoot.querySelector(".active").classList.toggle("active");
                link.classList.toggle("active");
                let contentTabs = document.querySelector("content-tabs");
                contentTabs.tab = link.dataset.tab;
                document.querySelector("item-slider.visible").classList.toggle("visible");
                document.querySelector(`item-slider#${link.dataset.tab}`).classList.toggle("visible");
            });
        });
    }
}

customElements.define("side-bar",SideBar);