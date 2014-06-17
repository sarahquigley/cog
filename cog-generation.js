// Args: object with keys id, pos, direction, rotation_period, num_spokes, spoke_width

var Cog = function(args){
  this.id = args.id;
  this.pos = args.pos;
  this.direction = args.direction;
  this.rotation_period = args.rotation_period;
  this.num_spokes = args.num_spokes;
  this.radius = Math.abs(args.spoke_width / (2 * Math.sin(Math.PI/(args.num_spokes * 2))));
  this.diameter = this.radius * 2;
  this.spoke_width = (args.spoke_width / this.diameter) * 100;
  this.half_spoke_width = this.spoke_width / 2;
  this.spoke_angles = _.map(_.range(0, 360, 360 / args.num_spokes), function(degrees) {
    return {degrees: Math.round(degrees)};
  });
}

Cog.prototype = {
  templates: {
    styles: Handlebars.compile($('#cog-styles-template').html()),
    elements: Handlebars.compile($('#cog-elements-template').html())
  },

  renderStyles: function(){
    var $el = $('<style></style>');
    $el.html(
        this.templates.styles(this)
        );
    $('head').append($el);
  },

  renderElements: function(){
    var $el = $('<div>');
    $el.html(
        this.templates.elements({
          id: this.id,
          spokes: this.spoke_angles,
        })
        );
    $('#canvas').append($el);
  },

  render: function(){
    this.renderStyles();
    this.renderElements();
  }
}

$(function() {
  var initial_args = {
    pos: {x: 0, y: 50},
    rotation_period: 10,
    spoke_width: _.random(2, 7)
  };

  var cogs = [];

  _.each(_.range(20), function(n){

    var args = _.extend(initial_args, {
      id: "c" + n,
      direction: n%2 === 0 ? "clockwise" : "anticlockwise",
      num_spokes: _.random(3, 15)
    });

    var cog = new Cog(args);
    if(!_.isEmpty(cogs)){
      var prev_cog = _.last(cogs);
      var hypotenuse = prev_cog.radius + (prev_cog.radius * 0.15) + cog.radius + (cog.radius * 0.15);
      var angle = _.random(-Math.PI/4, Math.PI/4);
      var opposite = hypotenuse * Math.sin(angle);
      var adjacent = hypotenuse * Math.cos(angle);
      cog.pos = {
        x: prev_cog.pos.x + adjacent,
        y: prev_cog.pos.y + opposite
      }
    } else {
    }
    cogs.push(cog);
    cog.render();
  });

  var spoke_angles = [];
  _.each(cogs, function(cog){
    spoke_angles = spoke_angles.concat(cog.spoke_angles);
  });

  console.log(spoke_angles);

  var spoke_angle_styles_template = Handlebars.compile($('#spoke-angle-styles-template').html());

  var $el = $('<style></style>');
  $el.html(
      spoke_angle_styles_template({angles: spoke_angles})
      );
  $('head').append($el);
  
});
