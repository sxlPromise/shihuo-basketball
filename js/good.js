// console.log("加载成功")

require.config({
    paths:{
        "jquery" : "jquery-1.11.3",
        "jquery-cookie" : "jquery.cookie",
        "main3":"main3",
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})
require(["main3"],function(main3){
    main3.appear();
    main3.topnav();
    main3.topnavTab();
    main3.color();
    main3.colorTab();
    main3.shoplist();
    main3.good();
    main3.goodTab();
    main3.magnify();
    main3.addcart();
})