$(document).ready(function() {
  var es = new EventSource("/tweets"),
      total = 0,
      tagged = -1;

  // "load balancing"
  var api = "ws://"+hostname+".yhathq.com/greg/models/NamedEntityTagger" + modelN + "/";
  // indicator for whether or not we have an open connection
  var is_on = false;
  var ws = new WebSocket(api);

  tags.forEach(function(tag) {
    $("#tags").text($("#tags").text() + "#" + tag + " ");
  });

  setInterval(function() {
    if (is_on === false) {
      $("#status").text($("#status").text() + " ...");
    }
  }, 1000);

  ws.onerror = function (error) {
    console.log(JSON.stringify(error));
    alert("An error occurred :(");
    setTimeout(function() { location.reload(); }, 2500);
  };

  ws.onopen = function(evt) {
    ws.send(JSON.stringify({
      username: "greg",
      apikey: "fCVZiLJhS95cnxOrsp5e2VSkk0GfypZqeRCntTD1nHA"
    }));
    console.log("CONNECTED TO "+hostname+"#"+modelN);
    $("#status").text("Connected! starting stream...");
    ws.send(JSON.stringify({ id: 1, text: "hello"}));
  };

  ws.onmessage = function(evt) {
    tagged++;
    $("#n_tweets").text(total);
    $("#n_tagged").text(tagged);
    if (is_on === false) {
      is_on = true;
      $("#tweets").children().remove();
      return;
    }
    var data = JSON.parse(evt.data);
    data = data.result || data;
    $("#" + data.id).removeClass("untagged");
    $("#" + data.id).addClass("tagged");
    text = data.tagged;
    tags.forEach(function(tag) {
      text = text.replace(new RegExp('(' + tag + ')', 'gi'), "<b>" + tag + "</b>");
    });
    $("#" + data.id).html(text);
    setTimeout(function() {
      $("#" + data.id).remove();
    }, 3000);
  };

  es.addEventListener("message", function(e) {
    var data = JSON.parse(e.data);
    text = data.text;
    tags.forEach(function(tag) {
      text = text.replace(new RegExp('(' + tag + ')', 'gi'), "<b>" + tag + "</b>");
    });

    if (is_on === true) {
      $("#tweets").prepend("<p id='" + data.id + "'class='untagged'>" + text + "</p>");
      total++;
      $("#n_tweets").text(total);
      $("#n_tagged").text(tagged);
      ws.send(JSON.stringify(data));
    }
  }, false);

  es.addEventListener("open", function(e) {
    console.log("connection was opened");
  }, false);

  es.addEventListener("error", function(e) {
    if (e.readyState == EventSource.CLOSED) {
      console.log("connection was closed");
    }
  }, false);
});