(function(){
  // start slingin' some d3 here.

  // game options - class variables
  var options = {
    width: 700,
    height: 450,
    enemies: 30,
    padding: 20,
    radius: 5
  };

  // score/statistics
  var scores = {
    currentScore: 0,
    highScore: 0,
    collisions: 0
  }

  var enemies = [];
  var players = [];
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
  var updateEnemies = function() {
    asteroids.transition()
      .duration(1000)
      .attr('y', function(d){ return d.y = generatePosition(options.height);})
      .attr('x', function(d){ return d.x = generatePosition(options.width);});
  };

  var Player = function() {
    this.x = options.width / 2;
    this.y = options.height / 2;
  };

  var generatePlayer = function() {
    players.push(new Player());
    spaceship = gameBoard.selectAll('.player')
      .data(players);
    spaceship.enter().append('circle')
      .classed('player', true)
      .attr('r', options.radius)
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .call(drag);
  };

  var detectCollisions = function(){
    var playerObj = players[0];
    var collided = false;
    for (var i = 0; i < enemies.length; i++){
      var dx = playerObj.x - enemies[i].x;
      var dy = playerObj.y - enemies[i].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < options.radius * 2){
        collided = true;
      }
    }
    if (collided) {
      scores.collisions++;
      scores.currentScore = 0;
      console.log('collision!');
    }
  };

  var incrementScore = function() {
    if (scores.currentScore > scores.highScore){
      d3.selectAll('.high').select('span')
        .text(scores.highScore = scores.currentScore);
    }
    d3.selectAll('.current').select('span')
      .text(scores.currentScore++);
    d3.selectAll('.collisions').select('span')
      .text(scores.collisions);
  };


  generateEnemies();

  generatePlayer();

  // some set interval function to execute steps in the game
  setInterval(updateEnemies, 2000);
  setInterval(incrementScore, 100);
  setInterval(detectCollisions, 50);
})();
