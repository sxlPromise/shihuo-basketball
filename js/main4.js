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
    function cartnum(){  // 显示购物车数量
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for(var i = 0; i < cookieArr.length; i++){
                sum += cookieArr[i].num;
            }
            $(".number").html(sum);
        }else{
            $(".number").html(0);
        }
    }
    function cartlist(){ // 加载购物车数据
        cartnum();
        $.ajax({
            type:"get",
            url:"../json/lbj16.json",
            success:function(obj){
                arr = obj.shoplist;
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];
                    for(var j = 0; j < arr.length; j++){
                        for(var k = 0; k < cookieArr.length; k++){
                            if(arr[j].id == cookieArr[k].id){
                                arr[j].num = cookieArr[k].num;
                                newArr.push(arr[j])
                            }
                        }
                    }
                    for(var i = 0; i < newArr.length; i++){
                        var node = $(`<div class="order" id = "${newArr[i].id}">
                        <div class="shop">
                            <div class="shop-info">
                                <div class="cart-checkbox">
                                    <input type="checkbox" id="selectallbtn1" name="select-all" value="true">
                                    <label for="selectallbtn1">勾选购物车内所有商品</label>
                                </div>
                                店铺
                                <a href="" class="">${newArr[i].name}</a>
                            </div>
                        </div>
                        <div class="ordercontent">
                            <ul class="item-content">
                                <li class="td td-chk">
                                    <div class="td-inner">
                                        <div class="cart-checkbox">
                                            <input type="checkbox" id="checkbox" name="item[]" value="true">
                                            <label for="checkbox"></label>
                                        </div>
                                    </div>
                                </li>
                                <li class="td td-item">
                                    <div class="td-inner">
                                        <div class="item-pic">
                                            <a href="">
                                                <img src="${newArr[i].img}" alt="">
                                            </a>
                                        </div>
                                        <div class="item-info">
                                            <div class="item-basic-info">
                                                <a href="">${newArr[i].shoesname}</a>
                                            </div>
                                            <div class="item-other-info">
                                                <div class="promo-logos"></div>
                                                <div class="item-icon-list">
                                                    <div class="item-icons">
                                                        <span class="item-icon">
                                                            <img src="//assets.alicdn.com/sys/common/icon/trade/xcard.png" alt="">
                                                        </span>
                                                        <a href="" class="item-icon">
                                                            <img src="//img.alicdn.com/tps/i3/T1bnR4XEBhXXcQVo..-14-16.png" alt="">
                                                        </a>
                                                        <a href="" class="item-icon">
                                                            <img src="//img.alicdn.com/tps/i1/T1EQA5FpVgXXceOP_X-16-16.jpg" alt="">
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="item-tips"></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="td td-info">
                                    <div class="item-props">
                                        <p class="sku-line">鞋码：${newArr[i].size}</p>
                                        <p class="sku-line">颜色分类：${newArr[i].color}</p>
                                    </div>
                                </li>
                                <li class="td td-price">
                                    <div class="td-inner">
                                        <div class="item-price">
                                            <div class="price-content">
                                                <div class="price-line">
                                                    <em class="price-now">¥${newArr[i].price}</em>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="td td-amount">
                                    <div class="td-inner">
                                        <div class="amount-wrapper">
                                            <div class="item-amount">
                                                <a href="" class="minus changenum">-</a>
                                                <input type="text" value="${newArr[i].num}" class="text-amount">
                                                <a href="" class="plus changenum">+</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="td td-sum">
                                    <div class="td-inner">
                                        <em class="number1">¥${newArr[i].num * newArr[i].price}</em>
                                    </div>
                                </li>
                                <li class="td td-op">
                                    <div class="td-inner">
                                        <a href="" class="btn-fav">移入收藏夹</a>
                                        <a href="" class="del">删除</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>`)
                    node.appendTo($(".orderHolder"));
                    }
                    total();
                }
                $(".orderHolder").on("click",".changenum",function(){ // 商品加减
                    var id = $(this).closest(".order").attr("id");
                    var cookieArr = JSON.parse($.cookie("goods"));
                    for(var i = 0; i < cookieArr.length; i++){
                        if(cookieArr[i].id == id){
                            if(this.innerHTML === "+"){
                                cookieArr[i].num++;
                            }else if(this.innerHTML === "-" && cookieArr[i].num == 1){
                                alert("数量为1，不能再减少");
                            }else{
                                cookieArr[i].num--;
                            }
                            $(this).siblings(".text-amount").val(cookieArr[i].num);
                            
                            $.cookie("goods",JSON.stringify(cookieArr),{
                                expires:7
                            })
                            for(var z = 0; z < arr.length; z++){
                                if(arr[z].id == id){
                                    $(this).closest("ul").find(".number1").html(`¥${cookieArr[i].num * arr[z].price}`)
                                }
                            }
                            cartnum();
                            total();
                            return false;
                        }
                    }
                })
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
   
    function deletebtn(){ // 删除商品
        $(".orderHolder").on("click",".del",function(){
            var id = $(this).closest(".order").remove().attr("id");//删除节点
            // alert(id);
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    cookieArr.splice(i,1);
                    break;
                } 
            }
            //判断是否是空数组
            if(!cookieArr.length){
                $.cookie("goods",null)
            }else{
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }
            cartnum();
            total();
            return false;
        })
    }
    function total(){
        $.ajax({
            type:"get",
            url:"../json/lbj16.json",
            success:function(obj){
                var arr = obj.shoplist;
                var cookieStr = $.cookie("goods");
                if(cookieStr){
                    var cookieArr = JSON.parse(cookieStr);
                    var sum = 0;
                    for(var i = 0; i < cookieArr.length; i++){
                        for(var j = 0; j < arr.length; j++){
                            if(cookieArr[i].id == arr[j].id){
                                // alert(sum);
                                sum = sum + Number($(".order").find(".number1").html().substring(1));
                                
                                $(".cart-num").find($(".total")).html(`¥${sum}.00`);
                            }
                        }
                    }
                }
            },
            error:function(msg){
                console.log(msg)
            }
        })
    }
    return {
        appear:appear,
        cartlist:cartlist,
        deletebtn:deletebtn,
    }
})