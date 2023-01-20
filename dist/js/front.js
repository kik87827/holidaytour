if( window.console == undefined ){ console = { log : function(){} }; }

/** browser checker **/
let touchstart = "ontouchstart" in window;
let userAgent=navigator.userAgent.toLowerCase();
document.addEventListener("DOMContentLoaded",() => {
	commonInit();
	commonResize();
	layoutFunc();
});
window.addEventListener("load",() => {
	posLayerEvent();
	
});

function subMinHeight(){
	var sub_middle = document.querySelector(".sub_middle");
	var sub_middle_pos = sub_middle !== null ? sub_middle.getBoundingClientRect().top : 0;
	var footer_zone = document.querySelector(".footer_zone");
	var footer_zone_height = footer_zone !== null ? footer_zone.offsetHeight : 0;
	if(sub_middle !== null){
		sub_middle.style.minHeight = `calc(100vh - ${sub_middle_pos + footer_zone_height}px)`
	}
}

function commonResize(){
	var $window_width = 0;
	$(window).on("resize",function(){
		if($window_width == $(window).width()){
			return;
		}
		posLayerResize();
	}).resize();
}

function commonInit() {
	let touchstart = "ontouchstart" in window;
	let userAgent = navigator.userAgent.toLowerCase();
	let checkitem = [];
	if (touchstart) {
		browserAdd("touchmode");
	}
	if (userAgent.indexOf('samsung') > -1) {
		browserAdd("samsung");
	}

	if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
		browserAdd("window");
	}

	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
		// iPad or iPhone
		browserAdd("ios");
	}

	function browserAdd(opt) {
		document.querySelector("html").classList.add(opt);
	}
}


function layoutFunc(){
	function btnTop(){
		let btn_gotop = document.querySelector(".btn_gotop");
		if(btn_gotop ===null){return;}
		btn_gotop.addEventListener("click",(e)=>{
			e.preventDefault();
			window.scrollTo(0,0);
		});
	}
	btnTop();
}


function posLayerEvent(){
	var posCallBtn = $("[data-poslayer]");
	var poslayer_z = $(".poslayer_z");
	
	$("body").append(poslayer_z);

	
	
	posCallBtn.on("click",function(e){
		var $this = $(this),
			$t_t = $($this.attr("data-poslayer"));
		e.preventDefault();
		posLayerShow($t_t,$this);
	});
	poslayer_z.on("click",".layerclose",function(e){
		e.preventDefault();
		posLayerHide($(this).parents(".poslayer_z"));
	});

	$(document).on("click",".btn_psubmit",function(e){
		e.preventDefault();
		let thisParent = $(this).parents(".poslayer_z");
		let targetCols = $(`[data-poslayer='#${thisParent.attr("id")}']`);
		let activeDate = thisParent.attr("data-date");
		let activeText = thisParent.find(".pclayer_vlist > li.active").text();
		if(thisParent.attr("data-date") !== undefined){
			targetCols.find(".search_form_text_result").html(activeDate);
			targetCols.addClass("result_mode");
		}else{
			targetCols.find(".search_form_text_result").html(activeText);
			targetCols.addClass("result_mode");
		}
		posLayerHide(thisParent);
	});

	$(document).on("click",".pcv_chk",function(e){
		e.preventDefault();
		$(this).parents("li").siblings().removeClass("active");
		$(this).parents("li").addClass("active");
	});

	$(document).on("click",function(e){
		if (!$(e.target).parents("[data-poslayer] , .poslayer_z , .layer_in_control").length && !$(e.target).is("[data-poslayer]") && !$(e.target).is(".layer_in_control")){
			posLayerHide($(".poslayer_z.active"));
		}
	});
}

function posLayerShow(target,btn){
	var poslayer_z = $(".poslayer_z");
	var target = $(target);
	
	$("body").append(target);
	poslayer_z.removeClass("active");
	target.addClass("active");
	posLayerPos(target,btn);
}

function posLayerResize(){
	var poslayer_z = $(".poslayer_z");
	if (poslayer_z.length){
		poslayer_z.each(function(){
			posLayerResizeAction($(this));
		});
	}
}

