//封装一个代替getElementById()的方法
function byId(id) {
   return  typeof (id)==="string"?document.getElementById(id):id;
}
//鼠标滑过这个地方 轮波图静止不动了  鼠标离开 继续滑动
//全局变量
var index=0;
var timer=null;
var pics=byId("banner").getElementsByTagName("div");
var len=pics.length;
var dots=byId("dots").getElementsByTagName("span");
var prev=byId("prev");
var next=byId("next");
function sliderImg() {

    var main = byId("main");
    main.onmousemove = function () {
        //在鼠标划过的时候清除定时器
        if (timer) {
            clearInterval(timer);
        }
    }
    //每隔三秒钟就给一个加类
    main.onmouseout = function () {
        timer = setInterval(function () {
            index++;
            if (index >= len) {
                index = 0;
            }
            changeImage();
        }, 2000);


    }
    //自动在main上触发鼠标离开的事件
    main.onmouseout();
    //点击圆点切换图片
    for (var d = 0; d < len; d++) {
        //给所有span添加一个id的属性值为d
        dots[d].id= d;
        dots[d].onclick = function () {
                //d=3此时的值为d的最终的值 function会改变作用域
                //改变index为当前的索引
                index=this.id;
                changeImage();

        }
    }
    //下一张
    next.onclick=function () {
        index++;
        if(index>=len)
        index=0;
        changeImage();

    }
    prev.onclick=function () {
        index--;
        if(index<0)
        {
            index=2;
        }
        changeImage();
    }
}
//更换图片
function changeImage()
{
    //pics[index].className='';//不管元素上有没有类className属性设置的类会重写元素上的类
    //遍历banner下所有div 及dots下所有的span 将其隐藏
    for(var i=0;i<len;i++)
    {
        pics[i].style.display="none";
        dots[i].className="";
    }
    //根据index索引 找到当前div将其显示出来
    pics[index].style.display='block';
    dots[index].className="active";
}
//点击圆点切换图片
sliderImg();

