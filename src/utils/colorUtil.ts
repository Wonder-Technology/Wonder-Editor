export function hex2rgb(hex: number, out?: number[]): number[] {
    out = out || [];
    out[0] = ((hex >> 16) & 0xFF) / 255;
    out[1] = ((hex >> 8) & 0xFF) / 255;
    out[2] = (hex & 0xFF) / 255;
    return out;
}

export function hex2string(hex: number): string {
    let hexStr = hex.toString(16);
    hexStr = '000000'.substr(0, 6 - hexStr.length) + hex;
    return `#${hex}`;
}

export function rgb2hex(rgb: number[]) {
    return (((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + (rgb[2] * 255 | 0));
}

export function string2rgb(hexStr: string): number[] {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hexStr = hexStr.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr);
    return result ? 
        [
            parseInt(result[1], 16),
            parseInt(result[1], 16),
            parseInt(result[1], 16)
        ] : [255,255,255];
}

export function reverseRGB(rgb: number[]): number[] {
    return [255-rgb[0], 255-rgb[1], 255-rgb[2]];
}


