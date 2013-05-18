$(function() {
    var spoke_angle_styles_template = Handlebars.compile($('#spoke-angle-styles').html());

    var angles = _.map( _.range(0, 360, 5), function(i) {
        return { degrees: i }
    });

    var spoke_angle_style_element = $('<style></style>');
    spoke_angle_style_element.html(
        spoke_angle_styles_template({angles: angles})
        );
    $('head').append(spoke_angle_style_element);
});

$(function() {
    var style_template = Handlebars.compile($('#cog-styles').html());
    var element_template = Handlebars.compile($('#cog-elements').html());

    var make_cog = function(cog_id, radius, xpos, ypos, direction, rotation_period, spoke_width, num_spokes) {
        var template_params = {
            cog_id: cog_id,
            radius: radius,
            diameter: 2 * radius,
            xpos: xpos,
            ypos: ypos,
            direction: direction,
            rotation_period: rotation_period,
            spoke_width: spoke_width,
            half_spoke_width: spoke_width / 2,
        };

        // Create cog style
        var style_element = $('<style></style>');
        style_element.html(
            style_template(template_params)
            );
        $('head').append(style_element);

        // Create cog element
        var spoke_angles = _.range(0, 180, 180 / num_spokes);
        var spoke_objects = _.map(spoke_angles, function(degrees) {
            return {degrees: degrees};
        });
        var div_element = $('<div>');
        div_element.html(
            element_template({
                cog_id: cog_id,
                spokes: spoke_objects,
            })
        );
        $('body').append(div_element);
    };

    make_cog("c1", 10, 20, 50, "clockwise", 10, 23, 4);
    make_cog("c2", 10, 42, 42, "anticlockwise", 10, 23, 4);
});