function posLayerPos(target,btn){
	var $target = $(target);
	var $target_tvitdep = $target.find(".tvitdep_vlist_wrap");
	var $target_tvitdep_pos = $target_tvitdep.length ? $target_tvitdep.offset().left : 0;
	var $target_tvitdep_wid = $target_tvitdep.length ? $target_tvitdep.outerWidth() : 0;
	var $targetWid = $target.length ? $target.outerWidth() : 0;
	var $btn = $(btn);
	var $btnIndex = $btn.index();
	var $btnPosTop = $btn.length ? $btn.offset().top : 0;
	var $btnPosHeight = $btn.length ? $btn.outerHeight() : 0;
	var $btnPosLeft = $btn.length ? $btn.offset().left : 0;
	var $btnWid = $btn.length ? $btn.outerWidth() : 0;
	var elseMargin = 0;
	$target.css({"top":"", "left" : "" , "right" : "" , "width" : ""});
	if ($targetWid + $btnPosLeft > $(window).width()){
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 20,
			"left": "auto",
			"right" : 20
		});
	}else{
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 20,
			"left": $btnPosLeft
		});
	}
}

function posLayerResizeAction(target){
	var $target = $(target);
	var $target_tvitdep = $target.find(".tvitdep_vlist_wrap");
	var $target_tvitdep_pos = $target_tvitdep.length ? $target_tvitdep.offset().left : 0;
	var $target_tvitdep_wid = $target_tvitdep.length ? $target_tvitdep.outerWidth() : 0;
	var $targetWid = $target.length ? $target.outerWidth() : 0;
	var $btn = $("[data-poslayer='#" + $target.attr("id") +"']");
	var $btnIndex = $btn.index();
	var $btnPosTop = $btn.length ? $btn.offset().top : 0;
	var $btnPosHeight = $btn.length ? $btn.outerHeight() : 0;
	var $btnPosLeft = $btn.length ? $btn.offset().left : 0;
	var $btnWid = $btn.length ? $btn.outerWidth() : 0;
	$target.css({"top":"", "left" : "" , "right" : "" , "width" : ""});
	if ($targetWid + $btnPosLeft > $(window).width()) {
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 20,
			"left": "auto",
			"right": 20
		});
	} else {
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 20,
			"left": $btnPosLeft
		});
	}
}

function posLayerHide(target){
	var target = $(target) || target;
	target.removeClass("active");
}



function mainVisual(){
	let main_visual_obj = null;
	const main_visual_container = document.querySelector(".mv_container");
	const mv_zone = document.querySelector(".mv_zone");
	const main_visual_slide = main_visual_container.querySelectorAll(".swiper-slide");
	let btn_mv_stop = null;
	let btn_mv_play = null;
	if(main_visual_slide.length>1){
		main_visual_obj = new Swiper(".mv_container", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.main_visual_paging",
			},
            navigation: {
                nextEl: '.btn_mv_control.next_control',
                prevEl: '.btn_mv_control.prev_control',
            },
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
		btn_mv_stop = document.querySelector(".btn_mv_stop");
		btn_mv_play = document.querySelector(".btn_mv_play");

		btn_mv_play.addEventListener("click", (e) => {
			e.preventDefault();
			main_visual_obj.autoplay.start();
		},false);

		btn_mv_stop.addEventListener("click", (e) => {
			e.preventDefault();
			main_visual_obj.autoplay.stop();
		},false);
	}else{
		mv_zone.classList.add("nodata_type");
	}
}


function mainVisual2(){
	let main_visual_obj = null;
	const main_visual_container = document.querySelector(".main_swiper_container");
	const mv_zone = document.querySelector(".main_visual_group");
	const main_visual_slide = main_visual_container.querySelectorAll(".swiper-slide");
	let btn_mv_stop = null;
	let btn_mv_play = null;
	
	if(main_visual_slide.length>1){
		main_visual_obj = new Swiper(".main_swiper_container", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.main_visual_paging",
			},
            navigation: {
                nextEl: '.btn_main_swiper_control.next_control',
                prevEl: '.btn_main_swiper_control.prev_control',
            },
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
		btn_mv_stop = document.querySelector(".btn_mv_stop");
		btn_mv_play = document.querySelector(".btn_mv_play");
		btn_mv_play.addEventListener("click", (e) => {
			e.preventDefault();
			main_visual_obj.autoplay.start();
		});
		
		btn_mv_stop.addEventListener("click", (e) => {
			e.preventDefault();
			main_visual_obj.autoplay.stop();
		});
	}else{
		mv_zone.classList.add("nodata_type");
	}
}


