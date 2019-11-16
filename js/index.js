// console.log("引入成功")

require.config({
    paths:{
        "jquery" : "jquery-1.11.3",
        "jquery-cookie" : "jquery.cookie",
        "main": "main",
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

require(["main"],function(main){
    main.appear();
    main.topnav();
    main.topnavTab();
    main.banner();
    main.leftnav();
    main.leftnavTab();
    main.goodPrice();
    main.goodTab();
    main.list();
    main.listTab();
    main.likes();
})