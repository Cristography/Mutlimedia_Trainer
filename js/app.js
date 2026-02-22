// Multimedia Utilities - Main Application
// Modular Architecture for Animation, Colors, Image Processing, Compression, Audio

// ==================== MODULE: Animation ====================
const AnimationModule = {
    // Position Interpolation Calculator
    calculatePosition(formData) {
        const { x1, y1, x2, y2, frame1, frame2, targetFrame } = formData;
        
        const nf = frame2 - frame1;
        const dx = (x2 - x1) / nf;
        const dy = (y2 - y1) / nf;
        
        const targetX = x1 + dx * (targetFrame - frame1);
        const targetY = y1 + dy * (targetFrame - frame1);
        
        return {
            perFrame: { dx: dx.toFixed(2), dy: dy.toFixed(2) },
            position: { x: targetX.toFixed(2), y: targetY.toFixed(2) },
            nf: nf
        };
    },

    // Size Interpolation Calculator
    calculateSize(formData) {
        const { w1, h1, w2, h2, frames, targetFrame } = formData;
        
        const dW = (w2 - w1) / frames;
        const dH = (h2 - h1) / frames;
        
        const targetW = w1 + dW * (targetFrame - 1);
        const targetH = h1 + dH * (targetFrame - 1);
        
        const area = targetW * targetH;
        const perimeter = 2 * (targetW + targetH);
        
        return {
            perFrame: { dW: dW.toFixed(2), dH: dH.toFixed(2) },
            dimensions: { width: targetW.toFixed(2), height: targetH.toFixed(2) },
            area: area.toFixed(2),
            perimeter: perimeter.toFixed(2)
        };
    },

    // Rotation Interpolation Calculator
    calculateRotation(formData) {
        const { angle1, angleChange, direction, frames, targetFrame } = formData;
        
        let finalAngle;
        if (direction === 'cw') {
            finalAngle = angle1 + angleChange;
        } else {
            finalAngle = angle1 - angleChange;
        }
        
        const dAngle = (finalAngle - angle1) / frames;
        const targetAngle = angle1 + dAngle * (targetFrame - 1);
        
        return {
            perFrame: dAngle.toFixed(2),
            finalAngle: finalAngle.toFixed(2),
            targetAngle: targetAngle.toFixed(2)
        };
    },

    // Color Interpolation Calculator
    calculateColor(formData) {
        const { r1, g1, b1, r2, g2, b2, frames, targetFrame } = formData;
        
        const dR = (r2 - r1) / frames;
        const dG = (g2 - g1) / frames;
        const dB = (b2 - b1) / frames;
        
        const targetR = Math.round(r1 + dR * (targetFrame - 1));
        const targetG = Math.round(g1 + dG * (targetFrame - 1));
        const targetB = Math.round(b1 + dB * (targetFrame - 1));
        
        const hexColor = `#${targetR.toString(16).padStart(2, '0')}${targetG.toString(16).padStart(2, '0')}${targetB.toString(16).padStart(2, '0')}`.toUpperCase();
        
        return {
            perFrame: { dR: dR.toFixed(2), dG: dG.toFixed(2), dB: dB.toFixed(2) },
            rgb: { r: targetR, g: targetG, b: targetB },
            hex: hexColor,
            colorPreview: `rgb(${targetR}, ${targetG}, ${targetB})`
        };
    },

    // Opacity Interpolation Calculator
    calculateOpacity(formData) {
        const { opacity1, opacity2, frames, targetFrame } = formData;
        
        const dOpacity = (opacity2 - opacity1) / frames;
        const targetOpacity = Math.round(opacity1 + dOpacity * (targetFrame - 1));
        
        return {
            perFrame: dOpacity.toFixed(2),
            targetOpacity: targetOpacity,
            percentage: ((targetOpacity / 255) * 100).toFixed(1) + '%'
        };
    },

    // FPS Calculator
    calculateFPS(duration, totalFrames) {
        return totalFrames / duration;
    }
};

