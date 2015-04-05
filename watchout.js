(function(){
  // start slingin' some d3 here.

  // game options - class variables
  var options = {
    width: 700,
    height: 450,
    enemies: 30,
    padding: 20,
    radius: 14
  };

  // score/statistics
  var scores = {
    currentScore: 0,
    highScore: 0,
    collisions: 0
  }

  var enemies = [];
  var players = [];
  var hitEnemies = [];
  var hitX = [];
  var hitY = [];
  var asteroids, spaceship;

  // create board
  var gameBoard = d3.select('body').append('svg')
    .attr('width', options.width)
    .attr('height', options.height)
    .classed('board', true);

  var generatePosition = function(dimension) {
    return Math.max(Math.floor(Math.random() * dimension) - (options.radius + 5), options.radius + 5);
  };

  var dragmove = function(d) {
    d3.select(this)
      .attr("cx", d.x = Math.max(options.radius, Math.min(options.width - options.radius, d3.event.x)))
      .attr("cy", d.y = Math.max(options.radius, Math.min(options.height - options.radius, d3.event.y)));
  }

  var drag = d3.behavior.drag()
    .on('drag', dragmove);

  var generateEnemies = function(){
    for (var i = 0; i < options.enemies; i++){
      enemies.push({
        id: i,
        x: generatePosition(options.width),
        y: generatePosition(options.height),
      });
    }
    asteroids = gameBoard.selectAll('.enemy')
      .data(enemies);
    asteroids.enter().append('image')
      .classed('enemy', true)
      .attr('xlink:href', 'asteroid.png')
      .attr('height', 2 * options.radius)
      .attr('width', 2 * options.radius)
      .attr('y', function(d){ return d.y;})
      .attr('x', function(d){ return d.x;});
  };

  // update all enemies
  var update = function(element) {
    element.transition().duration(2000).ease('cubic-in-out')
      .attr('y', function(d){ return d.y = generatePosition(options.height);})
      .attr('x', function(d){ return d.x = generatePosition(options.width);})
      .each('end', function() { update(d3.select(this)); });
  };

  var generatePlayer = function() {
    players.push({
      x: options.width / 2,
      y: options.height / 2
    });
    spaceship = gameBoard.selectAll('.player').data(players);
    spaceship.enter().append('circle').classed('player', true)
      .attr('r', options.radius)
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .call(drag);
  };

  var lastCollision = false;

  var detectCollisions = function(){
    var playerObj = players[0];
    var collision = false;

    for (var i = 0; i < enemies.length; i++){
      var dx = playerObj.x - (enemies[i].x + options.radius);
      var dy = playerObj.y - (enemies[i].y + options.radius);
      var distance = Math.sqrt((dx * dx) + (dy * dy));
      if (distance < options.radius * 2){
        collision = true;
      }
    }
    if (lastCollision !== collision) {
      lastCollision = collision;
      if (collision){
        scores.collisions++;
        scores.currentScore = 0;
      }
    }
  };

  var incrementScore = function() {
    if (scores.currentScore > scores.highScore){
      d3.selectAll('.high span').text(scores.highScore = scores.currentScore);
    }
    d3.selectAll('.current span').text(scores.currentScore++);
    d3.selectAll('.collisions span').text(scores.collisions);
  };

  generateEnemies();
  generatePlayer();

  // some set interval function to execute steps in the game
  update(asteroids);
  setInterval(incrementScore, 100);
  d3.timer(detectCollisions);
})();
