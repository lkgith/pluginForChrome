/* 屏蔽广告
* 根据class和id以及src、href进行广告屏蔽
* 可以自定义要屏蔽的class和id以及src、href
* author lvkunjie
*2016-04-11
*/

// 要屏蔽的class
var adClass = ['rightad','ad_class','ad-box','adLeft','adRight','mod_ad','skin_link','ad-section'];

// 要屏蔽的id
var adId = ['BAIDU_SSP__wrapper','PoP','cpro_','ad_','cs_','MZADX','QQ_takeover','QQ_HP','QQCOM_N_Rectangle','icast5','_AdSame','QQlive_SP_HP','jingdongAd','adClick','adDiv'];

// 要屏蔽的src及href
var adSrc = ['pos.baidu.com','37cs.com/html/click/','p.ns5n.com/'];

/* disableAd.js插入页面的时间是document_start
* 为保证在doucument ready之前不展现广告,每隔timeLong的时间去执行删除广告
* 默认插入页面之后执行一次删除广告,timeLong是页面循环指定DOM的时间
*/

var timeLong = 0;
function check(str,arr){
    if (str){
        var flag = false;
        if($.inArray(arr,str) < 0){
            $.each(arr,function(i,item){
                if (str.indexOf(item) > -1){
                   flag = true;
                   return false; 
                }
            })
            return flag;
        }
        return true;
    }
    return false; 
}
var deleteAd = function(){
    var flag = false;
    var timeBefore = new Date();
    $.each([$('iframe'),$('div'),$('a')],function(j,res){
        $.each(res,function(i,item){
            var flag = item && item.tagName;
            if(flag && item.tagName == 'IFRAME' && item.src && check(item.src,adSrc)){
                item.remove();
            }
            else if(flag && item.tagName == 'DIV' && (check(item.id,adId) || check(item.className,adClass)) ){
                item.remove();
            }
            else if(flag && item.tagName == 'A' && item.href && check(item.href,adSrc) ){
                item.remove();
            }
        })
    })
    timeLong = new Date() - timeBefore;
}
var time = setInterval(deleteAd,timeLong/1000);
$(document).ready(function(){
    setTimeout(function(){
        clearInterval(time);
        time = null;
    },1000 * 6);
});

// 自定义删除广告配置
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse){
    var idArr = request.idArr;
    var classArr = request.classArr;
    var srcArr = request.srcArr;
    adClass = classArr.length > 0 ? adClass.concat(classArr) : adClass;
    adId = idArr.length > 0 ? adId.concat(idArr) : adId;
    adSrc = srcArr.length > 0 ? adSrc.concat(srcArr) : adSrc;

    //配置记录需记录到cookie,之后默认匹配此cookie中记录的配置 TODO
    if (time){
        sendResponse({result:'正在执行中!'});
    }
    else{
        deleteAd();
        sendResponse({result:'Done!'});
    }
});//绑定扩展通知
