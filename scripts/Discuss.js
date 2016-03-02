/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var str;
function showComment()
{
    str = $("#comment").val();
    if (str.length === 0)
    {
        alert("您未输入评论内容！");
        return;
    }

    var name = $("#logined").text();

    var time = date2str(new Date(), "yyyy-MM-dd hh:mm:ss");
    var comment = {
        "username": name,
        'comment': str,
        'commentTime': time
    };

    if (name === "")
    {
        alert("请先登录！");
    } else {
        $.ajax({
            type: "post",
            url: "PHP/discuss.php",
            dataType: "json",
            data: {
                "comment": JSON.stringify(comment)
            },
            success: function (data) {
                if (data.success) {

                    addRow(str, name, time);
                } else {
                    alert(data.message);
                }
            },
            error: function (data) {
                alert("评论未成功！");
            }

        })
    }
}

function addRow(comment, id, time) {

//添加一行

    var newTr = document.getElementById('comment_body').insertRow(0);

//添加两列
    var newTd0 = newTr.insertCell();
    var newTd1 = newTr.insertCell();
    var newTd2 = newTr.insertCell();
    var newTd3 = newTr.insertCell();
//设置列内容和属性
    newTd0.innerText = "最新";


    newTd1.innerText = id;

    newTd2.innerText = comment;
    newTd3.innerText = time;
}

function date2str(x, y) {
    var z = {M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds()};
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
    });
    return y.replace(/(y+)/g, function (v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}