var es = new EventSource("http://localhost:3000/tweets");

es.addEventListener("message", function(e) {
    var data = JSON.parse(e.data),
    html = "<p>" + data.hashtags + "-->" + data.text  + "</p>";
    $("#console").prepend(html);
    $("#console").children().slice(15, $("#console").children().length).remove();
}, false);

es.addEventListener("open", function(e) {
    console.log("connection was opened");
}, false);

es.addEventListener("error", function(e) {
    if (e.readyState == EventSource.CLOSED) {
        console.log("connection was closed");
    }
}, false);