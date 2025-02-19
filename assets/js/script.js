document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger, TextPlugin)

    header();

    hero();
    introduce();
    promotion();
    contact();
    media();
    sns();

    footer();

});


////////// 0-1. Intro




////////// 0-2. Common
// 부드럽게 스크롤
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
    lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)


// Header
function header() {
    const gnbItem = gsap.utils.toArray(".gnb__list > li > a");

    $(gnbItem).each(function (i, item) {
        var gnbTl = new gsap.timeline({ paused: true, reversed: true });
        gnbTl
        .to(gnbItem[i], { duration: 0.5, text: gnbItem[i].getAttribute('data-text')}, 0);

        $(item).hover(function(){
            gnbTl.play();
        },function(){
            gnbTl.pause(2).reverse();
        });

    });

    $(".gnb__sub-item > a").click(function(){
        $("html, body").animate({scrollTop : $(this.hash).offset().top}, 1000);
        return false;
    });
}


////////// 1. Hero
function hero() {
const heroTl = gsap.timeline({ default: {duration: 1}});

heroTl
.from(".hero__title-wrap .hero__title", {opacity: 0, x: -100}, 0.5)
.from(".hero__title-wrap .hero__badge", {opacity: 0, x: -100}, '-=50%')
.from(".hero__title-wrap .hero__desc", {opacity: 0, y: 40 },'-=50%')

.from(".hero__img-wrap .hero__img", {filter: "blur(5px)", scale: 1.2}, '-=1')
.from(".hero__img-wrap .hero__img-desc", {opacity: 0, x: 20, duration:0.5})
.fromTo(".hero__img-wrap .hero__img-desc .text-fill", 
    {background: "linear-gradient(90deg, rgba(0,204,255,1) 0%, rgba(255,255,255,1) 0%)"},
    {background: 'linear-gradient(90deg, rgba(0,204,255,1) 100%, rgba(255,255,255,1) 100%)', duration: 3})

.from(".hero__text", {opacity: 0, x: 50}, '-=3.5')
.fromTo(".hero__text .text-fill",
    {background: "linear-gradient(90deg, rgba(0,204,255,1) 0%, rgba(255,255,255,1) 0%)"},
    {background: 'linear-gradient(90deg, rgba(0,204,255,1) 100%, rgba(255,255,255,1) 100%)', duration: 3}, '<')
}



////////// 2. SOFWAVE 소개
function introduce() {

    ///// 2-0. Common - Fill text
    gsap.utils.toArray(".sec:not(.hero, .solution) .text-fill").forEach(text => {
        gsap.fromTo(text, {
            background: "linear-gradient(90deg, rgb(0,204,255) 0%, rgb(255,255,255) 0%)"
          },{
            background: "linear-gradient(90deg, rgb(0,204,255) 100%, rgb(255,255,255) 100%)",
            duration: 2,
            scrollTrigger: {
              trigger: text,
              // pinnedContainer: text,
              start:'top 70%',
              end:'bottom 60%',
              //markers:true,
              scrub:1
            }
          })
    });


    ///// 2-1. Info
    gsap.utils.toArray(".info__row").forEach(row => {
        gsap.fromTo(row, {opacity:"0.3"}, {opacity: 1,
            scrollTrigger: {
                trigger: row,
                start: "top 80%",
                end: "30% bottom",
                scrub: 1,
                //markers: true,
            }
        })
    });
    

    // const infoLineTl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: ".info__approve-title",
    //         start: "top center",
    //         end: "bottom center",
    //         scrub: 1,
    //         markers: true,
    //     }
    // });

    // infoLineTl
    // .fromTo(".info__approve-title-line svg:first-child", {width: '0'}, {width: '320px'})
    // .fromTo(".info__approve-title-line svg:last-child", {width: '0'}, {width: '320px'}, "-=50%")

    const awardTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".info__award",
            start: "top 80%",
            end: "top 40%",
            //markers: true,
            scrub: 1,
            toggleActions: "play none none reverse",
        }
    })
    awardTl
    .from(".info__award-title", {y:100, opacity:0})
    .from(".info__award-list > li", {y:100, opacity:0, stagger:0.1,}, "-=0.2")



    ///// 2-2. Function
    gsap.to(".func__bg-img", {width:"100%", height:"100%",
        scrollTrigger: {
            trigger: ".func",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            //markers: true,
        }
    });

    const funcTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".func__title",
            start: "top center",
            end: "bottom center",
            scrub: 1,
            //markers: true
        }
    });

    funcTl
    .to(".func__title-line", {width:0})
    .from(".func__desc", {y:100, opacity:0})
    .from(".func__list > li", {y:-100, opacity:0, stagger:0.1,}, "-=0.2")



    ///// 2-3. Solution
    ScrollTrigger.create({
        trigger:'.solution__title-wrap',
        start:"top top",
        pin: true,
        endTrigger: ".solution__text-wrap",
        end: "bottom bottom",
        // markers: true,
        // id: "solutionTitPin"
    })


    gsap.to(".solution__img-inner", { 
        scrollTrigger: {
            trigger: ".solution",
            start: "top top",
            end: () => '+=' + window.innerHeight * 1,
            //markers: true,
            scrub: 1,
        },
        width: "100%",
        height: "100%",
        "border-radius": "0",
    })


    gsap.utils.toArray(".solution__merit > li").forEach(item => {
        gsap.to(item, {opacity: 1, "color": "#00d8ff",
            scrollTrigger: {
                trigger: item,
                start: "top 55%",
                end: "bottom 55%",
                //markers: true,
                scrub: 1,
            },
        })

    })

    gsap.utils.toArray(".solution .text-fill").forEach(text => {
        gsap.fromTo(text, {
            background: "linear-gradient(90deg, rgb(255,255,255) 0%, rgb(87,89,104) 0%)"
          },{
            background: "linear-gradient(90deg, rgb(255,255,255) 100%, rgb(87,89,104) 100%)",
            duration: 2,
            scrollTrigger: {
              trigger: text,
              start:'top 70%',
              end:'bottom 60%',
              //markers:true,
              scrub:1
            }
          })
    });


    ///// 2-4. Effect
    ScrollTrigger.create({
        trigger: ".effect",
        start: "top top",
        end:'bottom+=400% bottom',
        pin: true,
        scrub: 2,
    })

    gsap.set(".effect__item-logo img", {yPercent: 120})
    gsap.set(".effect__item-logo img.reverse", {yPercent: -120})
    gsap.set(".effect__item-text span span", {yPercent: 100})

    const effectTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".effect",
            start: "top top",
            end:'bottom+=400% bottom',
            scrub: 1,
        }
    });

    // 반복문
    for (let i = 1; i < 4; i++) {
        if(i < 3){
            effectTl
            .to(`.effect__nav-bar:nth-of-type(${i})`, {width: "40px"})
            .to(`.effect__item:nth-child(${i}) .effect__item-logo img, .effect__item:nth-child(${i}) .effect__item-text span span`, {yPercent: 0}, '<')
            .to(`.effect__item:nth-child(${i}) .effect__item-logo img, .effect__item:nth-child(${i}) .effect__item-text span span`, {yPercent: -100})
            .to(`.effect__nav-bar:nth-of-type(${i})`, {width: "25px"}, '<')
        } else {
            effectTl
            .to(`.effect__nav-bar:nth-of-type(${i})`, {width: "40px"})
            .to(`.effect__item:nth-child(${i}) .effect__item-logo img`, {yPercent: 0}, '<')
        }
    }
}


