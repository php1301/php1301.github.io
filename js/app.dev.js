"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global bowser */
/* global $ */
/* global _ */
/* global TweenMax */
/* global TimelineMax */
/* global Stats */
/* global dat */
/* global PIXI */
/* global Power0 */
/* global Power1 */
/* global THREE */
/* global PubSub */

console.clear();
PIXI.utils.skipHello();

var msg = "\n.::::    .::\n  .::  .::  \n  .::  .::  \n  .::.::    \n  .::  .::  \n  .::  .::  \n.::::    .::\n\nHi, glad to see you here.\nAre you a Web dev? \nMay I know any of your contact method?\nMy Github, Codepen, LinkedIn & Email are in the last slide.\nIf possible, let's keep in touch!\n\nPhuc\n";
console.log(msg);

var stats = void 0,
    gui = void 0,
    earth = void 0,
    eclipse = void 0,
    board = void 0,
    loading = void 0,
    sound = void 0,
    message = void 0,
    winH = void 0,
    winW = void 0,
    resized = void 0,
    mouseX = void 0,
    mouseY = void 0;
var $win = $(window);
var $doc = $(document);
var $body = $('body');

var isMobile = bowser.mobile || bowser.tablet;
var isIE = bowser.msie || bowser.msedge;
var amount = isMobile ? 700 : 1600;
var ringSize = 230;
var appW = 2016;
var appH = 864;
var boardW = 800;
var boardH = 600;
var ratio = appW / appH;
var hasStats = false;
var hasGui = false;
var assets = {
    star: "images/star1.png",
    skylight: "images/skylight.png",
    sky: "images/sky.png",
    rock: "images/rock.png",
    nebula: "images/nebula.png",
    moon: "images/moon.png",
    moon2: "images/moon2.png",
    moonlight: "images/moonlight.png",
    hill: "images/hill.png",
    cloud: "images/cloud.png",
    man: "images/man.json",
    bgm: "audios/bgm1.mp3"
};

var layers = {
    moonCtrl: new PIXI.DisplayGroup(16, false),
    cloud: new PIXI.DisplayGroup(20, false),
    rock: new PIXI.DisplayGroup(19, false),
    man: new PIXI.DisplayGroup(17, false),
    hill: new PIXI.DisplayGroup(15, false),
    moon: new PIXI.DisplayGroup(7, false),
    moon2: new PIXI.DisplayGroup(8, false),
    star: new PIXI.DisplayGroup(13, false),
    star2: new PIXI.DisplayGroup(9, false),
    moonlight: new PIXI.DisplayGroup(5, false),
    nebula: new PIXI.DisplayGroup(3, false),
    skylight: new PIXI.DisplayGroup(2, false),
    sky: new PIXI.DisplayGroup(1, false)
};

var delta = {
    sky: {
        alpha: {
            from: 1,
            to: 0
        },
        tint: {
            from: 0xFFFFFF,
            to: 0x000000
        },
        speed: {
            go: 1,
            back: 1
        },
        delay: {
            go: 0,
            back: 0
        }
    },
    skylight: {
        alpha: {
            from: 1,
            to: 0
        },
        tint: {
            from: 0xFFFFFF,
            to: 0x000000
        },
        speed: {
            go: 1,
            back: 1
        },
        delay: {
            go: 0,
            back: 0
        }
    },
    nebula: {
        alpha: {
            from: 1,
            to: 0
        },
        tint: {
            from: 0xFFFFFF,
            to: 0x000000
        },
        speed: {
            go: 1.5,
            back: 1
        },
        delay: {
            go: 0,
            back: 0
        }
    },
    moonlight: {
        alpha: {
            from: 1,
            to: 0
        },
        tint: {
            from: 0xFFFFFF,
            to: 0x000000
        },
        speed: {
            go: 2,
            back: 1
        },
        delay: {
            go: 0,
            back: 0
        }
    },
    moon: {
        alpha: {
            from: 1,
            to: 0
        },
        tint: {
            from: 0xFFFFFF,
            to: 0xffffff
        },
        speed: {
            go: 2,
            back: 1
        },
        delay: {
            go: 0.5,
            back: 0
        }
    },
    moon2: {
        alpha: {
            from: 0,
            to: 1
        },
        tint: {
            from: 0xFFFFFF,
            to: 0xFFFFFF
        },
        speed: {
            go: 2,
            back: 1
        },
        delay: {
            go: 0.5,
            back: 0
        }
    },
    filterDark: {
        alpha: {
            from: 0,
            to: 0.8
        },
        tint: {
            from: 0xFFFFFF,
            to: 0xFFFFFF
        },
        speed: {
            go: 1.5,
            back: 1
        },
        delay: {
            go: 0.5,
            back: 0
        }
    }
};

function createStats() {
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.domElement.id = 'stats';
    document.body.appendChild(stats.domElement);
}

