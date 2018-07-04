/**
 * Created by user on 2018/3/11.
 */
//封装一个代替getElementById()的方法
function byId(id){
    return typeof(id) === "string"?document.getElementById(id):id;
}

var index = 0,                   //声明成全局变量
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),    //span个数与div一致
    prev = byId("prev"),
    next = byId("next"),
    len = pics.length,
    menu = byId("menu-content"),
    subMenu = byId("sub-menu"),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    menuItems = menu.getElementsByClassName("menu-item");


function slideImg(){
    var main = byId("main");
    //滑过清除定时器
    main.onmouseover = function(){
        if(timer)clearInterval(timer);
    };
    //离开继续
    main.onmouseout = function(){
        timer = setInterval(function(){
            index++;
            if(index >= len){
                index = 0;
            }
            //切换图片
            changeImg();
        },3000);
    };
    main.onmouseout();   //自动在main上触发鼠标离开的事件

    //点击圆点切换图片，遍历所有点击，且绑定点击事件
    for(var d = 0;d < len;d++){
        //给所有span添加一个id的属性，值为d，作为当前span的索引
        dots[d].id = d;
        dots[d].onclick = function(){
            //改变index为当前span的索引
            index = this.id;
            //调用changeImg，实现切换图片
            changeImg();
        }
    }
    //下一张
    next.onclick = function(){
        index++;
        if(index >= len) index = 0;
            changeImg();
    };
    //上一张
    prev.onclick = function(){
        index--;
        if(index < 0) index = len - 1;
        changeImg();
    };

    //导航菜单
    //遍历主菜单并绑定事件
    for(var m = 0;m < menuItems.length;m++){
        //给每个menu-item定义data-index属性，作为索引
        menuItems[m].setAttribute("data-index",m);
        menuItems[m].onmouseover = function(){
            var idx = this.getAttribute("data-index");  //获取属性
            for(var j = 0;j < innerBox.length;j++){
                innerBox[j].style.display = 'none';
                menuItems[j].style.background = "none";  //每个条幅北京设为none
            }
            subMenu.className = 'sub-menu';  //去掉hide
            menuItems[idx].style.background = 'rgba(0,0,0,0.1)';   //带阴影的背景
            innerBox[idx].style.display = 'block';

        }
    }
    menu.onmouseout = function(){
        subMenu.className = "sub-menu hide";
    };
    subMenu.onmouseover = function(){
        this.className = "sub-menu";
    };
    subMenu.onmouseout = function(){
        this.className = "sub-menu hide";
    };
}
//切换图片
function changeImg(){
    //遍历banner下多余的div和dots里的span，将div隐藏，将span清除
    for(var i = 0;i < len;i++){
        pics[i].style.display = 'none';
        dots[i].className = "";
    }
    //根据Index索引找到当前div和span，将其显示出来和设为当前
    pics[index].style.display = 'block';       //不能用className,因为会重写class
    dots[index].className = "active";
}
slideImg();