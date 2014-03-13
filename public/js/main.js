var es = new EventSource("http://localhost:3000/tweets"),
    retries = 0,
    ws = null,
    host = "ws://starphleet-aa02a554-1981699582.us-west-1.elb.amazonaws.com/models/textModel/";

openWebSocket(host);

function openWebSocket(host){
  if (ws==undefined || ws.readyState === undefined || ws.readyState > 1) {
    ws = new WebSocket(host);
    ws.onmessage = function(evt) {
      var data = JSON.parse(evt.data);
      var r = Math.round(90+(155*data.pos)),
          g = 200,
          b = Math.round(245-217*data.pos),
          rgb = "rgb(" + r + "," + g + "," + b + ")",
          html = "<p style='background-color: " + rgb + "'>" + data.pos + "-->" + data.hashtags + ": " +  data.text + "</p>";
      $("#console").prepend(html);
    };
    ws.onclose = function(evt) {
      retries = 0;
      retryOpeningWebSocket();
    };
  }
}

function retryOpeningWebSocket() {
  if (retries < 2) {
    setTimeout("openWebSocket('" + host + "')", 1000);
    retries++;
  }
}

function percent(x, col) {
  var factor;
  if (x < 50) {
    factor = (50 - x) / 50;
    return col[0].scale(factor).add(col[1].scale(1-factor));
  } else {
    factor = (100 - x) / 50;
    return col[2].scale(factor).add(col[1].scale(1-factor));
  }
}


es.addEventListener("message", function(e) {
  var data = JSON.parse(e.data);
  ws.send(data);
}, false);

es.addEventListener("open", function(e) {
  console.log("connection was opened");
}, false);

es.addEventListener("error", function(e) {
  if (e.readyState == EventSource.CLOSED) {
    console.log("connection was closed");
  }
}, false);