function createGui() {
    gui = new dat.GUI({
        autoPlace: false
    });
    gui.domElement.id = 'gui';
    document.body.appendChild(gui.domElement);
    for (var i in delta) {
        var _f = gui.addFolder(i);
        var obj = delta[i];
        _f.add(obj.alpha, 'from', 0, 1).name('alpha from').step(0.1);
        _f.add(obj.alpha, 'to', 0, 1).name('alpha to').step(0.1);
        _f.add(obj.speed, 'go', 0, 3).name('speed go').step(0.1);
        _f.add(obj.speed, 'back', 0, 3).name('speed back').step(0.1);
        _f.add(obj.delay, 'go', 0, 3).name('delay go').step(0.1);
        _f.add(obj.delay, 'back', 0, 3).name('delay back').step(0.1);
    }

    var f = gui.addFolder('Board');
    f.add(board.uniforms.speed, 'value', 0, 50).name('speed').step(0.1);
    f.add(board.uniforms.frequency, 'value', 0, 50).name('frequency').step(0.1);
    f.add(board.uniforms.amplitude, 'value', 0, 1000).name('amplitude').step(10);
    f.add(board.duration, 'value', 0, 5).name('duration').step(0.1);
    gui.close();
}

function createApp() {
    PIXI.loader.add(assets.star).add(assets.sky).add(assets.skylight).add(assets.rock).add(assets.nebula).add(assets.moonlight).add(assets.moon).add(assets.moon2).add(assets.hill).add(assets.cloud).add(assets.man).add(assets.bgm).load(function (loader, resources) {
        earth = new Earth();
        board = new Board();
        eclipse = new Eclipse();

        message = new Message();
        hasGui && createGui();
        initShare();
        onResize();
        if (!isIE) {
            sound = new Sound();
        }
        loading.hide();
        if (!isIE) {
            checkFps();
        }
    });

    PIXI.loader.onProgress.add(function (e) {
        loading.update(~~e.progress);
    });
}

function onResize() {
    winW = window.innerWidth;
    winH = window.innerHeight;

    var w = void 0,
        h = void 0,
        top = void 0,
        left = void 0,
        scale = void 0;

    if (winW / winH >= ratio) {
        // wider than canvas
        w = winW;
        h = winW / ratio;
        scale = h / appH;
        top = (winH - h) / 2;
        left = 0;
    } else {
        w = winH * ratio;
        h = winH;
        scale = h / appH;
        top = 0;
        left = (winW - w) / 2;
    }

    PubSub.publish('resize', {
        css: "scale(" + scale + ") translateX(-50%)"
    });
}

function checkFps() {
    var averFps = 0;
    var count = 0;

    var timer = setInterval(function () {
        if (typeof earth.fps !== 'undefined') {
            if (averFps === 0) {
                averFps = earth.fps;
            } else {
                averFps = (averFps + earth.fps) / 2;
            }

            count++;
        }

        if (count >= 100) {
            clearInterval(timer);
            // console.log(averFps)
            if (averFps < 50) {
                message.slow(Math.round(averFps));
            }
        }
    }, 100);
}

function initShare() {
    $('#pinterest').on('click', function (e) {
        e.preventDefault();
        var url = "http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fkelvinh.studio&media=http%3A%2F%2Fkelvinh.studio%2Fimages%2Fcapture_1024.jpg&description=Kelvin%20Hung's%20portfolio";
        var setting = 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=800, height=680';

        window.open(url, 'targetWindow', setting);
    });
}

var Eclipse = function () {
    function Eclipse() {
        _classCallCheck(this, Eclipse);

        this.active = false;
        this.tweens = [];
    }

    _createClass(Eclipse, [{
        key: "show",
        value: function show() {
            this.active = true;
            for (var i = 0; i < this.tweens.length; i++) {
                this.tweens[i].kill();
            }
            earth.body.stop();

            if (earth.headSprites[0].textureCacheIds[0] !== 'headglasses_1.png') {
                earth.headSprites.reverse();
            }
            earth.head.play();
            earth.head.onComplete = function () {};

            earth.cloud_top1.renderable = true;
            earth.cloud_top2.renderable = true;
            earth.cloud_down1.renderable = true;
            earth.cloud_down2.renderable = true;

            this.tweens.push(TweenMax.to([earth.cloud_top1, earth.cloud_down1], 1, {
                pixi: {
                    scale: .88
                }
            }));

            this.tweens.push(TweenMax.to([earth.cloud_top2, earth.cloud_down2], 1.5, {
                pixi: {
                    scale: .96
                }
            }));

            for (var k in delta) {
                if (typeof earth[k] !== 'undefined') {
                    this.tweens.push(TweenMax.to(earth[k], delta[k].speed.go, {
                        delay: delta[k].delay.go,
                        colorProps: {
                            tint: delta[k].tint.to,
                            format: "number"
                        },
                        pixi: {
                            alpha: delta[k].alpha.to
                        }
                    }));
                }
            }

            for (var _i = 0; _i < earth.stars.length; _i++) {
                this.tweens.push(TweenMax.to(earth.stars[_i], 3, {
                    scaleDelta: .7
                }));
            }
        }
    }, {
        key: "hide",
        value: function hide() {
            this.active = false;
            for (var i = 0; i < this.tweens.length; i++) {
                this.tweens[i].kill();
            }

            earth.body.play();
            if (earth.headSprites[0].textureCacheIds[0] !== 'headglasses_7.png') {
                earth.headSprites.reverse();
            }
            earth.head.gotoAndPlay(0);
            earth.head.onComplete = function () {
                earth.headSprites.reverse();
                earth.head.gotoAndStop(0);
                earth.head.onComplete = function () {};
            };

            this.tweens.push(TweenMax.to([earth.cloud_top1, earth.cloud_down1], 1.2, {
                pixi: {
                    scale: 1.8
                },
                onComplete: function onComplete() {

                    earth.cloud_top1.renderable = false;
                    earth.cloud_down1.renderable = false;
                }
            }));

            this.tweens.push(TweenMax.to([earth.cloud_top2, earth.cloud_down2], 1.2, {
                pixi: {
                    scale: 1.8
                },
                onComplete: function onComplete() {
                    earth.cloud_top2.renderable = false;
                    earth.cloud_down2.renderable = false;
                }
            }));

            for (var k in delta) {
                if (typeof earth[k] !== 'undefined') {
                    this.tweens.push(TweenMax.to(earth[k], delta[k].speed.back, {
                        delay: delta[k].delay.back,
                        colorProps: {
                            tint: delta[k].tint.from,
                            format: "number"
                        },
                        pixi: {
                            alpha: delta[k].alpha.from
                        }
                    }));
                }
            }

            for (var _i2 = 0; _i2 < earth.stars.length; _i2++) {
                this.tweens.push(TweenMax.to(earth.stars[_i2], 1, {
                    scaleDelta: .3
                }));
            }
        }
    }, {
        key: "toggle",
        value: function toggle() {
            this.active = !this.active;
            if (this.active) {
                this.show();
            } else {
                this.hide();
            }
        }
    }]);

    return Eclipse;
}();

