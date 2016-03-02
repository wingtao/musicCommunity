/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    $.ajax({
        type: "post",                                                       //新歌列表
        async: false,
        url: "PHP/newsong.php",
        dataType: "html",
        data: {},
        success: function (data) {
            
            $("#SongList").html(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert('读取超时，请检查网络连接');
        }
        });
        
        $.ajax({                                                        //评论列表
        type: "post",
        async: false,
        url: "PHP/discussList.php",
        dataType: "html",
        data: {},
        success: function (data) {
            
            $("#comment_body").html(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert('读取超时，请检查网络连接');
        }
        });
         $.ajax({                                                           //排行榜列表
        type: "post",
        async: false,
        url: "PHP/Rank.php",
        dataType: "html",
        data: {},
        success: function (data) {
            
            $("#RankLis").html(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
            alert('读取超时，请检查网络连接');
        }
        });
});
