export function Init (main) {
    if (main.debug) console.log("Screen Manager Loaded");
  
    for ( let i = 0; i < main.canvas_list.length; ++i ) {
        main.canvas_list[i].ca.width = main.resolution.w;
        main.canvas_list[i].ca.height = main.resolution.h;
        Resize(main,  main.canvas_list[i].cx, main.canvas_list[i].ca);
    }
  
    window.addEventListener('resize', function(e) {
      for ( let i = 0; i < main.canvas_list.length; ++i ) {
        Resize(main, main.canvas_list[i].cx, main.canvas_list[i].ca);
      }
    });
  
  }
  
  export function Resize (main, _ctx, _canvas) {
    const border = 50;
    const aspect = {w:6.5, h:4};
    const img_smooth = true;
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
  
    if (main.debug) console.log("Resized", "W", Math.floor(w), "H", Math.floor(h));
  
    _canvas.style.width = `${w - border}px`;
    _canvas.style.height = `${h - border}px`;
  
    // Graphic sharpness
    _ctx.mozImageSmoothingEnabled = img_smooth;
    _ctx.msImageSmoothingEnabled = img_smooth;
    _ctx.imageSmoothingEnabled = img_smooth;
  }
  
  
    // module.exports = {
    //   Init,
    //   Resize,
    // };
  
  
  
  
  