var Loading = function () {
    function Loading() {
        _classCallCheck(this, Loading);

        this.$loading = $('#loading');
        this.$loadingInner = $('#loading-inner');
        this.$dark = $('#dark');
        this.$light = $('#light');
        this.$percent = $('#percent');
        this.listenEvent();

        this.tl = new TimelineMax({});
        this.tl.to(this.$loadingInner, .4, {
            autoAlpha: 1
        });
    }

    _createClass(Loading, [{
        key: "update",
        value: function update(percent) {
            // console.log(percent)
            this.$percent.text(percent + '%');
            this.tl.to(this.$light, .3, {
                force3D: true,
                scale: percent / 100 * 0.2 + 1
            });
        }
    }, {
        key: "hide",
        value: function hide() {
            this.$percent.text('100%');
            this.tl.to(this.$light, 1.5, {
                autoAlpha: 0
            }, 'loaded');
            this.tl.to(this.$loading, 2, {
                autoAlpha: 0
            }, 'loaded');
        }
    }, {
        key: "listenEvent",
        value: function listenEvent() {
            var _this = this;

            PubSub.subscribe('resize', function (msg, data) {
                _this.$loading.css({
                    transform: data.css
                });
            });
        }
    }]);

    return Loading;
}();

var Earth = function () {
    function Earth() {
        _classCallCheck(this, Earth);

        this.initFront();
        this.initBack();
        this.initStars();
        this.listenEvent();
    }

    _createClass(Earth, [{
        key: "initFront",
        value: function initFront() {
            var _this2 = this;

            this.front = new PIXI.Application(appW, appH, {
                antialias: false,
                resolution: 1,
                clearBeforeRender: true,
                preserveDrawingBuffer: false,
                transparent: true,
                roundPixels: true,
                powerPreference: "high-performance"
            });
            this.front.renderer.view.id = "app-front";
            this.fs = this.front.stage;
            this.fs.setTransform(appW / 2, appH / 2);
            this.fs.displayList = new PIXI.DisplayList();
            document.body.appendChild(this.front.view);
            this.$front = $(this.front.view);

            // color filter for rock, hill, body & head
            this.filterDark = new PIXI.filters.ColorMatrixFilter();
            this.filterDark.alpha = 0;
            this.filterDark.brightness(.3, false);
            this.filterDark.contrast(1, false);
            this.filterDark.blackAndWhite(true);

            // moon
            this.moon = new PIXI.Sprite(PIXI.loader.resources[assets.moon].texture);
            this.moon.anchor.set(0.5, 0);
            this.moon.y = -appH / 2;
            this.moon.displayGroup = layers.moon;
            this.moon.filters = [];
            this.fs.addChild(this.moon);

            // moon red
            this.moon2 = new PIXI.Sprite(PIXI.loader.resources[assets.moon2].texture);
            this.moon2.anchor.set(0.5, 0);
            this.moon2.y = -appH / 2;
            this.moon2.displayGroup = layers.moon2;
            this.moon2.filters = [];
            this.fs.addChild(this.moon2);

            // hill
            this.hill = new PIXI.Sprite(PIXI.loader.resources[assets.hill].texture);
            this.hill.anchor.set(0.5, 1);
            this.hill.y = appH / 2;
            this.hill.displayGroup = layers.hill;
            this.hill.filters = [this.filterDark];
            this.fs.addChild(this.hill);

            // cloud
            this.cloud_top1 = new PIXI.Sprite(PIXI.loader.resources[assets.cloud].texture);
            this.cloud_top1.anchor.set(0.5);
            this.cloud_top1.x = 220;
            this.cloud_top1.y = -800;
            this.cloud_top1.width = 50;
            this.cloud_top1.height = 50;

            this.cloud_top1.alpha = .95;
            this.cloud_top1.rotation = _.random(0, 1.5, true);
            this.cloud_top1.displayGroup = layers.cloud;
            this.cloud_top1.filters = [];
            this.fs.addChild(this.cloud_top1);

            this.cloud_top2 = new PIXI.Sprite(PIXI.loader.resources[assets.cloud].texture);
            this.cloud_top2.anchor.set(0.5);
            this.cloud_top2.x = 220;
            this.cloud_top2.y = -800;
            this.cloud_top2.width = 50;
            this.cloud_top2.height = 50;
            this.cloud_top2.alpha = 1;
            this.cloud_top2.rotation = _.random(1.5, 3, true);
            this.cloud_top2.displayGroup = layers.cloud;
            this.cloud_top2.filters = [];
            this.fs.addChild(this.cloud_top2);

            this.cloud_down1 = new PIXI.Sprite(PIXI.loader.resources[assets.cloud].texture);
            this.cloud_down1.anchor.set(0.5);
            this.cloud_down1.x = -220;
            this.cloud_down1.y = 750;
            this.cloud_down1.alpha = .9;
            this.cloud_down1.rotation = _.random(3, 4, true);
            this.cloud_down1.displayGroup = layers.cloud;
            this.cloud_down1.filters = [];
            this.fs.addChild(this.cloud_down1);

            this.cloud_down2 = new PIXI.Sprite(PIXI.loader.resources[assets.cloud].texture);
            this.cloud_down2.anchor.set(0.5);
            this.cloud_down2.x = -220;
            this.cloud_down2.y = 750;
            this.cloud_down2.alpha = 1;
            this.cloud_down2.rotation = _.random(4.5, 6, true);
            this.cloud_down2.displayGroup = layers.cloud;
            this.cloud_down2.filters = [];
            this.fs.addChild(this.cloud_down2);

            setTimeout(function () {
                earth.cloud_top1.renderable = false;
                earth.cloud_top2.renderable = false;
                earth.cloud_down1.renderable = false;
                earth.cloud_down2.renderable = false;
            }, 500);

            TweenMax.set([this.cloud_top1, this.cloud_top2, this.cloud_down1, this.cloud_down2], {
                pixi: {
                    scale: 1.8
                }
            });

            // rock
            this.rock = new PIXI.Sprite(PIXI.loader.resources[assets.rock].texture);
            this.rock.anchor.set(0.5, 1);
            this.rock.x = -20;
            this.rock.y = appH / 2;
            this.rock.displayGroup = layers.rock;
            this.rock.filters = [this.filterDark];
            this.fs.addChild(this.rock);

            // man
            this.bodySprites = [];
            this.headSprites = [];
            this.headAsc = true;
            var i = void 0;

            for (i = 0; i < 34; i++) {
                var texture = PIXI.Texture.fromFrame('body_' + (i + 1) + '.png');
                this.bodySprites.push(texture);
            }
            this.body = new PIXI.extras.AnimatedSprite(this.bodySprites);
            this.body.x = 48;
            this.body.y = 30;
            this.body.scale.set(0.64);
            this.body.anchor.set(0.5);
            this.body.animationSpeed = 0.4;
            this.body.play();
            this.body.displayGroup = layers.man;
            this.body.filters = [this.filterDark];
            this.fs.addChild(this.body);

            for (i = 0; i < 7; i++) {
                var _texture = PIXI.Texture.fromFrame('headglasses_' + (i + 1) + '.png');
                this.headSprites.push(_texture);
            }
            this.head = new PIXI.extras.AnimatedSprite(this.headSprites);
            this.head.x = 48;
            this.head.y = 30;
            this.head.displayGroup = layers.man;
            this.head.scale.set(0.64);
            this.head.anchor.set(0.5);
            this.head.animationSpeed = 0.2;
            this.head.loop = false;
            this.head.filters = [this.filterDark];
            this.fs.addChild(this.head);

            // moonCtrl
            this.moonCtrl = new PIXI.Graphics();
            this.moonCtrl.beginFill(0x000000);
            this.moonCtrl.alpha = 0;
            this.moonCtrl.drawCircle(0, -62, ringSize - 12);
            this.moonCtrl.displayGroup = layers.moonCtrl;
            this.moonCtrl.interactive = true;
            this.moonCtrl.buttonMode = true;

            if (!isMobile) {
                this.moonCtrl.on("pointerover", function () {
                    eclipse.show();
                    _this2.$front.addClass('over');
                });

                this.moonCtrl.on("pointerout", function () {
                    _this2.$front.removeClass('over');
                    eclipse.hide();
                });

                this.moonCtrl.on("pointerdown", function () {
                    // board.isShow = true
                    // board.update()
                    board.open();
                });
            } else {
                this.moonCtrl.on("pointerdown", function (e) {
                    eclipse.show();
                    board.open();
                });
            }

            for (var k in delta) {
                if (typeof this[k] !== 'undefined') {
                    if (delta[k].alpha) {
                        this[k].alpha = delta[k].alpha.from;
                    }
                    if (delta[k].tint) {
                        this[k].tint = delta[k].tint.from;
                    }
                }
            }

            this.fs.addChild(this.moonCtrl);
        }
    }, {
        key: "initBack",
        value: function initBack() {
            var _this3 = this;

            this.back = new PIXI.Application(appW, appH, {
                antialias: false,
                resolution: 1,
                clearBeforeRender: false,
                preserveDrawingBuffer: true,
                backgroundColor: 0x000000,
                roundPixels: true,
                powerPreference: "high-performance"
            });
            this.back.renderer.view.id = "app-back";
            this.bs = this.back.stage;
            this.bs.setTransform(appW / 2, appH / 2);
            this.bs.displayList = new PIXI.DisplayList();
            document.body.appendChild(this.back.view);
            this.$back = $(this.back.view);

            // sky
            this.sky = new PIXI.Sprite(PIXI.loader.resources[assets.sky].texture);
            this.sky.anchor.set(0.5, 0.5);
            this.sky.width = appW;
            this.sky.height = appH;
            this.sky.displayGroup = layers.sky;
            this.sky.filters = [this.filterDark];
            this.bs.addChild(this.sky);

            // skylight
            this.skylight = new PIXI.Sprite(PIXI.loader.resources[assets.skylight].texture);
            this.skylight.anchor.set(0.5, 0.5);
            this.skylight.width = appW;
            this.skylight.height = appH;
            this.skylight.displayGroup = layers.skylight;
            this.skylight.filters = [this.filterDark];
            this.bs.addChild(this.skylight);

            // nebula
            this.nebula = new PIXI.Sprite(PIXI.loader.resources[assets.nebula].texture);
            this.nebula.anchor.set(0.5, 0.5);
            this.nebula.y = -60;
            this.nebula.displayGroup = layers.nebula;
            this.nebula.filters = [this.filterDark];
            this.bs.addChild(this.nebula);

            // moonlight
            this.moonlight = new PIXI.Sprite(PIXI.loader.resources[assets.moonlight].texture);
            this.moonlight.anchor.set(0.5, 0);
            this.moonlight.y = -appH / 2;
            this.moonlight.displayGroup = layers.moonlight;
            this.moonlight.filters = [this.filterDark];
            this.bs.addChild(this.moonlight);

            for (var k in delta) {
                if (typeof this[k] !== 'undefined') {
                    if (delta[k].alpha) {
                        this[k].alpha = delta[k].alpha.from;
                    }
                    if (delta[k].tint) {
                        this[k].tint = delta[k].tint.from;
                    }
                }
            }

            this.back.ticker.add(function (deltaTime) {
                hasStats && stats.begin();
                _this3.fps = 60 / deltaTime;
                _this3.loop();
                hasStats && stats.end();
            });
        }
    }, {
        key: "initStars",
        value: function initStars() {
            this.stars = [];
            for (var i = 0; i < amount; i++) {
                var s = new Star();
                this.bs.addChild(s.p);
                this.stars.push(s);
            }
        }
    }, {
        key: "loop",
        value: function loop() {
            this.nebula.rotation += 0.001;
            for (var i = 0; i < this.stars.length; i++) {
                this.stars[i].disappear();
                this.stars[i].move();
            }

            if (eclipse.active) {
                this.cloud_top1.rotation += 0.001;
                this.cloud_top2.rotation += 0.0015;
                this.cloud_down1.rotation += 0.001;
                this.cloud_down2.rotation += 0.0015;
            }
        }
    }, {
        key: "listenEvent",
        value: function listenEvent() {
            var _this4 = this;

            PubSub.subscribe('resize', function (msg, data) {
                _this4.front.renderer.view.style.transform = data.css;
                _this4.back.renderer.view.style.transform = data.css;
            });
        }
    }]);

    return Earth;
}();

