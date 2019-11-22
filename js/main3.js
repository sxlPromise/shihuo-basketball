define(["jquery","jquery-cookie"],function($){
    function appear(){
        //搜索框上的div显示
        $("#search").focus(function(){
            $("#tags").css("display","none");
        })
        $("#search").blur(function(){
            $("#tags").css("display","block");
            $("#search").html("")
        })
        /* $(".leftlist a").click(function(){
            return false;
        }) */
    }
    function topnav(){
        //顶部导航栏数据下载
        $.ajax({
            type:"get",
            url:"../json/topnav.json",
            success:function(arr){
                for(var i = 0; i < arr.length; i++){
                    var childArr = arr[i].child;
                    var node = $(` <li class = "topli">
                    <a href="#">${arr[i].title}</a>
                    <div class = "topnavleft">
                    
                    </div>
                    </li>`)
                    node.appendTo($("#topnav"));


                    for(var j = 0; j < childArr.length; j++){
                        var oUl = $(`<ul></ul>`);
                        $(`<li>
                            <div class = "img">
                                <img src="${childArr[j].img}" alt="">
                            </div>
                            <div class="shoesname">
                                <p id="shoesname">${childArr[j].title}</p>
                            </div>
                            <div class="price">
                                <p id="price">${childArr[j].price}</p>
                            </div>
                        </li>`).appendTo(oUl);
                        oUl.appendTo(node.find(".topnavleft"))
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

    function topnavTab(){
        //头部导航栏切换
        $("#topnav").on("mouseenter",".topli",function(){
            $(this).find(".topnavleft").stop(true).animate({
                height:300,
            },500).css("display","block");
        });
        $("#topnav").on("mouseleave",".topli",function(){
            $(this).find(".topnavleft").stop(true).animate({
                height:0,
            }).css("display","none")
        });
    }
    function color(){ // 加载配色信息
        $.ajax({
            type:"get",
            url:"../json/lbj16.json",
            success:function(obj){
                var colorArr = obj.color;
                for(var i = 0; i < colorArr.length; i++){
                    var node = $(`<li>
                    <a href="">
                        <div class="img">
                            <img src="${colorArr[i].img}" alt="">
                        </div>
                        <div class="desc">
                            <p class="price">${colorArr[i].price}</p>
                            <p class="stylename">${colorArr[i].stylename}</p>
                        </div>
                    </a>
                </li>`)
                node.appendTo($(".colorul"));
                }
                var numArr = obj.num;
                for(var j = 0; j < numArr.length; j++){
                    var node2 = $(`<li>
                    <a href="" class="all_color">
                        全部
                        <span>${numArr[j].number}款</span>
                        配色
                    </a>
                </li>`)
                node2.appendTo($(".colorul"));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function colorTab(){ // 配色动画
        $(".colorul").on("mouseenter","li",function(){
            $(this).find($(".desc")).css("height","50");
            $(this).find($(".price")).css({
                visibility:"visible",
                opacity:1,
                color:"#FF4338"
            });
            $(this).find($(".stylename")).css("color","#FF4338");
        })
        $(".colorul").on("mouseleave","li",function(){
            $(this).find($(".desc")).css("height","21");
            $(this).find($(".price")).css({
                visibility:"hidden",
                opacity:0,
                color:"#333"
            });
            $(this).find($(".stylename")).css("color","#333");
        })
    }
    function shoplist(){ // 商店列表加载
        cartnum();
        $.ajax({
            type:"get",
            url:"../json/lbj16.json",
            success:function(obj){
                var shopArr = obj.shoplist;
                for(var i = 0; i < shopArr.length; i++){
                    var node = $(`<li>                                      
                    <div class="img">
                        <img src="${shopArr[i].img}" alt="">
                    </div>
                    <div class="cell">
                        <a href="">
                            <div class="tit">
                                <p class="ft">
                                    <b class="supplier-name">${shopArr[i].name}</b>
                                    <span>官网</span>
                                    <i class="grade">${shopArr[i].mark}</i>
                                </p>
                            </div>
                            <div class="shoessize">
                                <div class="chima">尺码</div>
                                <div class="size">${shopArr[i].size}</div>
                            </div>
                        </a>
                    </div>
                    <div class="td4">
                        <div class="price2">
                            <a href="">¥${shopArr[i].price}</a>
                        </div>
                    </div>
                    <div class = "cartbtn">
                        <span id = "${shopArr[i].id}" class = "btn">+</span>
                    </div>
                </li>`)
                node.appendTo($(".shop_list_ul"))
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    function addcart(){ // 添加购物车
        $(".shop_list_ul").on("click",".btn",function(){
            
            // alert(this.id);
            var id = this.id;
            var first = $.cookie("goods") == null ? true : false;
            if(first){
                var obj = [{id : id, num :1}];
                $.cookie("goods",JSON.stringify(obj),{
                    expires:7
                })
            }else{
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var same = false;
                for(var i = 0; i < cookieArr.length; i++){
                    if(id == cookieArr[i].id){
                       cookieArr[i].num++;
                       same = true;
                       break; 
                    }
                }
                if(!same){
                    var obj = {id:id,num:1};
                    cookieArr.push(obj);
                }
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }
            cartnum();
        })
    }
    function cartnum(){ // 显示购物车数量
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for(var i = 0; i < cookieArr.length; i++){
                sum += cookieArr[i].num;
            }
            $(".carnum").html(sum);
        }else{
            $(".carnum").html(0);
        }
    }
    function good(){ // 加载商品图片
        $.ajax({
            type:"get",
            url:"../json/lbj16.json",
            success:function(obj){
                var goodArr = obj.good;
                for(var i = 0; i < goodArr.length; i++){
                    var node = $(`<a href="">
                    <img src="${goodArr[i].img}" alt="">
                </a>`)
                node.appendTo($(".bigpic"));
                }
                for(var k = 0; k < goodArr.length; k++){
                    var node = $(`<a href="">
                    <img src="${goodArr[k].img}" alt="">
                </a>`)
                node.appendTo($(".big"));
                }
                $(".bigpic").find("img").eq(0).css("display","block");
                $(".big").find("img").eq(0).css("display","block");
                var tipArr = obj.tip;
                for(var j = 0; j < tipArr.length; j++){
                    var node3 = $(`
                    <li class="">
                        <a href="#">
                            <img src="${tipArr[j].img}" alt="">
                        </a>
                    </li>
                `)
                node3.appendTo($(".picul"))
                }
                $(".picul").find("li").eq(0).attr("class","this")
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function goodTab(){  // 商品切换动画
        $(".picul").on("click","li",function(){         
            $(this).addClass("this").siblings().removeClass("this");
            $(".bigpic").find("img").css("display","none").eq($(this).index()).css("display","block");
            $(".big").find("img").css("display","none").eq($(this).index()).css("display","block");
            return false;
        });
       
    }
    function magnify(){ // 放大镜
        $(".bigpic").mouseenter(function(){
            $(".mark").css("display","block");
            $(".big").css("display","block");
        })
        $(".bigpic").mouseleave(function(){
            $(".mark").css("display","none");
            $(".big").css("display","none");
        })
        $(".bigpic").mousemove(function(ev){
            var l = ev.pageX - $(this).offset().left - 100;
            if(l <= 0){
                l = 0;
            }
            if(l >= 230){
                l = 230;
            }
            var t = ev.pageY -$(this).offset().top - 100;
            if(t <= 0){
                t = 0;
            }
            if(t >= 230){
                t = 230;
            }
            $(".mark").css({
                left:l,
                top:t,
            })
            $(".big img").css({
                left: -2 * l,
                top: -2 * t,
            })
        })
    }
    return {
        appear:appear,
        topnav:topnav,
        topnavTab:topnavTab,
        color:color,
        colorTab:colorTab,
        shoplist:shoplist,
        good:good,
        goodTab:goodTab,
        magnify:magnify,
        addcart:addcart,
    }
})