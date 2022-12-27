
const imageToggleChecked= document.getElementById("imageToggleCheck");
const checkListURL = 'http://localhost:4001/checkList';


/** checklist **/
/* call checklist */
(function () {
  'use strict';

  const get = (target) => {
    return document.querySelector(target);
  };

  //식별자에 사용되는 $는 document.getElementById처럼 단일한 변수임을 표시하는 것
  //변수명으로 사용도가 낮은$를 변수명 앞에 붙여 다른 변수와 충돌을 방지하는 것
  const $checklistAll = get(".checklistField");
  const $checklistContainer = get(".checklistField");
  const $checkForm = get(".check-form");  


  const createCheckElement = (checklist) => {
    //const{a, b} = c의 의미는 const a = c.a; const b = c.b의 의미로 객체안의 값을 바로 변수로 할당시킨다.
    //const[state, dispatch] = useReducer() 같은 대괄호의 경우 retun type의 두개인데 이것을 둘 다 받아 쓰기위해 array 로 받는 것임
    //statae 라는 obj가 첫번째 return, dispatch라는 게 두번째 return
    const {id, memo} = checklist;
    console.log(checklist);
    console.log(id);
    
    const $checklistItem = document.createElement('div');
    $checklistItem.dataset.id = id;
    $checklistItem.id = id;
    $checklistItem.classList.add("themed_pattern1", "arrangeCheck", "checklist");
    $checklistItem.innerHTML = 
    `
    <input type="checkbox" id="list${id}" name="checkList" class="checkList" hidden /> 
    <label class="checkText" for="list${id}">
      <span id="checklist" class="memo_check">${memo}</span>
    </label>
    <div class="check_buttons">
      <button type="button" class="check-edit-button themed_pattern2">수정</button>
      <button type="button" id="deleteBtn${id}" class="check-delete-button themed_pattern2">삭제</button>
    </div>
    `;
    console.log('체크리스트아이템:', $checklistItem);
    //checklist동적생성
    return $checklistItem;
    
  };

  const renderCheck = (checklist) => {
    checklist.forEach((item) => {
      const checkElement = createCheckElement(item);
      $checklistAll.appendChild(checkElement)
    });
  };
  /** get checklist **/
  const getCheck = () => {
    fetch(checkListURL, {
      method:'GET',
      headers:{'content-type':'application/json'}
    })
    .then((res) => res.json())
    .then((checklist) => {
        renderCheck(checklist);
        //console.log(checklist);
      }
    )
    .catch(error => console.error('에러코드:', error))
  };

  /** add checklist **/
  const addCheck = () => {
    //e.preventDefault는 html에서 a태그나 submit 의 data를 전송시키거나 이동하는등의 동작이 있는데 해당 매소드는 그것을 방지함
    //e.stopPropagation() 이벤트가 상위 엘리먼트에게 전달되는 것을 막아줌
    e.preventDefault();
    const addIcon = document.getElementById("addIcon");
    const memoBox = document.getElementById("memoBox");
    addIcon.addEventListener("click", memoBox.setAttribute("display", "block"))
    const $input = $checkForm.querySelector('input[type="text"]');
    const checkValue = $input.value;
    const check = {
      checked: false,
      memo: checkValue
    };

    fetch(checkListURL, {
      method:'POST',
      headers: {'content-type':'application/json; charset=UTF-8'},
      body: JSON.stringify(check),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          res.json();
        } else {
          console.error(res.statusText);
        }
      })
      .catch((error) => console.error('에러코드:',error));
  }


  /** delete checklist **/
  const deleteCheck = (e) => {
    console.log(e.target.className);
    if(e.target.className !== 'check-delete-button themed_pattern2' ) return;
    const $removeTarget = e.target.closest(".checklist");
    console.log("제거대상데이터셋", $removeTarget)
    const id = $removeTarget.dataset.id;
    

    fetch(`${checkListURL}/${id}`, {
      method:"DELETE",
      headers:{'content-type':'application/json'},
      body:JSON.stringify({ id }),
    })
      .then((res) => {
        res.json();
      })
      .then(() => {
        getCheck()
      })
      .catch(error => console.error('에러코드:',error));
  }



  const init = () => {
    window.addEventListener("DOMContentLoaded", getCheck);
    $checkForm.addEventListener("submit", addCheck);
    $checklistContainer.addEventListener("click", deleteCheck);

  };

  init();

})();






  







