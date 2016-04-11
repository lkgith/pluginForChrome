/* content_scripts不能直接操作页面的js，但是可以间接通过操作页面DOM操作页面js
*下面例子是操作window对象,附加属性'changedStatus'
*author lvkunjie
*2016-04-11
*/

// 点击按钮改变页面window对象
$(document).ready(function(){
    $('<button type="button" onclick="window.changedStatus = &#x27;changed&#x27;;alert(window.changedStatus);" style="font-size: 20px;line-height: 40px;height: 40px;border: 2px solid yellow;border-radius: 3px;position: fixed;z-index: 500000;margin-top: 20px;margin-left: 20px;color: red;background-color: #8BC34A;">对window对象添加新属性</button>').insertBefore($('body'));
});