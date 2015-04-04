(function(){
  // start slingin' some d3 here.

  // game options - class variables
  var options = {
    width: 700,
    height: 450,
    enemies: 30,
    padding: 20
  };

  // score/statistics
  var scores = {
    currentScore: 0,
    highScore: 0
  }

  var enemies = [];
  var player = [];


  // create board
  var gameBoard = d3.select('body')
    .append('svg:svg')
    .attr('width', options.width)
    .attr('height', options.height)
    .classed('board', true)
    .classed('backgroundSpace', true);

  // var x = d3.scale.linear().domain([0,100]).range([0,options.width]);
  // var y = d3.scale.linear().domain([0,100]).range([0,options.height]);
  // create enemies and player

  var Enemy = function(id){
    this.x = Math.floor(Math.random() * options.width);
    this.y = Math.floor(Math.random() * options.height);
    this.id = id;
  };

  var generateEnemies = function(){
    for (var i = 0; i < options.enemies; i++){
      var enemy = new Enemy(i);
      enemies.push(enemy);
    }
    d3.select('.board').selectAll('svg')
      .data(enemies)
      .enter().append('svg:circle')
      .attr('cy', function(d){ return d.y;})
      .attr('cx', function(d){ return d.x;})
      .attr('r', 10)
      .classed('enemy', true);
  }

  // update all enemies
  var updateEnemies = function(){
    for (var i = 0; i < enemies.length; i++){
      enemies[i].x = Math.floor(Math.random() * options.width);
      enemies[i].y = Math.floor(Math.random() * options.height);
    }
    d3.selectAll('.enemy')
      .transition()
      .duration(1000)
      .attr('cy', function(d){ return d.y;})
      .attr('cx', function(d){ return d.x;});
  }

  var Player = function() {
    this.x = options.width / 2;
    this.y = options.height / 2;
  }


  var svgPlayer = d3.select('.board').select('.player');

  var drag = d3.behavior.drag()
    .on('drag', function() {
      debugger;
      svgPlayer.attr('cx', d3.event.x).attr('cy', d3.event.y)
    });

  var dragging = function (d) {
    d3.select(this)
      .attr('cx', d.x = d3.event.dx)
      .attr('cy', d.y = d3.event.dy);
  }

  var generatePlayer = function() {
    player.push(new Player());
    d3.select('.board').selectAll('.player')
      .data(player)
      .enter().append('svg:circle')
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .attr('r', 25)
      .call(drag)
      .classed('player', true);
  }


  generateEnemies();

  generatePlayer();

  // functions to do interactions - moving player with mouse

  // functions to keep and reset score

  // some set interval function to execute steps in the game
  setInterval(updateEnemies, 2000);

})();
