!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}e.exports=function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}},function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o),i=n(2),a=n.n(i),s=n(0),u=n.n(s),c=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"wss://api.fcoin.com/v2/ws",n=arguments.length>1?arguments[1]:void 0;r()(this,e),u()(this,"heartBeatTimer",null),u()(this,"options",{}),u()(this,"messageMap",{}),u()(this,"connState",0),u()(this,"socket",null),u()(this,"url",""),u()(this,"timeout",6e4),u()(this,"connetCount",10),this.heartBeatTimer=null,this.options=n,this.messageMap={},this.connState=0,this.socket=null,this.url=t}return a()(e,[{key:"doOpen",value:function(){var e=this;if(!this.connState){this.connState=1,this.afterOpenEmit=[];var t=new(window.WebSocket||window.MozWebSocket)(this.url);t.binaryType="arraybuffer",t.onopen=function(t){return e.onOpen(t)},t.onclose=function(t){return e.onClose(t)},t.onmessage=function(t){return e.onMessage(t.data)},t.onerror=function(t){return e.onError(t)},this.socket=t}}},{key:"onOpen",value:function(e){this.connState=2,this.heartBeatTimer=setInterval(this.checkHeartbeat.bind(this),3e4),this.onReceiver({Event:"open"})}},{key:"checkOpen",value:function(){return 2===this.connState}},{key:"onClose",value:function(){var e=this;this.connState=0,this.connState&&this.onReceiver({Event:"close"}),this.connetCount>-1&&setTimeout(function(){e.doOpen(),e.connetCount--},5e3)}},{key:"send",value:function(e){this.checkOpen()&&this.socket.send(JSON.stringify(e))}},{key:"emit",value:function(e){var t=this;return new Promise(function(n){t.socket.send(JSON.stringify(e)),t.on("message",function(e){n(e)})})}},{key:"onMessage",value:function(e){try{var t=JSON.parse(e);this.onReceiver({Event:"message",Data:t})}catch(e){}}},{key:"checkHeartbeat",value:function(){var e={cmd:"ping",args:[Date.parse(new Date)]};this.send(e)}},{key:"onError",value:function(e){}},{key:"onReceiver",value:function(e){var t=this.messageMap[e.Event];t&&t(e.Data)}},{key:"on",value:function(e,t){this.messageMap[e]=t}},{key:"doClose",value:function(){this.socket.close()}},{key:"destroy",value:function(){this.heartBeatTimer&&(clearInterval(this.heartBeatTimer),this.heartBeatTimer=null),this.connetCount=-1,this.doClose(),this.messageMap={},this.connState=0,this.socket=null}}]),e}();t.default=c}]);