(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{643:function(e,t,r){"use strict";r.r(t);r(24),r(19),r(23),r(9),r(34),r(22),r(35);var o=r(4),n=r(12),l=(r(43),r(365),r(14));function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={data:function(){return{routeName:"rooms",form:{type:"",roomNo:"",beds:"",fee:0}}},computed:v({},Object(l.c)(["roomsPaginated","getToken"])),methods:v(v({},Object(l.b)(["loadguestsroomsPaginated"])),{},{resetForm:function(){this.form.type="",this.form.roomNo="",this.form.beds="",this.form.fee=""},loadPaginationPage:function(e){e&&this.loadguestsroomsPaginated(e)},newRoom:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={headers:{"X-CSRF-TOKEN":e.getToken}},o=e.form,t.prev=2,t.next=5,e.$axios.$post("newRoom",o,r).then((function(t){var r=t.result,o=t.message;1==r&&(e.$toast.success(o),e.resetForm(),e.$emit("refresh"))})).catch((function(t){console.log(t.response),t.response.data.message?e.$toast.error(e.$ObjTemplate.trim(t.response.data.message)):e.$toast.error(e.$ObjTemplate.trim(t.response.request.statusText))}));case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(2),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[2,7]])})))()},delRoom:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o={headers:{"X-CSRF-TOKEN":t.getToken}},r.prev=1,r.next=4,t.$axios.$post("delRoom",{id:e},o).then((function(e){var r=e.result,o=e.message;1==r&&(t.$toast.success(o),t.$emit("refresh"))})).catch((function(e){console.log(e.response),e.response.data.message?t.$toast.error(t.$ObjTemplate.trim(e.response.data.message)):t.$toast.error(t.$ObjTemplate.trim(e.response.request.statusText))}));case 4:r.next=9;break;case 6:r.prev=6,r.t0=r.catch(1),console.log(r.t0);case 9:case"end":return r.stop()}}),r,null,[[1,6]])})))()}})},d=r(6),component=Object(d.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"w-full"},[e._m(0),e._v(" "),r("div",{staticClass:"w-4/5 mx-auto min"},[r("div",{staticClass:"mb-5 w-full rounded-xl px-32 py-10 bg-gray-300"},[r("div",[r("h1",{staticClass:" uppercase text-gray-500 font-black"},[e._v("\n            add room\n          ")]),e._v(" "),r("div",[r("form",{on:{submit:function(t){return t.preventDefault(),e.newRoom.apply(null,arguments)}}},[r("div",{staticClass:" flex flex-row"},[r("div",{staticClass:"p-2 text-sm w-1/2"},[r("label",{staticClass:"font-bold text-yellow-800 text-sm",attrs:{for:"RType"}},[e._v("Room Type")]),e._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:e.form.type,expression:"form.type"}],staticClass:"py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300",attrs:{id:"RType",name:"",required:""},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.form,"type",t.target.multiple?r:r[0])}}},[r("option",{attrs:{value:"SINGLE"}},[e._v("\n                      SINGLE\n                    ")]),e._v(" "),r("option",{attrs:{value:"DOUBLE"}},[e._v("\n                      DOUBLE\n                    ")]),e._v(" "),r("option",{attrs:{value:"TWIN"}},[e._v("\n                      TWIN\n                    ")]),e._v(" "),r("option",{attrs:{value:"STANDARD DBL"}},[e._v("\n                      STANDARD DBL\n                    ")])])]),e._v(" "),r("div",{staticClass:"p-2 text-sm w-1/2"},[r("label",{staticClass:"font-bold text-yellow-800 text-sm",attrs:{for:"IDNumber"}},[e._v("Room Number")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.roomNo,expression:"form.roomNo"}],staticClass:"py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300",attrs:{id:"IDNumber",type:"text"},domProps:{value:e.form.roomNo},on:{input:function(t){t.target.composing||e.$set(e.form,"roomNo",t.target.value)}}})])]),e._v(" "),r("div",{staticClass:" flex flex-row"},[r("div",{staticClass:"p-2 text-sm w-1/2"},[r("label",{staticClass:"font-bold text-yellow-800 text-sm",attrs:{for:"NBeds"}},[e._v("Number of Beds")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.beds,expression:"form.beds"}],staticClass:"py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300",attrs:{id:"NBeds",type:"number",min:"1",max:"4",required:""},domProps:{value:e.form.beds},on:{input:function(t){t.target.composing||e.$set(e.form,"beds",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"p-2 text-sm w-1/2"},[r("label",{staticClass:"font-bold text-yellow-800 text-sm",attrs:{for:"Fees"}},[e._v("Fees")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.fee,expression:"form.fee"}],staticClass:"py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300",attrs:{id:"Fees",type:"number",min:"10000",required:""},domProps:{value:e.form.fee},on:{input:function(t){t.target.composing||e.$set(e.form,"fee",t.target.value)}}})])]),e._v(" "),r("div",{staticClass:"text-sm p-2"}),e._v(" "),r("div",{staticClass:"my-3"},[r("button",{staticClass:"p-3 bg-green-500 text-white",attrs:{type:"submit"}},[e._v("\n                  Submit\n                ")]),e._v(" "),r("button",{staticClass:"p-3 bg-red-500 text-white",on:{click:function(t){return t.preventDefault(),e.toggleAddGuest.apply(null,arguments)}}},[e._v("\n                  Cancel\n                ")])])])])])]),e._v(" "),r("div",{staticClass:"mb-5 w-full rounded-xl px-32 py-10  bg-gray-300"},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.roomsPaginated.links,expression:"roomsPaginated.links"}],staticClass:" w-full p-2  shadow-2xl rounded mt-2  "},[r("div",{staticClass:" m-2 flex flex-row flex-nowrap justify-center items-center"},e._l(e.roomsPaginated.links,(function(link,t){return r("span",{key:t,staticClass:" px-2 cursor-pointer",class:e.roomsPaginated.current_page==link.label?" text-red-600":" text-black",domProps:{innerHTML:e._s(link.label)},on:{click:function(t){return e.loadPaginationPage(link.url)}}})})),0)]),e._v(" "),r("div",{staticClass:"w-full rounded-xl overflow-x-scroll mb-1 min-h-full bg-white"},[r("div",{staticClass:"table w-full"},[r("div",{staticClass:"w-full table-row-group"},[e._m(1),e._v(" "),e._l(e.roomsPaginated.data,(function(t,i){return r("div",{key:i,staticClass:"table-row bg-gray-500 text-white"},[r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3"},[e._v("\n                    "+e._s(t.id)+"\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3 whitespace-nowrap"},[e._v("\n                    "+e._s(t.type)+"\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3"},[e._v("\n                    "+e._s(t.roomNo)+"\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3 uppercase"},[e._v("\n                    "+e._s(1==t.occupied?"OCCUPIED":"EMPTY")+"\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3 uppercase"},[e._v("\n                    "+e._s(t.beds)+"\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3 uppercase"},[e._v("\n                    UGX: "+e._s(e._f("number_format")(t.fee))+"\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("svg",{staticClass:"mt-5 h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},on:{click:function(r){return e.delRoom(t.id)}}},[r("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"}})])])])}))],2)])])])])])])}),[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"w-full h-10 m-8"},[r("h1",{staticClass:"font-black"},[e._v("\n        All Rooms\n      ")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"table-row bg-black rounded-xl text-white"},[r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3"},[e._v("\n                    ID\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3"},[e._v("\n                    TYPE\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3"},[e._v("\n                    Room NO.\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3"},[e._v("\n                    Status\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3"},[e._v("\n                    No. BEDS\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3"},[e._v("\n                    FEES\n                  ")])]),e._v(" "),r("div",{staticClass:"table-cell"},[r("div",{staticClass:"m-3"})])])}],!1,null,"e5785490",null);t.default=component.exports}}]);