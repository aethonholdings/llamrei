if (typeof(RGraph) == 'undefined') RGraph = {};

/**
 * The Fuel widget constructor
 *
 * @param object canvas The canvas object
 * @param int min       The minimum value
 * @param int max       The maximum value
 * @param int value     The indicated value
 */
RGraph.Fuel = function (id, min, max, value)
{
    // Get the canvas and context objects
    this.id                = id;
    this.canvas            = document.getElementById(id);
    this.context           = this.canvas.getContext ? this.canvas.getContext("2d") : null;
    this.canvas.__object__ = this;
    this.type              = 'fuel';
    this.isRGraph          = true;
    this.min               = min;
    this.max               = max;
    this.value             = value;
    this.angles            = {};
    this.currentValue      = null;


    /**
     * Compatibility with older browsers
     */
    RGraph.OldBrowserCompat(this.context);


    // Check for support
    if (!this.canvas) {
        alert('[FUEL] No canvas support');
        return;
    }

    /**
     * The funnel charts properties
     */
    this.properties =
    {
        'chart.colors':                   ['red'],
        'chart.needle.color':             'red',
        'chart.gutter.left':              5,
        'chart.gutter.right':             5,
        'chart.gutter.top':               5,
        'chart.gutter.bottom':            5,
        'chart.text.size':                10,
        'chart.text.color':               'black',
        'chart.text.font':                'Verdana',
        'chart.contextmenu':              null,
        'chart.annotatable':              false,
        'chart.annotate.color':           'black',
        'chart.zoom.factor':              1.5,
        'chart.zoom.fade.in':             true,
        'chart.zoom.fade.out':            true,
        'chart.zoom.factor':              1.5,
        'chart.zoom.fade.in':             true,
        'chart.zoom.fade.out':            true,
        'chart.zoom.hdir':                'right',
        'chart.zoom.vdir':                'down',
        'chart.zoom.frames':            25,
        'chart.zoom.delay':             16.666,
        'chart.zoom.shadow':              true,
        'chart.zoom.mode':                'canvas',
        'chart.zoom.thumbnail.width':     75,
        'chart.zoom.thumbnail.height':    75,
        'chart.zoom.background':          true,
        'chart.zoom.action':              'zoom',
        'chart.resizable':                false,
        'chart.resize.handle.background': null,
        'chart.icon':                     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAAEGElEQVRIS7VXSyhtYRT+jnfe5FEMjAwUBiQGHikzRWIkkgy8YyDK+xnJK5JCeZSUGKBMiAyYkMxMJAMpSfJ+2/d8695/33NunSPnHqt2Z5+91/9/' + '/' + '/et9a/1b8Pn56dmMBhg/IWDgwNoNzc38PHxkXtN0+Tiexp9eH18fIDj1Bj63N/fw8vLS/wsmcHoqKmXT09PuL29RVFREU5OTvTJ6UIAgioQ+vLe09MTb29v8PX1RWBgICYnJ+XXIqDRWXN0dJT3nIDsWlpadP+lpSWZlD4KmL/8/' + '/7+Ls/S09N1/7y8PISHh+sK/QssDJWcHEyGCnB1dRUDAwPIzMzUx5GpAnZ1dcXy8jK2trbM5j06OsLc3JzISx8q4OzsLOOsAq6treHg4AAeHh4WJbq7u0Nzc7P+PiYmBnt7ezg9PcXExAQCAgLg5OSEx8dHuLu7Wwfc3t7G/v6+yEcjO8rIROGKaWdnZ+jr6zMDjI6OxvT0tDzr6uqS2KtksspwZ2cHjY2NuqSUhnHmilUCraysmElaWloKJpQCjI2NRX5+Pl5eXr6WlCv08/MTEMVOZDH+Zzw4CdlfX1/rDHt7ezE1NQXGkcYEKi4ulkVKYlpLGouBs/JiaGgIZL25uSlecXFxohAz/ccAz8/P4e/vj7q6Ojw8PMje5DNRy94MQ0JCUFtbK2wqKipE+sHBQbi4uPwMQ86ak5ODxMREVFdXIywsDCUlJRJDXnZlmJqaip6eHuTm5kqikGlycjIyMjL+ZrY9JSUgMzQiIgINDQ2ypaqqqkCZWXHsnjQEHB8fR0pKigAxabq7uyWOlJNxtLukTJDs7GxUVlZKDNl5oqKi8Pr6+jOAIyMjiI+Pl5JGQG4F1Qy+LN7f3fiUdGZmBsHBwRgbG8Pw8LD01ba2NmlX0rTtnTQLCwvSjEdHR3FxcSExLCwsRGRkpBR9vePzeMDyw3bT1NT0XXLiT4a7u7s4Pj4GGzd7K8GCgoKEsRR8I4Cm6hwHXV5eiv62GAE5npMTmFuBTCkzmzT7qs5Q9TlW/o6ODlvwhCHPM5SVPZIxYzNeXFxEa2srvL29YTC2GI3aMm3Zeq6urv4LMC0tDRsbG1K8k5KS9DgS0IwhKVFjSsJA22r9/f0oKCgQdvPz83JEmZ2dlcpD9maSshow0KZnlO8Csx9yK3BLKCMJPpf2xGMigdi9WXooaWdn53dxdP+amhrZh4eHh1hfX5cTW319vZyBnp+ffzNkBWBmhYaGysB/j322oCckJCArK0uGMlsJ5ubmBoPxRiMzFlomjr2MGdne3i5ANILRJEtJt6ysTG8h9gDl4am8vFwSUWron1O9LulXIOqk9pWftfdSS40yyj5Uh101wPRryuR7R1ZMX/U1pfy5IF40xcgUnGAc9wsGYxsFhy87kwAAAABJRU5ErkJggg==',
        'chart.labels.full':             'F',
        'chart.labels.empty':            'E'
    }
}


