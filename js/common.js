/** lightness mode **/
(function lightnessMode () {
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

/** UI menu **/
(function uiMenu () {
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




  



  // for (itme of document.querySelectorAll(".select_mark")) {
  //   itme.addEventListener("click", (e) => {
  //     console.log(e.target.className);
  //   })
    
  // }