var Star = function () {
    function Star() {
        _classCallCheck(this, Star);

        this.r = ringSize + Math.min(_.random(0, 50, true), _.random(0, 50, true));
        this.step = (_.random(4, true) + 1) / 1200;
        this.random = _.random(7, true);
        this.life = ~~_.random(60) + this.r;
        this.alpha = _.random(0.3, 1, true);

        this.p = new PIXI.Sprite(PIXI.loader.resources[assets.star].texture);
        this.p.width = this.p.height = 3;
        this.p.anchor.set(0.5, 0.5);
        this.p.displayGroup = layers.star;

        this.scaleDelta = 0.24;

        this.reset();
        this.updateStatus();
    }

    _createClass(Star, [{
        key: "updateStatus",
        value: function updateStatus() {
            this.ring = Math.max(this.ring - 0.5, this.r);
            this.random += this.step;
            if (this.p.alpha < this.alpha) {
                this.p.alpha += this.alpha / 120; // 2 seconds
            }
            this.x = Math.cos(this.random + Math.PI) * this.ring;
            this.y = Math.sin(this.random + Math.PI) * this.ring;
            // moon is at higher position
            this.y -= 60;
        }
    }, {
        key: "move",
        value: function move() {
            this.updateStatus();
            this.p.setTransform(this.x, this.y, this.radius * this.scaleDelta, this.radius * this.scaleDelta);
            // if (~~this.x < winW / 2 || ~~this.y < winH / 2) {
            //     if (!this.p.renderable) this.p.rendered = true
            // } else {
            //     this.p.renderable = false
            // }
        }
    }, {
        key: "reset",
        value: function reset() {
            if (typeof eclipse !== 'undefined' && eclipse.active) {
                this.ring = _.random(Math.max(winW, winH) * 1.2, true);
            } else {
                this.ring = _.random(Math.max(winW, winH) * 0.9, true);
            }
            this.radius = _.random(1.5, 4.6, true);
            this.p.alpha = 0;
        }
    }, {
        key: "disappear",
        value: function disappear() {
            if (this.radius < 0.8) {
                this.reset();
                return;
            }

            this.radius -= 0.005;
        }
    }]);

    return Star;
}();

