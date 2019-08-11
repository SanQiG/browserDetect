/**
 * author: sanki
 * Github: https://github.com/SanQiG/browserDetect
 */
function checkBrowser() {
  var ua = window.navigator.userAgent;
  var isChrome        = ua.indexOf('Chrome') !== -1 && window.chrome,
      isFirefox       = ua.indexOf('Firefox') !== -1,
      isOpera         = ua.indexOf('OPR') !== -1,
      isSafari        = ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1,
      isEdge          = ua.indexOf('Edge') !== -1,
      isIE            = ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident') !== -1,
      isQQBrowser     = ua.indexOf('QQBrowser') !== -1,
      isSougouBrowser = ua.indexOf('MetaSr') !== -1,
      isUCBrowser     = ua.indexOf('UBrowser') !== -1,
      is360SE         = ua.indexOf('360SE') !== -1;
  var is360 = false;

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
  } else if (isQQBrowser) {
  	return 'QQBrowser';
  } else if (isSougouBrowser) {
   	return 'SougouBrowser';
  } else if (isUCBrowser) {
    return 'UCBrowser';     
	} else if (is360SE) {
    return '360SEBrowser';
  } else if (isChrome) {
    var chrome_version = ua.replace(/^.*Chrome\/([\d]+).*$/, '$1');
    if(chrome_version > 36 && window.showModalDialog) {
      is360 = true;
    } else if (chrome_version > 45) {
      is360 = mime("type", "application/vnd.chromium.remoting-viewer");
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

    return 'Chrome';
  } else {
    return 'Others';
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