// ==================== MODULE: Color Models ====================
const ColorModule = {
    // RGB to CMY
    rgbToCmy(r, g, b) {
        const c = 1 - (r / 255);
        const m = 1 - (g / 255);
        const y = 1 - (b / 255);
        return {
            c: (c * 100).toFixed(2) + '%',
            m: (m * 100).toFixed(2) + '%',
            y: (y * 100).toFixed(2) + '%'
        };
    },

    // CMY to RGB
    cmyToRgb(c, m, y) {
        const cfrac = c / 100;
        const mfrac = m / 100;
        const yfrac = y / 100;
        
        const r = Math.round(255 * (1 - cfrac));
        const g = Math.round(255 * (1 - mfrac));
        const b = Math.round(255 * (1 - yfrac));
        
        return { r, g, b };
    },

    // RGB to CMYK
    rgbToCmyk(r, g, b) {
        let rNorm = r / 255;
        let gNorm = g / 255;
        let bNorm = b / 255;
        
        const k = 1 - Math.max(rNorm, gNorm, bNorm);
        
        if (k === 1) {
            return { c: 0, m: 0, y: 0, k: 100 };
        }
        
        const c = ((1 - rNorm - k) / (1 - k) * 100).toFixed(2);
        const m = ((1 - gNorm - k) / (1 - k) * 100).toFixed(2);
        const y = ((1 - bNorm - k) / (1 - k) * 100).toFixed(2);
        
        return { c: c + '%', m: m + '%', y: y + '%', k: (k * 100).toFixed(2) + '%' };
    },

    // CMYK to RGB
    cmykToRgb(c, m, y, k) {
        const cfrac = c / 100;
        const mfrac = m / 100;
        const yfrac = y / 100;
        const kfrac = k / 100;
        
        const r = Math.round(255 * (1 - cfrac) * (1 - kfrac));
        const g = Math.round(255 * (1 - mfrac) * (1 - kfrac));
        const b = Math.round(255 * (1 - yfrac) * (1 - kfrac));
        
        return { r, g, b };
    },

    // RGB to YUV
    rgbToYuv(r, g, b) {
        const y = 0.299 * r + 0.587 * g + 0.114 * b;
        const u = (b - y) * 0.492;
        const v = (r - y) * 0.877;
        
        return {
            y: Math.round(y),
            u: Math.round(u + 128),
            v: Math.round(v + 128)
        };
    },

    // Hex to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    // RGB to Hex
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    }
};

// ==================== MODULE: Image Processing ====================
const ImageModule = {
    // Calculate Image Size
    calculateSize(width, height, type) {
        let bytesPerPixel;
        switch(type) {
            case 'color': bytesPerPixel = 3; break;
            case 'grayscale': bytesPerPixel = 1; break;
            case 'binary': bytesPerPixel = 0.125; break;
        }
        
        const totalBytes = width * height * bytesPerPixel;
        
        return {
            bytes: totalBytes,
            kb: (totalBytes / 1024).toFixed(2),
            mb: (totalBytes / (1024 * 1024)).toFixed(4)
        };
    },

    // Convert to Grayscale
    toGrayscale(r, g, b) {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        return {
            value: Math.round(gray),
            formula: `0.299×${r} + 0.587×${g} + 0.114×${b} = ${gray.toFixed(2)}`
        };
    },

    // Negative
    negative(value) {
        return 255 - value;
    },

    // Threshold
    calculateThreshold(pixels, method, manualValue) {
        const pixelArray = pixels.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p));
        
        if (pixelArray.length === 0) {
            return { error: 'يرجى إدخال قيم صحيحة مفصولة بفواصل' };
        }
        
        let threshold;
        if (method === 'mean') {
            const sum = pixelArray.reduce((a, b) => a + b, 0);
            threshold = sum / pixelArray.length;
        } else {
            threshold = manualValue;
        }
        
        const binary = pixelArray.map(p => p >= threshold ? 1 : 0);
        
        return {
            threshold: threshold.toFixed(2),
            binary: binary.join(', '),
            original: pixelArray.join(', '),
            '1s count': binary.filter(x => x === 1).length,
            '0s count': binary.filter(x => x === 0).length
        };
    },

    // Brightness Adjustment
    adjustBrightness(value, type, change) {
        let result;
        if (type === 'increase') {
            result = Math.min(255, value + change);
        } else {
            result = Math.max(0, value - change);
        }
        
        return {
            original: value,
            result: result,
            change: result - value,
            formula: `${value} ${type === 'increase' ? '+' : '-'} ${change} = ${result}`
        };
    },

    // Resolution
    calculateResolution(width, height) {
        const total = width * height;
        const megapixels = total / 1000000;
        
        return {
            total: total,
            megapixels: megapixels.toFixed(2) + ' MP',
            aspectRatio: this.gcd(width, height) ? `${width/this.gcd(width, height)}:${height/this.gcd(width, height)}` : 'N/A'
        };
    },
    
    gcd(a, b) {
        return b === 0 ? a : this.gcd(b, a % b);
    }
};

