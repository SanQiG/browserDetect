# 十大浏览器 UserAgent 总结

## UA 是什么

​	**User Agent** 在计算机科学中指的是代表用户行为的软件代理程序所提供的对自己的一个标识符。

​	它包含了一个特征字符串，用来让网络协议的对端来识别发起请求的用户代理软件的应用类型、操作系统、软件开发商以及版本号。

## UA 解析

> 觉得晦涩的话可以直接翻到文档后面查看如何通过 UA 判断浏览器

​	大家都知道每个浏览器的 UA 字符串都是一长串很晦涩难懂的字符串，那么为什么会这样，UA 中每一部分又都起什么作用，它的命名规则又是什么呢？

​	参考 [IETE 标准文档]() 得出 UA 的构建规则：

```
UserAgent = product *( RWS ( product / comment ) )
```

​	乍一看好像还是不知所云，其实这是一种规则语法，**`product`** 代表的是软件产品名称，它本身也是有构建规则的：

```
product         = token ["/" product-version]
product-version = token
```

​	其中，**`token`** 代表任意标识内容，中括号表示可选。**`product-version` ** 自身也是一个 **`token`**。

​		Eg：拿 Chrome 浏览器举例，Chrome 的 UA 如下：

​		MacOS:

​		`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36`

​		Windows:

​		`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36`

​	我们可以发现它首先包含了一个 **`token`** : `Mozilla` ，后面紧跟**`product-version`** : `/5.0`。并且其中 `chrome/74.0.3729.169` 和 `Safari/537.36` 都符合 product 的命名规则，并且后面的版本号也是可以省略的。

​	再来说后面的 `*( RWS ( product / comment ) )`。首先，`*()` 代表括号里的内容可以出现 0 次或多次。括号里的内容首先是一个 `RWS`，其实就是空格。然后就是一个二选一的表达式 `( product / comment )`，它的意思是可以出现一个 `product` 或者一个 `comment`。`product` 上面已经介绍过了，再来看看 `comment` 规则：

```
comment = "(" *( ctext / quoted-pair / comment ) ")"
```

​	简单的说，`comment` 规则就是一对圆括号，然后里面写上一些相应内容，对应到上面的 Chrome UA 当中就是：

​	`(Macintosh; Intel Mac OS X 10_14_5)` 和 `(KHTML, like Gecko)`

​	这样整理完后，再来看我们的 Chrome UA 字符串是不是就是：

​	`product comment product comment product product`

​	UA 的每一个分段中，要么是 `product`，要么是 `comment`。其实就是这两种。

## 十大浏览器 UA 总结

以下 UA 字符串除了 Safari 其他均在 Windows 操作系统下取得。

