 var width = window.innerWidth,
     height = window.innerHeight; 

animate = function() {
 var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("class", "input")
      .attr("transform", "translate(32," + (height / 4) + ")")
  svg.append("text")
    .data([{
      x: width - 250,
      y: 0,
      name: "Column A",
      total: 0
    }])
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .text(function(d) { return d.name + ": " + d.total })
    .attr("id", "columna");
  svg.append("text")
    .data([{
      x: width - 250,
      y: height - 300,
      name: "Column B",
      total: 0
    }])
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .text(function(d) { return d.name + ": " + d.total })
    .attr("id", "columnb");
};


addTweet = function(tweet) {
  // DATA JOIN
  // Join new data with old elements, if any.
  var svg = d3.select(".input")
    , h = $(".tweet").last().attr("y") || "-15"
    , h = parseInt(h) + 15;
  var text = svg.append("text")
      .data([{
        id: tweet.id,
        text: tweet.text,
        y: h
      }])
      .text(function(d) { return d.text; })
      .attr("class", "tweet")
      .attr("id", "tweet_" + tweet.id)
      .attr("y", h);
};

addPred = function(tweet) {
  // DATA JOIN
  // Join new data with old elements, if any.
  var svg = d3.select(".output")
    , h = $(".pred").last().attr("y") || "-15"
    , h = parseInt(h) + 15;
  console.log(h);
  var text = svg.append("text")
      .data([{
        text: tweet.text,
        y: h
      }])
      .text(function(d) { return d.text; })
      .attr("class", "pred")
      .attr("id", "pred_" + tweet.id)
      .attr("y", h);
};


removeTweet = function(id) {
  var yloc = 0;
  if (Math.random() < 0.5) {
    yloc = height - 300;
  }
  d3.select("#tweet_" + id)
      .transition()
      .attr("class", "pred")
      .attr("x", width - 250)
      .duration(2000);
  
  d3.select("#tweet_" + id)
      .transition()
      .attr("class", "pred")
      .attr("y", yloc)
      .attr("x", width - 250)
      .duration(2000)
      .remove();

  d3.selectAll(".pred")
    .attr("y", function(d, i) {
      return i * 15;
    });
  d3.selectAll(".tweet")
    .attr("y", function(d, i) {
      return i * 15;
    });
};


