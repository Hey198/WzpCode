function ajaxGet(url,fn) {
    // 第一步创建 XMLHttpRequest 对象
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //第二步向服务端发送请求
    xhttp.open("GET",url, true);
    // xhttp.open("GET", "./data.json", true);
    xhttp.send();
    //第三步接受服务端响应
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText)
            //接收的回调函数 传回去 参数
            // responseText后端返回来的数据
            //把json字符串转化为对象形式
            fn(JSON.parse(this.responseText))
        }
    };

}
//添加信息
function ajaxPost(url,params,fn) {
    let pStr = '';
    for(let item in params){
        pStr += `${item}=${params[item]}&`;
    }
    //截取字符串最后一位
    pStr = pStr.substr(0,pStr.length-1);
    // 第一步创建 XMLHttpRequest 对象
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //第二步向服务端发送请求
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(pStr);
    //第三步接受服务端响应
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //执行 fn函数 传回 参数
            fn(JSON.parse(this.responseText))
        }
    };
}