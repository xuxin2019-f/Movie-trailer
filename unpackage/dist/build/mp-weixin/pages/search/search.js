(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{"0563":function(t,a,e){"use strict";e.r(a);var i=e("6227"),r=e("7894");for(var n in r)"default"!==n&&function(t){e.d(a,t,function(){return r[t]})}(n);e("18b8");var o,s=e("f0c5"),u=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);a["default"]=u.exports},"18b8":function(t,a,e){"use strict";var i=e("7037"),r=e.n(i);r.a},6227:function(t,a,e){"use strict";var i,r=function(){var t=this,a=t.$createElement;t._self._c},n=[];e.d(a,"b",function(){return r}),e.d(a,"c",function(){return n}),e.d(a,"a",function(){return i})},"6c1d":function(t,a,e){"use strict";(function(t){e("29b3"),e("921b");i(e("66fd"));var a=i(e("0563"));function i(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},7037:function(t,a,e){},"77f8":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{trailerList:[],keywords:"",page:1,totalPages:1}},onReachBottom:function(){var t=this.page+1,a=this.keywords,e=this.totalPages;t>e||this.pagedTrailerList(a,t,15)},onLoad:function(){var a=this;t.showLoading({mask:!0,title:"请稍后"}),t.showNavigationBarLoading(),t.request({url:this.serverUrl+"/search/list?keywords=&qq=38833964&&page=&pageSize=",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){200==t.data.status&&(a.trailerList=t.data.data.rows)},complete:function(){t.hideNavigationBarLoading(),t.hideLoading()}})},methods:{pagedTrailerList:function(a,e,i){var r=this;t.showLoading({mask:!0,title:"请稍后"}),t.showNavigationBarLoading(),t.request({url:this.serverUrl+"/search/list?keywords="+a+"&qq=38833964&&page="+e+"&pageSize="+i,method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){if(200==t.data.status){var a=t.data.data.rows;r.trailerList=r.trailerList.concat(a),r.totalPages=t.data.data.total,r.page=e}},complete:function(){t.hideNavigationBarLoading(),t.hideLoading()}})},searchMe:function(t){var a=this,e=t.detail.value;a.keywords=e,a.trailerList=[],this.pagedTrailerList(e,1,15)},showTrailer:function(a){var e=a.currentTarget.dataset.trailerid;t.navigateTo({url:"../movie/movie?trailerId="+e})}}};a.default=e}).call(this,e("543d")["default"])},7894:function(t,a,e){"use strict";e.r(a);var i=e("77f8"),r=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,function(){return i[t]})}(n);a["default"]=r.a}},[["6c1d","common/runtime","common/vendor"]]]);