function promotion() {
    let promotionTl = gsap.timeline({paused: true});
    promotionTl
    .from(".promotion__img-wrap", {x: -100, opacity: 0})
    .from(".promotion__marquee--top", {opacity: 0, top:0}, "-=50%")
    .from(".promotion__marquee--btm", {opacity: 0, bottom:0}, "-=50%")
    .from(".promotion__video-box",1, {opacity: 0})
    .fromTo('.promotion__img-wrap img', {filter: "brightness(1)"},{filter: "brightness(0.7)", duration:1 },'-=100%')


    const mm = gsap.matchMedia();

    mm.add({
        isDesktop: `(min-width: 1025px)`,
        isMobile: `(max-width:1024px)`
    }, (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { isDesktop, isMobile } = context.conditions;

        if(isDesktop) {
            ScrollTrigger.create({
                trigger: ".promotion",
                start: "top top",
                pin: true,
                pinSpacing: true,
                end: "bottom+=200% bottom",
                scrub: 2,
                onEnter: () => {
                    promotionTl.play();
                },
                onLeaveBack: () => {
                    promotionTl.reverse();
                },
            });
        }
    })
}

function contact() {
    //var textArray = ["소프웨이브", "Sofwave"];

    //const contactTl = gsap.timeline({repeat:-1, repeatDelay:1, yoyo:true, duration: 2}); /* repeat:3, repeatDelay:1,  */
    // contactTl
    // .to(".contact__search-text", {text:messages})

    // const tl = gsap.timeline({ delay: 2 });

    // for (let i = 0; i < 2; i++) {
    //     contactTl
    //     .to(".contact__search-text", {text: textArray[i] , ease: "none"})
    //     .to(".contact__search-text", {text: textArray[i] , ease: "none"})
    // }

    const contactTl = gsap.timeline({repeat:-1, repeatDelay:1, yoyo:true, duration: 4});

    contactTl
    .to(".contact__search-text", {text: { value: "소프웨이브" }})

}

function media() {
    $('.media__board-item').hover(function(){
        var value=$(this).attr('data-src');
        $('.media__board-thum-box img').attr('src', value);
    });
}


function sns() {
    const swiper = new Swiper('.swiper', {
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        //centeredSlides: true,
        //freeMode: true,
        autoplay: {
            delay: 5000,
            //disableOnInteraction: false,
        },
        breakpoints: {
            1280: {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            720: {
                slidesPerView: 3,
                slidesPerGroup: 1,
            }
        }
    });
}


function footer() {
    $(".top-btn").click(function(){
        $("html, body").animate({scrollTop : 0}, 1000);
        return false;
    });

    $(".brand-site").hover(function(){
        $(".brand-site__list").stop().slideDown(300);
    }, function(){
        $(".brand-site__list").stop().slideUp(300);
    }
    );
}