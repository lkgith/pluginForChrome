$(document).ready(function(){
    $("#closeBookMark").on("click",function(){
        chrome.bookmarks.getTree(function(bookmarkTreeNodes){
            var bookMarks = bookmarkTreeNodes[0].children[0];
            for(var i=0;i<bookMarks.children.length;i++){
                var nodeEleId = bookMarks.children[i].id;
                chrome.bookmarks.move(nodeEleId,{
                    parentId:'2',
                    index:0
                },function(){
                });
            }
        })
    });//隐藏书签栏
        $("#showBookMark").on("click",function(){
        chrome.bookmarks.getTree(function(bookmarkTreeNodes){
            var bookMarks = bookmarkTreeNodes[0].children[1];
            for(var i=0;i<bookMarks.children.length;i++){
                var nodeEleId = bookMarks.children[i].id;
                chrome.bookmarks.move(nodeEleId,{
                    parentId:'1',
                    index:0
                },function(){
                });
            }
        })
    });//显示书签栏
    $("#startQuery").on('click', function() {//爬虫
        $('#queryResult').hide();
        var querySelector = $('#querySelector').val();
        var queryEle = $('#getTitle').val();
        var hrefFlag = 0;
        if($('#getUrl').val()){
            hrefFlag = 1;
        }
        if (querySelector && queryEle){
            if((querySelector.indexOf('.') > -1) || (querySelector.indexOf('#') > -1)){
                chrome.tabs.getSelected(null, function(tab) {
                    chrome.tabs.sendRequest(tab.id,{"queryName": querySelector, "queryType": 'a',"extraType":hrefFlag}, function handler(response) {
                        $('#queryResult').text(response.result);
                        $('#queryResult').css({"width":"400px","height":"800px"});
                        $('#queryResult').show();
                    });
                });
            }
            else{
                $('#queryResult').text("请检查选择器值输入是否有误");
                $('#queryResult').css({"width":"200px","height":"200px"});
                $('#queryResult').show();
            }  
        }
        else if(!querySelector){
            $('#queryResult').text("请填入选择器值");
            $('#queryResult').css({"width":"200px","height":"200px"});
            $('#queryResult').show();
        }
        else if (!queryEle){
            $('#queryResult').text("请填入是否查询标题");
            $('#queryResult').css({"width":"200px","height":"200px"});
            $('#queryResult').show();
        }
        else{
            $('#queryResult').text("请检查输入是否有误");
            $('#queryResult').css({"width":"200px","height":"200px"});
            $('#queryResult').show();
        }
    });
})