// ==================== MODULE: Compression ====================
const CompressionModule = {
    // RLE Compression
    rleCompress(data) {
        if (!data || data.length === 0) return { error: 'يرجى إدخال البيانات' };
        
        let compressed = [];
        let count = 1;
        
        for (let i = 1; i <= data.length; i++) {
            if (i < data.length && data[i] === data[i-1]) {
                count++;
            } else {
                compressed.push(`(${data[i-1]}, ${count})`);
                count = 1;
            }
        }
        
        return {
            original: data,
            compressed: compressed.join(' '),
            originalLength: data.length,
            compressedLength: compressed.join('').length,
            ratio: (data.length / compressed.join('').length).toFixed(2)
        };
    },

    rleDecompress(data) {
        if (!data) return { error: 'يرجى إدخال البيانات' };
        
        try {
            const pairs = data.match(/\([\w\s],?\s*\d+\)/g);
            if (!pairs) return { error: 'صيغة البيانات غير صحيحة' };
            
            let decompressed = '';
            pairs.forEach(pair => {
                const match = pair.match(/\(([\w\s]),\s*(\d+)\)/);
                if (match) {
                    decompressed += match[1].repeat(parseInt(match[2]));
                }
            });
            
            return {
                compressed: data,
                decompressed: decompressed,
                length: decompressed.length
            };
        } catch (e) {
            return { error: 'خطأ في فك الضغط' };
        }
    },

    // Huffman Coding
    huffmanEncode(data) {
        if (!data || data.length === 0) return { error: 'يرجى إدخال البيانات' };
        
        // Calculate frequency
        const freq = {};
        for (const char of data) {
            freq[char] = (freq[char] || 0) + 1;
        }
        
        // Build Huffman tree (simplified)
        const codes = {};
        const chars = Object.keys(freq).sort((a, b) => freq[a] - freq[b]);
        
        if (chars.length === 1) {
            codes[chars[0]] = '1';
        } else if (chars.length === 2) {
            codes[chars[0]] = '0';
            codes[chars[1]] = '1';
        } else {
            // Simple assignment for demonstration
            chars.forEach((char, index) => {
                codes[char] = index.toString(2).padStart(Math.ceil(Math.log2(chars.length)), '0');
            });
        }
        
        // Encode
        let encoded = '';
        for (const char of data) {
            encoded += codes[char];
        }
        
        return {
            frequency: freq,
            codes: codes,
            encoded: encoded,
            originalBits: data.length * 8,
            encodedBits: encoded.length,
            ratio: (data.length * 8 / encoded.length).toFixed(2)
        };
    },

    // LZW Compression
    lzwCompress(data) {
        if (!data || data.length === 0) return { error: 'يرجى إدخال البيانات' };
        
        const dictionary = {};
        let nextCode = 4;
        let output = [];
        
        // Initialize dictionary
        for (let i = 0; i < 256; i++) {
            dictionary[String.fromCharCode(i)] = i;
        }
        
        let s = data[0];
        
        for (let i = 1; i < data.length; i++) {
            const c = data[i];
            const sc = s + c;
            
            if (dictionary.hasOwnProperty(sc)) {
                s = sc;
            } else {
                output.push(dictionary[s]);
                dictionary[sc] = nextCode++;
                s = c;
            }
        }
        
        if (s) {
            output.push(dictionary[s]);
        }
        
        return {
            original: data,
            compressed: output.join(', '),
            dictionary: Object.keys(dictionary).slice(0, 20).map(k => `${k}: ${dictionary[k]}`),
            originalLength: data.length,
            compressedLength: output.length
        };
    },

    lzwDecompress(data) {
        if (!data) return { error: 'يرجى إدخال البيانات' };
        
        try {
            const codes = data.split(',').map(c => parseInt(c.trim()));
            const dictionary = {};
            let nextCode = 256;
            
            // Initialize reverse dictionary
            for (let i = 0; i < 256; i++) {
                dictionary[i] = String.fromCharCode(i);
            }
            
            let output = '';
            let s = dictionary[codes[0]];
            output += s;
            
            for (let i = 1; i < codes.length; i++) {
                const code = codes[i];
                let entry;
                
                if (dictionary.hasOwnProperty(code)) {
                    entry = dictionary[code];
                } else if (code === nextCode) {
                    entry = s + s[0];
                }
                
                output += entry;
                dictionary[nextCode++] = s + entry[0];
                s = entry;
            }
            
            return {
                compressed: data,
                decompressed: output,
                length: output.length
            };
        } catch (e) {
            return { error: 'خطأ في فك الضغط' };
        }
    },

    // Arithmetic Encoding (simplified)
    arithmeticEncode(message, freqStr) {
        if (!message || !freqStr) return { error: 'يرجى إدخال الرسالة وجدول التكرار' };
        
        try {
            // Parse frequency
            const freq = {};
            const pairs = freqStr.split(',');
            pairs.forEach(p => {
                const [char, count] = p.trim().split(':');
                freq[char.trim()] = parseInt(count);
            });
            
            // Calculate probabilities
            const total = Object.values(freq).reduce((a, b) => a + b, 0);
            const prob = {};
            let cumulative = 0;
            
            Object.keys(freq).sort().forEach(char => {
                prob[char] = { start: cumulative, end: cumulative + freq[char] / total };
                cumulative = prob[char].end;
            });
            
            // Encode
            let low = 0, high = 1;
            for (const char of message) {
                const range = high - low;
                high = low + range * prob[char].end;
                low = low + range * prob[char].start;
            }
            
            const encoded = (low + high) / 2;
            
            return {
                message: message,
                encoded: encoded.toFixed(10),
                probabilities: prob,
                range: `[${low.toFixed(6)}, ${high.toFixed(6)})`
            };
        } catch (e) {
            return { error: 'خطأ في الترميز: ' + e.message };
        }
    },

    // Compression Ratio
    calculateRatio(original, compressed) {
        const ratio = original / compressed;
        const rate = (compressed / original * 100).toFixed(2);
        
        return {
            ratio: ratio.toFixed(2) + ':1',
            rate: rate + '%',
            saved: ((original - compressed) / original * 100).toFixed(2) + '%'
        };
    }
};

