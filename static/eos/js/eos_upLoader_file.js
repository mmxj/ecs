/**
* 功能说明:		
* @author:		
* @time:		
* @version:		
*/
//  上传文件
//  传进去 json 数据
//  'uploaderObj':  给每一个初始化控件设置一个独立的变量名
//  'uploaderBox':  最外层的元素class 或 ID
//  'uploaderList': 存放上传文件的dom元素名字
//  'initBtn':      初始化按钮的名字
//  'serverUrl':    接收服务器地址
//  'upType':       上传类型：0：上传文件到mongodb数据库保存 1：提交批量导入数据模版保存数据到MySql数据库
function eosUploaderFile(initData){
    var init = {},
        upType = initData['upType'];
    init[initData['uploaderObj']] = WebUploader.create({
        auto: false,
        swf: '../assets/plugins/webuploader/js/Uploader.swf',
        server: initData['serverUrl'],
        formData: initData['data'],
        pick: initData['initBtn'],
        fileNumLimit: initData['fileNumLimit'],
        resize: false,
        fileSingleSizeLimit: 16 * 1024 * 1024,
        accept: {
            title: 'intoTypes',
            extensions: 'rar,zip,doc,xls,docx,xlsx,pdf',
            mimeTypes: ''
        }
    });
    init[initData['uploaderObj']].on( 'fileQueued', function( file ) {
        $(initData['uploaderBox']).find(initData['uploaderList']).append( 
            '<div id="' + file.id + '" class="item" data="">' +
                '<h4 class="info">' + file.name + '</h4>' +
                '<div class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                    '</div>'+
                '</div>'+
                '<div class="action"><button class="startBtn btn btn-default">开始</button><button class="btn btn-default delBtn">删除</button></div>'+
                '<p class="state">等待上传...</p>' +
            '</div>' );
        if (!$(initData['uploaderBox']).find(".ctlAllBtn").html()) {
            if (initData['fileNumLimit'] == 1) {
                $(initData['uploaderBox']).find(".btns").hide();
            }
            else {
                $(initData['uploaderBox']).find(".btns").append('<button class="btn btn-default ctlAllBtn">全部上传</button><button class="btn btn-default delAllBtn">全部删除</button>')
            }
        }
    });
    init[initData['uploaderObj']].on('uploadBeforeSend', function (obj, data, headers){
        initData['fileBeforeSend'] && initData['fileBeforeSend'](obj, data, headers);
    })
    init[initData['uploaderObj']].on('uploadProgress', function( file, percentage ){
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress .progress-bar');
        $li.find('p.state').text('上传中...');
        $percent.css( 'width', percentage * 100 + '%' );
    });
    init[initData['uploaderObj']].on('uploadAccept', function (object, ret) {
        if (upType != 1) {
            if (ret.Data.length) {
                if (ret.Data[0]['UploadTips'] != 'ok') {
                    return false
                }
            } else {
                return false;
            }
        }
    })
    init[initData['uploaderObj']].on( 'uploadSuccess', function( file,response ) {
        $( '#'+file.id ).find(".startBtn").remove();
        $('#' + file.id).find('p.state').html('<span type="color:#81c868">上传成功</span>');

        if (upType != 1) {
            $('#' + file.id).attr("data", response.Data[0].ResourceId); //上传成给data赋值
            $('#' + file.id).append('<input type="hidden" value="' + response.Data[0].ResourceId + '">');
        }
        initData['succ'] && initData['succ'](response);
    });
    init[initData['uploaderObj']].on( 'uploadError', function( file ) {
        setTimeout(function (){
            $( '#'+file.id ).find('.progress-bar').animate({'width':'0%'},400);
        },400)
        $( '#'+file.id ).find(".startBtn").html("重新上传");
        $( '#'+file.id ).find('p.state').html('<span style="color: #f43838">上传出错</span>');
        initData['error'] && initData['error'](file);
    });
    init[initData['uploaderObj']].on( 'uploadComplete', function( file) {
        // $( '#'+file.id ).find('.progress').fadeOut();
    });
    //  验证
    init[initData['uploaderObj']].on("error",function (type){
         if(type == "F_DUPLICATE"){
             window.parent.vdialog({
                title: '系统提示',type:'error',modal: true,
                content: "您已经上传了一份，请不要重复上传！",
                ok: true
             });
         }else if(type == "F_EXCEED_SIZE"){
             window.parent.vdialog({
                title: '系统提示',type:'error',modal: true,
                content: "单个附件的大小不可超过 16M 哦！换个小点的文件吧！",
                ok: true
             });
         }else if(type == "Q_TYPE_DENIED"){
             window.parent.vdialog({
                title: '系统提示',type:'error',modal: true,
                content: "为了系统安全，请上传系统规定的文件<br />doc，docx，pdf，zip，rar，xls，xlsx",
                ok: true
             });
         }
     });
    $(initData['uploaderBox']).on('click',".ctlAllBtn",function (){
        $(initData['uploaderBox']).find(initData['uploaderList']+" .item").each(function (){
            init[initData['uploaderObj']].upload($(this).attr("id"));
        });
    })
    $(initData['uploaderBox']).on('click',".delAllBtn",function (){
        $(initData['uploaderBox']).find(initData['uploaderList'] + " .item").each(function () {

            //$(this).find("input:hidden").val()
            //$(this).attr("data")
            initData['del'] && initData['del']($(this).attr("data"));

            init[initData['uploaderObj']].removeFile($(this).attr("id"));
            $(this).remove();
        });
        $(initData['uploaderBox']).find(".ctlAllBtn , .delAllBtn").remove();
    })
    $(initData['uploaderBox']).on('click', '.delBtn', function () {
        $(initData['uploaderBox']).find(".btns").show();
        if($(initData['uploaderBox']).find(initData['uploaderList']+" .item").length == 1){
            $(initData['uploaderBox']).find(".ctlAllBtn , .delAllBtn").remove();
        };
        init[initData['uploaderObj']].removeFile($(this).parents('.item').attr('id'));
        $(this).parents('.item').remove();

        //$(this).parents('.item').find("input:hidden").val()
        initData['del'] && initData['del']($(this).parents('.item').attr("data"));
    })
    $(initData['uploaderBox']).on('click', '.startBtn', function (){
        init[initData['uploaderObj']].upload($(this).parents('.item').attr('id'));
    })
}
//  上传图片
//  传进去 json 数据
//  'uploaderObj':  给每一个初始化控件设置一个独立的变量名
//  'uploaderBox':  最外层的元素class 或 ID
//  'uploaderList': 存放上传文件的dom元素名字
//  'initBtn':      初始化按钮的名字
//  'serverUrl':    接收服务器地址
//  'fileNumLimit'  规定上传个数
//  'fileSingleSizeLimit'  限制上传体积
function eosUploaderImg(initData) {
    var init = {},
        $wrap = $(initData['uploaderBox']).find('.eos_uploader_img'),
        $queue = $(initData['uploaderBox']).find( '.filelist' ),
        fileCount = 0,
        fileSize  = 0;
    // 初始化Web Uploader
    init[initData['uploaderObj']] = WebUploader.create({
        auto: false,
        swf: false,
        server: initData['serverUrl'],
        pick: initData['initBtn'],
        fileNumLimit: initData['fileNumLimit'],
        fileSingleSizeLimit: initData['fileSingleSizeLimit'],
        formData: initData['data'],
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: ''
        }
    });
    //获取数据库中的图片地址加载图片
    function addImg(ResourceId, imgUrl)
    {
        $(initData['uploaderBox']).find(".placeholder").hide()
        var $li = $('<li id="' + ResourceId + '" class="item" data-num="dataImg" data="' + ResourceId + '">' +
                '<p class="title">' + ' ' + '</p>' +
                '<p class="imgWrap"></p>' +
                '<p class="progress"><span></span></p>' +
                '</li>'),
        $btns = $('<div class="file-panel">' +
            '<span class="cancel">删除</span>').appendTo($li),
        $prgress = $li.find('p.progress span'),
        $wrap = $li.find('p.imgWrap'),
        $info = $('<p class="error"></p>');

        var img = $('<img src="' + imgUrl + '">');
        $wrap.empty().append(img);

        $li.prependTo($queue);
        //文件数加一
        fileCount++;
        if (fileCount < initData['fileNumLimit']) {
            $(initData['uploaderBox']).find(".statusBar").show();
            $(initData['continueBtn']).show();
            init[initData['uploaderObj']].addButton({
                id: initData['continueBtn'],
                label: '继续添加'
            });
        } else {
            $(initData['continueBtn']).hide();
        }
    }
    function loadImg() {
        var ResourceIds = initData['ResourceIds'];
        var imgUrls = initData['imgUrls'];
        if (ResourceIds != null && ResourceIds != "") {
            if (Object.prototype.toString.call(ResourceIds) === '[object Array]') {
                for (var i = 0; i < ResourceIds.length; i++) {
                    addImg(ResourceIds[i], imgUrls[i]);
                }
            }
            else {
                addImg(ResourceIds, imgUrls);
            }
        }
    }
    loadImg();
    // 拖拽时不接受 js, txt 文件。
    init[initData['uploaderObj']].on( 'dndAccept', function( items ) {
        var denied = false,
            len = items.length,
            i = 0,
            // 修改js类型
            unAllowed = 'text/plain;application/javascript ';
        for ( ; i < len; i++ ) {
            // 如果在列表里面
            if ( ~unAllowed.indexOf( items[ i ].type ) ) {
                denied = true;
                break;
            }
        }
        return !denied;
    });
    function addFile( file ) {
        $(initData['uploaderBox']).find(".placeholder").hide()
        var $li = $( '<li id="' + file.id + '" class="item">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>'+
                '<p class="progress"><span></span></p>' +
                '</li>' ),
        $btns = $('<div class="file-panel">' +
            '<span class="cancel">删除</span>').appendTo( $li ),
        $prgress = $li.find('p.progress span'),
        $wrap = $li.find( 'p.imgWrap' ),
        $info = $('<p class="error"></p>');
        init[initData['uploaderObj']].makeThumb( file, function( error, src ) {
            var img;
            if (error) {
                $wrap.text( '不能预览' );return;
            }
            img = $('<img src="'+src+'">');
            $wrap.empty().append( img );
        }, 110, 110 );
        $li.prependTo( $queue );
    }
    init[initData['uploaderObj']].on('uploadBeforeSend', function (obj, data, headers){
        initData['fileBeforeSend'] && initData['fileBeforeSend'](obj, data, headers);
    })
    // 当有文件添加进来的时候
    init[initData['uploaderObj']].on( 'fileQueued', function( file ) {
        addFile(file);
        $(initData['uploaderBox']).find(".info").html(text);
        fileCount++;
        fileSize += file.size;
        var text = '选中 ' + fileCount + ' 张图片';
        if ( fileCount === 1) {
            $(initData['uploaderBox']).find(".statusBar").show();
            $(initData['continueBtn']).show();
            init[initData['uploaderObj']].addButton({
                id: initData['continueBtn'],
                label: '继续添加'
            });
        }
        if(fileCount >= initData['fileNumLimit']){
            $(initData['continueBtn']).hide();
        }
    });
    // 文件上传过程中创建进度条实时显示。
    init[initData['uploaderObj']].on( 'uploadProgress', function( file, percentage ) {
        var $li = $('#'+file.id),
            $percent = $li.find('.progress span');
        $percent.css( 'width', percentage * 100 + '%' );
    });
    init[initData['uploaderObj']].on('uploadAccept', function (object,ret){
        if(ret.Data.length){
            if (ret.Data[0]['UploadTips'] != 'ok'){
                return false
            }
        }else{
            return false;
        }
    })
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    init[initData['uploaderObj']].on( 'uploadSuccess', function( file,response ) {
        $( '#'+file.id ).addClass('upload-state-done');
        var $li = $( '#'+file.id ),
            $success = $li.find('div.success');
        // 避免重复创建
        if ( !$success.length ) {
            $success = $('<div class="success"></div>').appendTo( $li );
        }
        $success.text('');
        $('#' + file.id).append('<input type="hidden" value="' + response.Data[0].ResourceId + '">');
        $('#' + file.id).attr('data', response.Data[0].ResourceId);
        initData['succ'] && initData['succ'](response);
    });
    init[initData['uploaderObj']].on('fileDequeued', function (file){
        fileCount--;
        fileSize -= file.size;
        if ( !fileCount ) {
            $(initData['uploaderBox']).find(".statusBar").hide();
            $(initData['uploaderBox']).find(".placeholder").show()
        }
    })
    // 文件上传失败，显示上传出错。
    init[initData['uploaderObj']].on( 'uploadError', function( file ) {
        setTimeout(function (){
            $( '#'+file.id ).find('.progress span').animate({'width':'0%'},200);
        },200)
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');
        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }
        $error.text('上传失败');
        initData['error'] && initData['error'](file);
    });
    // 完成上传完了，成功或者失败，先删除进度条。
    init[initData['uploaderObj']].on( 'uploadComplete', function( file ) {
        // $( '#'+file.id ).find('.progress').remove();
        var fileSizeFormat = fileSize;
        var stats = init[initData['uploaderObj']].getStats();
        var text = '共 ' + fileCount + ' 张，已上传 ' + stats.successNum + ' 张';

        if ( stats.uploadFailNum ) {
            text += '，失败 ' + stats.uploadFailNum + ' 张；<a class="retry" href="Javascript:;">重新上传 </a>失败图片';
        }
        $(initData['uploaderBox']).find(".info").html(text);
    });
    $(initData['uploaderBox']).on("click",".uploadBtn", function (){
        init[initData['uploaderObj']].upload();
    });
    $(initData['uploaderBox']).on("click", ".cancel", function () {
        if ($(this).parents('.item').attr('data-num') == "dataImg") {
            fileCount = fileCount - 1;
            $(this).parents('.item').remove();
            initData['del'] && initData['del']($(this).parents('.item').attr('id'));
            if (!fileCount) {
                $(initData['uploaderBox']).find(".statusBar").hide();
                $(initData['uploaderBox']).find(".placeholder").show()
                init[initData['uploaderObj']].addButton({
                    id: initData['initBtn'],
                    label: '点击选择图片'
                });
            } else {
                if (fileCount < initData['fileNumLimit']) {
                    $(initData['continueBtn']).show();
                }
            }
        }
        else {
            init[initData['uploaderObj']].removeFile($(this).parents('.item').attr('id'));
            $(this).parents('.item').remove();
            if ($(this).parents('.item').find("input:hidden").val() != null) {
                initData['del'] && initData['del']($(this).parents('.item').find("input:hidden").val());
            }
            if (fileCount < initData['fileNumLimit']) {
                $(initData['continueBtn']).show();
            }
        }
    });
    // 验证
    init[initData['uploaderObj']].on("error",function (type){
         if(type == "F_DUPLICATE"){
             window.parent.vdialog({
                title: '系统提示',type:'error',modal: true,
                content: "您已经上传了一份，请不要重复上传！",
                ok: true
             });
         }else if(type == "F_EXCEED_SIZE"){
             window.parent.vdialog({
                title: '系统提示',type:'error',modal: true,
                content: "单个附件的大小不可超过 3M 哦！换个小点的文件吧！",
                ok: true
             });
         }else if(type == "Q_EXCEED_NUM_LIMIT"){
             window.parent.vdialog({
                title: '系统提示',type:'error',modal: true,
                content: "您准备上传的照片超过限定的数量啦！",
                ok: true
             });
         }else if(type == "Q_TYPE_DENIED"){
             window.parent.vdialog({
                title: '系统提示',type:'error',modal: true,
                content: "请上传系统规定的文件<br />gif，jpg，jpeg，bmp，png",
                ok: true
             });
         }
     });
    // 鼠标进入li 效果
    $(initData['uploaderBox']).on( 'mouseenter','.queueList li.item', function() {
    	console.log('11111');	
        $(this).find('.file-panel').stop().animate({height: 29});
    });
    $(initData['uploaderBox']).on( 'mouseleave','.queueList li.item', function() {
        $(this).find('.file-panel').stop().animate({height: 0});
    });
    $(initData['uploaderBox']).on( 'click','.retry', function() {
        init[initData['uploaderObj']].retry();
    });
}