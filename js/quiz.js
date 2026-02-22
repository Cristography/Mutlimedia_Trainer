// Quiz System - Random Question Generator for ALL tools

class QuizManager {
    constructor() {
        this.currentQuestion = null;
        this.currentToolId = null;
    }

    generate(toolId) {
        this.currentToolId = toolId;
        const generator = this.getGenerator(toolId);
        if (generator) {
            this.currentQuestion = generator();
            return this.currentQuestion;
        }
        return { question: "No quiz available for this tool", answer: "N/A", hint: "" };
    }

    getGenerator(toolId) {
        const generators = {
            'tool-position': () => this.generatePosition(),
            'tool-size': () => this.generateSize(),
            'tool-rotation': () => this.generateRotation(),
            'tool-color': () => this.generateColor(),
            'tool-opacity': () => this.generateOpacity(),
            'tool-fps': () => this.generateFPS(),
            'tool-rgb-cmy': () => this.generateRgbToCmy(),
            'tool-cmy-rgb': () => this.generateCmyToRgb(),
            'tool-rgb-cmyk': () => this.generateRgbToCmyk(),
            'tool-cmyk-rgb': () => this.generateCmykToRgb(),
            'tool-yuv': () => this.generateYuv(),
            'tool-hex': () => this.generateHex(),
            'tool-image-size': () => this.generateImageSize(),
            'tool-grayscale': () => this.generateGrayscale(),
            'tool-negative': () => this.generateNegative(),
            'tool-threshold': () => this.generateThreshold(),
            'tool-brightness': () => this.generateBrightness(),
            'tool-resolution': () => this.generateResolution(),
            'tool-rle': () => this.generateRLE(),
            'tool-huffman': () => this.generateHuffman(),
            'tool-lzw': () => this.generateLZW(),
            'tool-arithmetic': () => this.generateArithmetic(),
            'tool-compression-ratio': () => this.generateCompressionRatio(),
            'tool-audio-size': () => this.generateAudioSize(),
            'tool-audio-duration': () => this.generateAudioDuration(),
            'tool-bitrate': () => this.generateBitrate(),
            'tool-db': () => this.generateDb()
        };
        return generators[toolId];
    }

    rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randExclude(min, max, exclude) {
        let val;
        do { val = this.rand(min, max); } while (val === exclude);
        return val;
    }

    // Animation Tools
    generatePosition() {
        const x1 = this.rand(0, 100);
        const y1 = this.rand(0, 100);
        const x2 = x1 + this.rand(20, 100);
        const y2 = y1 + this.rand(20, 100);
        const f1 = 1;
        const f2 = this.rand(5, 20);
        const ft = this.rand(2, f2 - 1);
        const nf = f2 - f1;
        const dx = (x2 - x1) / nf;
        const dy = (y2 - y1) / nf;
        const ansX = (x1 + dx * (ft - f1)).toFixed(2);
        const ansY = (y1 + dy * (ft - f1)).toFixed(2);

        return {
            question: `An object moves from (${x1}, ${y1}) to (${x2}, ${y2}) over frames ${f1} to ${f2}. What is the position at frame ${ft}?`,
            answer: `(${ansX}, ${ansY})`,
            hint: `dx = (${x2}-${x1})/${nf} = ${dx.toFixed(2)}, dy = (${y2}-${y1})/${nf} = ${dy.toFixed(2)}`
        };
    }

    generateSize() {
        const w1 = this.rand(50, 200);
        const h1 = this.rand(50, 200);
        const w2 = w1 + this.rand(50, 200);
        const h2 = h1 + this.rand(50, 200);
        const frames = this.rand(5, 15);
        const ft = this.rand(2, frames - 1);
        const dW = (w2 - w1) / frames;
        const dH = (h2 - h1) / frames;
        const w = (w1 + dW * (ft - 1)).toFixed(2);
        const h = (h1 + dH * (ft - 1)).toFixed(2);

        return {
            question: `Size changes from ${w1}x${h1} to ${w2}x${h2} over frames 1-${frames}. What is the size at frame ${ft}?`,
            answer: `${w}, ${h}`,
            hint: `Per-frame change: dW=${dW.toFixed(2)}, dH=${dH.toFixed(2)}`
        };
    }

    generateRotation() {
        const a1 = this.rand(0, 90);
        const a2 = a1 + this.rand(45, 180);
        const frames = this.rand(5, 12);
        const ft = this.rand(2, frames - 1);
        const dAngle = (a2 - a1) / frames;
        const ans = (a1 + dAngle * (ft - 1)).toFixed(2);

        return {
            question: `Rotation from ${a1} to ${a2} degrees over frames 1-${frames}. What is the angle at frame ${ft}?`,
            answer: ans,
            hint: `Per-frame rotation: ${dAngle.toFixed(2)} degrees`
        };
    }

