// ==UserScript==
// @name         去哪儿跟价工具
// @namespace    http://tampermonkey.net/
// @updateURL    https://raw.githubusercontent.com/woolition/himudy/master/ranuq/ecirPerapmoc/qunarComparePrice.user.js
// @version      0.1
// @description  去哪儿度假频道商家跟价工具
// @author       ╮(╯▽╰)╭
// @match        https://wmlx2.package.qunar.com/comparePrice
// @match        https://*.package.qunar.com/user/detail.jsp?id=*
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
// @resource     css  https://raw.githubusercontent.com/woolition/himudy/master/ranuq/ecirPerapmoc/qunarComparePrice.css
// @resource     vue  https://cdn.bootcss.com/vue/2.6.11/vue.js
// @resource     dragSelect https://raw.githubusercontent.com/woolition/himudy/master/ranuq/ecirPerapmoc/DragSelect.js
// @resource     comparePrice https://raw.githubusercontent.com/woolition/himudy/master/ranuq/ecirPerapmoc/qunarComparePrice.main.js
// ==/UserScript==

// 清空内容，准备CSS
if(location.href.match(/comparePrice/)){
    document.title = '去哪儿跟价';
    document.body.textContent = '';
    GM_addStyle(GM_getResourceText('elementIcon'));
    GM_addStyle(GM_getResourceText('css'));

    eval(GM_getResourceText('vue'));
    eval(GM_getResourceText('dragSelect'));
    eval(GM_getResourceText('comparePrice'));
}else{
    // 复制用于建立项目的ID
    let button = document.createElement('button');
    button.setAttribute('style', 'position:fixed;z-index:99999;top:10px;left:50px;background:cyan;border:0;padding:3px;border-radius:5px;cursor:pointer;');
    button.textContent = "复制ID";
    document.body.appendChild(button);
    button.addEventListener('click',()=>{
        let prefix = location.host.split('.')[0];
        let id = location.href.match(/id=\d*/)[0].slice(3);
        GM_setClipboard(prefix+'_'+id);
    });
}
