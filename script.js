// 구글 폰트 받아오는 함수
(function(d) {
  var config = {
    kitId: 'zfl2fti',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);


// 클릭 이벤트 : content 이동
const buttonEl = document.querySelector('.contents__button');
const contentsEl = document.querySelector('.contents');
buttonCount = 0;

buttonEl.addEventListener('click', move);

function move() {
    if (buttonCount == 0) {
      contentsEl.style.transform = `translateY(-254px)`;
      buttonCount += 1;
    } else {
      contentsEl.style.transform = `translateY(0)`;
      buttonCount -= 1;
    }
};


// 드래그 이벤트 : 저금통 슬라이드
let slider = document.querySelector('.contents__moneybox');
let innerSlider = document.querySelector('.moneybox__slider');
let pressed = false;
let startX;
let X;

slider.addEventListener("mousedown", e => {
  pressed = true;
  startX = e.offsetX - innerSlider.offsetLeft;
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseenter", () => {
  slider.style.cursor = "grab"
});

slider.addEventListener("mouseup", () => {
  slider.style.cursor = "grab"
});

window.addEventListener("mouseup", () => {
  pressed = false
});

slider.addEventListener("mousemove", e => {
  if (!pressed) return
  e.preventDefault()
  X = e.offsetX

  innerSlider.style.left = `${X - startX}px`
  checkboundary()
});

function checkboundary() {
  let outer = slider.getBoundingClientRect()
  let inner = innerSlider.getBoundingClientRect()

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = "0px"
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`
  }
};


// json 받아온 뒤 함수에 전달
fetch('https://gyoheonlee.github.io/mobile-bank/data/bank-new.json')
.then( response => response.json() )
.then( data => {
  let account = data;
  let obj = data.bankList;
  start(obj);
});

// json 데이터 담을 배열 상자 생성
let count = 0;
let getDate = [];
let getIncome = [];
let getClassify = [];
let getName = [];
let getPrice = [];


function start(obj, acount) {
// 받아온 js 데이터 값을 배열상자에 저장하는 함수
  count = obj.length;
  console.log(count);

  for (i=0; i<count; i+=1) {
    getDate[i] = obj[count-i-1].date;
    getIncome[i] = obj[count-i-1].income;
    getClassify[i] = obj[count-i-1].classify;
    getName[i] = obj[count-i-1].history;
    getPrice[i] = obj[count-i-1].price;
  }
  
  console.log(getName)
//해당하는 위치에 json 배열 데이터 
//DOM
const outUl = document.querySelector('.dailyHistory');

// let dateArr = [0];
// let arrIndex = 0;
// function dateCount() {
//   for (let k=0; k<count; k+=1) {
//     // reset
//     if (k === 0) {
//       dateArr[arrIndex] += 1;
//     } else if (getDate[k] === getDate[k-1]){
//       dateArr[arrIndex] += 1;
//     } else {
//       arrIndex += 1;
//       dateArr[arrIndex] = 0;
//       dateArr[arrIndex] += 1;
//     }
//   }
// }
// dateCount();


let outerIndex = 0;
let innerIndex = 0;
for (let i=0; i<count; i+=1 ) {
  if (i === 0) {
    const liElem = document.createElement('li');
    const UlElem = document.createElement('ul');
    const outerDiv = document.createElement('div');
    const innerDiv1 = document.createElement('div');
    const innerDiv2 = document.createElement('div');

    outUl.appendChild(liElem).className = 'dailyHistory__li';
    outUl.children[0].appendChild(outerDiv).className = 'date__sum';
    outUl.children[0].appendChild(UlElem).className = 'historyDetails';
    outUl.children[0].children[0].appendChild(innerDiv1);
    outUl.children[0].children[0].appendChild(innerDiv2);
    outUl.children[0].children[0].children[0].className = 'date';
    outUl.children[0].children[0].children[1].className = 'sum';
    outUl.children[0].children[0].children[0].textContent = getDate[i];
    
    const liInner = document.createElement('li');
    const priceDiv = document.createElement('div');
    outUl.children[0].children[1].appendChild(liInner).className = 'historyDetails__li';
    outUl.children[0].children[1].children[innerIndex].textContent = getName[i];
    outUl.children[0].children[1].children[innerIndex].appendChild(priceDiv).className = 'historyDetails__price';
    priceDiv.textContent = getPrice[i];

    innerIndex += 1;

  } else if (getDate[i] === getDate[i-1]) {
    
    const liInner = document.createElement('li');
    const priceDiv = document.createElement('div');
    outUl.children[outerIndex].children[1].appendChild(liInner).className = 'historyDetails__li';
    outUl.children[outerIndex].children[1].children[innerIndex].textContent = getName[i];
    outUl.children[outerIndex].children[1].children[innerIndex].appendChild(priceDiv).className = 'historyDetails__price';
    priceDiv.textContent = getPrice[i];

    innerIndex += 1;

  } else {
    outerIndex += 1;
    innerIndex = 0;

    const liElem = document.createElement('li');
    const UlElem = document.createElement('ul');
    const outerDiv = document.createElement('div');
    const innerDiv1 = document.createElement('div');
    const innerDiv2 = document.createElement('div');

    outUl.appendChild(liElem).className = 'dailyHistory__li';
    outUl.children[outerIndex].appendChild(outerDiv).className = 'date__sum';
    outUl.children[outerIndex].appendChild(UlElem).className = 'historyDetails';
    outUl.children[outerIndex].children[0].appendChild(innerDiv1);
    outUl.children[outerIndex].children[0].appendChild(innerDiv2);
    outUl.children[outerIndex].children[0].children[0].className = 'date';
    outUl.children[outerIndex].children[0].children[1].className = 'sum';
    outUl.children[outerIndex].children[0].children[0].textContent = getDate[i];

    const liInner = document.createElement('li');
    const priceDiv = document.createElement('div');
    outUl.children[outerIndex].children[1].appendChild(liInner).className = 'historyDetails__li';
    outUl.children[outerIndex].children[1].children[innerIndex].textContent = getName[i];
    outUl.children[outerIndex].children[1].children[innerIndex].appendChild(priceDiv).className = 'historyDetails__price';
    priceDiv.textContent = getPrice[i];
    innerIndex += 1;
  }
}
console.log(outUl);
}