var Board = function () {
    function Board() {
        _classCallCheck(this, Board);

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.intersected;
        this.lineObjects = [];

        this.duration = {
            value: 2.0
        };
        this.time = {
            value: 0
        };
        this.loader = new THREE.TextureLoader();
        this.texture = {
            1: this.loader.load('images/board1.png'),
            2: this.loader.load('images/board2.png'),
            3: this.loader.load('images/board3.png'),
            tran: this.loader.load('images/tran.png')
            // if (!isMobile) {
            //     this.texture = {
            //         1: this.loader.load('images/board1.png'),
            //         2: this.loader.load('images/board2.png'),
            //         3: this.loader.load('images/board3.png'),
            //         tran: this.loader.load('images/tran.png'),
            //     }
            // }
            // else {
            //     this.texture = {
            //         1: this.loader.load('images/board1_m.png'),
            //         2: this.loader.load('images/board2_m.png'),
            //         3: this.loader.load('images/board3_m.png'),
            //         tran: this.loader.load('images/tran.png'),
            //     }
            // }
        };this.uniforms = {
            uvScale: {
                type: 'vec2',
                value: [1, 1]
            },
            speed: {
                type: 'f',
                value: 20.0
            },
            frequency: {
                type: 'f',
                value: 30.0
            },
            iChannel0: {
                type: 't',
                value: this.texture['tran']
                // value: this.texture[1]
            },
            iChannel1: {
                type: 't',
                value: this.texture[1]
                // value: this.texture[2]
            },
            amplitude: {
                type: 'f',
                value: 120.0
            },
            time: {
                type: 'f',
                value: 0.0
                // value: Math.PI / 2
            }

            // uniforms.iChannel0.value.wrapS = uniforms.iChannel0.value.wrapT = THREE.RepeatWrapping
            // uniforms.iChannel1.value.wrapS = uniforms.iChannel1.value.wrapT = THREE.RepeatWrapping

        };this.vertexShader = "\nvarying vec2 vUv;\nvoid main() { \n    vUv = uv;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n}";

        this.fragmentShader = "\nprecision highp float;\nprecision highp int;\n\nvarying vec2 vUv;\n\nuniform vec2 uvScale;\nuniform sampler2D iChannel0;\nuniform sampler2D iChannel1;\nuniform float speed;\nuniform float frequency;\nuniform float amplitude;\nuniform float time;\n\nvoid main() {\n    vec2 ripple = vec2(\n        // - 0.5 to center the ripple in the middle of image\n        sin(  (length( vUv - 0.5 ) * frequency ) + ( time * speed ) ),\n        cos( ( length( vUv - 0.5 ) * frequency ) + ( time * speed ) )\n    // Scale amplitude to make input more convenient for users\n    ) * ( amplitude / 1000.0 );\n    \n    // mix the two images together based on time. the second image ripple's\n    // strength is 1 - percent to make it end on non-ripple\n    \n    // float percent = 0.5 + 0.5 * sin( time );\n    float percent = sin(time);\n    gl_FragColor = mix(\n        texture2D( iChannel0, vUv + ripple * percent ),\n        texture2D( iChannel1, vUv + ripple * ( 1.0 - percent ) ),\n        percent\n    );\n}";

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false
            // logging: false,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(winW, winH);
        this.renderer.domElement.id = 'board';
        this.renderer.domElement.style.display = 'none';
        document.body.appendChild(this.renderer.domElement);
        this.$el = $(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, winW / winH, 1, 1000);
        this.camera.position.z = 46;
        this.scene.add(this.camera);

        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.enableRotate = false;
        this.controls.minDistance = 30;
        this.controls.maxDistance = 100;

        this.geometry = new THREE.PlaneBufferGeometry(50, 50);
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            needsUpdate: true,
            depthWrite: false
        });

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.position.x = 0;
        this.plane.position.y = 0;

        this.geometryBtn = new THREE.PlaneBufferGeometry(3, 3);
        this.geometryBtn2 = new THREE.PlaneBufferGeometry(4, 4);
        this.materialBtn = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0
            // color: 0xff0000,
            // side: THREE.DoubleSide,
            // transparent: true,
            // opacity: 0.5
        });
        this.btnPrev = new THREE.Mesh(this.geometryBtn, this.materialBtn);
        this.btnPrev.position.x = -6.1;
        this.btnPrev.position.y = -16.2;
        this.btnPrev.position.z = -0.01;
        this.btnPrev.kv = 'prev';

        this.btnNext = new THREE.Mesh(this.geometryBtn, this.materialBtn);
        this.btnNext.position.x = 6.1;
        this.btnNext.position.y = -16.2;
        this.btnNext.position.z = -0.01;
        this.btnNext.kv = 'next';

        this.btnClose = new THREE.Mesh(this.geometryBtn, this.materialBtn);
        this.btnClose.position.x = 0;
        this.btnClose.position.y = -16.2;
        this.btnClose.position.z = -0.01;
        this.btnClose.kv = 'close';

        this.btnGithub = new THREE.Mesh(this.geometryBtn2, this.materialBtn);
        this.btnGithub.position.x = -10.8;
        this.btnGithub.position.y = 0;
        this.btnGithub.position.z = -0.01;
        this.btnGithub.kv = 'github';

        this.btnCodepen = new THREE.Mesh(this.geometryBtn2, this.materialBtn);
        this.btnCodepen.position.x = -3.6;
        this.btnCodepen.position.y = 0;
        this.btnCodepen.position.z = -0.01;
        this.btnCodepen.kv = 'codepen';

        // this.btnOpenprocessing = new THREE.Mesh(this.geometryBtn2, this.materialBtn)
        // this.btnOpenprocessing.position.x = 0
        // this.btnOpenprocessing.position.y = 0
        // this.btnOpenprocessing.position.z = -0.01
        // this.btnOpenprocessing.kv = 'openprocessing'

        this.btnLinkedin = new THREE.Mesh(this.geometryBtn2, this.materialBtn);
        this.btnLinkedin.position.x = 3.6;
        this.btnLinkedin.position.y = 0;
        this.btnLinkedin.position.z = -0.01;
        this.btnLinkedin.kv = 'linkedin';

        this.btnMail = new THREE.Mesh(this.geometryBtn2, this.materialBtn);
        this.btnMail.position.x = 10.8;
        this.btnMail.position.y = 0;
        this.btnMail.position.z = -0.01;
        this.btnMail.kv = 'mail';

        // this.objects = [this.btnPrev, this.btnNext, this.btnClose, this.btnGithub, this.btnCodepen, this.btnOpenprocessing, this.btnLinkedin, this.btnMail]
        this.objects = [this.btnPrev, this.btnNext, this.btnClose, this.btnGithub, this.btnCodepen, this.btnLinkedin, this.btnMail];

        this.group = new THREE.Group();
        this.group.add(this.plane);
        this.group.add(this.btnPrev);
        this.group.add(this.btnNext);
        this.group.add(this.btnClose);
        this.group.add(this.btnGithub);
        this.group.add(this.btnCodepen);
        // this.group.add(this.btnOpenprocessing)
        this.group.add(this.btnLinkedin);
        this.group.add(this.btnMail);

        this.scene.add(this.group);

        this.opening = false;
        this.playing = false;
        this.cur = null;

        this.listenEvent();
        this.animate();
    }

    _createClass(Board, [{
        key: "slide",
        value: function slide() {
            var _this5 = this;

            this.playing = true;
            var dest = void 0;
            var to = this.cur ? this.cur : 'tran';

            if (this.time.value !== 0) {
                dest = 0;
                this.uniforms.iChannel0.value = this.texture[to];
            } else {
                dest = Math.PI / 2;
                this.uniforms.iChannel1.value = this.texture[to];
            }
            TweenMax.to(this.time, this.duration.value, {
                value: dest,
                // ease: Elastic.easeInOut,
                onUpdate: function onUpdate() {
                    _this5.uniforms.time.value = _this5.time.value;
                },
                onComplete: function onComplete() {
                    _this5.playing = false;
                }
            });
        }
    }, {
        key: "open",
        value: function open() {
            this.renderer.domElement.style.display = 'block';
            this.opening = true;
            this.cur = 1;
            this.slide();
        }
    }, {
        key: "close",
        value: function close() {
            var _this6 = this;

            this.opening = false;
            this.cur = null;
            this.slide();
            setTimeout(function () {
                _this6.renderer.domElement.style.display = 'none';
            }, this.duration.value * 1000);
        }
    }, {
        key: "go",
        value: function go(index) {
            this.cur = index;
            this.slide();
        }
    }, {
        key: "prev",
        value: function prev() {
            if (this.cur - 1 < 1) {
                this.cur = 3;
            } else {
                this.cur--;
            }
            this.slide();
        }
    }, {
        key: "next",
        value: function next() {
            if (this.cur + 1 > 3) {
                this.cur = 1;
            } else {
                this.cur++;
            }
            this.slide();
        }
    }, {
        key: "listenEvent",
        value: function listenEvent() {
            var _this7 = this;

            PubSub.subscribe('resize', function (msg, data) {
                _this7.renderer.setSize(winW, winH);
                _this7.camera.aspect = winW / winH;
                if (winH > winW) {
                    _this7.camera.position.z = 46 + winH / winW * 10;
                } else {
                    _this7.camera.position.z = 46;
                }
                _this7.camera.updateProjectionMatrix();
            });

            var rx = void 0,
                ry = void 0;
            var delta = 0.5;
            var intersects = void 0;

            document.body.addEventListener('mousemove', function (e) {
                _this7.mouse.x = e.clientX / _this7.renderer.domElement.clientWidth * 2 - 1;
                _this7.mouse.y = -(e.clientY / _this7.renderer.domElement.clientHeight) * 2 + 1;

                _this7.raycaster.setFromCamera(_this7.mouse, _this7.camera);

                intersects = _this7.raycaster.intersectObjects(_this7.objects);

                if (!_this7.playing && intersects.length > 0) {
                    switch (intersects[0].object.kv) {
                        case 'prev':
                        case 'next':
                        case 'close':
                            // $body.css('cursor', 'pointer');
                            _this7.$el.addClass('over');

                            break;
                        case 'github':
                        case 'codepen':
                        // case 'openprocessing':
                        case 'mail':
                            if (_this7.cur === 3) {
                                // $body.css('cursor', 'pointer');
                                _this7.$el.addClass('over');
                            }
                            break;
                        case 'linkedin':
                            break;
                    }
                } else {
                    // $body.css('cursor', 'default');
                    _this7.$el.removeClass('over');
                    _this7.$el.removeClass('forbidden');
                }

                ry = (e.x / _this7.renderer.getSize().width - 0.5) * delta;
                rx = (e.y / _this7.renderer.getSize().height - 0.5) * delta;
                TweenMax.to(_this7.group.rotation, 0.5, {
                    'x': rx,
                    'y': ry
                });
            });

            document.body.addEventListener('mousedown', function (e) {
                if (_this7.playing) return;

                if (intersects.length > 0) {
                    switch (intersects[0].object.kv) {
                        case 'prev':
                            _this7.prev();
                            break;
                        case 'next':
                            _this7.next();
                            break;
                        case 'close':
                            _this7.close();
                            if (isMobile) {
                                eclipse.hide();
                            }
                            break;
                        case 'github':
                            if (_this7.cur === 3) window.open('https://github.com/kelvinh111', '_blank');
                            break;
                        case 'codepen':
                            if (_this7.cur === 3) window.open('https://codepen.io/kelvinh111/', '_blank');
                            break;
                        case 'linkedin':
                            // if (this.cur === 3)
                            // window.open('good.com', '_blank')
                            break;
                        case 'mail':
                            if (_this7.cur === 3) {
                                var mailSubject = '';
                                var mailBody = '';
                                window.location.href = 'mailto:kelvinhung.general@gmail.com';
                            }
                            break;
                    }
                }
            }, false);
        }
    }, {
        key: "animate",
        value: function animate() {
            requestAnimationFrame(this.animate.bind(this));
            this.renderer.render(this.scene, this.camera);
        }
    }]);

    return Board;
}();

