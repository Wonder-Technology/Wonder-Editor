const helpCanvas: HTMLCanvasElement = (() => {
    const canvas = document.createElement('canvas');
    canvas.height = 1;
    canvas.width = 1;
    return canvas
})();

const helpContext = helpCanvas.getContext('2d');

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
    helpContext.fillStyle = hexStr;
    helpContext.globalAlpha = 1;
    helpContext.fillRect(0, 0, 1, 1);
    const rgba = helpContext.getImageData(0, 0, 1, 1).data
    return [rgba[0], rgba[1], rgba[2]];
}

export function reverseRGB(rgb: number[]): number[] {
    return [255-rgb[0], 255-rgb[1], 255-rgb[2]];
}