/**
 * A setter
 *
 * @param name  string The name of the property to set
 * @param value mixed  The value of the property
 */
RGraph.Fuel.prototype.Set = function (name, value)
{
    this.properties[name.toLowerCase()] = value;
}


/**
 * A getter
 *
 * @param name  string The name of the property to get
 */
RGraph.Fuel.prototype.Get = function (name)
{
    return this.properties[name.toLowerCase()];
}


/**
 * The function you call to draw the bar chart
 */
RGraph.Fuel.prototype.Draw = function ()
{
    /**
     * Fire the onbeforedraw event
     */
    RGraph.FireCustomEvent(this, 'onbeforedraw');

    /**
     * Clear all of this canvases event handlers (the ones installed by RGraph)
     */
    RGraph.ClearEventListeners(this.id);

    /**
     * Set the current value
     */
    this.currentValue = this.value;

    /**
     * This is new in May 2011 and facilitates indiviual gutter settings,
     * eg chart.gutter.left
     */
    this.gutterLeft   = this.Get('chart.gutter.left');
    this.gutterRight  = this.Get('chart.gutter.right');
    this.gutterTop    = this.Get('chart.gutter.top');
    this.gutterBottom = this.Get('chart.gutter.bottom');

    /**
     * Get the center X and Y of the chart. This is the center of the needle bulb
     */
    this.centerx = ((this.canvas.width - this.gutterLeft - this.gutterRight) / 2) + this.gutterLeft;
    this.centery = this.canvas.height - 20 - this.gutterBottom

    /**
     * Work out the radius of the chart
     */
    this.radius = this.canvas.height - this.gutterTop - this.gutterBottom - 20;

    /**
     * The start and end angles of the chart
     */
    this.angles.start  = 4.71 - 0.5;
    this.angles.end    = 4.71 + 0.5;
    this.angles.needle = (((this.value - this.min) / (this.max - this.min)) * (this.angles.end - this.angles.start)) + this.angles.start;

    /**
     * Draw the fuel guage
     */
    this.DrawChart();


    /**
     * Draw the labels on the chart
     */
    this.DrawLabels();


    /**
     * Setup the context menu if required
     */
    if (this.Get('chart.contextmenu')) {
        RGraph.ShowContext(this);
    }

    /**
     * If the canvas is annotatable, do install the event handlers
     */
    if (this.Get('chart.annotatable')) {
        RGraph.Annotate(this);
    }

    /**
     * This bit shows the mini zoom window if requested
     */
    if (this.Get('chart.zoom.mode') == 'thumbnail'|| this.Get('chart.zoom.mode') == 'area') {
        RGraph.ShowZoomWindow(this);
    }


    /**
     * This function enables resizing
     */
    if (this.Get('chart.resizable')) {
        RGraph.AllowResizing(this);
    }

    /**
     * Fire the RGraph ondraw event
     */
    RGraph.FireCustomEvent(this, 'ondraw');
}


/**
 * This function actually draws the chart
 */