var Sound = function () {
    function Sound() {
        _classCallCheck(this, Sound);

        this.sound = PIXI.loader.resources[assets.bgm].sound;
        this.playing = true;
        this.$volume = $('.icon-volume-medium');

        this.sound.volume = 0.3;
        this.sound.play({
            loop: true,
            singleInstance: true
        });

        this.bindEvent();
    }

    _createClass(Sound, [{
        key: "bindEvent",
        value: function bindEvent() {
            var _this8 = this;

            this.$volume.on('click', function (e) {
                if (_this8.playing) {
                    _this8.sound.stop();
                    _this8.playing = false;
                    _this8.$volume.addClass('stopped');
                } else {
                    _this8.sound.play({
                        loop: true,
                        singleInstance: true
                    });
                    _this8.playing = true;
                    _this8.$volume.removeClass('stopped');
                }
            });
        }
    }]);

    return Sound;
}();

var Message = function () {
    function Message() {
        var _this9 = this;

        _classCallCheck(this, Message);

        this.$msg = $('.message');
        this.$fps = $('#fps');

        this.$msg.find('.message-close').on('click', function (e) {
            _this9.$msg.hide();
        });
    }

    _createClass(Message, [{
        key: "slow",
        value: function slow(averFps) {
            var _this10 = this;

            this.$fps.text(averFps);
            this.$msg.show();
            setTimeout(function () {
                _this10.$msg.fadeOut(1000);
            }, 15000);
        }
    }]);

    return Message;
}();

loading = new Loading();
hasStats && createStats();
createApp();
onResize();
window.onresize = onResize;

// GA
window.dataLayer = window.dataLayer || [];

function gtag() {
    window.dataLayer.push(arguments);
};
gtag('js', new Date());
gtag('config', 'UA-107422840-1');
//# sourceMappingURL=app.dev.js.map
