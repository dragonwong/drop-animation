!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var i in n)("object"==typeof exports?exports:t)[i]=n[i]}}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.r(e);var o="DROP_ANIMATION",r={element:null,container:document.body,startPosition:{x:0,y:0},endPosition:{x:0,y:0},width:0,height:0,duration:600,jumpHeight:60,scale:1,rotate:0,onEnd:function(){},endAnimation:!0,endRotate:360,endJumpHeight:40,endAnimationDuration:400};function s(t){var e=t.from,n=t.to,i=t.duration,o=t.startTS,r=t.easing,s=void 0===r?function(t){return t}:r;return function(t){var r=s((t-o)/i);return(n-e)*r+e}}var a=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.props=Object.assign(r,e),this.element=this.createElement(),this.startPosition={x:this.props.startPosition.x-this.props.width/2,y:this.props.startPosition.y-this.props.height/2},this.endPosition={x:this.props.endPosition.x-this.props.width/2,y:this.props.endPosition.y-this.props.height/2},this.startDropAnimation()}var e,n,a;return e=t,(n=[{key:"createElement",value:function(){var t,e=this.props.element;if(e instanceof Element&&(t=e),"string"==typeof e)return(t=document.createElement("div")).innerHTML=e,t.style.position="fixed",this.props.container.appendChild(t),t;!function(){for(var t,e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];(t=console).error.apply(t,["[".concat(o,"]")].concat(n))}("element must be Element or String")}},{key:"getAB",value:function(){var t,e,n=this.endPosition.y-this.startPosition.y;if(n>0){var i=this.props.jumpHeight/n;t=1-(e=-Math.sqrt(4*i*i+4*i)-2*i)}else if(n<0){var o=this.props.jumpHeight/n-1;t=1-(e=Math.sqrt(4*o*o+4*o)-2*o)}else t=-4,e=4;return{a:t,b:e,dy:n}}},{key:"startDropAnimation",value:function(){this.startDropTS=+new Date,this.renderDropAnimation=this.renderDropAnimation.bind(this);var t=this.getAB(),e=t.a,n=t.b,i=t.dy;this.getDropX=s({from:this.startPosition.x,to:this.endPosition.x,duration:this.props.duration,startTS:this.startDropTS}),this.getDropY=s({from:this.startPosition.y,to:0===i?this.endPosition.y-this.props.jumpHeight:this.endPosition.y,duration:this.props.duration,startTS:this.startDropTS,easing:function(t){return e*t*t+n*t}}),this.getDropRotate=s({from:0,to:this.props.rotate,duration:this.props.duration,startTS:this.startDropTS}),this.getDropScale=s({from:1,to:this.props.scale,duration:this.props.duration,startTS:this.startDropTS}),window.requestAnimationFrame(this.renderDropAnimation)}},{key:"renderDropAnimation",value:function(){var t=+new Date;if(t-this.startDropTS>this.props.duration)this.props.endAnimation?this.startEndAnimation(t):(this.element.remove(),this.props.onEnd());else{var e=this.getDropX(t),n=this.getDropY(t),i=this.getDropRotate(t),o=this.getDropScale(t);this.element.style.left="".concat(e,"px"),this.element.style.top="".concat(n,"px"),this.element.style.transform="rotate(".concat(i,"deg)scale(").concat(o,")"),window.requestAnimationFrame(this.renderDropAnimation)}}},{key:"startEndAnimation",value:function(t){this.startEndTS=t,this.renderEndAnimation=this.renderEndAnimation.bind(this),this.getEndY=s({from:this.endPosition.y,to:this.endPosition.y-this.props.endJumpHeight,duration:this.props.endAnimationDuration,startTS:t,easing:function(t){return Math.sin(t*Math.PI)}}),this.getEndRotate=s({from:this.props.rotate,to:this.props.endRotate,duration:this.props.endAnimationDuration,startTS:t}),this.getEndOpacity=s({from:1,to:0,duration:this.props.endAnimationDuration,startTS:t}),window.requestAnimationFrame(this.renderEndAnimation)}},{key:"renderEndAnimation",value:function(){var t=+new Date;if(t-this.startEndTS>this.props.endAnimationDuration)return this.element.remove(),void this.props.onEnd();var e=this.getEndY(t),n=this.getEndRotate(t),i=this.getEndOpacity(t);this.element.style.top="".concat(e,"px"),this.element.style.transform="rotate(".concat(n,"deg)scale(").concat(this.props.scale,")"),this.element.style.opacity=i,window.requestAnimationFrame(this.renderEndAnimation)}}])&&i(e.prototype,n),a&&i(e,a),t}();e.default=a}])});