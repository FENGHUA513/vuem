
var body = document.body;
var tip;
var timeout;
var time = 3000;
var setStyleTime = 50;

function Tip(str, time) {
  if (tip) {
    clearTimeout(timeout);
    // tip.find('p').html(str);
  } else {
      tip = document.createElement('div')
      tip.className = '__toast'
      tip.innerHTML = str

      body.appendChild(tip)

      setTimeout(function() {
        tip.style.opacity = 1;
      }, setStyleTime);
  }
  timeout = clear(time);
}

function clear(time) {
  return setTimeout(remove, time);
}

function remove() {
  if (tip) {
    body.removeChild(tip);
    tip = null;
  }
}

function entry(msg, expire) {
  msg = msg || "";
  if (!expire || expire <= setStyleTime) {
    expire = time
  }

  Tip(msg, expire);
};


export default {
  install(Vue) {
    Vue.prototype.$toast = entry
  }
}
