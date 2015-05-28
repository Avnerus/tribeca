// Graphics Util
class GraphicsUtil {
    constructor() {

    }
    rectangle( x, y, width, height, backgroundColor, borderColor, borderWidth  ) { 
         var box = new PIXI.Graphics();
         box.beginFill(backgroundColor);
         box.lineStyle(borderWidth , borderColor);
         box.drawRect(0, 0, width - borderWidth, height - borderWidth);
         box.endFill();
         box.position.x = x + borderWidth/2;
         box.position.y = y + borderWidth/2;
         return box;
    };
};

// Singleton
let instance = new GraphicsUtil();
export default instance;

