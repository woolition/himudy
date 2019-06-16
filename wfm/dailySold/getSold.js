/* jshint esversion: 6 */
;
(function() {
  if(GM_getValue("LOOPMODE", false)){
    let inputElement = $("#_j_search_input");
    let searchButton = $("#_j_search_button");
    let monitorIdList = monitorList.map((item)=>{return item[0];});

    let id = inputElement.val();
    let soldUl = $("ul.seg-info-list");
    let sold = null, view = null, price = null;
    if(soldUl.length){
      let text = $.trim(soldUl.text());
      sold = text.match(/已售\(\d{1,8}\)/g) ? text.match(/已售\(\d{1,8}\)/g)[0].slice(3,-1) : 0;
      view = text.match(/浏览\(\d{1,8}\)/g) ? text.match(/浏览\(\d{1,8}\)/g)[0].slice(3,-1) : 0;
      price = text.match(/¥\d{1,6}/g) ? text.match(/¥\d{1,6}/g)[0].slice(1) : 0;
    }
    
    console.log(id, sold, view, price);

    // 保存数据
    let today = Nacl.formatDate(new Date());
    let SoldViewPrice = GM_getValue("SoldViewPrice",{});
    if(!SoldViewPrice[today]){
      SoldViewPrice[today] = {timestamp: new Date().getTime()};
    }
    // SoldViewPrice[today][id] = {sold: sold, view: view, price};
    SoldViewPrice[today][id] = {sold, view, price};
    console.log(SoldViewPrice);
    GM_setValue("SoldViewPrice", SoldViewPrice);

    // 获取下一个
    console.log(monitorIdList.indexOf(id)+1, monitorIdList.length);
    if((monitorIdList.indexOf(id) != monitorIdList.length-1) && GM_getValue("LOOPMODE", false)){
      inputElement.val(monitorIdList[monitorIdList.indexOf(id)+1]);
      setTimeout(() => {
        searchButton.click();
      }, 1000);
    }else{
      GM_setValue("LOOPMODE", false);
    }


  }

  function startLoop(){
    GM_setValue("LOOPMODE", true);
    let inputElement = $("#_j_search_input");
    let searchButton = $("#_j_search_button");
    inputElement.val(monitorList[0][0]);
    searchButton.click();
  }

  function soldDiffTable(){
    document.body.innerHTML = "";
    GM_addStyle(`body{margin:0;padding:0; font-size:0.95em; color:#333;}
      *{overflow:auto;white-space:nowrap;}
      .naclTable{font-family:"Trebuchet MS",Arial,Helvetica,sans-serif;width:100%;border-collapse:collapse; width: 500px;}
      .naclTable td,.naclTable th{font-size:1em;border:1px solid #98bf21;padding:3px 7px 2px 7px;}
      .naclTable th{font-size:1.1em;text-align:left;padding-top:5px;padding-bottom:4px;background-color:#A7C942;color:#ffffff;}
      .naclTable tr.alt td{color:#000000;background-color:#EAF2D3;}
      #blank{min-height:300px;}`);
    
    document.body.innerHTML = `
      <table id="diff" class="naclTable">
        <tr><th>产品</th><th>产品ID</th>
          <th>{{formatTime(svp3.timestamp)}}</th>
          <th>{{formatTime(svp2.timestamp)}}</th>
          <th>{{formatTime(svp1.timestamp)}}</th>
          <th>上次增加</th><th>本次增加</th>
        </tr>
        <tr v-for="tr in trs">
          <td>{{tr[1]}}</td>
          <td @dblclick="openLink(tr[0])">{{tr[0]}}</td>
          <!--
          <td>{{svp3[tr[0]].sold}}</td>
          <td>{{svp2[tr[0]].sold}}</td>
          <td>{{svp1[tr[0]].sold}}</td>
          -->
          <td>{{svp3[tr[0]] ? svp3[tr[0]].sold : ""}}</td>
          <td>{{svp2[tr[0]] ? svp2[tr[0]].sold : ""}}</td>
          <td>{{svp1[tr[0]] ? svp1[tr[0]].sold : ""}}</td>
          <td>{{soldDiff2(tr[0])}}</td>
          <td>{{soldDiff1(tr[0])}}</td>
        </tr>
      </table>
      <div id="blank">空白，手机占位符，因为 KIWI浏览器滚动截图会出现黑影</div>
    `;
    let SoldViewPrice = GM_getValue("SoldViewPrice",{});
    let dates = Object.keys(SoldViewPrice).sort();
    let datesLength = dates.length;
      new Vue({
        el: "#diff",
        data:{
          trs: monitorList,
          svp1: SoldViewPrice[dates[datesLength-1]],
          svp2: SoldViewPrice[dates[datesLength-2]],
          svp3: SoldViewPrice[dates[datesLength-3]]
        },
        methods:{
          openLink(id){
            window.open(`http://www.mafengwo.cn/sales/${id}.html`, "_blank");
          },
          soldDiff2(id){
            if(this.svp3[id] && this.svp2[id] && this.svp3[id].sold!= null && this.svp2[id].sold!= null ){
              return this.svp2[id].sold - this.svp3[id].sold;
            }else{
              return "";
            }
          },
          soldDiff1(id){
            if(this.svp2[id] && this.svp1[id] && this.svp2[id].sold!= null && this.svp1[id].sold!= null ){
              return this.svp1[id].sold - this.svp2[id].sold;
            }else{
              return "";
            }
          },
          formatTime(time){
            return Nacl.formatTime(time).slice(5,-3);
          }
        }
      });

  }

  GM_registerMenuCommand("StartLoop", startLoop, "S");
  GM_registerMenuCommand("soldDiffTable", soldDiffTable, "T");
    

})();