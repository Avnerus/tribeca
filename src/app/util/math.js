class MathUtil {
    constructor() {
        this.RADIANS = Math.PI / 180;
        this.DEGREES = 180 / Math.PI;
    }

    rndRange(min, max)
    {
        return min + (Math.random() * (max - min));
    }

    rndIntRange (min, max)
    {
        return Math.round(this.rndRange(min, max));
    }

    toRadians(degrees)
    {
        return degrees * this.RADIANS;
    }

    toDegrees(radians)
    {
        return radians * this.DEGREES;
    }

    hitTest(x1, y1, w1, h1, x2, y2, w2, h2)
    {
        if (x1 + w1 > x2)
            if (x1 < x2 + w2)
                if (y1 + h1 > y2)
                    if (y1 < y2 + h2)
                        return true;

        return false;
    }

    pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
}

// Singleton:
let instance = new MathUtil();
export default instance;
