(window.webpackJsonp=window.webpackJsonp||[]).push([[111,60,61],{469:function(t,e,r){"use strict";r.r(e);r(9),r(22);var n={name:"TabBottom",props:["tabs"],computed:{activeTab:function(){return this.findactiveTab()}},methods:{findactiveTab:function(){var t=0;return this.tabs.forEach((function(element,e,r){element.active&&(t=e)})),t}}},c=r(6),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:" flex flex-col justify-center items-center  w-full"},[r("ul",{staticClass:"flex justify-center items-center my-2"},t._l(t.tabs,(function(e,n){return r("div",{key:n},[r("nuxt-link",{staticClass:"cursor-pointer whitespace-nowrap py-2 px-4 rounded transition shadow-2xl",class:e.active?"bg-green-500 text-white":" text-gray-500",attrs:{to:e.path}},[t._v("\n        "+t._s(e.name)+"\n      ")])],1)})),0),t._v(" "),r("div",{staticClass:"flex gap-4 justify-center border-t p-4 mb-4"},[r("nuxt-link",{directives:[{name:"show",rawName:"v-show",value:t.activeTab>0,expression:"activeTab>0"}],staticClass:"py-2 px-4 border rounded-md border-blue-600 text-blue-600 cursor-pointer uppercase text-sm font-bold hover:bg-blue-500 hover:text-white hover:shadow",attrs:{to:t.activeTab>0?t.tabs[t.activeTab-1].path:""}},[t._v("\n      Back\n    ")]),t._v(" "),r("nuxt-link",{directives:[{name:"show",rawName:"v-show",value:t.activeTab<t.tabs.length-1,expression:"activeTab<tabs.length-1"}],staticClass:"py-2 px-4 border rounded-md border-blue-600 text-blue-600 cursor-pointer uppercase text-sm font-bold hover:bg-blue-500 hover:text-white hover:shadow",attrs:{to:t.activeTab<t.tabs.length-1?t.tabs[t.activeTab+1].path:""}},[t._v("\n      Next\n    ")])],1)])}),[],!1,null,null,null);e.default=component.exports},470:function(t,e,r){"use strict";r.r(e);var n={name:"TabTop",props:["tabs"]},c=r(6),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:" flex justify-center items-center  w-full"},[r("ul",{staticClass:"flex justify-center items-center my-2"},t._l(t.tabs,(function(e,n){return r("div",{key:n,staticClass:"menu"},[r("nuxt-link",{staticClass:"cursor-pointer whitespace-nowrap py-2 px-4 text-gray-500 border-b-8",class:e.active?"text-green-500 border-green-500":"",attrs:{to:e.path}},[t._v("\n        "+t._s(e.name)+"\n      ")]),t._v(" "),e.mark?r("span",{staticClass:" absolute text-white bg-red-500 p-1 -mt-5 -ml-8 px-2 float rounded-full"},[t._v(t._s(e.mark))]):t._e()],1)})),0)])}),[],!1,null,null,null);e.default=component.exports},592:function(t,e,r){t.exports={}},699:function(t,e,r){"use strict";r(592)},751:function(t,e,r){"use strict";r.r(e);r(24),r(19),r(23),r(9),r(34),r(22),r(35);var n=r(12),c=(r(20),r(117),r(14)),o=r(511),l=r(469),v=r(470);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={components:{Inventory:o.default,TabBottom:l.default,TabTop:v.default},data:function(){return{tabs:[{name:"NEW ORDERS",path:"/kitchen/new-orders",active:!1},{name:"ALL ORDERS",path:"/kitchen/all-orders",active:!1},{name:"INVENTORY",path:"/kitchen/inventory",active:!0},{name:"INVENTORY LOGS",path:"/kitchen/inventory-logs",active:!1}],search:{selection:"KITCHEN",search:null,DRange:{from:null,to:null}}}},computed:h({},Object(c.c)(["getUser"])),created:function(){this.SET_SEARCH(this.search)},methods:h({},Object(c.d)(["SET_SEARCH"]))},m=(r(699),r(6)),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:" min-w-min main"},[r("div",{staticClass:"h-auto"},[r("TabTop",{attrs:{tabs:t.tabs}}),t._v(" "),r("div",{staticClass:" w-full p-2"},[r("div",{staticClass:"w-full bg-white p-2 text-center mx-auto"},[r("Inventory",{attrs:{usersection:t.getUser.section,search:t.search}})],1)]),t._v(" "),r("TabBottom",{attrs:{tabs:t.tabs}})],1)])}),[],!1,null,"4b3e6c2a",null);e.default=component.exports}}]);