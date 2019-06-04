/* nacl.js 
 * author: NaCl 黄盐
 * mail: anix2012@126.com
 * last-modify: 2019-5-23
 */
/* jshint esversion:6 */
var Nacl = (function(){
  let O = {};
  /* 基本的查找元素方法 */
  O.q = function(cssSelector){
    return document.querySelector(cssSelector);
  };
  O.qs = function(cssSelector){
    return document.querySelectorAll(cssSelector);
  };
  /* 格式化日期 */
  O.formatDate = (date, offset=0, spliter='-')=>{
    if(!(new Date(date) instanceof Date)) {
      console.log("NaCl Hint: 传入日期有问题");
      return;
    }
    let t = new Date(new Date(date).getTime() + 86400000*offset);
    // yyyy-mm-dd
    return `${t.getFullYear()}${spliter}${t.getMonth()+1 >9 ? t.getMonth()+1 : '0'+(t.getMonth()+1)}${spliter}${t.getDate() >9 ? t.getDate() : '0'+t.getDate()}`;
  };
  
  /* 进入全屏 */
  O.fullScreen = function(cssSelector){
    let ele = document.querySelector(cssSelector) || document.documentElement;
    if (ele.requestFullscreen) {
      ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullScreen) {
      ele.webkitRequestFullScreen();
    }
  };
  /* 退出全屏 */
  O.exitFullscreen = function (cssSelector) {
    let ele = document.querySelector(cssSelector) || document.documentElement;
    if (ele.exitFullscreen) {
        ele.exitFullscreen();
    } else if (ele.mozCancelFullScreen) {
        ele.mozCancelFullScreen();
    } else if (ele.webkitCancelFullScreen) {
        ele.webkitCancelFullScreen();
    }
  };
 
  /* 简单克隆，一般json对象复制应该没有问题 */
  O.cloneJsonObject = function(obj){
    return JSON.parse(JSON.stringify(obj));
  };

  return O;
})();