// ==================== MODULE: Audio ====================
const AudioModule = {
    // Calculate File Size
    calculateFileSize(sampleRate, bitDepth, channels, duration) {
        const bytes = (sampleRate * (bitDepth / 8) * channels * duration);
        
        return {
            bytes: bytes.toFixed(0),
            kb: (bytes / 1024).toFixed(2),
            mb: (bytes / (1024 * 1024)).toFixed(4),
            gb: (bytes / (1024 * 1024 * 1024)).toFixed(6)
        };
    },

    // Calculate Duration
    calculateDuration(fileSizeMB, sampleRate, bitDepth, channels) {
        const bytes = fileSizeMB * 1024 * 1024;
        const seconds = bytes / (sampleRate * (bitDepth / 8) * channels);
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = (seconds % 60).toFixed(2);
        
        return {
            seconds: seconds.toFixed(2),
            formatted: hours > 0 ? `${hours}h ${minutes}m ${secs}s` : `${minutes}m ${secs}s`
        };
    },

    // Calculate Bitrate
    calculateBitrate(sampleRate, bitDepth, channels) {
        const bitrate = sampleRate * bitDepth * channels;
        
        return {
            bps: bitrate.toLocaleString(),
            kbps: (bitrate / 1000).toFixed(2),
            mbps: (bitrate / 1000000).toFixed(2)
        };
    },

    // dB Calculator
    calculateDB(value, type) {
        let db;
        if (type === 'amplitude') {
            db = 20 * Math.log10(value);
        } else {
            db = 10 * Math.log10(value);
        }
        
        return {
            input: value,
            result: db.toFixed(2) + ' dB',
            description: db > 0 ? 'مضخم' : db < 0 ? 'مضعف' : 'بدون تغيير'
        };
    }
};

