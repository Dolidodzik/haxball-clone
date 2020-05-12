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

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

function drawCircle(color, outline_color, radius, centerX, centerY){
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = outline_color;
  ctx.stroke();
}

drawCircle("#123", "#678", 100, 200, 200)

function yourFunction(){
    console.log("hello jd")
    if(dc){
      console.log("hello jd321")
      value = "//move"
      dc.send(value)
      addMSG(value, "me");
      $("#msg").val('');
    }
    setTimeout(yourFunction, 5000);
}
yourFunction();
console.log("hello jd123")
