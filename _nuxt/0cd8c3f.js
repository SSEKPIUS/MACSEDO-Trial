(window.webpackJsonp=window.webpackJsonp||[]).push([[110,60,61],{469:function(t,e,n){"use strict";n.r(e);n(9),n(22);var r={name:"TabBottom",props:["tabs"],computed:{activeTab:function(){return this.findactiveTab()}},methods:{findactiveTab:function(){var t=0;return this.tabs.forEach((function(element,e,n){element.active&&(t=e)})),t}}},o=n(6),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:" flex flex-col justify-center items-center  w-full"},[n("ul",{staticClass:"flex justify-center items-center my-2"},t._l(t.tabs,(function(e,r){return n("div",{key:r},[n("nuxt-link",{staticClass:"cursor-pointer whitespace-nowrap py-2 px-4 rounded transition shadow-2xl",class:e.active?"bg-green-500 text-white":" text-gray-500",attrs:{to:e.path}},[t._v("\n        "+t._s(e.name)+"\n      ")])],1)})),0),t._v(" "),n("div",{staticClass:"flex gap-4 justify-center border-t p-4 mb-4"},[n("nuxt-link",{directives:[{name:"show",rawName:"v-show",value:t.activeTab>0,expression:"activeTab>0"}],staticClass:"py-2 px-4 border rounded-md border-blue-600 text-blue-600 cursor-pointer uppercase text-sm font-bold hover:bg-blue-500 hover:text-white hover:shadow",attrs:{to:t.activeTab>0?t.tabs[t.activeTab-1].path:""}},[t._v("\n      Back\n    ")]),t._v(" "),n("nuxt-link",{directives:[{name:"show",rawName:"v-show",value:t.activeTab<t.tabs.length-1,expression:"activeTab<tabs.length-1"}],staticClass:"py-2 px-4 border rounded-md border-blue-600 text-blue-600 cursor-pointer uppercase text-sm font-bold hover:bg-blue-500 hover:text-white hover:shadow",attrs:{to:t.activeTab<t.tabs.length-1?t.tabs[t.activeTab+1].path:""}},[t._v("\n      Next\n    ")])],1)])}),[],!1,null,null,null);e.default=component.exports},470:function(t,e,n){"use strict";n.r(e);var r={name:"TabTop",props:["tabs"]},o=n(6),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:" flex justify-center items-center  w-full"},[n("ul",{staticClass:"flex justify-center items-center my-2"},t._l(t.tabs,(function(e,r){return n("div",{key:r,staticClass:"menu"},[n("nuxt-link",{staticClass:"cursor-pointer whitespace-nowrap py-2 px-4 text-gray-500 border-b-8",class:e.active?"text-green-500 border-green-500":"",attrs:{to:e.path}},[t._v("\n        "+t._s(e.name)+"\n      ")]),t._v(" "),e.mark?n("span",{staticClass:" absolute text-white bg-red-500 p-1 -mt-5 -ml-8 px-2 float rounded-full"},[t._v(t._s(e.mark))]):t._e()],1)})),0)])}),[],!1,null,null,null);e.default=component.exports},593:function(t,e,n){t.exports={}},700:function(t,e,n){"use strict";n(593)},752:function(t,e,n){"use strict";n.r(e);var r=n(530),o=n(469),c=n(470),l={components:{Inventorylogs:r.default,TabBottom:o.default,TabTop:c.default},data:function(){return{tabs:[{name:"NEW ORDERS",path:"/kitchen/new-orders",active:!1},{name:"ALL ORDERS",path:"/kitchen/all-orders",active:!1},{name:"INVENTORY",path:"/kitchen/inventory",active:!1},{name:"INVENTORY LOGS",path:"/kitchen/inventory-logs",active:!0}]}}},v=(n(700),n(6)),component=Object(v.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:" min-w-min main"},[n("div",{staticClass:"h-auto"},[n("TabTop",{attrs:{tabs:t.tabs}}),t._v(" "),n("div",{staticClass:" w-full p-2"},[n("div",{staticClass:"w-full bg-white p-2 text-center mx-auto"},[n("Inventorylogs")],1)]),t._v(" "),n("TabBottom",{attrs:{tabs:t.tabs}})],1)])}),[],!1,null,"cf804f4a",null);e.default=component.exports}}]);