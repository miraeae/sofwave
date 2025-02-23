# 🌊SOFWAVE™ <br/>인터렉티브 사이트 클론 코딩
GSAP 라이브러리를 활용하여 인터랙티브한 요소를 중점적으로 구현한 클론 코딩 사이트입니다.

- 제작기간: 2025.02.18 ~ 2025.02.21 (4일)
- 사용언어: HTML, SCSS, JavaScript
- 라이브러리: jQuery, GSAP(ScrollTrigger, TextPlugin)
- 유형: 반응형
- [사이트 바로가기](https://miraeae.github.io/sofwave)

## 💡 Project Point
1. [인트로 하루에 한번만 활성화](#1-인트로-하루에-한번만-활성화)

<br/>

***

### 1. 인트로 하루에 한번만 활성화
사용자의 편의성을 위해 하루에 한 번만, 첫 방문 시에만 인트로가 표시되도록 쿠키를 활용하여 제어했다.
```
function setCookie(name, value, days) {
    const date = new Date(); // Data 객체 생성
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // 파라미터로 받은 day(기간)을 data 객체에 담기
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`; // cookie 셋팅
}
```
먼저, <code>setCookie(name, value, days)</code> 함수를 사용하여 쿠키를 설정했다. 이 함수는 쿠키의 이름, 값, 그리고 만료 기간을 지정하며, 설정된 기간(일 단위) 후 만료되도록 한다. 
<code>new Date()</code>는 현재 날짜와 시간을 나타내는 객체를 생성하며, (1000 * 60 * 60 * 24) 는 밀리초를 날짜로 변환하기 위해 사용되며, 1일은 24시간 * 60분 * 60초 * 1000밀리초 로 표현된다.

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
쿠키 값을 가져오는 <code>getCookie(name)</code> 함수로 저장된 쿠키 목록에서 특정 쿠키 값을 찾아 반환한다. 위 두 함수를 활용하여, 사용자가 이미 인트로를 본 적이 있는지를 확인하는 로직을 작성했다.
```
const hasVisited = getCookie("visited");

if (hasVisited) {
    introEnable = false;
} else {
    introEnable = true;
    setCookie("visited", "true", 1); // visited란 이름의 true라는 값을 가진 1일 동안 유지되는 쿠키 저장
}
```
```
if (introEnable == false) {
    intro.remove(); // 이미 방문한 경우 인트로를 비활성화
    lenis.start();
    heroTl.play(); // Hero 애니메이션 즉시 재생
} else {
    introTl.play(); // 첫 방문 시 인트로 활성화
}
```
사용자가 사이트를 처음 방문하면 인트로가 활성화되며, 이후에는 하루 동안 다시 나타나지 않게 구현했다.
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
추가로 Intro 애니메이션엔 <code>onComplete: 애니메이션이 완료되면 실행할 콜백함수를 받음</code>을 사용하여 끝났을때 Hero 애니메이션이 실행되게 했다.
