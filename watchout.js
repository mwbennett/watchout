(function(){
  // start slingin' some d3 here.

  // game options - class variables
    // window/board dimensions
    // enemies/players
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

  // create board
  var gameBoard = d3.select('body')
    .append('svg:svg')
    .attr('width', options.width)
    .attr('height', options.height)
    .classed('board', true);

  // var x = d3.scale.linear().domain([0,100]).range([0,options.width]);
  // var y = d3.scale.linear().domain([0,100]).range([0,options.height]);
  // create enemies and player

  var Enemy = function(id){
    this.x = Math.floor(Math.random() * options.width);
    this.y = Math.floor(Math.random() * options.height);
    this.id = id;
  };

  Enemy.prototype.move = function(){
    var currentX = this.x;
    var currentY = this.y;
    var newX = Math.floor(Math.random() * options.width);
    var newY = Math.floor(Math.random() * options.height);
  };

  var enemies = [];

  var generateEnemies = function(){
    for (var i = 0; i < options.enemies; i++){
      var enemy = new Enemy(i);
      enemies.push(enemy);
    }
    // debugger;
    d3.select('.board').selectAll('svg')
      .data(enemies)
      .enter().append('svg:circle')
      .attr('cy', function(d){ return d.y;})
      .attr('cx', function(d){ return d.x;})
      .attr('r', 10)
      .classed('enemy', true);
  }

  generateEnemies();

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

  // functions to do interactions - moving player with mouse

  // function to move all the asteroids

  // functions to keep and reset score

  // some set interval function to execute steps in the game
  setInterval(updateEnemies, 2000);



})();
