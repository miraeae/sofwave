# 🌊SOFWAVE™ <br/>인터렉티브 사이트 클론 코딩
GSAP 라이브러리를 활용하여 인터렉티브한 요소를 중점적으로 구현하였으며, SCSS를 적용해 반응형으로 제작한 클론 코딩 프로젝트입니다.

- 제작기간: 2025.02.18 ~ 2025.02.21 + Refactor
- 사용언어: HTML, SCSS, JavaScript
- 라이브러리: jQuery, GSAP(ScrollTrigger, TextPlugin), Lenis
- 유형: 반응형
- [사이트 바로가기](https://miraeae.github.io/sofwave)

![Image](https://github.com/user-attachments/assets/bb63452b-31fe-4069-831f-905aa7bc8f62)

## 💡 Project Point
1. [인트로 하루에 한번만 활성화](#1-인트로-하루에-한번만-활성화)
2. [GSAP 반응형](#2-gsap-반응형)
3. [sticky를 이용한 pin효과](#3-sticky를-이용한-pin효과)
4. [반복문 사용](#4-반복문-사용)

***

### 1. 인트로 하루에 한번만 활성화
사용자의 편의성을 위해 하루에 한 번만 인트로가 활성화되도록 쿠키를 활용하여 제어했습니다.

![Image](https://github.com/user-attachments/assets/a242dd25-130f-46e7-8a9e-d2b83d54436e)

먼저, ```setCookie(name, value, days)``` 함수를 사용하여 쿠키를 설정했습니다. 이 함수는 쿠키의 이름, 값, 그리고 만료 기간을 지정하며, 설정된 기간(일 단위) 후 만료되도록 합니다.
```
function setCookie(name, value, days) {
    const date = new Date(); // Data 객체 생성
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // 파라미터로 받은 day(기간)을 data 객체에 담기
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`; // cookie 셋팅
}
```

- ```new Date()```는 현재 날짜와 시간을 나타내는 객체를 생성
- (1000 * 60 * 60 * 24) 는 밀리초를 날짜로 변환하기 위해 사용되며, 1일은 24시간 * 60분 * 60초 * 1000밀리초 로 표현

<br/>

쿠키 값을 가져오는 ```getCookie(name)``` 함수로 저장된 쿠키 목록에서 특정 쿠키 값을 찾아 반환합니다.
```
function getCookie(name) {
    const cookieArray = document.cookie.split(';'); // 쿠키를 배열로 분리
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();
        if (cookie.startsWith(name + '=')) { // 해당 쿠키가 존재하는지 확인
            return cookie.substring((name + '=').length);
        }
    }
    return null; // 쿠키가 없으면 null 반환
}
```

<br/>

위 두 함수를 활용하여, 첫 방문 시 visited 쿠키를 저장하게 했습니다.
```
const hasVisited = getCookie("visited");

if (hasVisited) {
    introEnable = false;
} else {
    introEnable = true;
    setCookie("visited", "true", 1); // visited란 이름의 true라는 값을 가진 1일 동안 유지되는 쿠키 저장
}
```
![Image](https://github.com/user-attachments/assets/59186064-f6f8-4a89-8e06-23582f6beb0b)

로컬에선 확인이 불가하기 때문에 깃허브 페이지에 push 하여 쿠키가 잘 저장되는 것을 확인했습니다. 이렇게 저장된 쿠키 존재 여부에 따라 인트로 유무를 판단할 수 있는 로직을 작성했습니다.

```
if (introEnable == false) {
    intro.remove(); // 이미 방문한 경우 인트로를 제거
    lenis.start();
    heroTl.play(); // Hero 애니메이션 즉시 재생
} else {
    introTl.play(); // 첫 방문 시 인트로 활성화
}
```

<br/>

추가로 Intro 애니메이션엔 ```onComplete```를 사용하여 끝났을때 Hero 애니메이션이 실행되게 했습니다.
```
    introTl
    ···
    .to(".intro", {autoAlpha: 0, duration: 1, onComplete: () => onComplete()})

    function onComplete() {
        intro.remove();
        lenis.start();
        heroTl.play();
    }
```
* onComplete: 애니메이션이 완료되면 실행할 콜백함수를 받음

***
### 2. GSAP 반응형

![Image](https://github.com/user-attachments/assets/77722ed2-cbf8-432c-880f-d0f667d9200a)

솔루션 섹션에 효과가 PC와 Mobile이 달랐습니다. 이를 구현하기위해 GSAP 반응형인 ```matchMedia```를 사용했습니다.
- PC: 타이틀 고정, 직사각형이 커짐
- Mobile: 고정X, 원형이 커지며, 배경 컬러가 서서히 변경됨

```
    const mm = gsap.matchMedia();
    mm.add({
        isDesktop: `(min-width: 1025px)`,
        isMobile: `(max-width:1024px)`
    }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if(isDesktop) {
            // Title Pin
            ScrollTrigger.create({
                trigger:'.solution__title-wrap',
                start:"top top",
                pin: true,
                endTrigger: ".solution__text-wrap",
                end: "bottom bottom",
            })

            // Img Box
            gsap.to(".solution__img-inner", { 
                scrollTrigger: {
                    trigger: ".solution",
                    start: "top top",
                    end: () => '+=' + window.innerHeight * 1,
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
                    scrub: 1,
                },
                background : "#061020"
            })
        }
    });
```

***
### 3. sticky를 이용한 pin효과
해당 사이트는 섹션마다 배경이 고정되는 효과가 많습니다. GSAP ScrollTrigger의 Pin을 사용할 수 있지만 간단하게 구현하고 싶은 곳은 ```position:sticky```을 사용했습니다.

- sticky: 최초 relative속성과 같이 동작하다가, 스크롤시 지정 지점에서 요소를 고정시킴

sticky는 주의할 점이 부모 요소 중에 overflow: hidden, auto, scroll 속성이 적용되어 있으면 안 됩니다. 또한, 부모의 height 값만큼 고정이 되기 때문에 부모 태그가 높이 값이 없다면 고정되지 않습니다. 예를 들어 자식 태그에 absolute 속성을 사용하여 부모 태그가 height 값이 잡히지 않는 경우엔 따로 높이 값을 지정해 주어야 합니다.
```
.info {
    &__bg{
        height:100vh;
        position: sticky;
        top:0;
}
```
***
### 4. 반복문 사용

![Image](https://github.com/user-attachments/assets/aaa651b1-97c4-4071-b436-f6efcca0b776)

반복되는 효과엔 반복문을 사용하여 코드 길이를 줄였습니다. 마지막 아이템만 다음 아이템으로 가는 과정이 없기 때문에 if문을 사용하여 따로 작성해 줬습니다.
```
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
```

