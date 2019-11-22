// console.log("加载成功")

require.config({
    paths:{
        "jquery" : "jquery-1.11.3",
        "jquery-cookie" : "jquery.cookie",
        "main2":"main2",
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
require(["main2"],function(main2){
    main2.appear();
    main2.topnav();
    main2.topnavTab();
    main2.list();
    main2.listshow();
    main2.likes();
    main2.latest();
})