/*** window.onload lightness mod setting & API call ***/
window.onload = () => {

  /* strikethrough */
  $(document).on("click", ".checkText", function(){
    $(this).toggleClass('strikethrough');
  })
  // $("input[name='checkList']").click(function(){
  //   if($(this).is(":checked")){
  //     confirm("해당 체크리스트를 삭제 하시겠습니까?")
  //   }
  // })

  /* checkbox_localstorage */
  // to save 
  const checkboxes = document.querySelectorAll(".checkList").length;
  console.log(checkboxes)
  function toSave() {
    for (let i = 1; i <= checkboxes; i++){
      const checkbox = document.getElementById('list' + String(i));
      localStorage.setItem('list' + String(i), checkbox.checked);
    }
  }
  // to load just using vanilla JS
  for(let i = 1; i <= checkboxes; i++){
    if(localStorage.length > 0){
      const checkedContent = document.getElementById('list' + String(i)).nextElementSibling;
      let checked = document.getElementById('list' + String(i)).checked = JSON.parse(localStorage.getItem('list' + String(i)));
      if (checked) checkedContent.classList.add('strikethrough')
    }
  }
  /* saving event */ 
  window.addEventListener('change', toSave); 




  /** geolocation **/
  navigator.geolocation.getCurrentPosition(function locationNow (position) {
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let nowDate = new Date().toISOString().substring(0,10).replace(/-/g,'');

    /* saving OPEN API url */
    //weather API url
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fca7b6ecde13fa2d4e140006f768fd79&units=metric`;
    
    /** exchange rate API url **/
    function unitOfCurrency(){ 
      if(String(geoplugin_currencyCode()) == 'KRW'){
        return 'USD'
      } else {
        return String(geoplugin_currencyCode())
      }
    }
    const currencyHere = unitOfCurrency();
    //console.log(currencyHere)
    const exchangeUrl = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${currencyHere}`;

    /* exchange rate */
    fetch(exchangeUrl)
      .then((res) => res.json())
      .then((myJson) => {
        //console.log(myJson[0]);
        const fxData = myJson[0];
        const fxUnit = fxData.currencyCode;
        
        document.getElementById("fxDate").innerText = fxData.date;
        document.getElementById("baseRate").innerText = `${fxData.basePrice.toString()} ${fxUnit}/KRW`;
        document.getElementById("fxBuying").innerText = `${fxData.cashBuyingPrice.toString()} ${fxUnit}/KRW`;
      });

    /* API-weather */
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((myJson) => {
        //console.log(myJson);
        const weatherIcon = document.getElementById("weatherIcon");
        const weatherIconId = myJson.weather[0].icon;
        const weatherCountry = myJson.sys.country;

        document.getElementById("wCountry").innerText = myJson.sys.country;
        document.getElementById("wCity").innerText = myJson.name;
        document.getElementById("weather").innerText = myJson.weather[0].main;
        document.getElementById("temperature").innerText = myJson.main.temp;
        document.getElementById("humidity").innerText = myJson.main.humidity;

        weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIconId + "@2x.png");

        //diplomat notice API
        const diplomatSafteyUrl = `https://apis.data.go.kr/1262000/CountrySafetyService3/getCountrySafetyList3?serviceKey=RHh9qBtKX0nX7AHYN9wc37tOXdekXhwz8L07fm3vc3rReNkBkkWM6YUaB0Eo3YDEiN7rRKN4mTfwePoyCFFUZA%3D%3D&returnType=JSON&numOfRows=2&cond[country_iso_alp2::EQ]=${weatherCountry}&pageNo=1`;

        //diplomat flag API 
        const flagUrl = `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=RHh9qBtKX0nX7AHYN9wc37tOXdekXhwz8L07fm3vc3rReNkBkkWM6YUaB0Eo3YDEiN7rRKN4mTfwePoyCFFUZA%3D%3D&returnType=JSON&numOfRows=1&cond[country_iso_alp2::EQ]=${weatherCountry}&pageNo=1`

      
        /* diplomat saftey notice */
        fetch(diplomatSafteyUrl)
        .then((res) => res.json())
        .then((myJson) => {
        console.log(myJson);
        console.log('공지사항길이', myJson.data.length);
        
        if (myJson.data.length != 0){
          document.getElementById("notice_box").style.display = 'block';
          document.getElementById("noticeCountry").innerText = myJson.data[0].country_iso_alp2;
          for(i = 0; i < myJson.data.length; i++){
            //console.log(myJson.data[String(i)]);
            document.getElementById("dSafetyTitle" + i).innerText = myJson.data[i].title;
            document.getElementById("warning" + i).innerText = myJson.data[i].ctgy_nm;
            document.getElementById("dSafetyDate" + i).innerText = myJson.data[i].wrt_dt;
            if(myJson.data[i].ctgy_nm == '주의'){
              document.getElementById("warning" + i).classList.add('red_btn')
            } else if (myJson.data[i].ctgy_nm == '안내'){
              document.getElementById("warning" + i).classList.add('green_btn')
            } else {
              document.getElementById("warning" + i).classList.add('')
            }
          }
        } else {
          console.log('외교부 공지 없음');
          document.getElementById("diplomatNothing").innerText = `${weatherCountry}의 외교부 공지사항 데이터가 없습니다.`;
          document.getElementById("notice_box").style.display = 'none';
        }
        });
        /* flag */
        fetch(flagUrl)
        .then((res) => res.json())
        .then((myJson) => {
          //console.log(myJson);
          const downUrl = myJson.data[0].download_url;
          const flagIcon = document.getElementById("flagIcon");

          flagIcon.setAttribute("src", `${downUrl}`);
        });
      });
      
  });

  /** loading lightness mode **/
  const darkIcon = document.querySelector('.dark_icon');
  const lightIcon = document.querySelector('.light_icon');
  //로컬 저장소에서 저장된 값 찾기
  const isUserColorTheme = localStorage.getItem('color-theme');
    //console.log('저장소 값:'+ isUserColorTheme);
  //로컬 저장소에 없을 경우 시스템 설정을 기준으로 한다
  const isOsColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    //console.log('isOsColorTheme:'+ isOsColorTheme);
    function whichOne(){
      if(isUserColorTheme){
        return isUserColorTheme
      } else {
        return isOsColorTheme
      }
    };
    const presentTheme = whichOne();
  //const presentTheme = () => (isUserColorTheme ? isUserColorTheme : isOsColorTheme);
    //console.log('작동되어야 하는 값' + presentTheme)
  //checklist

  /** initializing lightness mode **/
    // console.log(isUserColorTheme);
    // console.log(isOsColorTheme);
    // console.log(presentTheme);
    if(presentTheme == 'dark'){
      localStorage.setItem('color-theme', 'dark');
      document.documentElement.setAttribute('color-theme', 'dark');
      darkIcon.style.display = 'block';
      lightIcon.style.display = 'none';
    } else {
      localStorage.setItem('color-theme', 'light');
      document.documentElement.setAttribute('color-theme', 'light');
      darkIcon.style.display = 'none';
      lightIcon.style.display = 'block';
    }
  /** 아이콘 클릭에 따른 상대 라이트&다크 모드 전환 **/
    darkIcon.addEventListener('click', e => {
      console.log(e.target.className);
      console.log(e.target.style.display);
      if (e.target.style.display = 'block'){
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';
      }
        console.log(document.documentElement.getAttribute('color-theme'));
        console.log('최종 저장 된 모드:' + localStorage.getItem('color-theme'))
    });
    
    lightIcon.addEventListener('click', (e) => {
      console.log(e.target.className);
      console.log(e.target.style.display);
      if (e.target.style.display = 'block'){
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        darkIcon.style.display = 'block';
        lightIcon.style.display = 'none';
      } 
        console.log(document.documentElement.getAttribute('color-theme'));
        console.log('최종 저장 된 모드:' + localStorage.getItem('color-theme'))
  });

}

