define(["jquery"],function($){
    function judge(){
        $("#btn1").click(function(){
            $.ajax({
                type:"post",
                url:"../login.php",
                data:{
                    username: $(".username").val(),
                    password:$(".password").val()

                },
                success:function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        $("#alert_info").attr("class","alert alert-danger")
                    }else{
                        $("#alert_info").attr("class","alert alert-success")
                        setTimeout(function(){
                            location.assign("cart.html")
                        },500)
                    }
                    $("#alert_info").html(obj.message);
                    $("#alert_info").css("display","block")
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }
    
    return {
        judge:judge,
    }
})