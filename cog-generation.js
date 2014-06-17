$(function() {
    var spoke_angle_styles_template = Handlebars.compile($('#spoke-angle-styles-template').html());

    var angles = _.map( _.range(0, 360, 1), function(i) {
        return { degrees: i }
    });

    var spoke_angle_style_element = $('<style></style>');
    spoke_angle_style_element.html(
        spoke_angle_styles_template({angles: angles})
        );
    $('head').append(spoke_angle_style_element);
});


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
    return {degrees: degrees};
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
    new Cog({id: "c2", pos: {x: 22.25, y: 20}, direction: "clockwise", rotation_period: 10, num_spokes: 3, spoke_width: 5}).render();

});
