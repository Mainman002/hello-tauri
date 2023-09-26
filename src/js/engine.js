// Map Array
import {Example, Gear_01, Gear_02, Gear_03} from './scenes/example.js';
import * as Screen from './modules/screen.js';
import * as Graphics from './modules/graphics.js';
import * as Mouse from './modules/input-mouse.js';
import * as Touch from './modules/input-touch.js';


window.addEventListener('load', function(){
    const border = 100;
    const aspect = {w:6.5, h:4};
    const img_smooth = true;

    const ctx = canvas.getContext('2d');
    const overlayCtx = overlay.getContext('2d');

    canvas.width = 1088;
    canvas.height = 640;

    overlay.width = canvas.width;
    overlay.height = canvas.height;

    screen_resize(ctx, canvas);
    screen_resize(overlayCtx, overlay);


    window.addEventListener('resize', function(e) {
        screen_resize(ctx, canvas);
        screen_resize(overlayCtx, overlay);
    });


    function screen_resize(_ctx, _canvas){
        let w = window.innerWidth;
        let h = w * (aspect.h / aspect.w);

        if (h < window.innerHeight){
            // Check window width
            w = window.innerWidth;
            h = w * (aspect.h / aspect.w);
        } else {
            // Check window height
            h = window.innerHeight;
            w = h * (aspect.w / aspect.h);
        }

        _canvas.style.width = `${w - border}px`;
        _canvas.style.height = `${h - border}px`;

        // Graphic sharpness
        _ctx.mozImageSmoothingEnabled = img_smooth;
        _ctx.msImageSmoothingEnabled = img_smooth;
        _ctx.imageSmoothingEnabled = img_smooth;
    }


    window.addEventListener('mousemove', function(e) {
        let bounds = canvas.getBoundingClientRect();

        // get the mouse coordinates, subtract the canvas top left and any scrolling
        game.mouse.pos.x = e.pageX - bounds.left - scrollX;
        game.mouse.pos.y = e.pageY - bounds.top - scrollY;

        // first normalize the mouse coordinates from 0 to 1 (0,0) top left
        // off canvas and (1,1) bottom right by dividing by the bounds width and height
        game.mouse.pos.x /= bounds.width; 
        game.mouse.pos.y /= bounds.height; 

        // then scale to canvas coordinates by multiplying the normalized coords with the canvas resolution
        game.mouse.pos.x *= canvas.width;
        game.mouse.pos.y *= canvas.height;
    });


    window.addEventListener('mouseleave', function(e) {
        game.mouse.pos.x = null;
        game.mouse.pos.y = null;

        game.mouse.click = false;
    });


    // Main Game Class ----------------------------------------
    class Game {
        constructor(size){
            this.resolution = {w:1280, h:800};

            this.canvas_list = [
                {cx: ctx, ca: canvas}, 
                {cx: overlayCtx, ca: overlay}, 
            ];

            this.ctx = ctx;
            this.overlayCtx = overlayCtx;
            this.size = size;

            this.mouse = {
                pos:{x:0, y:0},
                size:{w:0.2, h:0.2},
                click:false,
            }

            this.objects = [];
        }

        init(){
            console.log("Game Started");

            const gears_offset = {x:160, y:-32};

            // Add Gear 1
            this.instance(this.objects, Gear_01, {x:canvas.width*0.5+gears_offset.x, y:canvas.height*0.5+64+gears_offset.y}, 0.4);

            // Add Gear 2
            this.instance(this.objects, Gear_02, {x:canvas.width*0.5-140+gears_offset.x, y:canvas.height*0.5+140+gears_offset.y}, -0.4);

            // Add Gear 3
            this.instance(this.objects, Gear_03, {x:canvas.width*0.5-35+gears_offset.x, y:canvas.height*0.5+240+gears_offset.y}, 0.4);
        
            const _start_pos = {x:80, y:340};
            const _offset_pos = {x:128+24, y:128+24};
            for ( let id_x=0;id_x < 2;id_x++ ) {
                for ( let id_y=0;id_y < 3;id_y++ ) {
                this.instance(this.objects, Gear_03, {x:_start_pos.x+_offset_pos.x*id_x, y:_start_pos.y+_offset_pos.y*id_y }, 0.4);
                }
            };
        }

        update(deltaTime){
            this.objects.forEach(ob => ob.update(deltaTime));
        }

        draw(){
            this.objects.forEach(ob => ob.draw());

            Graphics.Box( ctx, {x:32, y:32*(1.5 * 1) }, {w:300, h:32}, 'Green', 1 );
            Graphics.Box( ctx, {x:32, y:32*(1.5 * 2) }, {w:300*0.50, h:32}, 'Orange', 1 );
            Graphics.Box( ctx, {x:32, y:32*(1.5 * 3) }, {w:300*0.25, h:32}, 'Red', 1 );

            // Graphics.Bevel_Outline( ctx, {x:32, y:300}, {w:64, h:64}, 'Green', 5, 1 );

            // Draw Text
            Graphics.Text(ctx, "Blank JS Project", "center", 'Noto Sans', {x:canvas.width*0.5, y:64+12}, 40, 'Gold', 1,);

            // Show Mouse Position
            if (this.mouse.pos.x || this.mouse.pos.y) {
                Graphics.Box( ctx, {x:this.mouse.pos.x-16, y:this.mouse.pos.y-16}, {w:32, h:32}, 'Teal', 1 );
            }
        }

        instance(_list, _ob, _pos, _speed){
            if (_ob !== null){
                _list.push(new _ob(this, _pos, _speed));
                _list[_list.length-1].init();

                _list.sort(function(a,b){
                    return a.pos.y - b.pos.y;
                });
            }
        }

        remove_instance(_list, _ob){
            _list = _list.filter(_ob => !_ob.markedForDeletion)
        }

    }


    // Update loop ---------------------------------------
    const game = new Game(ctx, {w:canvas.width, h:canvas.height});
    game.init();
    Screen.Init( game );
    Mouse.Move(game, canvas);
    Mouse.Leave(game);
    Mouse.Down(game);
    Mouse.Up(game);
    Touch.Init(game);
    
    let lastTime = 1;
    function animate(timeStamp){
        game.ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.overlayCtx.clearRect(0, 0, overlay.width, overlay.height);

        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        // Screen.Resize( game, game.objects, canvas );
        // Screen.Resize( game, game.objects, overlay );

        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate();

});


