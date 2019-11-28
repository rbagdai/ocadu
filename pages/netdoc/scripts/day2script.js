window.onload = function() {

  //Donut chart – Social Media Use Hours

  var chart = new Chartist.Pie('.sm-chart-main', {
    series: [24.34210526, 42.76315789, 29.60526316, 3.289473684],
    labels: ['Facebook (1.85)', 'Insta (3.25)', 'WhatsApp (2.25)', 'SnapChat (0.25)']
  }, {
    donut: true,
    showLabel: true
  });

  chart.on('draw', function(data) {
    if (data.type === 'slice') {
      // Get the total path length in order to use for dash array animation
      var pathLength = data.element._node.getTotalLength();

      // Set a dasharray that matches the path length as prerequisite to animate dashoffset
      data.element.attr({
        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
      });

      // Create animation definition while also assigning an ID to the animation for later sync usage
      var animationDefinition = {
        'stroke-dashoffset': {
          id: 'anim' + data.index,
          dur: 1000,
          from: -pathLength + 'px',
          to: '0px',
          easing: Chartist.Svg.Easing.easeOutQuint,
          // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
          fill: 'freeze'
        }
      };

      // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
      if (data.index !== 0) {
        animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
      }

      // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
      data.element.attr({
        'stroke-dashoffset': -pathLength + 'px'
      });

      // We can't use guided mode as the animations need to rely on setting begin manually
      // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
      data.element.animate(animationDefinition, false);
    }
  });

  // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
  chart.on('created', function() {
    if (window.__anim21278907124) {
      clearTimeout(window.__anim21278907124);
      window.__anim21278907124 = null;
    }
    window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
  });

  //Bar Chart Social Media App Battery Use

  new Chartist.Bar('.sm-chart-battuse', {
    labels: ['Facebook (7%/297mAh)', 'Insta (8%/264mAh)', 'WhatsApp (29%/957mAh)', 'SnapChat (2%/66mAh)'],
    series: [297, 264, 957, 66]
  }, {
    distributeSeries: true
  });

}