    generateColor() {
        const r1 = this.rand(0, 200);
        const g1 = this.rand(0, 200);
        const b1 = this.rand(0, 200);
        const r2 = this.randExclude(0, 255, r1);
        const g2 = this.randExclude(0, 255, g1);
        const b2 = this.randExclude(0, 255, b1);
        const frames = this.rand(3, 10);
        const ft = this.rand(2, frames - 1);
        const dR = (r2 - r1) / frames;
        const dG = (g2 - g1) / frames;
        const dB = (b2 - b1) / frames;
        const r = Math.round(r1 + dR * (ft - 1));
        const g = Math.round(g1 + dG * (ft - 1));
        const b = Math.round(b1 + dB * (ft - 1));

        return {
            question: `RGB changes from (${r1},${g1},${b1}) to (${r2},${g2},${b2}) over frames 1-${frames}. What is the RGB at frame ${ft}?`,
            answer: `${r}, ${g}, ${b}`,
            hint: `Per-frame change: dR=${dR.toFixed(1)}, dG=${dG.toFixed(1)}, dB=${dB.toFixed(1)}`
        };
    }

    generateOpacity() {
        const o1 = this.rand(0, 100);
        const o2 = this.randExclude(o1 + 50, 255, o1);
        const frames = this.rand(3, 10);
        const ft = this.rand(2, frames - 1);
        const dO = (o2 - o1) / frames;
        const ans = Math.round(o1 + dO * (ft - 1));

        return {
            question: `Opacity changes from ${o1} to ${o2} over frames 1-${frames}. What is the value at frame ${ft}?`,
            answer: ans.toString(),
            hint: `Per-frame change: ${dO.toFixed(2)}`
        };
    }

    generateFPS() {
        const duration = this.rand(10, 120);
        const fps = this.rand(24, 60);
        const total = duration * fps;

        return {
            question: `A ${duration} second video has ${total} frames. What is the FPS?`,
            answer: fps.toString(),
            hint: `${total}/${duration} = FPS`
        };
    }

    // Color Tools
    generateRgbToCmy() {
        const r = this.rand(0, 255);
        const g = this.rand(0, 255);
        const b = this.rand(0, 255);
        const c = (1 - r/255 * 100).toFixed(2);
        const m = (1 - g/255 * 100).toFixed(2);
        const y = (1 - b/255 * 100).toFixed(2);

        return {
            question: `Convert RGB(${r}, ${g}, ${b}) to CMY?`,
            answer: `${c}, ${m}, ${y}`,
            hint: `C=1-R/255, M=1-G/255, Y=1-B/255`
        };
    }

    generateCmyToRgb() {
        const c = this.rand(0, 100);
        const m = this.rand(0, 100);
        const y = this.rand(0, 100);
        const r = Math.round(255 * (1 - c/100));
        const g = Math.round(255 * (1 - m/100));
        const b = Math.round(255 * (1 - y/100));

        return {
            question: `Convert CMY(${c}%, ${m}%, ${y}%) to RGB?`,
            answer: `${r}, ${g}, ${b}`,
            hint: `R=255*(1-C/100)`
        };
    }

    generateRgbToCmyk() {
        const r = this.rand(0, 255);
        const g = this.rand(0, 255);
        const b = this.rand(0, 255);
        let r1 = r/255, g1 = g/255, b1 = b/255;
        const k = 1 - Math.max(r1, g1, b1);
        if (k === 1) {
            return { question: `Convert RGB(${r}, ${g}, ${b}) to CMYK?`, answer: `0, 0, 0, 100`, hint: `Pure black` };
        }
        const c = ((1-r1-k)/(1-k)*100).toFixed(2);
        const m = ((1-g1-k)/(1-k)*100).toFixed(2);
        const y = ((1-b1-k)/(1-k)*100).toFixed(2);
        const kp = (k*100).toFixed(2);

        return {
            question: `Convert RGB(${r}, ${g}, ${b}) to CMYK?`,
            answer: `${c}, ${m}, ${y}, ${kp}`,
            hint: `K=1-max(R,G,B)`
        };
    }

    generateCmykToRgb() {
        const c = this.rand(0, 100);
        const m = this.rand(0, 100);
        const y = this.rand(0, 100);
        const k = this.rand(0, 100);
        const r = Math.round(255 * (1-c/100) * (1-k/100));
        const g = Math.round(255 * (1-m/100) * (1-k/100));
        const b = Math.round(255 * (1-y/100) * (1-k/100));

        return {
            question: `Convert CMYK(${c}, ${m}, ${y}, ${k}) to RGB?`,
            answer: `${r}, ${g}, ${b}`,
            hint: `R=255*(1-C)*(1-K)`
        };
    }