RGraph.Fuel.prototype.DrawChart = function ()
{
    var context   = this.context;
    var canvas    = this.canvas;

    /**
     * Draw the "Scale"
     */
    this.DrawScale();

    /**
     * Place the icon on the canvas
     */
    if (!RGraph.isIE8()) {
        this.DrawIcon();
    }

    /**
     * Draw the needle on to the chart
     */
    if (!this.Get('chart.icon') || RGraph.isIE8()) {
        this.DrawNeedle();
    }
}


/**
 * Draws the labels
 */
RGraph.Fuel.prototype.DrawLabels = function ()
{
    var radius = (this.radius - 20);
    this.context.fillStyle = this.Get('chart.text.color');

    // Draw the left label
    var y = this.centery - Math.sin(this.angles.start - 3.14) * (this.radius - 25);
    var x = this.centerx - Math.cos(this.angles.start - 3.14) * (this.radius - 25);
    RGraph.Text(this.context, this.Get('chart.text.font'), this.Get('chart.text.size'), x, y, this.Get('chart.labels.empty'), 'center', 'center');

    // Draw the right label
    var y = this.centery - Math.sin(this.angles.start - 3.14) * (this.radius - 25);
    var x = this.centerx + Math.cos(this.angles.start - 3.14) * (this.radius - 25);
    RGraph.Text(this.context, this.Get('chart.text.font'), this.Get('chart.text.size'), x, y, this.Get('chart.labels.full'), 'center', 'center');
}


/**
 * Draws the needle
 */
RGraph.Fuel.prototype.DrawNeedle = function ()
{
    // Draw the actual needle
    this.context.beginPath();
    this.context.lineWidth = 5;
    this.context.lineCap = 'round';
    this.context.strokeStyle = this.Get('chart.needle.color');

    /**
     * The angle for the needle
     */
    var angle = this.angles.needle;

    this.context.arc(this.centerx, this.centery, this.radius - 30, angle, angle + 0.0001, false);
    this.context.lineTo(this.centerx, this.centery);
    this.context.stroke();

    this.context.lineWidth = 1;

    // Create the gradient for the bulb
    var cx   = this.centerx + 10;
    var cy   = this.centery - 10

    var grad = this.context.createRadialGradient(cx, cy, 35, cx, cy, 0);
    grad.addColorStop(0, 'black');
    grad.addColorStop(1, '#eee');

    if (navigator.userAgent.indexOf('Firefox/6.0') > 0) {
        grad = this.context.createLinearGradient(cx + 10, cy - 10, cx - 10, cy + 10);
        grad.addColorStop(1, '#666');
        grad.addColorStop(0.5, '#ccc');
    }

    // Draw the bulb
    this.context.beginPath();
    this.context.fillStyle = grad;
    this.context.moveTo(this.centerx, this.centery);
    this.context.arc(this.centerx, this.centery, 20, 0, 6.28, 0);
    this.context.fill();
}


/**
 * Draws the "scale"
 */
RGraph.Fuel.prototype.DrawScale = function ()
{
    //First draw the fill background
    this.context.beginPath();
    this.context.strokeStyle = 'black';
    this.context.fillStyle = 'white';
    this.context.arc(this.centerx, this.centery, this.radius, this.angles.start, this.angles.end, false);
    this.context.arc(this.centerx, this.centery, this.radius - 10, this.angles.end, this.angles.start, true);
    this.context.closePath();
    this.context.stroke();
    this.context.fill();

    //First draw the fill itself
    var start = this.angles.start;
    var end   = this.angles.needle;

    this.context.beginPath();
    this.context.fillStyle = this.Get('chart.colors')[0];
    this.context.arc(this.centerx, this.centery, this.radius, start, end, false);
    this.context.arc(this.centerx, this.centery, this.radius - 10, end, start, true);
    this.context.closePath();
    //this.context.stroke();
    this.context.fill();

    // This draws the tickmarks
    for (var a = this.angles.start; a<=this.angles.end+0.01; a+=((this.angles.end - this.angles.start) / 5)) {
        this.context.beginPath();
        this.context.arc(this.centerx, this.centery, this.radius - 10, a, a + 0.0001, false);
        this.context.arc(this.centerx, this.centery, this.radius - 15, a + 0.0001, a, true);
        this.context.stroke();
    }
}


/**
 * Draws the icon
 */
RGraph.Fuel.prototype.DrawIcon = function ()
{
    var img = new Image();
    img.src = this.Get('chart.icon');
    img.__object__ = this;


    img.onload = function (e)
    {
        var img     = e.target;
        var obj     = img.__object__;
        var context = obj.context;

        context.drawImage(this,obj.centerx - (this.width / 2),obj.gutterTop + 30);

        obj.DrawNeedle();
    }
}
