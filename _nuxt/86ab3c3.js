(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{773:function(e,r,t){"use strict";t.r(r);t(24),t(19),t(23),t(9),t(34),t(22),t(35);var c=t(12),n=t(14);function o(object,e){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),r.push.apply(r,t)}return r}var h={middleware:"authenticated",computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(r){Object(c.a)(e,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(source,r))}))}return e}({},Object(n.c)(["getUser"])),created:function(){var e=this.getUser;switch(e?e.section:null){case"administrator":this.$router.push("/admin");break;case"SUPERVISOR":this.$router.push("/supervisor/menu-bar");break;case"STORE":this.$router.push("/store/inventory");break;case"SERVICE-BAR":this.$router.push("/servicebar/new-orders");break;case"SERVICE-WAITER-WAITRESS":this.$router.push("/service-waiter-waitress");break;case"RECEPTION":this.$router.push("/reception");break;case"KITCHEN":this.$router.push("/kitchen/new-orders");break;case"STEAM-SAUNA-MASSAGE":this.$router.push("/steam-sauna-massage");break;case"ACCOUNTS":this.$router.push("/accounts");break;case"HOUSE":this.$router.push("/house");break;case"LAUNDRY":this.$router.push("/laundry");break;case"CLEANER":this.$router.push("/cleaner");break;default:return this.$router.push("/auth")}}},O=h,l=t(6),component=Object(l.a)(O,(function(){var e=this.$createElement;return(this._self._c||e)("div")}),[],!1,null,null,null);r.default=component.exports}}]);