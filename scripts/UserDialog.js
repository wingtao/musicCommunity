UserDialog = function (opts) {
    var me = this;
    me.opts = $.extend({
        width: 300,
        height: 350
    }, opts);
    
    me._init();
};
 
UserDialog.prototype._init = function () {
    var me = this;

    if (!me.opts.div) {
        me.div = $("<div name='asasfas'>").appendTo($("body"));
    } else {
        me.div = $("#" + me.opts.div);
    }

    me.companyID=$.uuid();
    me.usernameID = $.uuid();
    me.passwordID = $.uuid();
    me.password2ID = $.uuid();
    me.addressID=$.uuid();
    me.cellphoneID=$.uuid();
    me.phoneID=$.uuid();
    me.emailID=$.uuid();
    
   

    var html =
            '   <table style="width:100%;">'
            + '    <tr><td>公司名</td><td><input type="text" id="' + me.companyID + '" style="width:50%;box-sizing: border-box;"/></td><td>&nbsp</td></tr>'
            + '    <tr><td>用户名</td><td><input type="text" id="' + me.usernameID + '" style="width:50%;box-sizing: border-box;"/></td><td style="color:red">*</td></tr>'
            + '    <tr><td>密码</td><td><input type="password" id="' + me.passwordID + '" style="width:50%;box-sizing: border-box;"/></td><td style="color:red">*</td></tr>'
            + '    <tr><td>确认密码</td><td><input type="password" id="' + me.password2ID + '" style="width:50%;box-sizing: border-box;"/></td ><td style="color:red">*</td></tr>'
            + '    <tr><td>地址</td><td><input type="text" id="' + me.addressID + '" style="width:50%;box-sizing: border-box;"/></td><td>&nbsp</td></tr>'
            + '    <tr><td>手机号</td><td><input type="text" id="' + me.cellphoneID + '" style="width:50%;box-sizing: border-box;"/></td><td style="color:red">*</td></tr>'
            + '    <tr><td>电话</td><td><input type="text" id="' + me.phoneID + '" style="width:50%;box-sizing: border-box;"/></td><td>&nbsp</td></tr>'
            + '    <tr><td>邮箱</td><td><input type="text" id="' + me.emailID + '" style="width:50%;box-sizing: border-box;"/></td><td style="color:red">*</td></tr>'
            + '    <tr><td colspan="3" style="text-align:center">(带星号的为必填项目)</td></tr>'
    //            + '    <tr><td></td><td><button>Register</button><button>Login</button></td></tr>'
            + ' </table>';
    me.div.html(html);
    
    

    me.div.dialog({
        width: me.opts.width,
        height: me.opts.height,
        title: "欢迎注册",
        close:function(){
            me.div.remove();
        },
        
        buttons: [
             {
                text: "ok",
                click: function () {
                    me.checkSheet();
                    var user = me.val();
                    /*if($.trim(me.username)==="" || $.trim(me.password) === "" ||$.trim(me.Email) ==="" ||$.trim(me.Cellphone) === "" ){
                        return;
                    }*/
                    
                    if(me.opts.accept){
                        me.opts.accept(user);
                    }
                    me.div.remove();
                }
            }
        ]
    });
};

UserDialog.prototype.val = function(){
    var me = this;
     
    return {
        company: $("#"+me.companyID).val(),
        username: $("#"+me.usernameID).val(),
        password: $("#" + me.passwordID).val(),
        address: $("#"+me.addressID).val(),
        cellphone: $("#"+me.cellphoneID).val(),
        phone: $("#"+me.phoneID).val(),
        email: $("#"+me.emailID).val()
        
    };
};

UserDialog.prototype.checkSheet = function(){
    //cellphone
    var me =this;

    var cellLength=$("#"+me.cellphoneID).val();//检查手机号码长度
    if(cellLength.length!==11){
        alert("the number of cellphone isn't correct!");
        return ;
    }
    var pFirst=$("#" +me.passwordID).val();//检查两次密码是否相同
    var pSceond =$("#"+me.password2ID).val();
    if(pFirst!==pSceond){
        alert("Two times the password is not consistent");
        return;
    }
    
    var em_str=$("#"+me.emailID).val().trim();
    if(em_str.length!==0){
        reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if(!reg.test(em_str)){
            alert("邮箱格式不正确！");
        }
    }
};
