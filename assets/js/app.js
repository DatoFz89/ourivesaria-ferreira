/*==================================================
OURIVESARIA FERREIRA
MAIN.JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initHeader();

    initReveal();

    initBackToTop();

    initSmoothScroll();

    initLoader();

});

/*==================================================
HEADER
==================================================*/

function initHeader(){

    const header=document.querySelector(".header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}

/*==================================================
REVEAL
==================================================*/

function initReveal(){

    const elements=document.querySelectorAll(

        ".section-header,.collection-card,.service-card,.history-image,.history-content,.testimonial-card,.brand-item,.contact-item,.contact-form,.cta-box"

    );

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:.15

    });

    elements.forEach(el=>{

        el.classList.add("reveal");

        observer.observe(el);

    });

}

/*==================================================
SMOOTH SCROLL
==================================================*/

function initSmoothScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}

/*==================================================
LOADER
==================================================*/

function initLoader(){

    const loader=document.getElementById("loader");

    window.addEventListener("load",()=>{

        if(loader){

            loader.classList.add("loaded");

        }

        document.body.classList.add("loaded");

    });

}

/*==================================================
BACK TO TOP
==================================================*/

function initBackToTop(){

    const button=document.getElementById("backToTop");

    if(!button) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            button.classList.add("show");

        }else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*==================================================
MOBILE MENU
==================================================*/

function initMobileMenu(){

    const toggle=document.querySelector(".mobile-toggle");

    const menu=document.querySelector(".mobile-menu");

    if(!toggle || !menu) return;

    toggle.addEventListener("click",()=>{

        toggle.classList.toggle("active");

        menu.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

    menu.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click",()=>{

            menu.classList.remove("active");

            toggle.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    });

}

/*==================================================
PARALLAX HERO
==================================================*/

function initParallax(){

    const image=document.querySelector(".hero-video img");

    if(!image) return;

    window.addEventListener("scroll",()=>{

        const offset=window.pageYOffset;

        image.style.transform=`translateY(${offset*0.25}px) scale(1.08)`;

    });

}

/*==================================================
COUNTERS
==================================================*/

function initCounters(){

    const numbers=document.querySelectorAll("[data-count]");

    if(!numbers.length) return;

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const element=entry.target;

            const target=parseInt(element.dataset.count);

            let value=0;

            const speed=Math.max(10,target/120);

            const timer=setInterval(()=>{

                value+=speed;

                if(value>=target){

                    value=target;

                    clearInterval(timer);

                }

                element.textContent=Math.floor(value);

            },15);

            observer.unobserve(element);

        });

    });

    numbers.forEach(number=>observer.observe(number));

}

/*==================================================
INIT
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initHeader();

    initReveal();

    initSmoothScroll();

    initLoader();

    initBackToTop();

    initMobileMenu();

    initParallax();

    initCounters();

});

/*==================================================
CUSTOM CURSOR
==================================================*/



/*==================================================
HEADER HIDE / SHOW
==================================================*/

function initHeaderScroll(){

    const header=document.querySelector(".header");

    if(!header) return;

    let lastScroll=0;

    window.addEventListener("scroll",()=>{

        const current=window.pageYOffset;

        if(current>100){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

        if(current>250){

            if(current>lastScroll){

                header.style.transform="translateY(-100%)";

            }else{

                header.style.transform="translateY(0)";

            }

        }else{

            header.style.transform="translateY(0)";

        }

        lastScroll=current;

    });

}

/*==================================================
ACTIVE MENU
==================================================*/

function initActiveMenu(){

    const sections=document.querySelectorAll("section[id]");

    const links=document.querySelectorAll(".navigation a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-180;

            const height=section.offsetHeight;

            if(window.scrollY>=top && window.scrollY<top+height){

                current=section.getAttribute("id");

            }

        });

        links.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("active");

            }

        });

    });

}

/*==================================================
INIT EXTRA
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

   

    initHeaderScroll();

    initActiveMenu();

});


/*==================================================
GALLERY HOVER
==================================================*/

function initGallery(){

    const cards=document.querySelectorAll(".collection-card");

    cards.forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            card.style.setProperty("--x",x+"px");
            card.style.setProperty("--y",y+"px");

        });

    });

}

/*==================================================
BUTTON RIPPLE
==================================================*/

function initRipple(){

    document.querySelectorAll(".btn-gold,.header-button").forEach(button=>{

        button.addEventListener("click",function(e){

            const ripple=document.createElement("span");

            const rect=this.getBoundingClientRect();

            const size=Math.max(rect.width,rect.height);

            ripple.style.width=size+"px";
            ripple.style.height=size+"px";

            ripple.style.left=(e.clientX-rect.left-size/2)+"px";
            ripple.style.top=(e.clientY-rect.top-size/2)+"px";

            ripple.className="ripple";

            this.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },700);

        });

    });

}

/*==================================================
PRELOAD IMAGES
==================================================*/

function preloadImages(){

    document.querySelectorAll("img").forEach(img=>{

        const image=new Image();

        image.src=img.src;

    });

}

/*==================================================
CURRENT YEAR
==================================================*/

function updateYear(){

    const year=document.getElementById("year");

    if(year){

        year.textContent=new Date().getFullYear();

    }

}

/*==================================================
INITIALIZE EVERYTHING
==================================================*/

window.addEventListener("load",()=>{

    preloadImages();

    updateYear();

    initGallery();

    initRipple();

});

/*==================================================
END
==================================================*/

console.log("Ourivesaria Ferreira Premium v3.0 Loaded");


/*==================================================
MOBILE MENU
==================================================*/

const mobileToggle=document.querySelector(".mobile-toggle");

const navigation=document.querySelector(".navigation");

if(mobileToggle && navigation){

    mobileToggle.addEventListener("click",()=>{

        navigation.classList.toggle("active");

        mobileToggle.classList.toggle("active");

    });

    document.querySelectorAll(".navigation a").forEach(link=>{

        link.addEventListener("click",()=>{

            navigation.classList.remove("active");

            mobileToggle.classList.remove("active");

        });

    });

}