![](https://github.com/SanQiG/Front-End-Summary/blob/master/image/%E5%8D%81%E5%A4%A7%E6%B5%8F%E8%A7%88%E5%99%A8%20UA%20%E6%80%BB%E7%BB%93.png?raw=true)


浏览器         |   版本号              |   UA 字符串
-----------------  | ------------------------ | -------------------------------
Chrome       | 75.0.3770.100  | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36` 
Safari           | 12.1.1                | `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15`
Firefox         | 67.0.4                | `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0`
Opera           | 60.0.3255.170 | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36 OPR/60.0.3255.170` 
Edge             | 44.17763.1.0   | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763`
IE                   | 11                       |`Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko`
IE                   | 10                       |`Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)`
IE                   | 9                         |`Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)`
QQ浏览器     | 10.4.2 |`Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3704.400 QQBrowser/10.4.3588.400`
搜狗浏览器   |8.5.10.30798|`Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 SE 2.X MetaSr 1.0`
UC浏览器      |6.2.4098.3|`Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 UBrowser/6.2.4098.3 Safari/537.36`
360安全浏览器    |10.0.1885.0|`Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36`

​	有没有人会好奇为什么这些浏览器的 UA 字符串都会以 `Mozilla` 开头呢？实际上是因为一个历史原因。在早期的浏览器中，`Mozilla` 会被很多 Web 站点认为是比较现代化的浏览器，这些站点会针对 `Mozilla` 标准的浏览器提供更高级的特性，比如 iframe 标签。 而其他浏览器会它们被认为是比较老的，只会对它们返回相对简单的 HTML 界面。

​	而浏览器发展到今天，其实现在几乎所有的浏览器内核都已经支持这些高级特性了。但鉴于这个历史遗留原因，当前的大多数浏览器都在它们所发送的 UA 的开头中带上了 `Mozilla` 标识。具体可参考[这篇文章](http://news.zhichanli.cn/article/6337.html)。

​	大家有没有发现一个很特殊的浏览器：**360安全浏览器**。因为他的 UA 构造几乎和 Chrome 一模一样，并且不像QQ浏览器有自己独特的标识，所以处理它要复杂一些。

## 如何使用 JS 通过 UA 判断出浏览器种类

​	先来看下几个常用的国外主流浏览器（**Chrome**、**FireFox**、**Opera**、**Safari**、**Edge**、**IE**）。

```javascript
function checkBrowser() {
	var ua = window.navigator.userAgent;
	var isChrome  = ua.indexOf('chrome') !== -1 && window.chrome,
  		isFirefox = ua.indexOf('Firefox') !== -1,
      isOpera   = ua.indexOf('OPR') !== -1,
      isSafari  = ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1,
      isEdge    = ua.indexOf('Edge') !== -1,
      isIE      = ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident') !== -1;
  
  if (isFirefox) {
   	return 'Firefox';
  } else if (isSafari) {
    return 'Safari';     
	} else if (isOpera) {
    return 'Opera';
  } else if (isEdge) {
    return 'Edge';
  } else if (isIE) {
    return 'IE';
  } else if (isChrome) {
  	return 'Chrome';
  }
}
```

​	再来单独看看 **IE** 这个神奇的浏览器。因为在 IE11 推出的时候有这样三个更新：

> 1. 兼容 ("compatible") 和浏览器 ("MSIE") 令牌已删除
> 2. "like Gecko" 令牌已添加（以便与其他浏览器一致）
> 3. 浏览器版本现在由新版本 ("rv") 令牌报告

​	所以网上那些单单通过 `MSIE` 这个字符串来判断是否是 IE 浏览器的方法对 IE11 是无效的，所以要另辟蹊径。我们虽然可以在原本的基础上增加一些对 IE11 UA 新增字符串的判断，例如这样：

````javascript
function checkIEBrowser() {
  var ua = window.navigator.userAgent;
  if ((window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1) || ua.indexOf('rv') != -1) {
		return 'IE';
  }
}
````

​	但是我们可以换一种思考角度，转而从 IE 浏览器本身出发。IE11 以下版本的浏览中`window.ActiveXObject` 返回一个对象，但是在 IE11 中却返回 `undefined`。不过 `"ActiveXObject" in window` 却返回 `true`，因此我们可以更灵活地这样判断：

```javascript
function isIEBrowser() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    return true;
  } else {
    return false;
  }
}
```

​	或者像上文中更最简单地通过 IE 使用的 Trident 内核来判断。

​	紧接着我们再来看看国内的一些主流浏览器的判断（**QQ浏览器**、**搜狗浏览器**、**UC浏览器**）。

```javascript
function checkBrowser() {
	var ua = window.navigator.userAgent;
	var isQQBrowser     = ua.indexOf('QQBrowser') !== -1,
      isSougouBrowser = ua.indexOf('MetaSr') !== -1,
      isUCBrowser     = ua.indexOf('UBrowser') !== -1;
  
  if (isQQBrowser) {
  	return 'QQBrowser';
  } else if (isSougouBrowser) {
   	return 'SougouBrowser';
  } else if (isUCBrowser) {
    return 'UCBrowser';     
	}
}
```

​	最后我们来看 **360安全浏览器**。在测试过程中我发现360安全浏览器在不同的页面下的 UA 字符串是不同的，譬如说在 [Google](<https://www.google.com/>) 下 UA 值为：

​	`Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36 QIHU 360SE`

​	在 [百度](https://www.baidu.com/) 下 UA 值为：

​	`Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36`

> 在网上有看到这样的说法：之前的版本是用浏览器 UA 来判别的，而就在 360 浏览器争议声较大的那段时间内，很多站长都屏蔽了 360 浏览器的 UA，然后 360 浏览器为了用户体验更新版本，伪装成 IE 或者 Chrome 浏览器，所以现在都检测不出来了。

​	少了很明显 360 SE 的标识就增大了判断360安全浏览器的难度，后来经过一番探索之后，我在 [Github](<https://github.com/mumuy/browser>) 上找到一篇很全的浏览器测试源码（[在线测试地址](<http://passer-by.com/browser/>)）。并参考了源码将 **360安全浏览器的判断方法** 总结如下：

```javascript
function check360SEBrowser() {
  var ua = window.navigator.userAgent;
  var is360SE = ua.indexOf('360SE') !== -1;
  if (is360SE) {
    return '360SEBrowser';
  } else {
    var is360 = false;
    if (window.chrome) {
      var chrome_version = ua.replace(/^.*Chrome\/([\d]+).*$/, '$1');
      if(chrome_version > 36 && window.showModalDialog) {
        is360 = true;
      } else if (chrome_version > 45) {
        is360 = mime("type", "application/vnd.chromium.remoting-viewer");
      }
    }
  }
  
  if (is360) {
    if(mime("type", "application/gameplugin")) {
			return '360SEBrowser';
		} else if (typeof navigator['connection']['saveData'] === 'undefined') {
			return '360SEBrowser';
		} else {
      // 360极速浏览器
      return '360EEBrowser';
    }
  }
}

function mime(option, value) {
  var mimeTypes = window.navigator.mimeTypes;
  for (let mt in mimeTypes) {
    if (mimeTypes[mt][option] === value) {
      return true;
    }
  }
  return false;
}
```

## 总结

​	经过整个学习整理过程，我觉得一句话可以概况：**星星之火，可以燎原。**其实再小的一个知识点，你可能知道它是什么，但是不一定知道背后的历史渊源。就比如说本章的 UA 字符串，我觉得它从一定程度上就代表了浏览器的发展历史，从小小的 UA 字符串的变化，映射到整个浏览器界的进步。

​	我把代码汇总到了自己的GitHub：[浏览器识别](https://github.com/SanQiG/browserDetect/blob/master/browserDetect.js)

## 参考

1. ^ [User-Agent]([https://zh.wikipedia.org/wiki/%E7%94%A8%E6%88%B7%E4%BB%A3%E7%90%86](https://zh.wikipedia.org/wiki/用户代理)). 维基百科.
2. ^ [User-Agent](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/User-Agent). Mozilla 开发者网络.
3. ^ [RFC 7231](https://tools.ietf.org/html/rfc7231#section-5.5.3)
4. ^ [Internet Explorer 11：不要再叫我IE](https://www.cnblogs.com/soundcode/p/10253968.html)
5. ^ [JavaScript 如何判断 360浏览器](<https://www.zhihu.com/question/27004646>)
6. ^ [mumuy/browser](<https://github.com/mumuy/browser>). 浏览器测试
7. ^ [奇虎360浏览器](<https://github.com/hotoo/detector/wiki/360>)

