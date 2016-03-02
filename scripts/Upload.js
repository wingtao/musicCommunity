

$(function () {
    var bar = $('.bar');
    var percent = $('.percent');
    var showimg = $('#showimg');
    var progress = $(".progress");
    var files = $(".files");
    var btn = $(".btn span");
    var time=date2str(new Date(), "yyyy-MM-dd hh:mm:ss");
    $("#fileupload").wrap("<form id='myupload' action='PHP/FileServer.php' method='post' enctype='multipart/form-data'></form>");
    $("#fileupload").change(function(){ //选择文件
        $("#myupload").ajaxSubmit({
            dataType:  'json', //数据格式为json
            beforeSend: function() { //开始上传
                showimg.empty(); //清空
                progress.show(); //显示进度条
                var percentVal = '0%'; //开始进度为0%
                bar.width(percentVal); //进度条的宽度
                percent.html(percentVal); //显示进度为0%
                btn.html("上传中..."); //上传按钮显示上传中
            },
            data:{
            "username": $("#logined").text(),
            'time':time
        },
            uploadProgress: function(event, position, total, percentComplete) {
                var percentVal = percentComplete + '%'; //获得进度
                bar.width(percentVal); //上传进度条宽度变宽
                percent.html(percentVal); //显示上传进度百分比
            },
            success: function(data) { //成功
                //获得后台返回的json数据，显示文件名，大小，以及删除按钮
                if(data.success){
                files.html("<b>"+data.name+"("+data.size+"m)</b> <span class='delimg' rel='"+data.pic+"'>删除</span>");
                
                btn.html("添加附件"); //上传按钮还原
                }else{
                    alert(data.message);
                }
            },
            error:function(xhr){ //上传失败
                btn.html("上传失败");
                bar.width('0');
                files.html(xhr.responseText); //返回失败信息
            }
        });
    });
    
});    

function date2str(x, y) {
    var z = {M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds()};
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
    });
    return y.replace(/(y+)/g, function (v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}