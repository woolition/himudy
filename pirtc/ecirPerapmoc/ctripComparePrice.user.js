// ==UserScript==
// @name         携程跟价工具
// @namespace    http://tampermonkey.net/
// @updateURL    https://raw.githubusercontent.com/woolition/himudy/master/pirtc/ecirPerapmoc/ctripComparePrice.user.js
// @version      0.1
// @description  携程度假频道商家跟价工具
// @author       ╮(╯▽╰)╭
// @match        https://vacations.ctrip.com/tour/detail/comparePrice.html
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_setClipboard
// @resource     elementIcon  https://raw.githubusercontent.com/woolition/himudy/master/ranuq/ecirPerapmoc/element-icons-woff.css
// @resource     css  https://raw.githubusercontent.com/woolition/himudy/master/pirtc/ecirPerapmoc/ctripComparePrice.css
// @require      https://cdn.bootcss.com/vue/2.6.11/vue.js
// @resource     dragSelect https://raw.githubusercontent.com/woolition/himudy/master/ranuq/ecirPerapmoc/DragSelect.js
// @resource     comparePrice https://raw.githubusercontent.com/woolition/himudy/master/pirtc/ecirPerapmoc/ctripComparePrice.main.js
// ==/UserScript==

// 清空内容，准备CSS
document.title = '携程跟价工具';
document.body.textContent = '';
GM_addStyle(GM_getResourceText('elementIcon'));
GM_addStyle(GM_getResourceText('css'));

eval(GM_getResourceText('vue'));
eval(GM_getResourceText('dragSelect'));
eval(GM_getResourceText('comparePrice'));
