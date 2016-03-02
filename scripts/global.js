/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function addLoadEvent(func) {           //添加事件
    var oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        };
    }
}

function insertAfter(newElement, targetElement) {           //
    var parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {             //DOM中添加类属性
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function highlightPage() {                  //高亮显示
    if (!document.getElementsByTagName)
        return false;
    if (!document.getElementById)
        return false;
    var headers = document.getElementsByTagName('header');
    if (headers.length === 0)
        return false;
    var navs = headers[0].getElementsByTagName('nav');
    if (navs.length === 0)
        return false;
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for (var i = 0; i < links.length; i++) {
        linkurl = links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) !== -1) {
            links[i].className = "here";
            var linktext = linkurl.substring(0, 4);
            document.body.setAttribute("id", linktext);
        }
    }


}
addLoadEvent(highlightPage);
$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "PHP/login.php?action=login",
        dataType: "html",
        data: {},
        success: function (data) {
            var json = JSON.parse(data);
            if (json.success) {
                $("#login").attr("id", "logined");
                $("#logined").text(json.username);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
            alert('登录读取超时，请检查网络连接');
        }
    });

$('#logout').click(function(){
         $.ajax({
        type: "post",
        url: "PHP/login.php?action=logout",
        dataType: "html",
        async:false,
        data: {},
        success: function (data) {
            var json = JSON.parse(data);
            if (json.success) {
                alert("注销成功！");
                location.reload() ;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
            alert('注销超时，请检查网络连接');
        }
    });
    });


    $('#login').click(function () {
        new LoginDialog();
    });
    $('#register').click(function () {
        var dlg = new UserDialog({
            accept: function (val) {
                var request = {
                    type: "USER_REGISTER",
                    data: val
                };
                connect("PHP/csuserver.php", request, function (json) {
                    dlg.close();
                });

            }

        });
    });
    
    




    $("#search").click(function () {
        var text = $("#search_text").val();
        if (text === "") {
            alert("请输入要查询的歌曲名称！");
            return 0;
        }
        $.ajax({
            type: "post",
            url: "PHP/search.php",
            dataType: "html",
            data: {
                "search": text},
            success: function (data) {
                $("article").html(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
                alert('读取超时，请检查网络连接');
            }
        });
    });

});
function Praise(opt)
{

    var me = this;

    var text = $("#logined").text();
    if (text === "") {
        alert("请先登录！");
        return 0;
    } else {
        var songname = opt.id;

        $.ajax({
            type: "post",
            url: "PHP/praise.php",
            dataType:'json',
            data: {
                "songname": songname},
            success: function (data) {
                if (data.result === "success") {
                    alert("您已点赞！");
                    var str=data.message;
                    var s =parseInt(document.getElementsByClassName(str)[0].innerText);
                    s += 1;
                    document.getElementsByClassName(songname)[0].innerText = s;
                } else {
                    alert("执行异常，请稍后再试！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                
                alert('未能成功点赞，请检查网络连接');
            }
        });
    }
    ;
}
;