/** mobile_menu **/
/* mobile_menu_toggle */
  $(".mobile_list").click(function(){
    $(".mobile_menu").fadeToggle(200)
  });
  /*arcordian_menu*/
  $(".mobile_menu_list").click(function(){
    $(this).children('ul').slideToggle(200);
    $(".mobile_menu_list").children('ul').not($(this).children('ul')).slideUp(200);
  });
  /* displayOff when click back */
  $(document).mouseup(function(e){
    if($(".mobile_menu_list").children("ul").has(e.target).length === 0){
      $(".mobile_menu_list").children("ul").slideUp(0)
    };
  });

  /*width-recognition*/
  $(window).resize(function(){
    const windowWidth = $(window).width();
    if (windowWidth >= 768) {
      $(".mobile_menu legend").addClass("blind");
      $(".mobile_menu").show();
    } 
    if (windowWidth < 768) {
      $(".mobile_menu legend").removeClass("blind");
      $(".mobile_menu").hide();
    }
  });
/* image_loading_toggle */
  let imagesAll = document.querySelectorAll('img');
  (function imageSet(){
    if(localStorage.getItem('imageState')){
      imageToggleChecked.checked = false;
      for(i = 0; i < imagesAll.length; i++){
        imagesAll[i].setAttribute('src', '../images/travellogLogo.png');
      }
    } else {
      return false
    }
  })();

  imageToggleChecked.addEventListener('click', () => {
    let imagesAll = document.querySelectorAll('img');
    if(!imageToggleChecked.checked){
      for(i = 0; i < imagesAll.length; i++){
        imagesAll[i].setAttribute('src', '../images/travellogLogo.png');
      }
      localStorage.setItem('imageState', imageToggleChecked.checked);
      console.log(localStorage.getItem('imageState'));
      } else {
        localStorage.removeItem('imageState');
        setTimeout(function() {window.location.reload()}, 300);
        console.log(localStorage.getItem('imageState'));
      }
    })


/** bottom_menu **/ 
/* width-recognition */
  $(window).resize(function(){
    const windowWidth = $(window).width();
    if (windowWidth >= 768) {
      $(".bottom_menu_wrap").slideUp(0);
    } else{
      $(".bottom_menu_wrap").slideDown(0);
    }
  });
  /* height-recognition */
  $(window).scroll(function(){
    const windowWidth = $(window).width();
    const scrollHeight = $(window).scrollTop();
    if (scrollHeight > 80 && windowWidth < 768) {
      $(".bottom_menu_wrap").slideDown(0);
    } else {
      $(".bottom_menu_wrap").slideUp(0);
    }
  })

  
    




  

  