// ==================== UI CONTROLLER ====================
class UIController {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupForms();
        this.setupColorPicker();
        this.setupThresholdMethod();
    }

    setupNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const section = link.getAttribute('data-section');
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                navMenu.classList.remove('active');
                
                if (section !== 'home') {
                    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Category cards navigation
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.getAttribute('data-category');
                document.getElementById(category).scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    setupForms() {
        // Animation Forms
        this.setupPositionForm();
        this.setupSizeForm();
        this.setupRotationForm();
        this.setupColorForm();
        this.setupOpacityForm();
        this.setupFPSForm();

        // Color Forms
        this.setupRgbToCmyForm();
        this.setupCmyToRgbForm();
        this.setupRgbToCmykForm();
        this.setupCmykToRgbForm();
        this.setupRgbToYuvForm();
        this.setupHexPickerForm();

        // Image Forms
        this.setupImageSizeForm();
        this.setupGrayscaleForm();
        this.setupNegativeForm();
        this.setupThresholdForm();
        this.setupBrightnessForm();
        this.setupResolutionForm();

        // Compression Forms
        this.setupRleForm();
        this.setupHuffmanForm();
        this.setupLzwForm();
        this.setupArithmeticForm();
        this.setupCompressionRatioForm();

        // Audio Forms
        this.setupAudioSizeForm();
        this.setupDurationForm();
        this.setupBitrateForm();
        this.setupDbForm();
    }

    // Animation Handlers
    setupPositionForm() {
        document.getElementById('positionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                x1: parseFloat(document.getElementById('posX1').value),
                y1: parseFloat(document.getElementById('posY1').value),
                x2: parseFloat(document.getElementById('posX2').value),
                y2: parseFloat(document.getElementById('posY2').value),
                frame1: parseInt(document.getElementById('posFrame1').value),
                frame2: parseInt(document.getElementById('posFrame2').value),
                targetFrame: parseInt(document.getElementById('posFrameTarget').value)
            };
            
            const result = AnimationModule.calculatePosition(formData);
            document.getElementById('positionResult').innerHTML = `
                <div class="result-label">التغيير لكل إطار</div>
                <div class="result-value">dx = ${result.perFrame.dx}, dy = ${result.perFrame.dy}</div>
                <div class="result-label" style="margin-top: 10px;">الموقع في الإطار ${formData.targetFrame}</div>
                <div class="result-value highlight">(${result.position.x}, ${result.position.y})</div>
            `;
        });
    }

    setupSizeForm() {
        document.getElementById('sizeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                w1: parseFloat(document.getElementById('sizeW1').value),
                h1: parseFloat(document.getElementById('sizeH1').value),
                w2: parseFloat(document.getElementById('sizeW2').value),
                h2: parseFloat(document.getElementById('sizeH2').value),
                frames: parseInt(document.getElementById('sizeFrames').value),
                targetFrame: parseInt(document.getElementById('sizeFrameTarget').value)
            };
            
            const result = AnimationModule.calculateSize(formData);
            document.getElementById('sizeResult').innerHTML = `
                <div class="result-label">التغيير لكل إطار</div>
                <div class="result-value">العرض: ${result.perFrame.dW}, الارتفاع: ${result.perFrame.dH}</div>
                <div class="result-label" style="margin-top: 10px;">الأبعاد في الإطار ${formData.targetFrame}</div>
                <div class="result-value highlight">عرض: ${result.dimensions.width}, ارتفاع: ${result.dimensions.height}</div>
                <div class="result-label" style="margin-top: 10px;">المساحة: ${result.area} px² | المحيط: ${result.perimeter} px</div>
            `;
        });
    }

    setupRotationForm() {
        document.getElementById('rotationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                angle1: parseFloat(document.getElementById('rotAngle1').value),
                angleChange: parseFloat(document.getElementById('rotAngleChange').value),
                direction: document.getElementById('rotDirection').value,
                frames: parseInt(document.getElementById('rotFrames').value),
                targetFrame: parseInt(document.getElementById('rotFrameTarget').value)
            };
            
            const result = AnimationModule.calculateRotation(formData);
            document.getElementById('rotationResult').innerHTML = `
                <div class="result-label">التغيير لكل إطار</div>
                <div class="result-value">${result.perFrame}°</div>
                <div class="result-label" style="margin-top: 10px;">الزاوية في الإطار ${formData.targetFrame}</div>
                <div class="result-value highlight">${result.targetAngle}°</div>
                <div class="result-label">الزاوية النهائية: ${result.finalAngle}°</div>
            `;
        });
    }

    setupColorForm() {
        document.getElementById('colorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                r1: parseInt(document.getElementById('colorR1').value),
                g1: parseInt(document.getElementById('colorG1').value),
                b1: parseInt(document.getElementById('colorB1').value),
                r2: parseInt(document.getElementById('colorR2').value),
                g2: parseInt(document.getElementById('colorG2').value),
                b2: parseInt(document.getElementById('colorB2').value),
                frames: parseInt(document.getElementById('colorFrames').value),
                targetFrame: parseInt(document.getElementById('colorFrameTarget').value)
            };
            
            const result = AnimationModule.calculateColor(formData);
            document.getElementById('colorResult').innerHTML = `
                <div class="result-label">التغيير لكل إطار</div>
                <div class="result-value">R: ${result.perFrame.dR}, G: ${result.perFrame.dG}, B: ${result.perFrame.dB}</div>
                <div class="result-label" style="margin-top: 10px;">اللون في الإطار ${formData.targetFrame}</div>
                <div class="result-value highlight" style="color: ${result.colorPreview}">RGB(${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b}) = ${result.hex}</div>
            `;
        });
    }

    setupOpacityForm() {
        document.getElementById('opacityForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                opacity1: parseInt(document.getElementById('opacity1').value),
                opacity2: parseInt(document.getElementById('opacity2').value),
                frames: parseInt(document.getElementById('opacityFrames').value),
                targetFrame: parseInt(document.getElementById('opacityFrameTarget').value)
            };
            
            const result = AnimationModule.calculateOpacity(formData);
            document.getElementById('opacityResult').innerHTML = `
                <div class="result-label">التغيير لكل إطار</div>
                <div class="result-value">${result.perFrame}</div>
                <div class="result-label" style="margin-top: 10px;">الشفافية في الإطار ${formData.targetFrame}</div>
                <div class="result-value highlight">${result.targetOpacity} (${result.percentage})</div>
            `;
        });
    }

    setupFPSForm() {
        document.getElementById('fpsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const duration = parseFloat(document.getElementById('fpsDuration').value);
            const totalFrames = parseInt(document.getElementById('fpsTotal').value);
            
            const fps = AnimationModule.calculateFPS(duration, totalFrames);
            document.getElementById('fpsResult').innerHTML = `
                <div class="result-value highlight">${fps.toFixed(2)} FPS</div>
            `;
        });
    }

    // Color Handlers
    setupRgbToCmyForm() {
        document.getElementById('rgbToCmyForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const r = parseInt(document.getElementById('rgbR').value);
            const g = parseInt(document.getElementById('rgbG').value);
            const b = parseInt(document.getElementById('rgbB').value);
            
            const result = ColorModule.rgbToCmy(r, g, b);
            document.getElementById('rgbToCmyResult').innerHTML = `
                <div class="result-label">CMY</div>
                <div class="result-value highlight">C: ${result.c}, M: ${result.m}, Y: ${result.y}</div>
            `;
        });
    }

    setupCmyToRgbForm() {
        document.getElementById('cmyToRgbForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const c = parseFloat(document.getElementById('cmyC').value);
            const m = parseFloat(document.getElementById('cmyM').value);
            const y = parseFloat(document.getElementById('cmyY').value);
            
            const result = ColorModule.cmyToRgb(c, m, y);
            document.getElementById('cmyToRgbResult').innerHTML = `
                <div class="result-label">RGB</div>
                <div class="result-value highlight">R: ${result.r}, G: ${result.g}, B: ${result.b}</div>
            `;
        });
    }

    setupRgbToCmykForm() {
        document.getElementById('rgbToCmykForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const r = parseInt(document.getElementById('rgbCmykR').value);
            const g = parseInt(document.getElementById('rgbCmykG').value);
            const b = parseInt(document.getElementById('rgbCmykB').value);
            
            const result = ColorModule.rgbToCmyk(r, g, b);
            document.getElementById('rgbToCmykResult').innerHTML = `
                <div class="result-label">CMYK</div>
                <div class="result-value highlight">C: ${result.c}, M: ${result.m}, Y: ${result.y}, K: ${result.k}</div>
            `;
        });
    }

    setupCmykToRgbForm() {
        document.getElementById('cmykToRgbForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const c = parseFloat(document.getElementById('cmykC').value);
            const m = parseFloat(document.getElementById('cmykM').value);
            const y = parseFloat(document.getElementById('cmykY').value);
            const k = parseFloat(document.getElementById('cmykK').value);
            
            const result = ColorModule.cmykToRgb(c, m, y, k);
            document.getElementById('cmykToRgbResult').innerHTML = `
                <div class="result-label">RGB</div>
                <div class="result-value highlight">R: ${result.r}, G: ${result.g}, B: ${result.b}</div>
            `;
        });
    }

    setupRgbToYuvForm() {
        document.getElementById('rgbToYuvForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const r = parseInt(document.getElementById('yuvR').value);
            const g = parseInt(document.getElementById('yuvG').value);
            const b = parseInt(document.getElementById('yuvB').value);
            
            const result = ColorModule.rgbToYuv(r, g, b);
            document.getElementById('rgbToYuvResult').innerHTML = `
                <div class="result-label">YUV</div>
                <div class="result-value highlight">Y: ${result.y}, U: ${result.u}, V: ${result.v}</div>
            `;
        });
    }

    setupColorPicker() {
        const colorPicker = document.getElementById('colorPicker');
        const hexInput = document.getElementById('hexInput');
        
        colorPicker.addEventListener('input', (e) => {
            hexInput.value = e.target.value.toUpperCase();
        });
        
        document.getElementById('hexPickerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const hex = document.getElementById('hexInput').value;
            const result = ColorModule.hexToRgb(hex);
            
            if (result) {
                document.getElementById('hexPickerResult').innerHTML = `
                    <div class="result-label">RGB</div>
                    <div class="result-value highlight">R: ${result.r}, G: ${result.g}, B: ${result.b}</div>
                    <div style="margin-top: 10px; padding: 10px; background: ${hex}; border-radius: 5px; text-align: center; color: white; font-weight: bold;">${hex}</div>
                `;
            } else {
                document.getElementById('hexPickerResult').innerHTML = '<div class="error">صيغة Hex غير صحيحة</div>';
            }
        });
    }

    // Image Processing Handlers
    setupImageSizeForm() {
        document.getElementById('imageSizeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const width = parseInt(document.getElementById('imgWidth').value);
            const height = parseInt(document.getElementById('imgHeight').value);
            const type = document.getElementById('imageType').value;
            
            const result = ImageModule.calculateSize(width, height, type);
            document.getElementById('imageSizeResult').innerHTML = `
                <div class="result-label">حجم الملف</div>
                <div class="result-value">${result.bytes} بايت</div>
                <div class="result-value highlight">${result.kb} KB</div>
                <div class="result-value">${result.mb} MB</div>
            `;
        });
    }

    setupGrayscaleForm() {
        document.getElementById('grayscaleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const r = parseInt(document.getElementById('grayR').value);
            const g = parseInt(document.getElementById('grayG').value);
            const b = parseInt(document.getElementById('grayB').value);
            
            const result = ImageModule.toGrayscale(r, g, b);
            document.getElementById('grayscaleResult').innerHTML = `
                <div class="result-label">القيمة الرمادية</div>
                <div class="result-value highlight">${result.value}</div>
                <div class="result-label" style="margin-top: 5px; font-size: 0.8rem;">${result.formula}</div>
            `;
        });
    }

    setupNegativeForm() {
        document.getElementById('negativeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const value = parseInt(document.getElementById('negativeValue').value);
            
            const result = ImageModule.negative(value);
            document.getElementById('negativeResult').innerHTML = `
                <div class="result-label">القيمة الجديدة (255 - ${value})</div>
                <div class="result-value highlight">${result}</div>
            `;
        });
    }

    setupThresholdMethod() {
        const methodSelect = document.getElementById('thresholdMethod');
        const manualGroup = document.getElementById('manualThresholdGroup');
        
        methodSelect.addEventListener('change', (e) => {
            manualGroup.style.display = e.target.value === 'manual' ? 'block' : 'none';
        });
    }

    setupThresholdForm() {
        document.getElementById('thresholdForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const pixels = document.getElementById('thresholdPixels').value;
            const method = document.getElementById('thresholdMethod').value;
            const manualValue = parseInt(document.getElementById('manualThreshold').value);
            
            const result = ImageModule.calculateThreshold(pixels, method, manualValue);
            
            if (result.error) {
                document.getElementById('thresholdResult').innerHTML = `<div class="error">${result.error}</div>`;
            } else {
                document.getElementById('thresholdResult').innerHTML = `
                    <div class="result-label">العتبة: ${result.threshold}</div>
                    <div class="result-label">القيم الثنائية</div>
                    <div class="result-value">${result.binary}</div>
                    <div class="result-label" style="margin-top: 5px;">أصفار: ${result['0s count']} | آحاد: ${result['1s count']}</div>
                `;
            }
        });
    }

    setupBrightnessForm() {
        document.getElementById('brightnessForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const value = parseInt(document.getElementById('brightnessValue').value);
            const type = document.getElementById('brightnessType').value;
            const change = parseInt(document.getElementById('brightnessChange').value);
            
            const result = ImageModule.adjustBrightness(value, type, change);
            document.getElementById('brightnessResult').innerHTML = `
                <div class="result-label">النتيجة</div>
                <div class="result-value highlight">${result.result}</div>
                <div class="result-label">${result.formula}</div>
            `;
        });
    }

    setupResolutionForm() {
        document.getElementById('resolutionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const width = parseInt(document.getElementById('resWidth').value);
            const height = parseInt(document.getElementById('resHeight').value);
            
            const result = ImageModule.calculateResolution(width, height);
            document.getElementById('resolutionResult').innerHTML = `
                <div class="result-label">إجمالي البكسالات</div>
                <div class="result-value">${result.total.toLocaleString()}</div>
                <div class="result-value highlight">${result.megapixels}</div>
                <div class="result-label">نسبة العرض:الارتفاع = ${result.aspectRatio}</div>
            `;
        });
    }

    // Compression Handlers
    setupRleForm() {
        document.getElementById('rleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const data = document.getElementById('rleInput').value;
            const result = CompressionModule.rleCompress(data);
            
            if (result.error) {
                document.getElementById('rleResult').innerHTML = `<div class="error">${result.error}</div>`;
            } else {
                document.getElementById('rleResult').innerHTML = `
                    <div class="result-label">البيانات المضغوطة</div>
                    <div class="result-value">${result.compressed}</div>
                    <div class="result-label" style="margin-top: 5px;">نسبة الضغط: ${result.ratio}</div>
                `;
            }
        });

        document.getElementById('rleDecompress').addEventListener('click', () => {
            const data = document.getElementById('rleInput').value;
            const result = CompressionModule.rleDecompress(data);
            
            if (result.error) {
                document.getElementById('rleResult').innerHTML = `<div class="error">${result.error}</div>`;
            } else {
                document.getElementById('rleResult').innerHTML = `
                    <div class="result-label">البيانات الأصلية</div>
                    <div class="result-value">${result.decompressed}</div>
                `;
            }
        });
    }

    setupHuffmanForm() {
        document.getElementById('huffmanForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const data = document.getElementById('huffmanInput').value;
            const result = CompressionModule.huffmanEncode(data);
            
            if (result.error) {
                document.getElementById('huffmanResult').innerHTML = `<div class="error">${result.error}</div>`;
            } else {
                let codesHtml = '';
                for (const [char, code] of Object.entries(result.codes)) {
                    codesHtml += `<span>${char}: ${code}</span> `;
                }
                
                document.getElementById('huffmanResult').innerHTML = `
                    <div class="result-label">الترميز</div>
                    <div class="result-value" style="font-size: 0.85rem;">${codesHtml}</div>
                    <div class="result-label" style="margin-top: 5px;">النتيجة</div>
                    <div class="result-value highlight">${result.encoded}</div>
                    <div class="result-label">نسبة الضغط: ${result.ratio}</div>
                `;
            }
        });
    }

    setupLzwForm() {
        document.getElementById('lzwForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const data = document.getElementById('lzwInput').value;
            const result = CompressionModule.lzwCompress(data);
            
            if (result.error) {
                document.getElementById('lzwResult').innerHTML = `<div class="error">${result.error}</div>`;
            } else {
                document.getElementById('lzwResult').innerHTML = `
                    <div class="result-label">البيانات المضغوطة</div>
                    <div class="result-value">${result.compressed}</div>
                `;
            }
        });

        document.getElementById('lzwDecompress').addEventListener('click', () => {
            const data = document.getElementById('lzwInput').value;
            const result = CompressionModule.lzwDecompress(data);
            
            if (result.error) {
                document.getElementById('lzwResult').innerHTML = `<div class="error">${result.error}</div>`;
            } else {
                document.getElementById('lzwResult').innerHTML = `
                    <div class="result-label">البيانات الأصلية</div>
                    <div class="result-value">${result.decompressed}</div>
                `;
            }
        });
    }

    setupArithmeticForm() {
        document.getElementById('arithmeticForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const message = document.getElementById('arithMessage').value;
            const freq = document.getElementById('arithFreq').value;
            
            const result = CompressionModule.arithmeticEncode(message, freq);
            
            if (result.error) {
                document.getElementById('arithmeticResult').innerHTML = `<div class="error">${result.error}</div>`;
            } else {
                document.getElementById('arithmeticResult').innerHTML = `
                    <div class="result-label">القيمة المشفرة</div>
                    <div class="result-value highlight">${result.encoded}</div>
                    <div class="result-label">المدى: ${result.range}</div>
                `;
            }
        });

        document.getElementById('arithDecompress').addEventListener('click', () => {
            document.getElementById('arithmeticResult').innerHTML = '<div class="error">يتطلب تنفيذ فك الترميز الحسابي</div>';
        });
    }

    setupCompressionRatioForm() {
        document.getElementById('compressionRatioForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const original = parseFloat(document.getElementById('originalSize').value);
            const compressed = parseFloat(document.getElementById('compressedSize').value);
            
            const result = CompressionModule.calculateRatio(original, compressed);
            document.getElementById('compressionRatioResult').innerHTML = `
                <div class="result-label">نسبة الضغط</div>
                <div class="result-value highlight">${result.ratio}</div>
                <div class="result-label">معدل الضغط: ${result.rate}</div>
                <div class="result-label">التوفير: ${result.saved}</div>
            `;
        });
    }

    // Audio Handlers
    setupAudioSizeForm() {
        document.getElementById('audioSizeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const sampleRate = parseInt(document.getElementById('sampleRate').value);
            const bitDepth = parseInt(document.getElementById('bitDepth').value);
            const channels = parseInt(document.getElementById('channels').value);
            const duration = parseFloat(document.getElementById('audioDuration').value);
            
            const result = AudioModule.calculateFileSize(sampleRate, bitDepth, channels, duration);
            document.getElementById('audioSizeResult').innerHTML = `
                <div class="result-label">حجم الملف</div>
                <div class="result-value">${result.bytes} بايت</div>
                <div class="result-value">${result.kb} KB</div>
                <div class="result-value highlight">${result.mb} MB</div>
            `;
        });
    }

    setupDurationForm() {
        document.getElementById('durationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const fileSizeMB = parseFloat(document.getElementById('fileSizeMB').value);
            const sampleRate = parseInt(document.getElementById('durationSampleRate').value);
            const bitDepth = parseInt(document.getElementById('durationBitDepth').value);
            const channels = parseInt(document.getElementById('durationChannels').value);
            
            const result = AudioModule.calculateDuration(fileSizeMB, sampleRate, bitDepth, channels);
            document.getElementById('durationResult').innerHTML = `
                <div class="result-label">مدة التسجيل</div>
                <div class="result-value highlight">${result.formatted}</div>
                <div class="result-value">${result.seconds} ثانية</div>
            `;
        });
    }

    setupBitrateForm() {
        document.getElementById('bitrateForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const sampleRate = parseInt(document.getElementById('bitrateSampleRate').value);
            const bitDepth = parseInt(document.getElementById('bitrateDepth').value);
            const channels = parseInt(document.getElementById('bitrateChannels').value);
            
            const result = AudioModule.calculateBitrate(sampleRate, bitDepth, channels);
            document.getElementById('bitrateResult').innerHTML = `
                <div class="result-label">معدل البت</div>
                <div class="result-value highlight">${result.kbps} kbps</div>
                <div class="result-value">${result.bps} bps</div>
            `;
        });
    }

    setupDbForm() {
        document.getElementById('dbForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const value = parseFloat(document.getElementById('dbValue').value);
            const type = document.getElementById('dbType').value;
            
            const result = AudioModule.calculateDB(value, type);
            document.getElementById('dbResult').innerHTML = `
                <div class="result-label">النتيجة</div>
                <div class="result-value highlight">${result.result}</div>
                <div class="result-label">${result.description}</div>
            `;
        });
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});
