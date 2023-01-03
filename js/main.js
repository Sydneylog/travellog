/** lightness mode **/
(function () {
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
      //console.log(e.target.className);
      //console.log(e.target.style.display);
      if (e.target.style.display = 'block'){
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';
      }
        //console.log(document.documentElement.getAttribute('color-theme'));
        //console.log('최종 저장 된 모드:' + localStorage.getItem('color-theme'))
    });
    
    lightIcon.addEventListener('click', (e) => {
      //console.log(e.target.className);
      //console.log(e.target.style.display);
      if (e.target.style.display = 'block'){
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        darkIcon.style.display = 'block';
        lightIcon.style.display = 'none';
      } 
        //console.log(document.documentElement.getAttribute('color-theme'));
        //console.log('최종 저장 된 모드:' + localStorage.getItem('color-theme'))
  });
})();

/*** APIs call ***/
(function () {
  /* getDOM */
  const getId = (id) => {
    return document.getElementById(id)
  };
  const get = (target) => {
    return document.querySelector(target)
  };

  /** geolocation **/
  navigator.geolocation.getCurrentPosition(function locationNow (position) {
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //let nowDate = new Date().toISOString().substring(0,10).replace(/-/g,'');

    /* saving OPEN API url */
    //-33.8667  151.2
    //weather API url
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fca7b6ecde13fa2d4e140006f768fd79&units=metric`;
    
    /* API-weather */
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((myJson) => {
        //console.log(myJson);
        const weatherIcon = document.getElementById("weatherIcon");
        const weatherIconId = myJson.weather[0].icon;
        const weatherCountry = myJson.sys.country;

        getId("wCountry").innerText = myJson.sys.country;
        getId("wCity").innerText = myJson.name;
        getId("weather").innerText = myJson.weather[0].main;
        getId("temperature").innerText = myJson.main.temp;
        getId("humidity").innerText = myJson.main.humidity;

        get(".country_category").innerText = weatherCountry;
        //console.log("현재국가표시:", document.querySelector(".country_category").innerText);
        

        weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIconId + "@2x.png");

        //diplomat notice API
        const diplomatSafteyUrl = `https://apis.data.go.kr/1262000/CountrySafetyService3/getCountrySafetyList3?serviceKey=RHh9qBtKX0nX7AHYN9wc37tOXdekXhwz8L07fm3vc3rReNkBkkWM6YUaB0Eo3YDEiN7rRKN4mTfwePoyCFFUZA%3D%3D&returnType=JSON&numOfRows=2&cond[country_iso_alp2::EQ]=${weatherCountry}&pageNo=1`;

        //diplomat flag API 
        const flagUrl = `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=RHh9qBtKX0nX7AHYN9wc37tOXdekXhwz8L07fm3vc3rReNkBkkWM6YUaB0Eo3YDEiN7rRKN4mTfwePoyCFFUZA%3D%3D&returnType=JSON&numOfRows=1&cond[country_iso_alp2::EQ]=${weatherCountry}&pageNo=1`

        const currencyCodeURL = `http://localhost:4001/coutryNameCurrency?countryCode=${weatherCountry}`;
        
        fetch(currencyCodeURL, {
          method:'GET',
          headers:{'content-type':'application/json'}
        })
        .then(res => res.json())
        .then(data => {
          const $basicCurrencyUnit = data[0].currencyCode;
          /** exchange rate API url **/
          /* use local unit */
          document.querySelector(".localCurrencyUnit").innerText = $basicCurrencyUnit;
          console.log("표시화폐단위:", document.querySelector(".localCurrencyUnit").innerText)

          /* if location is Korea, to corfirm USDKRW*/
          const unitOfCurrency = $basicCurrencyUnit === 'KRW' ? 'USD' : $basicCurrencyUnit
          const currencyHere = unitOfCurrency;
          //console.log(currencyHere)
          const exchangeUrl = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${currencyHere}`;

          /* exchange rate */
          fetch(exchangeUrl)
            .then((res) => res.json())
            .then((myJson) => {
              console.log(myJson[0]);
              const fxData = myJson[0];
              const fxUnit = fxData.currencyCode;

          console.log("현재환율:", fxData.cashBuyingPrice.toString())        
          //현지가 한국일 경우의 환율은 1반환 아닐경우 현지 환율 반환
          const koreaExchangeRate = $basicCurrencyUnit === "KRW" ? Number(1) : fxData.cashBuyingPrice.toString()
              
          getId("fxDate").innerText = myJson[0].date;
          getId("baseRate").innerText = `${fxData.basePrice.toString()} ${fxUnit}/KRW`;
          getId("fxBuying").innerText = `${fxData.cashBuyingPrice.toString()} ${fxUnit}/KRW`;
          getId("exchangeRateNow").innerText = koreaExchangeRate;
        });



        })

        




      
        /* diplomat saftey notice */
        fetch(diplomatSafteyUrl)
        .then((res) => res.json())
        .then((myJson) => {
        //console.log(myJson);
        //console.log('공지사항길이', myJson.data.length);
        
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
          //console.log('외교부 공지 없음');
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
})();

/** checklist **/
(function() {
  /* call checklist */
  'use strict';
  const checkListURL = 'http://https://delightful-neckerchief-tick.cyclic.app/checkList';
  const get = (target) => {
    return document.querySelector(target);
  };
  //식별자에 사용되는 $는 document.getElementById처럼 단일한 변수임을 표시하는 것
  //변수명으로 사용도가 낮은$를 변수명 앞에 붙여 다른 변수와 충돌을 방지하는 것
  const $checklistAll = get(".checklistField");
  const $checklistContainer = get(".checklistField");
  const $checkForm = get(".check-form");  

  /** rendering checklist **/
  /* structure */
  const createCheckElement = (checklist) => {
    //const{a, b} = c의 의미는 const a = c.a; const b = c.b의 의미로 객체안의 값을 바로 변수로 할당시킨다.
    //const[state, dispatch] = useReducer() 같은 대괄호의 경우 retun type의 두개인데 이것을 둘 다 받아 쓰기위해 array 로 받는 것임
    //statae 라는 obj가 첫번째 return, dispatch라는 게 두번째 return
    const {id, memo} = checklist;
    //console.log(checklist);
    //console.log(id);
    
    const $checklistItem = document.createElement('div');
    $checklistItem.dataset.id = id;
    $checklistItem.id = id;
    $checklistItem.classList.add("themed_pattern1", "arrangeCheck", "checklist");
    $checklistItem.innerHTML = 
    `
    <input type="checkbox" id="checkbox" name="checkbox" class="checkbox" hidden /> 
    <input type="text" id="list" name="checkList" class="checkList" hidden /> 
    <label class="checkText memo_check " for="list" id="checklist">${memo}</label>
    <div class="hidden_btn_box">
      <div class="check_buttons">
        <button type="button" class="check-edit-button themed_pattern2">수정</button>
        <button type="button" id="deleteBtn" class="check-delete-button themed_pattern2">삭제</button>
      </div>
    </div>
    <div class="hidden_modifier_btn_box">
      <div class="modify_buttons">
        <button type="button" class="modify-confirm-button themed_pattern2">확인</button>
        <button type="button" class="check-cancel-button themed_pattern2">취소</button>
      </div>
    </div>
    `;
    //console.log('체크리스트아이템:', $checklistItem);
    //checklist동적생성
    return $checklistItem;
    
  };
  /* render */
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
  /* open add input */
  (function showInput() {
    const addIcon = document.getElementById("addIcon")
    //console.log(addIcon)
    const memoBoxWrap = get(".memo_box_wrap");
    const cancelBtn = get(".add_cancel_btn");

    addIcon.addEventListener("click", () => {
      memoBoxWrap.style.display = "block"
    })
    cancelBtn.addEventListener("click", () => {
      memoBoxWrap.style.display = "none"
    })
    
  })()

  /* POST checklist*/
  const addCheck = (e) => {
    //e.preventDefault는 html에서 a태그나 submit 의 data를 전송시키거나 이동하는등의 동작이 있는데 해당 매소드는 그것을 방지함
    //e.stopPropagation() 이벤트가 상위 엘리먼트에게 전달되는 것을 막아줌
    e.preventDefault();
    const $input = $checkForm.querySelector('input[type="text"]');
    //console.log('달러인풋:', $input)
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

  /** update checklist **/
  /* open input modifier */
  const modifierInput = (e) => {
    //console.log("수정버튼클릭함")
    const $modifyTarget = e.target.closest(".checklist");
    //console.log("목표타겟:", $modifyTarget)
    const $modifyInput = $modifyTarget.querySelector("#list");
    const $modifyLabel = $modifyTarget.querySelector("label");
    const $targetValue =  $modifyTarget.innerText;
    const $editBtnBox = $modifyTarget.querySelector(".hidden_btn_box");
    const $modifyBtnBox = $modifyTarget.querySelector(".hidden_modifier_btn_box");

    if(e.target.className === "check-edit-button themed_pattern2") {
      $editBtnBox.style.display = "none";
      $modifyBtnBox.style.display = "block";
      $modifyLabel.style.display = "none";
      $modifyInput.style.display = "block";
      $modifyInput.value="";
      $modifyInput.focus();
      $modifyInput.value = $targetValue
    }

    if(e.target.className === "check-cancel-button themed_pattern2") {
      $editBtnBox.style.display = "block";
      $modifyBtnBox.style.display = "none";
      $modifyLabel.style.display = "block";
      $modifyInput.style.display = "none";
    }
  }

  /* upadate checklist */
  const modifier = (e) => {
    if (e.target.className === "modify-confirm-button themed_pattern2") {
      //console.log("모디파이 확인 버튼")
      const $modifyTarget = e.target.closest(".checklist");
      const $modifyInput = $modifyTarget.querySelector("#list");
      const id = $modifyTarget.dataset.id;
      const memo = $modifyInput.value;

      fetch(`${checkListURL}/${id}`, {
      method:"PATCH",
      headers:{'content-type':'application/json'},
      body:JSON.stringify({ memo })
    })
      .then((res) => {
        res.json();
      })
      .then(() => {
        getCheck();
      })
      .catch(error => console.error('에러코드:',error))
    } else return;
  };


  /** delete checklist **/
  const deleteCheck = (e) => {
    if(e.target.className !== 'check-delete-button themed_pattern2' ) return;
    const $removeTarget = e.target.closest(".checklist");
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

  /** run each function **/
  const init = () => {
    window.addEventListener("DOMContentLoaded", getCheck);
    $checkForm.addEventListener("submit", addCheck);
    $checklistContainer.addEventListener("click", modifierInput);
    $checklistContainer.addEventListener("click", modifier);
    $checklistContainer.addEventListener("click", deleteCheck);
  };
  init();
  

})();

/** UI menu **/
(function () {
  const imageToggleChecked= document.getElementById("imageToggleCheck");
  /** mobile_menu **/
  /* mobile_menu_toggle */
    $(".mobile_list").click(function(){
      $(".mobile_menu").fadeToggle(200)
    });
    /*arcordian_menu*/
    $(".mobile_menu_list").click(function(){
      $(this).children('ul').stop().slideToggle(200);
      $(".mobile_menu_list").children('ul').not($(this).children('ul')).slideUp(200);
      
    });

    /* strikethrough */
    $(document).on("click", ".checkText", function(){
      $(this).toggleClass('strikethrough');
    })
    /* displayOff when click back */
    // 상단의 메뉴 토글의 슬라이드업이 하단의 코드로 인해 작동 되지 않는 문제 발생
    // $(document).mouseup(function(e){
    //   if($(".mobile_menu_list").children("ul").has(e.target).length === 0){
    //     $(".mobile_menu_list").children("ul").slideUp(0)
    //   };
    // });

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
})();

/** Modal UI **/
(function() {
  const get = (target) => {
    return document.querySelector(target)
  };

  /** close modal button **/ 
  (() => {
    const $closeModalBtn = get(".wrting_cancel_btn");
    const $openModalBtns = document.querySelectorAll(".open_modal");
    const $modalSection = get(".writingModal_box");
    const mobileMenu = get(".mobile_menu");
    const $hideScroll = get(".hide_scroll");
    
    /* close modal */
    $closeModalBtn.addEventListener("click", () => {
      $modalSection.style.display = "none";
      $hideScroll.style.overflow = "overlay";
    });

    /* open modal*/
    for (const $openModalBtn of $openModalBtns) { 
      $openModalBtn.addEventListener("click", () => {
        if(mobileMenu.style.display = "block") {
          mobileMenu.style.display = "none";
          $hideScroll.style.overflow = "hidden";
        }
        $modalSection.style.display = "block";
       
      })
    }
  })();


  /** simplewriting **/
  $("#datepicker").datepicker({
    language: 'ko'
  });

  /** add paymentBox **/
  (function paymentFunc() {
    const addBtn = document.getElementById('add_btn');
    const deleteBtn = document.getElementById('delete_btn');
    //const payBoxWrap = document.querySelector(".pay_box_wrap")
    let payBox = document.getElementById('payBox0');
    let clonned = document.getElementsByName("payBox");

    let i = 1;
    
    addBtn.addEventListener("click", () => {
      if(payBox.classList.contains("hide_display")){
        payBox.classList.remove("hide_display")
      } else if(clonned.length < 4){
        const newPayBox = payBox.cloneNode(true);
        payBox.after(newPayBox);
        newPayBox.id = 'payBox' + i;
        $('#payBox' + i).find("input").attr("name", "iSpendIt" + i);
        i++;
        console.log(clonned.length);
      } else {
        return alert("최대 3칸 추가 할 수 있습니다.")
      };
    });

    deleteBtn.addEventListener("click", () => {
      let decrease = clonned.length;
      if(decrease >= 2){
        clonned[decrease - 1].remove();
        decrease--;
        i--;
      } else if (decrease = 1){
        payBox.classList.add("hide_display")
        i = 0;
      };
    });

    
  })();
  

  /* get today */
  function todayNow() {
    let putDate = document.getElementById("datepicker");
    let getDate = new Date();
    let today = `${getDate.getFullYear()}-${('0' + (getDate.getMonth() + 1)).slice(-2)}-${('0' + getDate.getDate()).slice(-2)}`;

    putDate.value = today;

    putDate.addEventListener('mouseout', () => {
      if(!putDate.value) {
        putDate.value = today;
      }
    });
    
  }
  todayNow();

  

})();

/** Modal POST **/
(function () {
  const diaryURL = "https://delightful-neckerchief-tick.cyclic.app/travel_diary";
  const $modalForm = document.querySelector(".modal_form");
  
  let myEditor;
  ClassicEditor
    .create(document.querySelector("#editor"), { language: "ko"})
    .then( (editor) => {
      console.log('Editor was initialized:', editor );
      myEditor = editor;
    })
    .catch((err) => {
      console.error(err.stack);
    });
  
  const insertModal = (e) => {
    e.preventDefault();
    
      const $modalTitle = $modalForm.querySelector(".writing_title");
      const $modalDate = $modalForm.querySelector(".date_picker");
      const $modalCountry = $modalForm.querySelector(".country_category");
      const $modalExchangeRate = $modalForm.querySelector("#exchangeRateNow");
      const $modalCurrencyUnit = $modalForm.querySelector("#localCurrencyUnit");
      const $selectBox = $modalForm.querySelector(".selectedOne");
      const $selected = $selectBox.options[$selectBox.selectedIndex];

      const modalTitle = $modalTitle.value;
      const modalDate = $modalDate.value;
      const modalExchangeRate = $modalExchangeRate.innerText;
      const modalCurrencyUnit = $modalCurrencyUnit.innerText;
      const modalCountryCate = $modalCountry.innerText;
      const selectedStoryCard = $selected.value;

      /* 이중배열 for accountBooks */
      const spendings = document.querySelectorAll(".amount");
      const memos = document.querySelectorAll(".memo");
      
      //배열생성
      $accountBooks = [];
      for (i = 0; i < spendings.length; i++) {
        const $accountBook ={
          cate: document.querySelector(`input[name="iSpendIt${i}"]:checked`).value,
          cost: spendings[i].value,
          memo: memos[i].value
        }
        $accountBooks.push($accountBook)
      };
      //배열속 객체로
      console.log("배열 확인:",$accountBooks);
      const sortedAccountBooks = $accountBooks.reduce((acc, curr) =>{
        const {cate} = curr;
        if (acc[cate]) acc[cate].push(curr);
        else acc[cate] = [curr];
        return acc;
      }, {});
      console.log(sortedAccountBooks);


      const mainText = myEditor.getData();
      const diaryContent = {  
        title: modalTitle,
        date: modalDate,
        accountBooks:sortedAccountBooks,
        category: selectedStoryCard,
        content: mainText,
        exchnageRate: modalExchangeRate,
        currencyUnit: modalCurrencyUnit,
        countryCategory: modalCountryCate
      };

      
      fetch(diaryURL, {
        method:'POST',
        headers: {'content-type':'application/json; charset=UTF-8'},
        body: JSON.stringify(diaryContent)
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            res.json();
          } else {
            console.error(res.statusText);
          }
        })
        .catch((error) => console.error('에러코드:',error));
      
    };
  
  const runInsert = () => {
    $modalForm.addEventListener("submit", insertModal)
  }
  runInsert();

})();
  



  // for (itme of document.querySelectorAll(".select_mark")) {
  //   itme.addEventListener("click", (e) => {
  //     console.log(e.target.className);
  //   })
    
  // }
