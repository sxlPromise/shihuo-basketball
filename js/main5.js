define(["jquery"],function($){
    function judge(){
        $(".username").blur(function(){
            var oValue = $(this).val();
            if(oValue.length > 18 || oValue.length < 6){
                $("#alert_info").css("display","block")
                $("#alert_info").html("❗️长度应为6~18个字符")
            }else if(!/[a-zA-Z]/.test(oValue[0])){
                $("#alert_info").css("display","block")
                $("#alert_info").html("❗️邮箱地址必须以英文字母开头")
            }else if(/\W/.test(oValue)){
                $("#alert_info").css("display","block")
                $("#alert_info").html("❗️邮件地址需由字母、数字或下划线组成")
            }else{
                $(".username").css("border-color","green");
                $("#alert_info").css("display","none")
            }
        })

        $(".password").blur(function(){
            var oValue1 = $(this).val();
            if(oValue1.length > 16 || oValue1.length < 6){
                $("#alert_info").css("display","block")
                $("#alert_info").html("密码长度应为6~16个字符")
            }else{
                $(".password").css("border-color","green");
                $("#alert_info").css("display","none")
            }
        })
        $(".repassword").blur(function(){
            var oValue2 = $(this).val();
            if(oValue2 == $(".password").val()){
                $(".repassword").css("border-color","green");
                $("#alert_info").css("display","none")
            }else{
                $("#alert_info").css("display","block")
                $("#alert_info").html("两次填写的密码不一致")
            }
        })
        $(".phonenumber").blur(function(){
            var oValue3 = $(this).val();
            if(/^[1][3|4|5|7|8][0-9]{9}$/.test(oValue3)){
                $(".phonenumber").css("border-color","green");
                $("#alert_info").css("display","none")
            }else{
                $("#alert_info").css("display","block")
                $("#alert_info").html("请输入正确的手机号")
            }
        })
        $("#btn1").click(function(){
            $.ajax({
                type:"post",
                url:"../register.php",
                data:{
                    username:$(".username").val(),
                    password:$(".password").val(),
                    repassword:$(".repassword").val(),
                    phonenumber:$(".phonenumber").val(),
                    createTime:(new Date()).getTime()
                },
                success:function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        $("#alert_info").attr("class","alert alert-danger")
                    }else{
                        $("#alert_info").attr("class","alert alert-success")
                        setTimeout(function(){
                            location.assign("login.html")
                        },500)
                    }
                    $("#alert_info").html(obj.message);
                    $("#alert_info").css("display","block")
                },
                error:function(msg){
                    console.log(msg)
                }
            })
        })
    }

    return {
        judge:judge,
    }
})