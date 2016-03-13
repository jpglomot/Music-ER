	image = new Image();
	image.src = 'images/marches.jpg';
	
	var paused = true;
	var current = 0;

	var files = new Array(
		"mp3/01. Overture.mp3", 
		"mp3/02. Time Is I.mp3", 
		"mp3/03. Tr4cks.mp3", 
		"mp3/04. Time Is II.mp3", 
		"mp3/05. Htz.mp3", 
		"mp3/06. Ending.mp3", 
		"mp3/07. I and U.mp3", 
		"mp3/08. Faked Love.mp3",
		"mp3/09. I Remember Well.mp3",
		"mp3/10. Im Free.mp3",
		"mp3/11. Tu es.mp3",
		"mp3/12. Run.mp3",
		"mp3/13. In my Head.mp3",
		"mp3/14. Hey you.mp3",
		"mp3/15. Empty Rooms.mp3"
	);

	var titles = new Array(
		"Overture", 
		"Time Is I", 
		"Tr4cks", 
		"Time Is II", 
		"Htz", 
		"Ending", 
		"I \& U", 
		"Faked Love",
		"I remember well",
		"I\'m Free",
		"Tu es",
		"Run",
		"In my Head",
		"Hey you\!",
		"Empty Rooms"
	);

	nbt = titles.length;

function play (i) {
	$("#obj").show(0);
	$("#songtitle").html("Empty Rooms - " + (parseInt(i) + 1) + ". " + titles[i]);
	$("#jquery_jplayer_1").jPlayer("stop");
	$("#jquery_jplayer_1").jPlayer("setMedia", {
		title: titles[i], 
		mp3: files[i]
	});			
	$("#jquery_jplayer_1").jPlayer("play");
	$("#imageplay").attr("src", 'images/pau.png');
	
	$("#link > a").attr("href", files[i]);
	paused = false;
	current = i;
}
function play_next() {
	current++;
	if (current == nbt) {
		current = 0;
	}
	play(current);
}

$(document).ready(function(){
	
	// ------------------------------------ Init jPlayer ------------------------------------


	$("#jquery_jplayer_1").jPlayer({
		swfPath: "js",
		supplied: "mp3",
		errorAlerts: true,
		error: function(event) {
			console.log(event.jPlayer.error);
		},
		size: {width: "0", height: "0"}, 
		timeupdate: function(event) {
			$(".jp-ball").css("left",event.jPlayer.status.currentPercentAbsolute + "%");
		},
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: true,
		toggleDuration: true
	});
	$("#jquery_jplayer_1").jPlayer("setMedia", {
		title: titles[0],
		mp3: files[0]
	}); 
	
	// Songs list
	var col = "";
	var n = parseInt(nbt/3);
	for (var i = 0; i < nbt; i++) {
		col += "<div class='selectsongs' id='song" + i + "'>" + (i+1) + ". " + titles[i] + "</div>";
		if ((i % n) == (n-1)) {
			var ncol = parseInt(i/n) + 1;
			$("#col" + ncol).html(col);
			col = "";
		}
	}

	//--------------------------------- EVENTS
	
	// Song end => Next song
	$("#jquery_jplayer_1").bind($.jPlayer.event.ended, function(event) {
		play_next();
	});
	
	// song click
	$(".selectsongs").click(function() {
		play($(this).attr("id").substring(4));
	});
	// Stop music 
	$("#imagestop").click(function() {
		$("#jquery_jplayer_1").jPlayer("stop");	
		$("#imageplay").attr("src", 'images/pla.png');		
		$("#obj").hide(0);
		$("#songtitle").html("");
		paused = true;
	});
	// play or pause click 
	$("#imageplay").click(function() {
		if (paused) {
			$("#jquery_jplayer_1").jPlayer("play");
			$(this).attr("src", 'images/pau.png');
		} else {
			$("#jquery_jplayer_1").jPlayer("pause");
			$(this).attr("src", 'images/pla.png');
		}
		paused = !paused;
	});
	
	// Progress bar management
	var timeDrag = false; /* Drag status */
	$('.jp-play-bar').mousedown(function (e) {
		timeDrag = true;
		updatebar(e.pageX);
	});
	$(document).mouseup(function (e) {
		if (timeDrag) {
			timeDrag = false;
			updatebar(e.pageX);
		}
	});
	$(document).mousemove(function (e) {
		if (timeDrag) {
			updatebar(e.pageX);
		}
	});
	//update Progress Bar control
	var updatebar = function (x) {
		var progress = $('.jp-progress');
		var position = x - progress.offset().left; //Click pos
		var percentage = 100 * position / progress.width();
		if (percentage > 100) {
			percentage = 100;
		}
		if (percentage < 0) {
			percentage = 0;
		}
		$("#jquery_jplayer_1").jPlayer("playHead", percentage);
		//Update progress bar and currenttime
		$('.jp-ball').css('left', percentage+'%');
		$('.jp-play-bar').css('width', percentage + '%');
	}
	
	var rooms_animation = setInterval(function(){
		//var i = 1 -  (Math.random()/4);
		//$("#back-opacity").css ({"background-color" : "rgba(0,0,0, " + i});
	}, 2500);
});
