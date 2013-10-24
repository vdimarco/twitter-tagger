var Colour = (function () {
    function limit(x) {
        if (x > 255) return 255;
        if (x < 0) return 0;
        return Math.floor(x);
    }
    function toHex(r, g, b) {
        if (r > 15) r = r.toString(16);
        else r = '0' + r.toString(16);
        if (g > 15) g = g.toString(16);
        else g = '0' + g.toString(16);
        if (b > 15) b = b.toString(16);
        else b = '0' + b.toString(16);
        return '#' + (r + g + b).toUpperCase();
    }
    function Colour(hex) {
        if (hex.length === 7 || hex.length === 4) hex = hex.slice(1);
        if (hex.length === 3)
            hex = hex.charAt(0) + hex = hex.charAt(0)
                + hex.charAt(1) + hex = hex.charAt(1)
                + hex.charAt(2) + hex = hex.charAt(2);
        this.hex = '#' + hex.toUpperCase();
        this.r = parseInt(hex.slice(0, 2), 16);
        this.g = parseInt(hex.slice(2, 4), 16);
        this.b = parseInt(hex.slice(4, 6), 16);
    }
    Colour.prototype.scale = function (x) {
        this.r = limit(this.r * x);
        this.g = limit(this.g * x);
        this.b = limit(this.b * x);
        this.hex = toHex(this.r, this.g, this.b);
        return this;
    };
    Colour.prototype.add = function (c) {
        return new Colour(
            toHex(
                limit(this.r + c.r),
                limit(this.g + c.g),
                limit(this.b + c.b)
            )
        );
    };
    Colour.prototype.toString = function () {
        return this.hex;
    };
    Colour.prototype.valueOf = Colour.prototype.toString;
    return Colour;
}());