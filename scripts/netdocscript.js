window.onload = function() {
  //Section 1: TimeLine Social Media

  var container = am4core.create("timelineSM", am4core.Container);
  container.width = am4core.percent(100);
  container.height = am4core.percent(100);

  var interfaceColors = new am4core.InterfaceColorSet();
  var colorSet = new am4core.ColorSet();

  var chart = container.createChild(am4plugins_timeline.CurveChart);

  chart.data = [{
    "start": "2019-11-27 11:00",
    "end": "2019-11-27 22:30",
    "task": "Facebook"
  }, {
    "start": "2019-11-27 11:00",
    "end": "2019-11-28 01:00",
    "task": "Instagram",
    "bulletf1": false
  }, {
    "start": "2019-11-27 11:30",
    "end": "2019-11-28 01:30",
    "task": "WhatsApp"
  }, {
    "start": "2019-11-27 16:00",
    "end": "2019-11-27 20:00",
    "task": "Snapchat"
  }, {
    "start": "2019-11-27 13:00",
    "end": "2019-11-27 17:00",
    "task": "Assignments",
    "bulletf2": false
  }, {
    "task": ""
  }].reverse();

  chart.dateFormatter.dateFormat = "yyyy-MM-dd hh:mm";
  chart.dateFormatter.inputDateFormat = "yyyy-MM-dd hh:mm";
  chart.dy = 90;
  chart.maskBullets = false;

  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "task";
  categoryAxis.renderer.labels.template.paddingRight = 25;
  categoryAxis.renderer.minGridDistance = 10;
  categoryAxis.renderer.innerRadius = 0;
  categoryAxis.renderer.radius = 100;
  categoryAxis.renderer.grid.template.location = 1;

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 70;
  dateAxis.min = new Date("2019-11-27 09:00").getTime();
  dateAxis.max = new Date("2019-11-28 02:00").getTime();

  dateAxis.baseInterval = {
    count: 1,
    timeUnit: "minute"
  };
  dateAxis.startLocation = -0.5;

  dateAxis.renderer.points = [{
    x: -400,
    y: 0
  }, {
    x: -250,
    y: 0
  }, {
    x: 0,
    y: 60
  }, {
    x: 250,
    y: 0
  }, {
    x: 400,
    y: 0
  }];
  dateAxis.renderer.autoScale = false;
  dateAxis.renderer.polyspline.tensionX = 0.8;
  dateAxis.renderer.tooltipLocation = 0;
  dateAxis.renderer.grid.template.disabled = true;
  dateAxis.renderer.line.strokeDasharray = "1,4";
  dateAxis.renderer.line.strokeOpacity = 0.7;
  dateAxis.tooltip.background.fillOpacity = 0.2;
  dateAxis.tooltip.background.cornerRadius = 5;
  dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
  dateAxis.tooltip.label.paddingTop = 7;

  var labelTemplate = dateAxis.renderer.labels.template;
  labelTemplate.verticalCenter = "middle";
  labelTemplate.fillOpacity = 0.7;
  labelTemplate.background.fill = interfaceColors.getFor("background");
  labelTemplate.background.fillOpacity = 1;
  labelTemplate.padding(7, 7, 7, 7);

  var series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
  series.columns.template.height = am4core.percent(15);
  series.columns.template.tooltipText = "{categoryX}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

  series.dataFields.openDateX = "start";
  series.dataFields.dateX = "end";
  series.dataFields.categoryY = "task";
  series.columns.template.propertyFields.fill = "color"; // get color from data
  series.columns.template.propertyFields.stroke = "color";
  series.columns.template.strokeOpacity = 0;

  series.columns.template.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index * 3);
  })

  var flagBullet1 = new am4plugins_bullets.FlagBullet();
  series.bullets.push(flagBullet1);
  flagBullet1.disabled = true;
  flagBullet1.propertyFields.disabled = "bulletf1";
  flagBullet1.locationX = 1;
  flagBullet1.label.text = "start";

  var flagBullet2 = new am4plugins_bullets.FlagBullet();
  series.bullets.push(flagBullet2);
  flagBullet2.disabled = true;
  flagBullet2.propertyFields.disabled = "bulletf2";
  flagBullet2.locationX = 0;
  flagBullet2.background.fill = interfaceColors.getFor("background");
  flagBullet2.label.text = "end";

  var bullet = new am4charts.CircleBullet();
  series.bullets.push(bullet);
  bullet.circle.radius = 3;
  bullet.circle.strokeOpacity = 0;
  bullet.locationX = 0;

  bullet.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index * 3);
  })

  var bullet2 = new am4charts.CircleBullet();
  series.bullets.push(bullet2);
  bullet2.circle.radius = 3;
  bullet2.circle.strokeOpacity = 0;
  bullet2.propertyFields.fill = "color";
  bullet2.locationX = 1;

  bullet2.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index * 3);
  })

  chart.scrollbarX = new am4core.Scrollbar();
  chart.scrollbarX.align = "center"
  chart.scrollbarX.width = 800;
  chart.scrollbarX.parent = chart.bottomAxesContainer;
  chart.scrollbarX.dy = -90;
  chart.scrollbarX.opacity = 0.4;

  var cursor = new am4plugins_timeline.CurveCursor();
  chart.cursor = cursor;
  cursor.xAxis = dateAxis;
  cursor.yAxis = categoryAxis;
  cursor.lineY.disabled = true;
  cursor.lineX.strokeDasharray = "1,4";
  cursor.lineX.strokeOpacity = 1;

  dateAxis.renderer.tooltipLocation2 = 0;
  categoryAxis.cursorTooltipEnabled = false;


  /// clock
  var clock = container.createChild(am4charts.GaugeChart);
  clock.toBack();

  clock.radius = 120;
  clock.dy = -100;
  clock.startAngle = -90;
  clock.endAngle = 270;

  var axis = clock.xAxes.push(new am4charts.ValueAxis());
  axis.min = 0;
  axis.max = 12;
  axis.strictMinMax = true;

  axis.renderer.line.strokeWidth = 1;
  axis.renderer.line.strokeOpacity = 0.5;
  axis.renderer.line.strokeDasharray = "1,4";
  axis.renderer.minLabelPosition = 0.05; // hides 0 label
  axis.renderer.inside = true;
  axis.renderer.labels.template.radius = 30;
  axis.renderer.grid.template.disabled = true;
  axis.renderer.ticks.template.length = 12;
  axis.renderer.ticks.template.strokeOpacity = 1;

  // serves as a clock face fill
  var range = axis.axisRanges.create();
  range.value = 0;
  range.endValue = 12;
  range.grid.visible = false;
  range.tick.visible = false;
  range.label.visible = false;

  var axisFill = range.axisFill;

  // hands
  var hourHand = clock.hands.push(new am4charts.ClockHand());
  hourHand.radius = am4core.percent(60);
  hourHand.startWidth = 5;
  hourHand.endWidth = 5;
  hourHand.rotationDirection = "clockWise";
  hourHand.pin.radius = 8;
  hourHand.zIndex = 1;

  var minutesHand = clock.hands.push(new am4charts.ClockHand());
  minutesHand.rotationDirection = "clockWise";
  minutesHand.startWidth = 3;
  minutesHand.endWidth = 3;
  minutesHand.radius = am4core.percent(78);
  minutesHand.zIndex = 2;

  chart.cursor.events.on("cursorpositionchanged", function(event) {
    var value = dateAxis.positionToValue(event.target.xPosition)
    var date = new Date(value);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // set hours
    hourHand.showValue(hours + minutes / 60, 0);
    // set minutes
    minutesHand.showValue(12 * minutes / 60, 0);
  })


  //Chart 2: Pie Chart Social Media Comparison During Seperate Hours of Day SECTION 2

  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    /**
     * Chart design taken from Samsung health app
     */

    var chart = am4core.create("comparisonSM", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingBottom = 30;

    chart.data = [{
      "name": "Facebook: 1hrs 30mins",
      "steps": 150,
      "href": "https://www.svgrepo.com/download/494304/facebook-rounded.svg"
    }, {
      "name": "Instagram: 4hrs 15mins",
      "steps": 255,
      "href": "https://www.svgrepo.com/download/494313/instagram-rounded.svg"
    }, {
      "name": "WhatsApp: 3hrs 3mins",
      "steps": 183,
      "href": "https://www.svgrepo.com/download/446011/snapchat.svg"
    }, {
      "name": "Snapchat: 18mins",
      "steps": 18,
      "href": "https://www.svgrepo.com/download/204949/whatsapp.svg"
    }, {
      "name": "Assignments: 45 minutes",
      "steps": 45,
      "href": "https://www.svgrepo.com/download/416619/document-ui-description.svg"
    }];

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.dy = 35;
    categoryAxis.renderer.tooltip.dy = 35;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 0.3;
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;

    var series = chart.series.push(new am4charts.ColumnSeries);
    series.dataFields.valueY = "steps";
    series.dataFields.categoryX = "name";
    series.tooltipText = "{valueY.value}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.dy = -6;
    series.columnsContainer.zIndex = 100;

    var columnTemplate = series.columns.template;
    columnTemplate.width = am4core.percent(50);
    columnTemplate.maxWidth = 66;
    columnTemplate.column.cornerRadius(60, 60, 10, 10);
    columnTemplate.strokeOpacity = 0;

    series.heatRules.push({
      target: columnTemplate,
      property: "fill",
      dataField: "valueY",
      min: am4core.color("#f03048"),
      max: am4core.color("#0078f0")
    });
    series.mainContainer.mask = undefined;

    //#e5dc36 #5faa46

    var cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = "none";

    var bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 30;
    bullet.valign = "bottom";
    bullet.align = "center";
    bullet.isMeasured = true;
    bullet.mouseEnabled = false;
    bullet.verticalCenter = "bottom";
    bullet.interactionsEnabled = false;

    var hoverState = bullet.states.create("hover");
    var outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add("radius", function(radius, target) {
      var circleBullet = target.parent;
      return circleBullet.circle.pixelRadius + 10;
    })

    var image = bullet.createChild(am4core.Image);
    image.width = 60;
    image.height = 60;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
    image.propertyFields.href = "href";

    image.adapter.add("mask", function(mask, target) {
      var circleBullet = target.parent;
      return circleBullet.circle;
    })

    var previousBullet;
    chart.cursor.events.on("cursorpositionchanged", function(event) {
      var dataItem = series.tooltipDataItem;

      if (dataItem.column) {
        var bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet != bullet) {
          previousBullet.isHover = false;
        }

        if (previousBullet != bullet) {

          var hs = bullet.states.getKey("hover");
          hs.properties.dy = -bullet.parent.pixelHeight + 30;
          bullet.isHover = true;

          previousBullet = bullet;
        }
      }
    })

  }); // end am4core.ready()


  //Chart 1 for Hourly Social Media use SECTION 2

  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("hourlycomparisonSM1", am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "minutes";
    pieSeries.dataFields.category = "smapplication";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [{
        "property": "cursor",
        "value": "pointer"
      }];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [{
      "smapplication": "FB",
      "minutes": 45
    }, {
      "smapplication": "Insta",
      "minutes": 30
    }, {
      "smapplication": "WA",
      "minutes": 78
    }, {
      "smapplication": "SC",
      "minutes": 12
    }, {
      "smapplication": "Assn",
      "minutes": 15
    }];

  }); // end am4core.ready()

  //Chart 2 for Hourly Social Media use SECTION 2

  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("hourlycomparisonSM2", am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "minutes";
    pieSeries.dataFields.category = "smapplication";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [{
        "property": "cursor",
        "value": "pointer"
      }];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [{
      "smapplication": "FB",
      "minutes": 45
    }, {
      "smapplication": "Insta",
      "minutes": 45
    }, {
      "smapplication": "WA",
      "minutes": 30
    }, {
      "smapplication": "SC",
      "minutes": 6
    }, {
      "smapplication": "Assn",
      "minutes": 30
    }, {
      "smapplication": "OA",
      "minutes": 30
    }];

  }); // end am4core.ready()


  //Chart 3 for Hourly Social Media use SECTION 2

  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("hourlycomparisonSM3", am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "minutes";
    pieSeries.dataFields.category = "smapplication";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [{
        "property": "cursor",
        "value": "pointer"
      }];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [{
      "smapplication": "FB",
      "minutes": 60
    }, {
      "smapplication": "Insta",
      "minutes": 30
    }, {
      "smapplication": "WA",
      "minutes": 15
    }, {
      "smapplication": "OA",
      "minutes": 75
    }];

  }); // end am4core.ready()

  //}

  //Chart 4 for Hourly Social Media use SECTION 2

  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("hourlycomparisonSM4", am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "minutes";
    pieSeries.dataFields.category = "smapplication";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [{
        "property": "cursor",
        "value": "pointer"
      }];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [{
      "smapplication": "Insta",
      "minutes": 75
    }, {
      "smapplication": "WA",
      "minutes": 30
    }];

  }); // end am4core.ready()

  //}

  //Chart 5 for Hourly Social Media use SECTION 2

  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("hourlycomparisonSM5", am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "minutes";
    pieSeries.dataFields.category = "smapplication";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [{
        "property": "cursor",
        "value": "pointer"
      }];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [{
      "smapplication": "Insta",
      "minutes": 75
    }, {
      "smapplication": "WA",
      "minutes": 30
    }];

  }); // end am4core.ready()

  //}

  // Chart 6: Battery & Electricity Usage Section 3

  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("battelecuseSM", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [{
      "socialMediaApp": "Facebook (5%)",
      "batteryUsage": 165
    }, {
      "socialMediaApp": "Instagram (7%)",
      "batteryUsage": 231
    }, {
      "socialMediaApp": "WhatsApp (16%)",
      "batteryUsage": 528
    }, {
      "socialMediaApp": "Snapchat (2%)",
      "batteryUsage": 66
    }];

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "socialMediaApp";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "batteryUsage";
    series.dataFields.categoryX = "socialMediaApp";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

  }); // end am4core.ready()



  // Chart 7: Battery & Electricity Usage Charing Time Section 3

  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("battelecuseSM2", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [{
      "socialMediaApp": "Facebook (5%)",
      "batteryUsage": 3.3
    }, {
      "socialMediaApp": "Instagram (7%)",
      "batteryUsage": 4.62
    }, {
      "socialMediaApp": "WhatsApp (16%)",
      "batteryUsage": 10.56
    }, {
      "socialMediaApp": "Snapchat (2%)",
      "batteryUsage": 1.32
    }];

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "socialMediaApp";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "batteryUsage";
    series.dataFields.categoryX = "socialMediaApp";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

  }); // end am4core.ready()



}
