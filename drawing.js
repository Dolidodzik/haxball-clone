function drawCircle(color, outline_color, radius, centerX, centerY){
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = outline_color;
  ctx.stroke();
}

function drawPlayers(){
  drawCircle("#123", "#678", 16, s.player1X, s.player1Y) // player 1
  drawCircle("#123", "#678", 16, s.player2X, s.player2Y) // player 2
}


function drawBackground(){
  ctx.beginPath();
  ctx.rect(0, 0, 1000, 1000);
  ctx.fillStyle = "green";
  ctx.fill();
}

function drawBall(){
  drawCircle("#9ab", "#cde", 10, s.ballX, s.ballY)
}

function drawNets(){
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(40, 200);
  ctx.bezierCurveTo(20, 210, -32, 300, 40, 400);
  ctx.stroke();
  /////////////////
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(960, 200);
  ctx.bezierCurveTo(980, 210, 1032, 300, 960, 400);
  ctx.stroke();
}
