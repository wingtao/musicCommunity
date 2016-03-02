
LoginDialog = function (opts) {
    var me = this;

    me.opts = $.extend({
        width: 300,
        height: 180
    }, opts);
    me._init();
};

LoginDialog.prototype._init = function () {
    var me = this;

    if (!me.opts.div) {
        me.div = $("<div name='asasfas'>").appendTo($("body"));
    } else {
        me.div = $("#" + me.opts.div);
    }
    me.usernameID = $.uuid();
    me.passwordID = $.uuid();
    var html =
            '<?php session_start();'
            +'        if (isset($_SESSION["user"])) {'
            +'            ?>'
            +'   <table style="width:100%;">'
            + '    <tr><td>用户名</td><td><input type="text" name="user" id="' + me.usernameID + '" style="width:50%;box-sizing: border-box;"/></td></tr>'
            + '    <tr><td>密码</td><td><input type="password" id="' + me.passwordID + '" style="width:50%;box-sizing: border-box;"/></td></tr>'
            //            + '    <tr><td></td><td><button>Register</button><button>Login</button></td></tr>'
            + ' </table>';
    me.div.html(html);
    me.div.dialog({
        width: me.opts.width,
        height: me.opts.height,
        title: "登录中南音",
        close: function () {
            me.div.remove();
        },
        buttons: [
            {
                text: "注册",
                click: function () {
                    var dlg = new UserDialog({
                        accept: function (val) {
                            var request = {
                                type: "USER_REGISTER",
                                data: val
                            };
                            connect("PHP/csuserver.php", request, function (json) {
                                if (json.success) {
                                    alert("注册成功！");
                                }
                                dlg.close();
                            });
                        }
                    });
                }
            }, {
                text: "登录",
                click: function () {
                    connect("PHP/csuserver.php", {
                        type: "USER_LOGIN",
                        data: me.val()
                    }, function (json) {
                        if (json.success) {
                            alert(json.message);  
                            $("#login").attr("id", "logined");
                            $("#logined").text(json.username);
                        }

                        me.close();

                    });
                }
            }
        ]
    });
};



LoginDialog.prototype.close = function () {
    var me = this;
    me.div.dialog("close");
};


LoginDialog.prototype.val = function () {
    var me = this;
    return {
        username: $("#" + me.usernameID).val(),
        password: $("#" + me.passwordID).val()
    };
};
