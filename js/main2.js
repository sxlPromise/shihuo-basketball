define(["jquery"],function($){
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
    function list(){ //加载商品列表数据
        $.ajax({
            type:"get",
            url:"../json/list.json",
            success:function(obj){
                var listArr = obj.list;
                for(var i = 0; i < listArr.length; i++){
                    var node = $(`<li>
                    <div class="imgs-area">
                        <div class="img">
                            <a href="good.html">
                                <img src="${listArr[i].img1}" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="style-box">
                        <div class="img-box">
                            <div class="style-img">
                                <img src="${listArr[i].img2}" alt="">
                            </div>
                            <div class="style-img">
                                <img src="${listArr[i].img3}" alt="">
                            </div>
                            <div class="style-img">
                                <a href="">
                                    <img src="${listArr[i].img4}" alt="">
                                    <span>
                                        ${listArr[i].style}种
                                        <br>
                                        配色
                                    </span>
                                </a>
                            </div>
                        </div>
                        <a class="link">
                            <div class="title">${listArr[i].name}</div>
                            <div class="price">
                                <span>
                                    <b>${listArr[i].price}</b>
                                    起
                                </span>
                                <div class="tk">${listArr[i].tk}</div>
                            </div>
                        </a>
                    </div>
                </li>`)
                node.appendTo($(".list-ul"))
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    function listshow(){ // 商品列表动画
        $(".list-ul").on("mouseenter","li",function(){
            $(this).find($(".img-box")).css("display","block");
        });
        $(".list-ul").on("mouseleave","li",function(){
            $(".img-box").css("display","none");
        })

    }
    function likes(){ //加载猜你喜欢动画
        $.ajax({
            type:"get",
            url:"../json/list.json",
            success:function(obj){
                var likeArr = obj.likes;
                for(var i = 0; i < likeArr.length; i++){
                    var node = $(`<li>
                    <div class="imgs-area">
                        <div class="img2">
                            <a href="">
                                <img src="${likeArr[i].img}" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="title5">
                        <a href="">${likeArr[i].name}</a>
                    </div>
                    <div class="price5">
                        <span>
                            <b>${likeArr[i].price}</b>
                            起
                        </span>
                        <div class="tk3">${likeArr[i].tk}</div>
                    </div>
                </li>`)
                node.appendTo($(".list-ul2"));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function latest(){ // 加载最近浏览数据
        $.ajax({
            type:"get",
            url:"../json/list.json",
            success:function(obj){
                var latestArr = obj.latest;
                for(var i = 0; i < latestArr.length; i++){
                    var node = $(`<li>
                    <div class="imgs-area2">
                        <div class="img3">
                            <a href="">
                                <img src="${latestArr[i].img}" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="title6">
                        <a href="">${latestArr[i].name}</a>
                    </div>
                    <div class="price6">
                        <span>
                            <b>${latestArr[i].price}</b>
                            起
                        </span>
                        <div class="tk4">${latestArr[i].tk}</div>
                    </div>
                </li>`)
                node.appendTo($(".list-ul3"));
                }
            }
        })
    }
    return {
        appear:appear,
        topnav:topnav,
        topnavTab:topnavTab,
        list:list,
        listshow:listshow,
        likes:likes,
        latest:latest,
    }
})