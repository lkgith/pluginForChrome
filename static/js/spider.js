/* 爬虫
* 根据配置的class和id进行爬虫
* author lvkunjie
*/

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse){
    var querySelector = request.queryName;
    var len = $(querySelector).length;
    var titleStr='';
    for (var i=0;i<len;i++) {
      var result = $(querySelector).eq(i).text();
      var url = $(querySelector).eq(i).attr('href');
      if (request.extraType && url && url != 'undefined'){
        result = $(querySelector).eq(i).text() + url;
      }
      titleStr = titleStr + result +'_______';
    }
    sendResponse({result:titleStr});
});// 绑定扩展通知
