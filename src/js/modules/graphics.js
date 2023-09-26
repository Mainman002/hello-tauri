export function  Text (_ctx, _text, _align, _font, _pos, _size, _color, _a) {
    _ctx.globalAlpha = _a;
    _ctx.textAlign = _align;
    _ctx.fillStyle = _color;
  
    if (_font){
        _ctx.font = `${_size}px ${_font}`;
    } else {
        _ctx.font = `${_size}px ${"Noto Sans"}`;
    }
  
    _ctx.fillText(`${_text}`, _pos.x, _pos.y);
    _ctx.globalAlpha = 1;
  }
  
  
  export function  Box (_ctx, _pos, _size, _color, _a) {
    _ctx.globalAlpha = _a;
    _ctx.fillStyle = _color;
    _ctx.fillRect(_pos.x, _pos.y, _size.w, _size.h);
    _ctx.globalAlpha = 1;
  }
  
  
  export function Bevel_Outline (_ctx, _pos, _size, _color, _r, _a) {
    _ctx.beginPath();

    _ctx.strokeStyle = _color;
    _ctx.globalAlpha = _a;

    // Set faux rounded corners
    _ctx.lineJoin = "round";
    _ctx.lineWidth = _r;

    // Stroke Outline
    _ctx.strokeRect(_pos.x+(_r/2), _pos.y+(_r/2), _size.w-_r, _size.h-_r);
    
    _ctx.closePath();
    _ctx.globalAlpha = 1.0;
  }
  
  
  export function Circle (_ctx, _pos, _size, _radius, _thickness, _color) {
    let X = _pos.x + _size.w * 0.5;
    let Y = _pos.y + _size.h * 0.5;
    let R = _radius;
  
    if (_radius > 0) {
        _ctx.beginPath();
        _ctx.arc(X, Y, R, 0, 2  *  Math.PI, false);
        _ctx.lineWidth = _thickness;
        _ctx.strokeStyle = _color;
        _ctx.stroke();
    }
  }
  
  
  export function Line (_ctx, _pos_start, _pos_end, offset, _thickness, _color) {
    _ctx.strokeStyle = _color;
    _ctx.lineWidth = _thickness;
  
    if ( !offset ) { 
      offset = {w: offset.w, h: offset.h};
    }
  
    // draw a red line
    _ctx.beginPath();
    _ctx.moveTo(_pos_end.x+offset.w*0.5, _pos_end.y+offset.h*0.5);
    _ctx.lineTo(_pos_start.x+offset.w*0.5, _pos_start.y+offset.h*0.5);
    _ctx.stroke();
  }
  
  
  export function Line_Box (_ctx, _start_pos, _end_pos, _size, _r, _color ) {
      this.Line(_ctx, {x: _start_pos.x, y: _start_pos.y}, {x: _end_pos.x, y: _start_pos.y}, _size, _r, _color);
      this.Line(_ctx, {x: _start_pos.x, y: _start_pos.y}, {x: _start_pos.x, y: _end_pos.y}, _size, _r, _color);
      this.Line(_ctx, {x: _start_pos.x, y: _end_pos.y}, {x: _end_pos.x, y: _end_pos.y}, _size, _r, _color);
      this.Line(_ctx, {x: _end_pos.x, y: _start_pos.y}, {x: _end_pos.x, y: _end_pos.y}, _size, _r, _color);
  }
  
  
  export function Line_Guides (_ctx, _thickness, _line_count, _offset) {
    _ctx.lineWidth = _thickness;
  
    Line(_ctx, {x: canvas.width * 0.5, y: 0}, {x: canvas.width *0.5, y: canvas.height}, {w: 0, h: 0}, _thickness, 'Grey' );
    Line(_ctx, {x: 0, y: canvas.height * 0.5}, {x: canvas.width, y: canvas.height * 0.5}, {w: 0, h: 0}, _thickness, 'Grey' );
  
    // Guide Lines Vertical Up
    for ( let x = 0; x < _line_count.x * 0.5; ++x ) {
      Line(_ctx, {x: canvas.width * 0.5 - _offset.x - _offset.x * x, y: 0}, {x: canvas.width *0.5 - _offset.x - _offset.x * x, y: canvas.height}, {w: 0, h: 0}, _thickness, 'Red' );
    }
  
    // Guide Lines Vertical Down
    for ( let x = 0; x < _line_count.x * 0.5; ++x ) {
      Line(_ctx, {x: canvas.width * 0.5 + _offset.x + _offset.x * x, y: 0}, {x: canvas.width *0.5 + _offset.x + _offset.x * x, y: canvas.height}, {w: 0, h: 0}, _thickness, 'Red' );
    }
  
      // Guide Lines Horizontal Left
      for ( let y = 0; y < _line_count.y * 0.5; ++y ) {
        Line(_ctx, {x: 0, y: canvas.height * 0.5 - _offset.y - _offset.y * y}, {x: canvas.width, y: canvas.height * 0.5 - _offset.y - _offset.y * y}, {w: 0, h: 0}, _thickness, 'Red' );
      }
    
      // Guide Lines Horizontal Right
      for ( let y = 0; y < _line_count.y * 0.5; ++y ) {
        Line(_ctx, {x: 0, y: canvas.height * 0.5 + _offset.y + _offset.y * y}, {x: canvas.width, y: canvas.height * 0.5 + _offset.y + _offset.y * y}, {w: 0, h: 0}, _thickness, 'Red' );
      }
  }
  
  
  export function Image (_ctx, _image, _frame, _spriteSize, _pos, _size, _rot, _a) {
    _ctx.globalAlpha = _a;
  
    _ctx.save();
    _ctx.translate(_pos.x, _pos.y);
    _ctx.rotate(_rot);
  
    _ctx.drawImage(_image, 
    _frame.x, _frame.y, _spriteSize.w, _spriteSize.h, 
    _pos.x-_pos.x-_size.w * 0.5, _pos.y-_pos.y-_size.h * 0.5, 
    _size.w, _size.h);
  
    _ctx.restore();
    _ctx.globalAlpha = 1.0;
  }
  
  
  export function Image_Simple (_ctx, _image, _pos, _size, _a) {
    _ctx.globalAlpha = _a;
  
    _ctx.drawImage(_image, 
    _pos.x, _pos.y, _size.w, _size.h);
    _ctx.globalAlpha = 1.0;
  }
  
  
  // module.exports = {
    // Text,
    // Line,
    // Line_Box,
    // Line_Guides,
    // Box,
    // Circle,
    // Bevel_Outline
    // Image,
    // Image_Simple,
  // };
  
  
  