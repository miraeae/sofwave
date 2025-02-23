document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)

    // 쿠키 저장
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    // 쿠키 가져오기
    function getCookie(name) {
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const cookie = cookieArray[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring((name + '=').length);
            }
        }
        return null;
    }

    const hasVisited = getCookie("visited");
    //console.log(hasVisited);

    if (hasVisited) {
        introEnable = false;
        //console.log("introEnable false");
    } else {
        introEnable = true;
        setCookie("visited", "true", 1);
        //console.log("introEnable true");
    }

    // Disable scrolling until the intro ends
    lenis.stop();

    intro(); // 0 - 1
    introduce(); // 2
    section(); // 3 - 6
    layout();
});


// 부드럽게 스크롤
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
    lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)


////////// 0 - 1. Intro, Hero
function intro() {
    // 0. Intro
    const intro = document.getElementById("intro");
    const introTl = gsap.timeline({paused: true, default: {ease: "power4.out"}})

    introTl
    //.to({},{delay:0.2})
    .fromTo(".intro__logo-ico", {yPercent: 100, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1, duration: 1})
    .to(".intro__logo-ico", {left:0, duration: 1})
    .fromTo(".intro__logo-text", {xPercent: 30, autoAlpha: 0}, {xPercent: 0, autoAlpha: 1, duration: 1})
    .to(".intro__bg-overlay", {xPercent: 100, duration: 3}, '-=1')
    .to(".intro", {autoAlpha: 0, duration: 1, onComplete: () => onComplete()})

    function onComplete() {
        intro.remove();
        lenis.start();
        heroTl.play();
    }

    // 1. Hero
    const heroTl = gsap.timeline({paused: true});

    heroTl
    .to(".hero__contents", {autoAlpha: 1}) //FOUC 현상때문에 추가
    .from(".hero__title-wrap .hero__title", {opacity: 0, x: -100, duration: 1})
    .from(".hero__img-wrap .hero__img", {filter: "blur(5px)", scale: 1.2, duration: 1}, '<')
    .from(".hero__text", {opacity: 0, x: 50, duration: 1}, '-=50%')
    .fromTo(".hero__text .text-fill",
        {background: "linear-gradient(90deg, rgba(0,204,255,1) 0%, rgba(255,255,255,1) 0%)"},
        {background: 'linear-gradient(90deg, rgba(0,204,255,1) 100%, rgba(255,255,255,1) 100%)', duration: 2}, '-=0.8')
    .from(".hero__title-wrap .hero__badge", {opacity: 0, x: -100, duration: 1}, '-=1.5')
    .from(".hero__img-wrap .hero__img-desc", {opacity: 0, x: 20, duration:0.5}, '-=1')
    .from(".hero__title-wrap .hero__desc", {opacity: 0, y: 40 },'<')
    .fromTo(".hero__img-wrap .hero__img-desc .text-fill", 
        {background: "linear-gradient(90deg, rgba(0,204,255,1) 0%, rgba(255,255,255,1) 0%)"},
        {background: 'linear-gradient(90deg, rgba(0,204,255,1) 100%, rgba(255,255,255,1) 100%)', duration: 2},'-=0.5')

    
    $(window).scroll(function(){
        var wScroll = $(window).scrollTop();

        if(wScroll >= 50) {
            $(".hero__video-bg").addClass("active");
        } else {
            $(".hero__video-bg").removeClass("active");
        }
    });

    // 인트로 봤는지 확인
    // 이미 인트로를 봤다면 바로 Hero 시작
    if(introEnable == false) {
        intro.remove();
        lenis.start();
        heroTl.play();
    } else {
        introTl.play();
    }
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
    gsap.utils.toArray(".info__contents").forEach(content => {
        gsap.fromTo(content, {opacity:"0.3"}, {opacity: 1,
            scrollTrigger: {
                trigger: content,
                start: "top 80%",
                end: "30% bottom",
                scrub: 1,
                //markers: true,
            }
        })
    });

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
    .from(".func__list > li", {y:100, opacity:0, stagger:0.1,}, "-=0.2")



    ///// 2-3. Solution
    const mm = gsap.matchMedia();
    mm.add({
        isDesktop: `(min-width: 1025px)`,
        isMobile: `(max-width:1024px)`
    }, (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { isDesktop, isMobile } = context.conditions;

        if(isDesktop) {
            // Title Pin
            ScrollTrigger.create({
                trigger:'.solution__title-wrap',
                start:"top top",
                pin: true,
                endTrigger: ".solution__text-wrap",
                end: "bottom bottom",
                // markers: true,
                // id: "solutionTitPin"
            })

            // Img Box
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
        } else {
            //// isMobile
            // Img Box
            gsap.to(".solution__img-inner", { 
                scrollTrigger: {
                    trigger: ".solution",
                    start: "-=30% top",
                    end: () => '+=' + window.innerHeight * 1,
                    //markers: true,
                    scrub: 1,
                },
                width: "200vw",
                height: "200vw"
            })

            gsap.to(".solution", { 
                scrollTrigger: {
                    trigger: ".solution",
                    start: "-=45% top",
                    end: "center center",
                    //markers: true,
                    scrub: 1,
                },
                background : "#061020"
            })
        }
    
    });


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


////////// 3 - 6. 홍보영상, Contact, Media, SNS
function section() {
    ////////// 3. Promotion
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
        } else {
            ScrollTrigger.create({
                trigger: ".promotion",
                start: "-30% top",
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


    ////////// 4. Contact
    gsap.to(".contact__search-text", {text: { value: "소프웨이브" }, repeat:-1, repeatDelay:1, yoyo:true, duration: 2})


    ////////// 5. Media
    $('.media__board-item').hover(function(){
        var value=$(this).attr('data-src');
        $('.media__board-thum-box img').attr('src', value);
    });


    ////////// 6. Sns
    const swiper = new Swiper('.swiper', {
        slidesPerView: 2,
        spaceBetween: 15,
        slidesPerGroup: 1,
        loop: true,
        loopAdditionalSlides: 1, // 마지막 -> 처음 자연스러운 반복 기능
        grabCursor: true,
        //centeredSlides: true,
        //freeMode: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false, //스와이프 후 자동 재생 비활성화 false
        },
        breakpoints: {
            //브라우저가 1024보다 클 때
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            //브라우저가 768보다 클 때
            768: {
                slidesPerView: 3,
            }
        }
    });
}


////////// Layout
function layout() {

    // Header
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

    $(".gnb__sub-item > a, .gnb-mobile__sub-item > a").click(function(){
        $("html, body").animate({scrollTop : $(this.hash).offset().top}, 1000);
        return false;
    });

    // Gnb Mobile
    gsap.set(".gnb-mobile", {xPercent:100})

    $(".gnb-trigger").click(function() {
        $(this).toggleClass("active");
    
        if($(this).hasClass("active")){
            gsap.to(".gnb-mobile", {xPercent:0})
            $(".gnb-mobile__overlay").fadeIn(300);
        }else{
            gsap.to(".gnb-mobile", {xPercent:100})
            $(".gnb-mobile__overlay").fadeOut(300);
        }
    });

    $(".gnb-mobile__item > a").click(function() {
        $(this).toggleClass("active");
    
        if($(this).hasClass("active")){
            $(this).next(".gnb-mobile__sub-list").stop().slideDown(300);
        }else{
            $(this).next(".gnb-mobile__sub-list").stop().slideUp(300);
        }
    });


    // Footer
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