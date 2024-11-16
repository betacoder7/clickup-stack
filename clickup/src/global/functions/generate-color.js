function generateColor(baseHue) {
    const saturation = Math.floor(Math.random() * 40) + 60;
    const lightness = Math.floor(Math.random() * 30) + 40;
    return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
};

export default function generateTagColors(numColors) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const baseHue = (i * (360 / numColors)) % 360;
        colors.push(generateColor(baseHue));
    }
    return colors;
};