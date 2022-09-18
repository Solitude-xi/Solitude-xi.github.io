let markdownVessels = document.querySelectorAll('.md_in_html_ve')

function ajaxHttpRequestFunc(markdownVessel) {
  let xmlHttpRequest; // 创建XMLHttpRequest对象，即一个用于保存异步调用对象的变量
  if (window.ActiveXObject) { // IE浏览器的创建方式
    xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) { // Netscape浏览器中的创建方式
    xmlHttpRequest = new XMLHttpRequest();
  }
  xmlHttpRequest.onreadystatechange = function () { // 设置响应http请求状态变化的事件
    // console.log('请求过程', xmlHttpRequest.readyState);
    if (xmlHttpRequest.readyState == 4) { // 判断异步调用是否成功,若成功开始局部更新数据
      // console.log('状态码为', xmlHttpRequest.status);
      if (xmlHttpRequest.status == 200) {
        // console.log('异步调用返回的数据为：', xmlHttpRequest.responseText);
        let converter = new showdown.Converter();
        let html = converter.makeHtml(xmlHttpRequest.responseText); // 进行转换
        markdownVessel.innerHTML = html; // 将内容显示到指定的地方 局部刷新数据到页面
      } else { // 如果异步调用未成功,弹出警告框,并显示错误状态码
        alert("error:HTTP状态码为:" + xmlHttpRequest.status);
      }
    }
  }
  xmlHttpRequest.open("GET", markdownVessel.getAttribute('path'), true); // 创建http请求，并指定请求得方法（get）、url（https://www.runoob.com/try/ajax/ajax_info.txt）以及验证信息
  xmlHttpRequest.send(null); // 发送请求
}


// 页面加载完毕才执行
window.onload = function () {
  for (let markdownVessel of markdownVessels) {
    ajaxHttpRequestFunc(markdownVessel)
  }
}