// Detects Mouse Movement ( Requires that you wrap your project in a Main Class with this.mouse variable )
export function Move (main, _canvas) {
    window.addEventListener('mousemove', function(e) {
      let bounds = _canvas.getBoundingClientRect();
  
      // get the mouse coordinates, subtract the canvas top left and any scrolling
      main.mouse.pos.x = e.pageX - bounds.left - scrollX;
      main.mouse.pos.y = e.pageY - bounds.top - scrollY;
  
      // first normalize the mouse coordinates from 0 to 1 (0,0) top left
      // off canvas and (1,1) bottom right by dividing by the bounds width and height
      main.mouse.pos.x /= bounds.width; 
      main.mouse.pos.y /= bounds.height; 
  
      // then scale to canvas coordinates by multiplying the normalized coords with the canvas resolution
      main.mouse.pos.x *= canvas.width;
      main.mouse.pos.y *= canvas.height;
  
      // Center Mouse Bounds
      main.mouse.pos.x = main.mouse.pos.x - main.mouse.size.w * 0.5;
      main.mouse.pos.y = main.mouse.pos.y - main.mouse.size.h * 0.5;
  });
  }
  
  
  // Detects Mouse Exited Screen Area ( Requires that you wrap your project in a Main Class with this.mouse variable )
  export function Leave (main) {
  window.addEventListener('mouseleave', function(e) {
      main.mouse.pos.x = null;
      main.mouse.pos.y = null;
      main.mouse.click = false;
  });
  }
  
  
  // Detects Mouse Pressed ( Requires that you wrap your project in a Main Class with this.mouse variable )
  export function Down (main) {
  window.addEventListener( 'mousedown', function( e ) { 
      main.mouse.click = true;
  });
  }
  
  
  // Detects Mouse Released ( Requires that you wrap your project in a Main Class with this.mouse variable )
  export function Up (main) {
  window.addEventListener('mouseup', function(e) {
    main.mouse.click = false;
  });
  }
  
  
    // module.exports = {
    //   Move,
    //   Leave,
    //   Up,
    //   Down,
    // };
  
  
  
  
  