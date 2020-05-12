// RTC/CHAT THINGS
var sdpConstraints = { optional: [{RtpDataChannels: true}]  };
var pc = new RTCPeerConnection(null);
var dc;

pc.ondatachannel  = function(e) {dc = e.channel; dcInit(dc)};
pc.onicecandidate = function(e) {
  if (e.candidate) return;
  $("#joiner-sdp").val(JSON.stringify(pc.localDescription));
};
pc.oniceconnectionstatechange = function(e) {
  var state = pc.iceConnectionState
  $('#status').html(state);
  if (state == "connected") $("#msg, #send").attr("disabled", false);
};

function dcInit(dc) {
  dc.onopen    = function()  {$("textarea").attr("disabled",true);addMSG("CONNECTED!", "info")};
  dc.onmessage = function(e) {if (e.data) addMSG(e.data, "other");}
}

function createAnswerSDP() {
  var offerDesc = new RTCSessionDescription(JSON.parse($("#creater-sdp").val()));
  pc.setRemoteDescription(offerDesc)
  pc.createAnswer(function (answerDesc) {
    pc.setLocalDescription(answerDesc)
  }, function () {console.warn("Couldn't create offer")},
  sdpConstraints);
};

var sendMSG = function() {
  var value = $("#msg").val();
  if (value) {
    dc.send(value);
    addMSG(value, "me");
    $("#msg").val('');
  }
}

var addMSG = function(msg, who) {
  var wrap = $("<div>").addClass("wrap").appendTo($("#chat-screen"));
  var div  = $("<div>").addClass(who).appendTo(wrap);
  $("<span>").html(who).addClass("who").appendTo(div);
  $("<span>").html(msg).addClass("msg").appendTo(div);
  $("#chat-screen-wp").scrollTop($("#chat-screen").height());
}

$("#create").click(createAnswerSDP);
$("#msg").keypress(function(e) {if(e.which == 13) {sendMSG()}});
$("#send").click(sendMSG);



// ACCTUAL GAME CODE

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const initialState = {
  ballX: 500,
  ballY: 300,
  ballXmomentum: 0,
  ballYmomentum: 0,

  player1X: 100,
  player1Y: 300,
  player1Xmomentum: 0,
  player1Ymomentum: 0,

  player2X: 900,
  player2Y: 300,
  player2Xmomentum: 0,
  player2Ymomentum: 0,

  player1points: 0,
  player2points: 0,
}

let s = initialState // s as state



function gameLoop(){
    if(dc){
      value = "//move"
      dc.send(value)
      addMSG(value, "me");
      $("#msg").val('');
    }

    // drawing
    drawBackground();
    drawPlayers();
    drawNets();
    drawBall();

    setTimeout(gameLoop, 1000/60);
}
gameLoop();
console.log("hello jd123")