var mc_bestswiper_obj = null;
function mcBestSwiper(){
	let target_swiper = document.querySelector("#best_swiper");
	let target_swiper_slide = document.querySelectorAll(`#best_swiper .swiper-slide`);
	if(target_swiper_slide.length>4){
		mc_bestswiper_obj = new Swiper("#best_swiper", {
			speed : 800,
			slidesPerView: 4, 
			slidesPerGroup: 4,
			loop : true,
			navigation: {
				nextEl: `#best_swiper_control .next_go`,
				prevEl: `#best_swiper_control .prev_go`,
			}
		});
	}else{
		document.querySelector("#best_swiper_control").style.display = "none";
	}
}

function mcBestSwiperUpdate(){
	if(mc_bestswiper_obj !== null){
		mc_bestswiper_obj.update();
	}
}


var mc_package_swiper_obj = null;
function mcPackageSwiper(){
	let target_swiper = document.querySelector("#package_swiper");
	let target_swiper_slide = document.querySelectorAll(`#package_swiper .swiper-slide`);
	if(target_swiper_slide.length>3){
		mc_package_swiper_obj = new Swiper("#package_swiper", {
			speed : 800,
			slidesPerView: 3, 
			slidesPerGroup: 3,
			loop : true,
			navigation: {
				nextEl: `#package_swiper_control .next_go`,
				prevEl: `#package_swiper_control .prev_go`,
			}
		});
	}else{
		document.querySelector("#package_swiper_control").style.display = "none";
	}
}

function mcPackageSwiperUpdate(){
	if(mc_package_swiper_obj !== null){
		mc_package_swiper_obj.update();
	}
}


var mc_banner_obj = null;
function mcBannerSwiper(){
	let target_swiper = document.querySelector("#banner_swiper");
	let target_swiper_slide = document.querySelectorAll(`#banner_swiper .swiper-slide`);
	if(target_swiper_slide.length>1){
		mc_banner_obj = new Swiper("#banner_swiper", {
			speed : 800,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: "#banner_swiper .swiper-pagination",
			},
		});
	}else{
		target_swiper.classList.add("nodata_type");
	}
}

function mcBannerSwiperUpdate(){
	if(mc_banner_obj !== null){
		mc_banner_obj.update();
	}
}





var mc_weekly_swiper_obj = null;
function mcWeeklySwiper(){
	let target_swiper = document.querySelector("#weekly_swiper");
	let target_swiper_slide = document.querySelectorAll(`#weekly_swiper .swiper-slide`);
	if(target_swiper_slide.length>4){
		mc_weekly_swiper_obj = new Swiper("#weekly_swiper", {
			speed : 800,
			slidesPerView: 4, 
			slidesPerGroup: 4,
			loop : true,
			navigation: {
				nextEl: `#weekly_swiper_control .next_go`,
				prevEl: `#weekly_swiper_control .prev_go`,
			}
		});
	}else{
		document.querySelector("#weekly_swiper_control").style.display = "none";
	}
}

function mcWeeklySwiperUpdate(){
	if(mc_weekly_swiper_obj !== null){
		mc_weekly_swiper_obj.update();
	}
}



var mc_best2_swiper_obj = null;
function mcBestSwiper2(){
	let target_swiper = document.querySelector("#best2_swiper");
	let target_swiper_slide = document.querySelectorAll(`#best2_swiper .swiper-slide`);
	if(target_swiper_slide.length>4){
		mc_best2_swiper_obj = new Swiper("#best2_swiper", {
			speed : 800,
			slidesPerView: 4, 
			slidesPerGroup: 4,
			loop : true,
			navigation: {
				nextEl: `#best2_swiper_control .next_go`,
				prevEl: `#best2_swiper_control .prev_go`,
			}
		});
	}else{
		document.querySelector("#best2_swiper_control").style.display = "none";
	}
}
function mcBestSwiper2Update(){
	if(mc_best2_swiper_obj !== null){
		mc_best2_swiper_obj.update();
	}
}
