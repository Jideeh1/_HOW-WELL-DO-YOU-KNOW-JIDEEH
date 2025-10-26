const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
const waveContainer = document.getElementById('hero');

const DELTA = 1.0;
const SPRING_CONSTANT = 0.005;
const DAMPING_VELOCITY = 0.008;
const DAMPING_PRESSURE = 0.995;

let gridWidth;
let gridHeight;

let currentGrid;
let nextGrid;

let mouseX = 0;
let mouseY = 0;
let isHovering = false;

function initSimulation() {
    canvas.width = waveContainer.clientWidth;
    canvas.height = waveContainer.clientHeight;

    gridWidth = canvas.width;
    gridHeight = canvas.height;

    currentGrid = new Float32Array(gridWidth * gridHeight * 2);
    nextGrid = new Float32Array(gridWidth * gridHeight * 2);

    currentGrid.fill(0);
    nextGrid.fill(0);

    waveContainer.addEventListener('mousemove', handleMouseMove);
    waveContainer.addEventListener('mouseenter', () => isHovering = true);
    waveContainer.addEventListener('mouseleave', () => isHovering = false);

    requestAnimationFrame(animate);
}

function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = Math.floor(event.clientX - rect.left);
    mouseY = Math.floor(event.clientY - rect.top);

    mouseX = Math.max(0, Math.min(gridWidth - 1, mouseX));
    mouseY = Math.max(0, Math.min(gridHeight - 1, mouseY));
}

function getIndex(x, y) {
    return (y * gridWidth + x) * 2;
}

function updateSimulation() {
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const currentIdx = getIndex(x, y);

            let pressure = currentGrid[currentIdx];
            let pVel = currentGrid[currentIdx + 1];

            let p_right = (x < gridWidth - 1) ? currentGrid[getIndex(x + 1, y)] : pressure;
            let p_left = (x > 0) ? currentGrid[getIndex(x - 1, y)] : pressure;
            let p_up = (y < gridHeight - 1) ? currentGrid[getIndex(x, y + 1)] : pressure;
            let p_down = (y > 0) ? currentGrid[getIndex(x, y - 1)] : pressure;

            if (x === 0) p_left = p_right;
            if (x === gridWidth - 1) p_right = p_left;
            if (y === 0) p_down = p_up;
            if (y === gridHeight - 1) p_up = p_down;

            pVel += DELTA * (-2.0 * pressure + p_right + p_left) / 4.0;
            pVel += DELTA * (-2.0 * pressure + p_up + p_down) / 4.0;

            pressure += DELTA * pVel;

            pVel -= SPRING_CONSTANT * DELTA * pressure;
            pVel *= (1.0 - DAMPING_VELOCITY * DELTA);
            pressure *= DAMPING_PRESSURE;

            const nextIdx = getIndex(x, y);
            nextGrid[nextIdx] = pressure;
            nextGrid[nextIdx + 1] = pVel;
        }
    }

    if (isHovering) {
        const impulseRadius = 20;
        const baseImpulseStrength = 0.05;
        for (let y = Math.max(0, mouseY - impulseRadius); y <= Math.min(gridHeight - 1, mouseY + impulseRadius); y++) {
            for (let x = Math.max(0, mouseX - impulseRadius); x <= Math.min(gridWidth - 1, mouseX + impulseRadius); x++) {
                const dist = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));
                if (dist <= impulseRadius) {
                    const impulseStrength = baseImpulseStrength * (1.0 - dist / impulseRadius);
                    const idx = getIndex(x, y);
                    nextGrid[idx] += impulseStrength;
                }
            }
        }
    }

    const temp = currentGrid;
    currentGrid = nextGrid;
    nextGrid = temp;
}

function drawSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imageData = ctx.createImageData(gridWidth, gridHeight);
    const data = imageData.data;

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const currentIdx = getIndex(x, y);
            const pressure = currentGrid[currentIdx];

            const amplifiedPressure = pressure * 3.0;
            const normalizedPressure = (amplifiedPressure + 1.0) / 2.0;

            const colorValue = Math.floor(Math.max(0, Math.min(1, normalizedPressure)) * 255);
            const pixelIdx = (y * gridWidth + x) * 4;

            data[pixelIdx] = colorValue;
            data[pixelIdx + 1] = colorValue;
            data[pixelIdx + 2] = colorValue;

            const alphaValue = Math.floor(Math.min(1, Math.abs(amplifiedPressure)) * 255);
            data[pixelIdx + 3] = alphaValue;
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function animate() {
    updateSimulation();
    drawSimulation();
    requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', initSimulation);

window.addEventListener('resize', () => {
    initSimulation();
});
