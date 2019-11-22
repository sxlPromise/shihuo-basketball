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

    function banner(){
        //轮播图数据下载
        $.ajax({
            type: "get",
            url: "../json/banner.json",
            success:function(arr){
                for(var i = 0; i < arr.length; i++){
                    var node = $(`<a href="#" style = "display: ${ i == 0 ? "block" : "none"}; opacity : ${i == 0 ? 1 : 0.2}"><img src="images/${arr[i].img}" alt=""></a>`);
                    node.appendTo($("#bannerbox"));
                    $(` <a href="#" class = "${i == 0 ? "active" : ""}"></a>`).appendTo($(".circle"))
                }
                bannerTab();
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }

    function bannerTab(){
        //轮播图切换
        var timer = null;
        var iNow = 0;
        var oBtns = $(".circle").find("a");
        oBtns.click(function(){
            clearInterval(timer)
            iNow = $(this).index();
            tab();
            timer = setInterval(function(){
                iNow++;
                tab();
            },3000);
            return false;
        })
        timer = setInterval(function(){
            iNow++;
            tab();
        },3000);

        function tab(){
            oImgs = $("#bannerbox").find("a");
            
            oImgs.css("opacity","0.2").hide().eq(iNow).show().animate({
                opacity: 1,
            },800,function(){
                if(iNow == oBtns.size() - 1){
                    iNow = -1;
                }
            })
            oBtns.removeClass("active").eq(iNow).addClass("active");           
        }
    }

    function leftnav(){ // 加载侧边栏数据
        $.ajax({
            type:"get",
            url:"../json/leftnav.json",
            success:function(arr){
                for(var i = 0; i < arr.length; i++){
                    var node = $(`<div class="leftlist">
                        <div class="title-b">${arr[i].title}</div>
                        <div class="tags">
                            
                        </div>
                        <div class="leftnavbox">
                            <div class="leftnavlist-title">

                            </div>
                            <ul class="leftnavlist-name">

                            </ul>
                            <ol class="leftnavlist-logo">

                            </ol>
                        </div>
                    </div>  `)
                    node.appendTo($(".leftnav"));
                    var node2 = $(`
                            <div>${arr[i].title}</div>
                            <div><a href="#">更多></a></div>
                        `);
                    node2.appendTo(node.find($(".leftnavlist-title")));
                    var titleArr = arr[i].subtitle;
                    for(var j = 0; j < titleArr.length; j++){
                        var node1 = $(`<a href="#">${titleArr[j]}</a>`);
                        node1.appendTo(node.find($(".tags")));
                    }
                    for(var k = 0; k < titleArr.length; k++){
                        var node3 = $(`
                        <li><a href="#">${titleArr[k]}</a></li>
                    `);
                        node3.appendTo(node.find($(".leftnavlist-name")));
                    }
                    var logoArr = arr[i].img;
                    for(var l =0; l < logoArr.length; l++){
                        var node4 = $(`<li>
                        <a href="#">
                            <img src="${logoArr[l]}" alt="">
                        </a>
                    </li>`);
                        node4.appendTo(node.find($(".leftnavlist-logo")))
                    }
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }

    function leftnavTab(){ // 侧边栏动画
        $(".leftnav").on("mouseenter",".leftlist",function(){
            $(this).find(".leftnavbox").show();
        });
        $(".leftnav").on("mouseleave",".leftlist",function(){
            $(this).find(".leftnavbox").hide();
        });
    }
    function goodPrice(){ // 加载每日好价数据
        $.ajax({
            type:"get",
            url:"../json/goods.json",
            success:function(obj){
                goodsArr = obj.goodprice;
                for(var i = 0; i < goodsArr.length; i++){
                    var node = $(`<li>
                    <a href="#">
                        <div class="img">
                            <img src="${goodsArr[i].img}" alt="">
                        </div>
                        <div class="msg">
                            <p class="title1">${goodsArr[i].title}</p>
                            <div class="price">
                                <div class="left">${goodsArr[i].nowprice}</div>
                                <div class="right">${goodsArr[i].originalPrice}</div>
                            </div>
                        </div>
                    </a>
                </li>`)
                node.appendTo($(".goodul"));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function goodTab(){  // 每日好价动画
        $(".goods").mouseover(function(){
            if($(".goodul").offset().left == 91.5){
                $("#every_right").css("display","block");
            }else{
                 $("#every_left").css("display","block")
            }           
        })
        $(".goods").mouseout(function(){
            $("#every_left").css("display","none")
            $("#every_right").css("display","none");
        })
        
        $("#every_right").click(function(){
            $(".goodul").animate({
                left:-1075,
            });
            $("#every_right").css("display","none");
        })

        $("#every_left").click(function(){
            $(".goodul").animate({
                left:0,
            });
            $("#every_left").css("display","none");
        })
    }
    function list(){ // 加载销量排行数据
        $.ajax({
            type:"get",
            url:"../json/goods.json",
            success:function(obj){
                var listArr = obj.listgoods;
                for(var i = 0; i < listArr.length; i++){
                    var node = $(`<li>
                    <a href="#">
                        <div class="img">
                            <img src="${listArr[i].img}" alt="">
                            <div class="tag-top">${listArr[i].num}</div>
                        </div>
                        <div class="msg">
                            <div class="title2">${listArr[i].name}</div>
                            <div class="tips">${listArr[i].tags}</div>
                            <div class="price">${listArr[i].price}</div>
                        </div>
                    </a>
                </li>`)
                node.appendTo($(".listul"))
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function listTab(){ // 销量排行动画
        $(".goodlist").mouseover(function(){
            if($(".listul").offset().left == 81.5){
                $("#list_right").css("display","block");
            }else{
                 $("#list_left").css("display","block")
            }           
        })
        $(".goodlist").mouseout(function(){
            $("#list_left").css("display","none")
            $("#list_right").css("display","none");
        })
        
        $("#list_right").click(function(){
            $(".listul").animate({
                left:-1090,
            });555
            $("#list_right").css("display","none");
        })

        $("#list_left").click(function(){
            $(".listul").animate({
                left:0,
            });
            $("#list_left").css("display","none");
        })
    }
    function likes(){ // 加载猜你喜欢数据
        $.ajax({
            type:"get",
            url:"../json/goods.json",
            success:function(obj){
                var likeArr = obj.likesgood;
                for(var i = 0; i < likeArr.length; i++){
                    var node = $(`<li>
                    <a href="#">
                        <div class="img">
                            <img src="${likeArr[i].img}" alt="">
                        </div>
                        <div class="msg">
                            <div class="title3">${likeArr[i].name}</div>
                            <div class="tips2">
                                <s class="i1"></s>
                                ${likeArr[i].tips}
                                <s class="i2"></s>
                            </div>
                            <div class="price2">${likeArr[i].price}</div>
                        </div>
                    </a>
                </li>`)
                node.appendTo($(".likesul"))
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    return {
        appear:appear,
        topnav:topnav,
        topnavTab:topnavTab,
        banner:banner,
        leftnav:leftnav,
        leftnavTab:leftnavTab,
        goodPrice:goodPrice,
        goodTab:goodTab,
        list:list,
        listTab:listTab,
        likes:likes,
    }
})