/*
rgb => R, G, B [0;2555]
H [0;360]
S [0;100]
L [0;100]
*/

const RGBtoHSL = (rgb) => {
    const [r, g, b] = Object.keys(rgb).map(channel => rgb[channel]/255)
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h*=360
    s*=100
    l*=100

    return {h, s, l}
}

const HSLtoRGB = ({h, s, l}) => {
    // console.log('HSLtoRGB ', h, s, l)
    const hk = h/360, sk = s/100, lk = l/100
    let rgb = [0, 0, 0]

    if(sk === 0){
        rgb = [lk, lk, lk]
    } else {
        const q = (lk < 0.5) ? lk*(1 + sk) : lk + sk - (lk*sk)
        const p = 2 * lk - q
        let t = [hk + 1/3, hk, hk - 1/3]
    
        t = t.map(tItem => {
            if(tItem < 0) {
                return tItem + 1
            }
    
            if(tItem > 1) {
                return tItem - 1
            }
    
            return tItem
        })
    
        rgb = t.map(tItem => {
            let color = p
    
            if (tItem < 1/6) {
                color = p + ((q - p) * 6 * tItem)
            } else if (1/6 <= tItem && tItem < 1/2) {
                color = q
            } else if ( 1/2 <= tItem && tItem < 2/3) {
                color = p + ((q - p) * (2/3 - tItem) * 6)
            }
            
            return color
        })
    }
    const [r, g, b] = rgb.map(c => Math.round(c * 255))
    // console.log('HSLtoRGB final rgb = ', r, g, b)

    return {r, g, b}
}

const HEXtoRGB = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    console.log('HEXtoRGB result ', result)

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
}

const RGBtoHEX = ({r, g, b}) => {
    const hex = '#' + [r, g, b].map(c => {
        const hexC = c.toString(16)
        return hexC.length === 1 ? `0${hexC}` : hexC
    }).join('')

    return hex
}

export {
    RGBtoHSL,
    HSLtoRGB,
    HEXtoRGB,
    RGBtoHEX
}