    generateYuv() {
        const r = this.rand(0, 255);
        const g = this.rand(0, 255);
        const b = this.rand(0, 255);
        const y = Math.round(0.299*r + 0.587*g + 0.114*b);
        const u = Math.round((b-y)*0.492 + 128);
        const v = Math.round((r-y)*0.877 + 128);

        return {
            question: `Convert RGB(${r}, ${g}, ${b}) to YUV. What is the Y value?`,
            answer: y.toString(),
            hint: `Y = 0.299*R + 0.587*G + 0.114*B`
        };
    }

    generateHex() {
        const r = this.rand(0, 255);
        const g = this.rand(0, 255);
        const b = this.rand(0, 255);
        const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`.toUpperCase();

        return {
            question: `What is the RGB value of ${hex}?`,
            answer: `${r}, ${g}, ${b}`,
            hint: `Hex to RGB: each hex pair to decimal`
        };
    }

    // Image Tools
    generateImageSize() {
        const widths = [640, 800, 1024, 1280, 1920, 2560];
        const heights = [480, 600, 768, 720, 1080, 1440];
        const idx = this.rand(0, widths.length - 1);
        const w = widths[idx];
        const h = heights[idx];
        const types = ['color', 'grayscale', 'binary'];
        const type = types[this.rand(0, 2)];
        const typeName = type === 'color' ? '24-bit color' : type === 'grayscale' ? '8-bit grayscale' : '1-bit binary';
        const bpp = type === 'color' ? 3 : type === 'grayscale' ? 1 : 0.125;
        const bytes = w * h * bpp;
        const mb = (bytes/1024/1024).toFixed(2);

        return {
            question: `What is the file size (MB) of a ${w}x${h} ${typeName} image?`,
            answer: mb,
            hint: `W*H*${bpp} bytes /1024/1024`
        };
    }

    generateGrayscale() {
        const r = this.rand(0, 255);
        const g = this.rand(0, 255);
        const b = this.rand(0, 255);
        const gray = Math.round(0.299*r + 0.587*g + 0.114*b);

        return {
            question: `Convert RGB(${r}, ${g}, ${b}) to grayscale value?`,
            answer: gray.toString(),
            hint: `0.299*R + 0.587*G + 0.114*B`
        };
    }

    generateNegative() {
        const v = this.rand(0, 255);
        const ans = 255 - v;

        return {
            question: `What is the negative of pixel value ${v}?`,
            answer: ans.toString(),
            hint: `255 - ${v}`
        };
    }

    generateThreshold() {
        const pixels = Array.from({length: 5}, () => this.rand(0, 255));
        const avg = pixels.reduce((a,b) => a+b, 0) / pixels.length;

        return {
            question: `What is the average (threshold) of pixel values [${pixels.join(', ')}]?`,
            answer: avg.toFixed(1),
            hint: `Sum divided by count`
        };
    }

    generateBrightness() {
        const v = this.rand(50, 200);
        const change = this.rand(10, 100);
        const type = this.rand(0, 1) ? 'increase' : 'decrease';
        const ans = type === 'increase' ? Math.min(255, v + change) : Math.max(0, v - change);

        return {
            question: `Pixel value is ${v}. After ${type === 'increase' ? 'increasing' : 'decreasing'} by ${change}, what is the result?`,
            answer: ans.toString(),
            hint: type === 'increase' ? `min(255, ${v}+${change})` : `max(0, ${v}-${change})`
        };
    }

    generateResolution() {
        const widths = [640, 800, 1024, 1280, 1920, 2560];
        const heights = [480, 600, 768, 720, 1080, 1440];
        const idx = this.rand(0, widths.length - 1);
        const w = widths[idx];
        const h = heights[idx];
        const total = w * h;

        return {
            question: `Resolution is ${w}x${h}. What is the total pixel count?`,
            answer: total.toLocaleString(),
            hint: `${w} * ${h}`
        };
    }

    // Compression Tools
    generateRLE() {
        const chars = ['A', 'B', 'C', 'X', 'Y', 'Z'];
        const c1 = chars[this.rand(0, 2)];
        const c2 = chars[this.rand(3, 5)];
        const n1 = this.rand(2, 5);
        const n2 = this.rand(2, 5);
        const input = c1.repeat(n1) + c2.repeat(n2);

        return {
            question: `Compress "${input}" using RLE?`,
            answer: `${c1}${n1}${c2}${n2}`,
            hint: `Character + repeat count`
        };
    }

    generateHuffman() {
        const chars = ['A', 'B', 'C', 'D'];
        const text = chars[0].repeat(this.rand(3, 6)) + chars[1].repeat(this.rand(2, 4));
        const freqA = text.split(chars[0]).length - 1;

        return {
            question: `How many times does character "${chars[0]}" appear in "${text}"?`,
            answer: freqA.toString(),
            hint: `Count occurrences`
        };
    }

    generateLZW() {
        const chars = ['A', 'B', 'C'];
        const input = chars[0] + chars[1] + chars[0] + chars[1];

        return {
            question: `What is the LZW compressed output for "${input}" (first 4 codes)?`,
            answer: `${chars[0].charCodeAt(0)}, ${chars[1].charCodeAt(0)}, ${chars[0].charCodeAt(0)}, ${chars[1].charCodeAt(0)}`,
            hint: `Use ASCII codes`
        };
    }

    generateArithmetic() {
        const freqA = this.rand(1, 5);
        const freqB = this.rand(1, 5);
        const total = freqA + freqB;
        const prob = (freqA / total).toFixed(2);

        return {
            question: `Symbol frequencies: a:${freqA}, b:${freqB}. What is the probability of a?`,
            answer: prob,
            hint: `${freqA}/${total}`
        };
    }

    generateCompressionRatio() {
        const original = this.rand(5, 20) * 100;
        const ratio = this.rand(2, 5);
        const compressed = Math.round(original / ratio);

        return {
            question: `Original size: ${original} bytes. Compressed size: ${compressed} bytes. What is the compression ratio?`,
            answer: `${ratio}:1`,
            hint: `${original}/${compressed}`
        };
    }

    // Audio Tools
    generateAudioSize() {
        const sampleRates = [22050, 44100, 48000];
        const bitDepths = [8, 16, 24];
        const channels = [1, 2];
        const sr = sampleRates[this.rand(0, 2)];
        const bd = bitDepths[this.rand(0, 2)];
        const ch = channels[this.rand(0, 1)];
        const dur = this.rand(5, 30);
        const bytes = sr * (bd/8) * ch * dur;
        const mb = (bytes/1024/1024).toFixed(2);

        return {
            question: `${sr/1000}kHz, ${bd}bit, ${ch === 1 ? 'mono' : 'stereo'}, ${dur}s. What is the size in MB?`,
            answer: mb,
            hint: `SampleRate*BitDepth/8*Channels*Duration /1024/1024`
        };
    }

    generateAudioDuration() {
        const sampleRates = [22050, 44100];
        const bitDepths = [8, 16];
        const channels = [1, 2];
        const sr = sampleRates[this.rand(0, 1)];
        const bd = bitDepths[this.rand(0, 1)];
        const ch = channels[this.rand(0, 1)];
        const mb = this.rand(1, 20);
        const bytes = mb * 1024 * 1024;
        const secs = bytes / (sr * (bd/8) * ch);

        return {
            question: `${mb}MB file at ${sr/1000}kHz, ${bd}bit, ${ch === 1 ? 'mono' : 'stereo'}. Duration in seconds?`,
            answer: secs.toFixed(1),
            hint: `${mb}*1024*1024 / (${sr}*${bd/8}*${ch})`
        };
    }

    generateBitrate() {
        const sampleRates = [11025, 22050, 44100, 48000];
        const bitDepths = [8, 16, 24];
        const channels = [1, 2];
        const sr = sampleRates[this.rand(0, 3)];
        const bd = bitDepths[this.rand(0, 2)];
        const ch = channels[this.rand(0, 1)];
        const bps = sr * bd * ch;
        const kbps = (bps / 1000).toFixed(0);

        return {
            question: `${sr}Hz, ${bd}bit, ${ch === 1 ? 'mono' : 'stereo'}. Bitrate in kbps?`,
            answer: kbps,
            hint: `${sr}*${bd}*${ch}/1000`
        };
    }

    generateDb() {
        const type = this.rand(0, 1) ? 'amplitude' : 'power';
        const values = [2, 4, 5, 10, 100];
        const v = values[this.rand(0, 4)];
        const db = type === 'amplitude' ? 20*Math.log10(v) : 10*Math.log10(v);

        return {
            question: `What is the dB value for power ratio ${v}? (Use power calculation)`,
            answer: db.toFixed(2),
            hint: `10*log10(${v})`
        };
    }

    check(userAnswer) {
        if (!this.currentQuestion) return { correct: false, answer: "", hint: "" };
        
        const user = userAnswer.toString().toLowerCase().trim();
        const correct = this.currentQuestion.answer.toString().toLowerCase().trim();
        
        return {
            correct: user === correct,
            answer: this.currentQuestion.answer,
            hint: this.currentQuestion.hint
        };
    }
}

window.QuizManager = new QuizManager();
