$(document).ready(function () {
	randomGreeting();
	updatePhoto();
	window.scrollTo(0, 0);
    $("#name").css("opacity", 0);
    $("#about-nav").css("opacity", 0);
    $("#skills-nav").css("opacity", 0);
    $("#proj-nav").css("opacity", 0);
    $("#contact-nav").css("opacity", 0);
    $("#greeting-msg").css("opacity", 0);

	$('.background').css("height", $(document).height());
	$('.background').css("background-size", "cover");

    $("#name").velocity({opacity: 1}, 1000, "linear");
        setTimeout(function () {
            $("#about-nav").velocity({opacity: 1}, 300, function() {
            $("#skills-nav").velocity({opacity: 1}, 300, function () {
                $("#proj-nav").velocity({opacity: 1}, 300, function () {
                    $("#contact-nav").velocity({opacity: 1}, 300);
                });
            });
        });
    }, 500); 

    $("#greeting-msg").velocity({opacity: 1}, 800);
	$(".background#greeting").css("opacity", 1);
	
	var $gavin = $("#sig-gavin");
	var $dot = $("#sig-dot");
	var $mak = $("#sig-mak");
	
	pathPrepare($gavin);
	pathPrepare($dot);
	pathPrepare($mak);
	
	var tweenSig = new TimelineMax()
		.add(TweenMax.to($gavin, 0.45, {strokeDashoffset: 0, ease:Linear.easeNone}))
		.add(TweenMax.to($mak, 0.45, {strokeDashoffset: 0, ease:Linear.easeNone}))
		.add(TweenMax.to($dot, 0.1, {strokeDashoffset: 0, ease:Linear.easeNone}));
		
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0.25
        }
    });

	var dur = $(window).height();

    var sceneGreeting = new ScrollMagic.Scene({
        duration: dur,
		triggerHook: "onLeave"
		
    })
    .setPin("#greeting-msg")
	.on("progress", function (e) {
		$("#greeting-msg").css("opacity", 1- e.progress.toFixed(3));
	})
    .addTo(controller);

	var sceneAbout = new ScrollMagic.Scene({
		duration: dur,
		triggerElement: "#about-block"
	})
	.setPin("#about-msg")
	.on("progress", function (e) {
		$("#about-msg").css("opacity", fadeWait(e.progress.toFixed(3)));
	})
	.addTo(controller);
	
	var sceneskills = new ScrollMagic.Scene({
		duration: dur,
		triggerElement: "#skills-block"
	})
	.setPin("#skills-msg")
	.on("progress", function (e) {
		$("#skills-msg").css("opacity", fadeWait(e.progress.toFixed(3)));
	})
	.addTo(controller);
	
	var sceneProjects = new ScrollMagic.Scene({
		duration: dur,
		triggerElement: "#proj-block"
	})
	.setPin("#proj-msg")
	.on("progress", function (e) {
		$("#proj-msg").css("opacity", fadeWait(e.progress.toFixed(3)));
	})
	.addTo(controller);
	
	var sceneContact = new ScrollMagic.Scene({
		triggerElement: "#contact-block",
		duration: dur
	})
	.setPin("#contact-msg", {pushFollowers: true})
	.addTo(controller);
	
	var sceneSig = new ScrollMagic.Scene({
		triggerElement: "#contact-block",
		duration: 300,
		offset: 0,
		tweenChanges: true
	})
	.setTween(tweenSig)
	.addTo(controller);

	var triggered = false;

	var sceneGraph = new ScrollMagic.Scene({
		triggerElement: "#skills-block"
	})
	.on("enter", function (event) {
		if(!triggered){
			triggered = true;
			Chart.defaults.global.defaultFontColor = "#FFFFFF";
			Chart.defaults.global.defaultFontFamily =  "'Roboto Mono', monospace";
			Chart.defaults.global.defaultFontSize = 24;
			var ctx = $("#skills-chart");
			var skillsChart = new Chart(ctx, {
				type: "horizontalBar",
				data: {
					labels: ["Java", "HTML/CSS", "Javascript", "Python", "C++"],
					datasets: [{
						data: [5, 5, 4.5, 4, 3.5],
						backgroundColor: [
						'rgba(255, 255, 255, 0.8)',
						'rgba(255, 255, 255, 0.8)',
						'rgba(255, 255, 255, 0.8)',
						'rgba(255, 255, 255, 0.8)',
						'rgba(255, 255, 255, 0.8)'
						]
					}]
				},
				options: {
					scales: {
						xAxes: [{
							ticks: {
								beginAtZero: true,
								max: 5,
								fixedStepSize: 1
							}
						}],
						yAxes: [{
							scaleLabel: {
								display: true,
								labelString: "Skill"
							}
						}]
					},
					legend: {
						display: false
					},
					tooltips: {
						enabled: false
					},
				}
			});
		}
	})
	.addTo(controller);
	
	var backGreetingFadeout = new ScrollMagic.Scene({
		triggerElement: "#about-block"
	})
	.setVelocity(".background#greeting", {opacity: 0}, {duration: 500})
	.addTo(controller);
	
	var backAboutFadein = new ScrollMagic.Scene({
		triggerElement: "#about-block"
	})
	.setVelocity(".background#about", {opacity: 1}, {duration: 500})
	.addTo(controller);
	
	var backAboutFadeout = new ScrollMagic.Scene({
		triggerElement: "#skills-block"
	})
	.setVelocity(".background#about", {opacity: 0}, {duration: 500})
	.addTo(controller);
	
	var backSkillsFadein = new ScrollMagic.Scene({
		triggerElement: "#skills-block"
	})
	.setVelocity(".background#skills", {opacity: 1}, {duration: 500})
	.addTo(controller);
	
	var backSkillsFadeout = new ScrollMagic.Scene({
		triggerElement: "#proj-block"
	})
	.setVelocity(".background#skills", {opacity: 0}, {duration: 500})
	.addTo(controller);

	var backProjFadein = new ScrollMagic.Scene({
		triggerElement: "#proj-block"
	})
	.setVelocity(".background#proj", {opacity: 1}, {duration: 500})
	.addTo(controller);

	var backProjFadeout = new ScrollMagic.Scene({
		triggerElement: "#contact-block"
	})
	.setVelocity(".background#proj", {opacity: 0}, {duration: 500})
	.addTo(controller);

	var backContactFadein = new ScrollMagic.Scene({
		triggerElement: "#contact-block"
	})
	.setVelocity(".background#contact", {opacity: 1}, {duration: 500})
	.addTo(controller);

	$("#name").click(function () {
		$("html").velocity("scroll", { duration: 700, easing: "swing"});
	});
	
	$(".bar#about-nav").click(function (){
		$("#about-block").velocity("scroll", { duration: 700, easing: "swing"});
	});
	
	$(".bar#skills-nav").click(function (){
		$("#skills-block").velocity("scroll", { duration: 700, easing: "swing"});
	});
	
	$(".bar#proj-nav").click(function (){
		$("#proj-block").velocity("scroll", { duration: 700, easing: "swing"});
	});
	
	$(".bar#contact-nav").click(function (){
		$("#scroll-bottom").velocity("scroll", { duration: 700, easing: "swing"});
	});	
	
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function randomGreeting(){
	//$(".background#greeting").css("background", "resources/sf.jpg");
	var r = Math.ceil(Math.random() * 8);
	var s = "";
	switch (r){
		case 1:
			s = "Hello."
			break;
		case 2:
			s = "Greetings."
			break;
		case 3:
			s = "What's up?"
			break;
		case 4:
			s = "Hey."
			break;
		case 5:
			s = "How's it going?"
			break;
		case 6: 
			s = "How are things?"
			break;
		case 7:
			s = "Hey there."
			break;
		case 8:
			var h = new Date().getHours();
			if(h < 4){
				s = "Good evening."
			}
			else if(h < 12){
				s = "Good morning."
			}
			else if(h < 17){
				s = "Good afternoon."
			}
			else {
				s = "Good evening."
			}
			break;
	}
	$("#greeting-msg").text(s);
}

function fadeWait(prog){
	var x = 1.8 * (1 - prog);
	
	if(x > 1)
		return 1;
	return x;
}


function pathPrepare ($el) {
		var lineLength = $el[0].getTotalLength();
		$el.css("stroke-dasharray", lineLength);
		$el.css("stroke-dashoffset", lineLength);
}

function updatePhoto() {
	var h = new Date().getHours();
	
	if(h < 5){
		$(".background#greeting").css("background", "url(resources/sf_night.jpg)");
		$(".background#about").css("background", "url(resources/golden_gate_night.jpg)");
	}
	else if(h < 14){
		$(".background#greeting").css("background", "url(resources/sf_day2.jpg)");
		$(".background#about").css("background", "url(resources/golden_gate_day1.jpg)");
	}
	else if(h < 18){
		$(".background#greeting").css("background", "url(resources/sf_day.jpg)");
		$(".background#about").css("background", "url(resources/golden_gate_day2.jpg)");
	}
	else{
		$(".background#greeting").css("background", "url(resources/sf_night.jpg)");
		$(".background#about").css("background", "url(resources/golden_gate_night.jpg)");
	}
}
