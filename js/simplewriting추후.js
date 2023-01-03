
/** vue router - simple writing **/
(function () {
  /* simplewriting 컴포넌트 정의*/
  const main = {
    template: '<p>main</p>'
  };
  const simplewriting = {
    template: `<section class="writingModal_box">
    <div class="inner themed_box">
      <h2 class="blind">심플 스토리 작성</h2>
      <div>
        <form action="">
          <fieldset>
            <legend class="blind">글 쓰기</legend>
            <div class="writingTitleBox">
              <label for="writingTitle">글 제목</label>
              <input type="text" id="writtingTitle">
            </div>
            <hr>
            <div class="basicInfoBox">
              <div>
                <label for="writtingDate">작성 날짜:</label>
                <input type="text" id="datepicker">
              </div>
              <div>
                <select>
                  <option>스토리 카드 선택</option>
                  <option>기본 폴더</option>
                  <option>동남아 배낭여행</option>
                  <option>춘천 여행</option>
                  <option>상하이</option>
                  <option>퍼스 & 시드니</option>
                </select>
              </div>
            </div>
            <div class="forPaybox">
              <p>
                지출 기록
              </p>
              <div class="btn_box">
                <p class="delete_btn" id="delete_btn">
                  <span class="btn_text">삭제</span>
                  <span class="material-icons">
                    delete
                  </span>
                </p>
                <p class="add_btn0" id="add_btn">
                  <span class="btn_text">추가</span>
                  <span class="material-icons">
                    add
                  </span>
                </p>
              </div>
            </div>
            <div class="hiddenYbox scrollbar">
              <div class="pay_box" id="payBox0" name="payBox">
                <div class="paymentKind">
                  <div class="selectingPayment themed_border">
                    <div>
                      <label for="spendFood">
                        <span class="material-icons">
                          restaurant
                          </span><br>
                        <span>식사</span> 
                      </label><br>
                      <input type="radio" name="iSpendIt0" id="spendFood" value="food">
                    </div>
                    <div>
                      <label for="spendMoving">
                        <span class="material-icons">
                          airport_shuttle
                        </span><br>
                        <span>교통</span>
                      </label><br>
                      <input type="radio" name="iSpendIt0" id="spendMoving" value="transportation">
                    </div>
                    <div>
                      <label for ="spendAccomon">
                        <span class="material-icons">
                          hotel
                        </span><br>
                        <span>숙소</span>
                      </label><br>
                      <input type="radio" name="iSpendIt0" id="spendAccomon" value="accomondation">
                    </div>
                    <div>
                      <label for="spendAttraction">
                        <span class="material-icons">
                          attractions
                        </span><br>
                        <span>어트랙션</span>
                      </label><br>
                      <input type="radio" name="iSpendIt0" id="spendAttraction" value="attraction">
                    </div>
                    <div>
                      <label for="spendShopping">
                        <span class="material-icons">
                          local_mall
                        </span><br>
                        <span>쇼핑</span>
                      </label><br>
                      <input type="radio" name="iSpendIt0" id="spendShopping" value="shopping">
                    </div>
                    <div>
                      <label for="spendEtc">
                        <span class="material-icons">
                          table_bar
                        </span><br>
                        <span>기타</span>
                      </label><br>
                      <input type="radio" name="iSpendIt0" id="spendEtc" value="etc">
                    </div>
                  </div>
                </div>
                <div class="writingAmount">
                  <div class="how_much_paid">
                    <label for="amount">지출 금액:</label>
                    <input type="text" id="amount" class="amount">THB<span id="localCurrencyUnit"></span>
                  </div>
                    <input type="text" id="currencyInput" hidden>
                  <div class="memo_box">
                    <label for="memo">메모:</label>
                    <input type="text" id="memo" class="memo">
                  </div>
                </div>
                <hr>
              </div>
            </div>
            
            <div class="main_text">
              <textarea name="editor" id="editor" cols="30" rows="10"></textarea>
            </div>
            <div class="btn_box">
              <button type="button">취소</button>
              <button type="button">작성 완료</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </section>`,
   
  };



  /* routes 변수에 path와 컴포넌트 매핑 */
  const reloadRoutes = [
    {
      path: '/main',
      component: main
    },
    {
      path: '/simplewriting',
      component: simplewriting
    }
  ];
  /* vuerouter 인스턴트 생성 후 routes 삽입 */
  const router = new VueRouter({
    mode:'history',
    routes : reloadRoutes
  });
  /* 뷰 인스턴스에 라우터 추가 */
  var app = new Vue({
    el:'#app',
    router
  })
})();