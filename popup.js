$(document).ready(function(){
    var ctrBtn = ['spider-ctr','bookMark-ctr','deleteAd-ctr'];
    $('.btn-ctr').on('click',function(e){
        if(this.id && $.inArray(this.id,ctrBtn) >= 0){
            var nodes = '.ctrl-btn-' + this.id.split('-ctr')[0];
            if (!$(this).hasClass('current')){
                $(this).addClass('current').find('span').text('收起');
                $(nodes).show();
            }
            else{
                $(this).removeClass('current').find('span').text('展开');
                $(nodes).hide();
            }
            
        }
    });

    /*
    * 爬虫操作
    * 
    */
    
    $("#startQuery").on('click', function() {
        $('#queryResult').hide();
        var querySelector = $('#querySelector').val();
        var queryEle = $('#getTitle').val();
        var hrefFlag = 0;
        if($('#getUrl').val()){
            hrefFlag = 1;
        }
        $('#queryResult').css({"width":"200px","height":"200px"}).show();
        if (querySelector && queryEle){
            if((querySelector.indexOf('.') > -1) || (querySelector.indexOf('#') > -1)){
                chrome.tabs.getSelected(null, function(tab) {
                    chrome.tabs.sendRequest(tab.id,{"queryName": querySelector, "queryType": 'a',"extraType":hrefFlag}, function handler(response) {
                        $('#queryResult').text(response.result);
                    });
                });
            }
            else{
                $('#queryResult').text("请检查选择器值输入是否有误").css('color','red');
            }  
        }
        else if(!querySelector){
            $('#queryResult').text("请填入选择器值");
        }
        else if (!queryEle){
            $('#queryResult').text("请填入是否查询标题");
        }
        else{
            $('#queryResult').text("请检查输入是否有误");
        }
    });
    
    /*
    * 书签操作
    * 
    */
   
    // 隐藏书签栏
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
    });
    
    // 显示书签栏
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
    });

    /*
    * 广告操作
    * 
    */
    
    $('#startDeleteAd').on('click',function(){
        if ($('.delete-current') && $('.delete-current').length > 0){
            $('.delete-current').removeClass('delete-current');
        }
        var idArr = $('input[name=id-input]').val() ? $('input[name=id-input]').val().split(',') : [];
        var classArr = $('input[name=class-input]').val() ? $('input[name=class-input]').val().split(',') : [];
        var srcArr = $('input[name=src-input]').val() ? $('input[name=src-input]').val().split(',') : [];
        if (idArr.length > 0 || classArr.length > 0 || srcArr.length > 0){
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id,{"srcArr": srcArr, "idArr": idArr,"classArr":classArr}, function handler(response) {
                    $('.ad-show').text(response.result).addClass('delete-current');
                });
            });
        }
        
    });
    

})


