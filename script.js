moneyBoxSlider();
historySlider();

//계좌에 따라 색상 지정
let sections = document.querySelectorAll('section');
const countSections = sections.length;
let colorArr = [['#FFDB4C', '#FF5F00', '#FEB700'],['#4C89FF','#55ACEE', '#005F59'],['#C64CFF', '#0A73C3', '#EEBA00']];

for (i=0; i<countSections; i+=1) {
  if (true){
    const expenditure = sections[i].querySelector('.expenditure');
    expenditure.style.backgroundColor = colorArr[i][0];
    const innerBox1 = sections[i].querySelector('.innerBox1');
    innerBox1.style.backgroundColor = colorArr[i][1];
    const innerBox2 = sections[i].querySelector('.innerBox2');
    innerBox2.style.backgroundColor = colorArr[i][2];
  }
};



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
function moneyBoxSlider() {
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
  } 
};


// 드래그 이벤트 : 거래내역 슬라이드
function historySlider() {
  let slider = document.querySelector('.contents__history');
  let innerSlider = document.querySelector('.dailyHistory');
  let pressed = false;
  let startY;
  let Y;

  slider.addEventListener("mousedown", e => {
    pressed = true;
    startY = e.offsetY - innerSlider.offsetTop;
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
    Y = e.offsetY

    innerSlider.style.top = `${Y - startY}px`
    checkboundary()
  });

  function checkboundary() {
    let outer = slider.getBoundingClientRect()
    let inner = innerSlider.getBoundingClientRect()

    if (parseInt(innerSlider.style.top) > 0) {
      innerSlider.style.top = "0px"
    } else if (inner.bottom < outer.bottom) {
    innerSlider.style.top = `-${inner.width - outer.width}px`;
    }
  }
};


// json 받아온 뒤 함수에 전달
let urls = ['https://gyoheonlee.github.io/mobile-bank/data/bank-new.json', 'https://gyoheonlee.github.io/mobile-bank/data/bank-mother.json', ''];
urls.forEach((url, index) => {
  fetch(url)
  .then( response => response.json() )
  .then( data => {
    let obj = data.bankList;
    start(obj, index);
  })
});

// json 데이터 담을 배열 상자 생성
let count = 0;
let getDate = [];
let getIncome = [];
let getClassify = [];
let getName = [];
let getPrice = [];
let getPriceSum = [];

// 받아온 js 데이터 값을 배열상자에 저장하는 함수
function start(obj, index) {
  count = obj.length;
  console.log(count);

  for (i=0; i<count; i+=1) {
    getDate[i] = obj[count-i-1].date;
    getIncome[i] = obj[count-i-1].income;
    getClassify[i] = obj[count-i-1].classify;
    getName[i] = obj[count-i-1].history;
    //price에만 1000단위 기호 추가
    getPrice[i] = obj[count-i-1].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    getPriceSum[i] = obj[count-i-1].price;
  }

//해당하는 위치에 json 배열 데이터 
//DOM
//변수
let priceSum = 0; // 변하는 값이니까 let으로 선언해야함, 오타조심!
let outerIndex = 0;
let innerIndex = 0;
//실행함수
const outUl = sections[index].querySelector('.dailyHistory');
for (let i=0; i<count; i+=1) {
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

    if (getIncome[i] === 'in') {
      priceDiv.textContent = `+ ${getPrice[i]}`;
      priceDiv.style.color = '#FF5F00';
    } else {
      priceDiv.textContent = getPrice[i];
    };
  
    priceSum = getPriceSum[0];

    innerIndex += 1;

  } else if (getDate[i] === getDate[i-1]) {
    const liInner = document.createElement('li');
    const priceDiv = document.createElement('div');
    outUl.children[outerIndex].children[1].appendChild(liInner).className = 'historyDetails__li';
    outUl.children[outerIndex].children[1].children[innerIndex].textContent = getName[i];
    outUl.children[outerIndex].children[1].children[innerIndex].appendChild(priceDiv).className = 'historyDetails__price';
    if (getIncome[i] === 'in') {
      priceDiv.textContent = `+ ${getPrice[i]}`;
      priceDiv.style.color = '#FF5F00';
    } else {
      priceDiv.textContent = getPrice[i];
    };
    priceSum += getPriceSum[i];
    if (getDate[i] !== getDate[i+1]) {
      let priceSumResult = priceSum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      outUl.children[outerIndex].children[0].children[1].textContent = `${priceSumResult}원 지출`;
    };

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

    if (getIncome[i] === 'in') {
      priceDiv.textContent = `+ ${getPrice[i]}`;
      priceDiv.style.color = '#FF5F00'; // style 메소드 사용법 숙지!
    } else {
      priceDiv.textContent = getPrice[i];
    }

    priceSum = 0;
    priceSum = getPriceSum[i];

    innerIndex += 1;
  }
}
};
