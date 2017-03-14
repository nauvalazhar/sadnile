$(function() {
	// Banner
	$(".banner").each(function(){
		var $this = $(this),
			bannerHeight = $this.attr("data-banner-height"),
			bannerWidth = $this.attr("data-banner-width"),
			bannerBG = $this.attr("data-banner-img"),
			bannerBGCOLOR = $this.attr("data-banner-bgcolor"),
			bannerOverlay = $this.attr("data-banner-overlay");

		$this.css({
			height: bannerHeight,
			backgroundSize: "cover",
			backgroundPosition: "center"
		});
		if(bannerBG) {
			$this.css({
				backgroundImage: "url("+bannerBG+")",
			})
		}
		if(bannerBGCOLOR) {
			$this.css({
				backgroundColor: bannerBGCOLOR,
			})
		}
		if(bannerWidth) {
			$this.css({
				width: bannerWidth
			})
		}
		if(bannerOverlay == "true" || !bannerOverlay) {
			$this.prepend("<div style=\"width:100%;height:100%;top:0;left:0;position:absolute;background:rgba(0,0,0,.3)\"></div>");
		}
	});

	// Search box
	$(".toggle-search-box").click(function() {
		if(!$(this).attr("toggle-status") || $(this).attr("toggle-status") == "notactive"){
			$(this).attr("toggle-status","active");
			$("#search-toggle").show();
			$(this).append('<span class="down">▲</span>');
			if($(".toggle-cart").attr("toggle-status") == "active") {
				$(".toggle-cart").click();
			}
			if(!$(".navbar-toggle").hasClass("collapsed")) {
				$(".navbar-toggle").click();
			}
		}else{
			$("#search-toggle").hide();
			$(this).attr("toggle-status","notactive");
			$(this).find('.down').remove();
		}
		return false;
	});

	// Cart
	$(".toggle-cart").click(function() {
		if(!$(this).attr("toggle-status") || $(this).attr("toggle-status") == "notactive"){
			$(this).attr("toggle-status","active");
			$(this).parent().find(".cart").show();
			if($(".toggle-search-box").attr("toggle-status") == "active") {
				$(".toggle-search-box").click();
			}
		}else{
			$(this).parent().find(".cart").hide();
			$(this).attr("toggle-status","notactive");
		}
		return false;
	});
	$(document).click(function(e){
		if(!$(e.target).hasClass("cart")){
			if($(".toggle-cart").attr("toggle-status") == "active") {
				$(".toggle-cart").click();
			}			
		}
	});

	// Hover dropdown
	if($(window).width() > 768) {
		$('ul.nav li.dropdown, [with-hover]').hover(function() {
			$(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(500);
		}, function() {
			$(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(500);
		});
	}

	// Navbar
	var navbar = "#navbar";
	navbar = $(navbar);
	var offTopNav = navbar.offset().top;
	navbar.parent().prepend("<div id=\"navbar-clone\" style=\"height:"+navbar.height()+"px\"></div>");
	navbar.addClass("navbar-fixed-top");
	var sticky = function() {
		if($(this).scrollTop() >= offTopNav) {
			navbar.addClass("navbar-fixed-top");
			$("#navbar-clone").show();
			$("#search-toggle").css({
				position: "fixed",
				top: 50,
				left: 0,
				width:"100%",
				zIndex: 9
			})
		}else{
			navbar.removeClass("navbar-fixed-top");
			$("#navbar-clone").hide();
			$("#search-toggle").css({
				position: "relative",
				top: 0
			})
		}		
	};	
	$(window).scroll(function(){
		sticky();
	});
	sticky();

	// Select style
	$("select").each(function(){
		var $this = $(this);

		if($this.attr("data-full-width") == "true" && !$this.attr("data-width")) {
			$this.css({
				width: "100%"
			})
		}else if($this.attr("data-width")) {
			$this.css({
				width: $this.attr("data-width")
			})
		}else{
			$this.css({
				width: $this.width()
			})			
		}

		$this.css({
			border: "none",
			appearance:"none",
			cursor: "pointer",
			backgroundImage: "url(assets/img/arrow-down.png)",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center right",
			backgroundColor: "#fff",
			border: "1px solid #ddd",
			borderRadius: "3px",
			minWidth:50
		});

		$this.find("option").css({
			padding: 5
		});
	})

	// Number
	$(".number").each(function(){
		var $this = $(this);
		$this.keyup(function(){
			if($this.attr("max") || $this.attr("min")){
				if(Number($this.val()) > Number($this.attr("max"))) {
					if($this.attr("max-msg")) {
						showMax();
					}
					$this.val($this.attr("max"));
				}else if(Number($this.val()) < Number($this.attr("min"))) {
					if($this.attr("min-msg")) {
						showMin();
					}
					$this.val($this.attr("min"));
				}else{
					return true;
				}
			}
		});
		$this.wrap("<div class=\"custom-number\"></div>");
		var updown = "<a class=\"custom-number-nav up\"><i class=\"fa fa-chevron-up\"></i></a><a class=\"custom-number-nav down\"><i class=\"fa fa-chevron-down\"></i></a>";
		$this.parent().append(updown);
		$this.parent().find(".up").click(function(){
			if($this.attr("max") && Number($this.val()) >= Number($this.attr("max"))){
				if($this.attr("max-msg")) {
					showMax();
				}
				return false;
			}else{
				$this.val(Number($this.val())+Number(1));				
			}
		})
		$this.parent().find(".down").click(function(){
			if($this.attr("min") && Number($this.val()) <= Number($this.attr("min"))){
				if($this.attr("min-msg")) {
					showMin();
				}
				return false;
			}else{
				$this.val(Number($this.val())-Number(1));
			}
		})
		var showMax = function() {
			$this.parent().find(".text-alert-max").remove();
			$this.parent().append("<div class=\"text-danger text-alert text-alert-max\">"+$this.attr("max-msg")+"</div>").fadeIn();
			hide();
		}
		var showMin = function() {
			$this.parent().find(".text-alert-min").remove();
			$this.parent().append("<div class=\"text-danger text-alert text-alert-min\">"+$this.attr("min-msg")+"</div>").fadeIn();
			hide();
		}
		var hide = function() {
			setTimeout(function(){
				$this.parent().find(".text-alert-min, .text-alert-max").remove();
			},2000)			
		}
	})

	// Tabs
	$("#tabs .tabs-content").find($("#tabs ul li.active a").attr("href")).show();
	$("#tabs ul li a").on("click", function(){
		var target = $(this).attr("href");
		$("#tabs ul li").removeClass("active");
		$(this).parent().addClass("active");
		$("#tabs .tabs-content .tabs-item").hide();
		$(target).delay(500).show();
		return false;
	});

	// Photos gallery
	$(".photo-preview").each(function(){
		var $this = $(this),
			$list = $this.find(".list"),
			$listClick = $this.find(".list li a"),
			$large = $this.find(".large");

		$listClick.on("click", function(){
			if($(this).parent().hasClass("active")) {
				return false;
			}else{
				var $this2 = $(this);
				$list.find("li").removeClass("active");
				$this2.parent().addClass("active");
				$large.find("img").fadeOut(function(){
					$(this).attr("src", $this2.find("img").attr("src"));
				}).fadeIn();
			}
			return false;
		})
		$large.mousedown(function(){
			return false;
		});
	});

	// Accordion
	$(".panel-collapse").each(function(){
		var $this = $(this),
			toggle = $this.find("li a");

		toggle.click(function(){
			$this.find("ul").slideUp();
			$this.find("li").removeClass("active");
			if($(this).parent().hasClass("active")) {
				$(this).parent().find("ul").slideUp();
				$(this).parent().removeClass("active");				
			}else{
				$(this).parent().find("ul").slideDown();
				$(this).parent().addClass("active");				
			}
			return false;
		})
	})

	$("[data-toggle=collapse]").on("click", function(){
		if($(".toggle-search-box").attr("toggle-status") == "active") {
			$(".toggle-search-box").click();
		}
	})
})