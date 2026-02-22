// Multimedia Utilities - Main Application
// Hash-based routing for individual tool pages

const ToolsData = {
    // Animation Tools
    'tool-position': {
        title: 'حركة الموقع',
        tag: 'Position',
        category: 'animation',
        inputs: [
            { id: 'posX1', label: 'الموقع الابتدائي x', type: 'number', placeholder: 'x1' },
            { id: 'posY1', label: 'الموقع الابتدائي y', type: 'number', placeholder: 'y1' },
            { id: 'posX2', label: 'الموقع النهائي x', type: 'number', placeholder: 'x2' },
            { id: 'posY2', label: 'الموقع النهائي y', type: 'number', placeholder: 'y2' },
            { id: 'posFrame1', label: 'إطار البداية', type: 'number', value: '1' },
            { id: 'posFrame2', label: 'إطار النهاية', type: 'number', placeholder: '10' },
            { id: 'posFrameTarget', label: 'الإطار المطلوب', type: 'number', placeholder: '5' }
        ],
        calc: (d) => {
            const nf = d.posFrame2 - d.posFrame1;
            const dx = (d.posX2 - d.posX1) / nf;
            const dy = (d.posY2 - d.posY1) / nf;
            const x = d.posX1 + dx * (d.posFrameTarget - d.posFrame1);
            const y = d.posY1 + dy * (d.posFrameTarget - d.posFrame1);
            return {
                result: `(${x.toFixed(2)}, ${y.toFixed(2)})`,
                details: [`الخطوة: dx=${dx.toFixed(2)}, dy=${dy.toFixed(2)}`]
            };
        },
        visual: 'animation',
        quiz: {
            generate: () => {
                const x1 = Math.floor(Math.random() * 100);
                const y1 = Math.floor(Math.random() * 100);
                const x2 = Math.floor(Math.random() * 100) + 50;
                const y2 = Math.floor(Math.random() * 100) + 50;
                const f1 = 1;
                const f2 = 10;
                const ft = Math.floor(Math.random() * 8) + 2;
                const nf = f2 - f1;
                const dx = (x2 - x1) / nf;
                const dy = (y2 - y1) / nf;
                const ansX = (x1 + dx * (ft - f1)).toFixed(2);
                const ansY = (y1 + dy * (ft - f1)).toFixed(2);
                return {
                    question: `物体从 (${x1}, ${y1}) 移动到 (${x2}, ${y2})，帧从 ${f1} 到 ${f2}，求第 ${ft} 帧的位置？`,
                    answer: `(${ansX}, ${ansY})`,
                    hint: `先计算每帧的变化: dx = (${x2}-${x1})/${nf} = ${dx.toFixed(2)}`
                };
            }
        }
    },

    'tool-size': {
        title: 'تغيير الأبعاد',
        tag: 'Size',
        category: 'animation',
        inputs: [
            { id: 'sizeW1', label: 'العرض الابتدائي', type: 'number', placeholder: 'عرض1' },
            { id: 'sizeH1', label: 'الارتفاع الابتدائي', type: 'number', placeholder: 'ارتفاع1' },
            { id: 'sizeW2', label: 'العرض النهائي', type: 'number', placeholder: 'عرض2' },
            { id: 'sizeH2', label: 'الارتفاع النهائي', type: 'number', placeholder: 'ارتفاع2' },
            { id: 'sizeFrames', label: 'عدد الإطارات', type: 'number', placeholder: '10' },
            { id: 'sizeFrameTarget', label: 'الإطار المطلوب', type: 'number', placeholder: '5' }
        ],
        calc: (d) => {
            const dW = (d.sizeW2 - d.sizeW1) / d.sizeFrames;
            const dH = (d.sizeH2 - d.sizeH1) / d.sizeFrames;
            const w = d.sizeW1 + dW * (d.sizeFrameTarget - 1);
            const h = d.sizeH1 + dH * (d.sizeFrameTarget - 1);
            return {
                result: `عرض: ${w.toFixed(2)}, ارتفاع: ${h.toFixed(2)}`,
                details: [`المساحة: ${(w*h).toFixed(2)} px²`]
            };
        },
        visual: 'size'
    },

    'tool-rotation': {
        title: 'الدوران',
        tag: 'Rotation',
        category: 'animation',
        inputs: [
            { id: 'rotAngle1', label: 'الزاوية الابتدائية', type: 'number', value: '0' },
            { id: 'rotAngleChange', label: 'زاوية الدوران', type: 'number', placeholder: '90' },
            { id: 'rotDirection', label: 'الاتجاه', type: 'select', options: [
                { value: 'cw', label: 'مع عقارب الساعة' },
                { value: 'ccw', label: 'عكس عقارب الساعة' }
            ]},
            { id: 'rotFrames', label: 'عدد الإطارات', type: 'number', placeholder: '10' },
            { id: 'rotFrameTarget', label: 'الإطار المطلوب', type: 'number', placeholder: '5' }
        ],
        calc: (d) => {
            const final = d.rotDirection === 'cw' ? d.rotAngle1 + d.rotAngleChange : d.rotAngle1 - d.rotAngleChange;
            const dAngle = (final - d.rotAngle1) / d.rotFrames;
            const angle = d.rotAngle1 + dAngle * (d.rotFrameTarget - 1);
            return {
                result: `${angle.toFixed(2)}°`,
                details: [`الدوران لكل إطار: ${dAngle.toFixed(2)}°`]
            };
        },
        visual: 'rotation'
    },

    'tool-color': {
        title: 'تغيير اللون',
        tag: 'Color',
        category: 'animation',
        inputs: [
            { id: 'colorR1', label: 'اللون الابتدائي - أحمر', type: 'number', min: 0, max: 255, placeholder: '0' },
            { id: 'colorG1', label: 'اللون الابتدائي - أخضر', type: 'number', min: 0, max: 255, placeholder: '0' },
            { id: 'colorB1', label: 'اللون الابتدائي - أزرق', type: 'number', min: 0, max: 255, placeholder: '0' },
            { id: 'colorR2', label: 'اللون النهائي - أحمر', type: 'number', min: 0, max: 255, placeholder: '255' },
            { id: 'colorG2', label: 'اللون النهائي - أخضر', type: 'number', min: 0, max: 255, placeholder: '0' },
            { id: 'colorB2', label: 'اللون النهائي - أزرق', type: 'number', min: 0, max: 255, placeholder: '0' },
            { id: 'colorFrames', label: 'عدد الإطارات', type: 'number', placeholder: '10' },
            { id: 'colorFrameTarget', label: 'الإطار المطلوب', type: 'number', placeholder: '5' }
        ],
        calc: (d) => {
            const dR = (d.colorR2 - d.colorR1) / d.colorFrames;
            const dG = (d.colorG2 - d.colorG1) / d.colorFrames;
            const dB = (d.colorB2 - d.colorB1) / d.colorFrames;
            const r = Math.round(d.colorR1 + dR * (d.colorFrameTarget - 1));
            const g = Math.round(d.colorG1 + dG * (d.colorFrameTarget - 1));
            const b = Math.round(d.colorB1 + dB * (d.colorFrameTarget - 1));
            const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`.toUpperCase();
            return {
                result: `RGB(${r}, ${g}, ${b}) = ${hex}`,
                details: [],
                colorPreview: `rgb(${r}, ${g}, ${b})`
            };
        },
        visual: 'color',
        visualType: 'color-interpolation'
    },

    'tool-opacity': {
        title: 'الشفافية',
        tag: 'Opacity',
        category: 'animation',
        inputs: [
            { id: 'opacity1', label: 'القيمة الابتدائية', type: 'number', min: 0, max: 255, value: '0' },
            { id: 'opacity2', label: 'القيمة النهائية', type: 'number', min: 0, max: 255, value: '255' },
            { id: 'opacityFrames', label: 'عدد الإطارات', type: 'number', placeholder: '10' },
            { id: 'opacityFrameTarget', label: 'الإطار المطلوب', type: 'number', placeholder: '5' }
        ],
        calc: (d) => {
            const dO = (d.opacity2 - d.opacity1) / d.opacityFrames;
            const op = Math.round(d.opacity1 + dO * (d.opacityFrameTarget - 1));
            return {
                result: `${op} (${((op/255)*100).toFixed(1)}%)`,
                details: [`التغيير لكل إطار: ${dO.toFixed(2)}`]
            };
        },
        visual: 'opacity'
    },

    'tool-fps': {
        title: 'معدل الإطارات',
        tag: 'FPS',
        category: 'animation',
        inputs: [
            { id: 'fpsDuration', label: 'مدة الفيديو (ثواني)', type: 'number', placeholder: '60' },
            { id: 'fpsTotal', label: 'عدد الإطارات الإجمالي', type: 'number', placeholder: '1800' }
        ],
        calc: (d) => {
            const fps = d.fpsTotal / d.fpsDuration;
            return { result: `${fps.toFixed(2)} FPS`, details: [] };
        },
        visual: 'fps'
    },

    // Color Tools
    'tool-rgb-cmy': {
        title: 'RGB إلى CMY',
        tag: 'تحويل',
        category: 'colors',
        inputs: [
            { id: 'rgbR', label: 'أحمر (R)', type: 'number', min: 0, max: 255, placeholder: '255' },
            { id: 'rgbG', label: 'أخضر (G)', type: 'number', min: 0, max: 255, placeholder: '0' },
            { id: 'rgbB', label: 'أزرق (B)', type: 'number', min: 0, max: 255, placeholder: '0' }
        ],
        calc: (d) => {
            const c = (1 - d.rgbR/255 * 100).toFixed(2);
            const m = (1 - d.rgbG/255 * 100).toFixed(2);
            const y = (1 - d.rgbB/255 * 100).toFixed(2);
            return { result: `C: ${c}%, M: ${m}%, Y: ${y}%`, details: [], colorPreview: `rgb(${d.rgbR},${d.rgbG},${d.rgbB})` };
        },
        visual: 'color'
    },

    'tool-cmy-rgb': {
        title: 'CMY إلى RGB',
        tag: 'تحويل',
        category: 'colors',
        inputs: [
            { id: 'cmyC', label: 'سيان (C%)', type: 'number', min: 0, max: 100, placeholder: '0' },
            { id: 'cmyM', label: 'مجنيتا (M%)', type: 'number', min: 0, max: 100, placeholder: '100' },
            { id: 'cmyY', label: 'أصفر (Y%)', type: 'number', min: 0, max: 100, placeholder: '0' }
        ],
        calc: (d) => {
            const r = Math.round(255 * (1 - d.cmyC/100));
            const g = Math.round(255 * (1 - d.cmyM/100));
            const b = Math.round(255 * (1 - d.cmyY/100));
            return { result: `R: ${r}, G: ${g}, B: ${b}`, details: [], colorPreview: `rgb(${r},${g},${b})` };
        },
        visual: 'color'
    },

    'tool-rgb-cmyk': {
        title: 'RGB إلى CMYK',
        tag: 'تحويل',
        category: 'colors',
        inputs: [
            { id: 'rgbCmykR', label: 'أحمر (R)', type: 'number', min: 0, max: 255, placeholder: '255' },
            { id: 'rgbCmykG', label: 'أخضر (G)', type: 'number', min: 0, max: 255, placeholder: '0' },
            { id: 'rgbCmykB', label: 'أزرق (B)', type: 'number', min: 0, max: 255, placeholder: '0' }
        ],
        calc: (d) => {
            let r = d.rgbCmykR/255, g = d.rgbCmykG/255, b = d.rgbCmykB/255;
            const k = 1 - Math.max(r, g, b);
            if (k === 1) return { result: 'C: 0%, M: 0%, Y: 0%, K: 100%', details: [] };
            const c = ((1-r-k)/(1-k)*100).toFixed(2);
            const m = ((1-g-k)/(1-k)*100).toFixed(2);
            const y = ((1-b-k)/(1-k)*100).toFixed(2);
            return { result: `C: ${c}%, M: ${m}%, Y: ${y}%, K: ${(k*100).toFixed(2)}%`, details: [] };
        },
        visual: 'color'
    },

    'tool-cmyk-rgb': {
        title: 'CMYK إلى RGB',
        tag: 'تحويل',
        category: 'colors',
        inputs: [
            { id: 'cmykC', label: 'سيان (C%)', type: 'number', min: 0, max: 100, placeholder: '0' },
            { id: 'cmykM', label: 'مجنيتا (M%)', type: 'number', min: 0, max: 100, placeholder: '100' },
            { id: 'cmykY', label: 'أصفر (Y%)', type: 'number', min: 0, max: 100, placeholder: '0' },
            { id: 'cmykK', label: 'أسود (K%)', type: 'number', min: 0, max: 100, placeholder: '0' }
        ],
        calc: (d) => {
            const r = Math.round(255 * (1-d.cmykC/100) * (1-d.cmykK/100));
            const g = Math.round(255 * (1-d.cmykM/100) * (1-d.cmykK/100));
            const b = Math.round(255 * (1-d.cmykY/100) * (1-d.cmykK/100));
            return { result: `R: ${r}, G: ${g}, B: ${b}`, details: [], colorPreview: `rgb(${r},${g},${b})` };
        },
        visual: 'color'
    },

    'tool-yuv': {
        title: 'RGB إلى YUV',
        tag: 'تحويل',
        category: 'colors',
        inputs: [
            { id: 'yuvR', label: 'أحمر (R)', type: 'number', min: 0, max: 255, placeholder: '255' },
            { id: 'yuvG', label: 'أخضر (G)', type: 'number', min: 0, max: 255, placeholder: '255' },
            { id: 'yuvB', label: 'أزرق (B)', type: 'number', min: 0, max: 255, placeholder: '0' }
        ],
        calc: (d) => {
            const y = Math.round(0.299*d.yuvR + 0.587*d.yuvG + 0.114*d.yuvB);
            const u = Math.round((d.yuvB-y)*0.492 + 128);
            const v = Math.round((d.yuvR-y)*0.877 + 128);
            return { result: `Y: ${y}, U: ${u}, V: ${v}`, details: [] };
        },
        visual: 'color'
    },

    'tool-hex': {
        title: 'منتقي الألوان',
        tag: 'Hex',
        category: 'colors',
        inputs: [
            { id: 'colorPicker', label: 'اختر لون', type: 'color', value: '#ff0000' },
            { id: 'hexInput', label: 'رمز Hex', type: 'text', placeholder: '#FF0000' }
        ],
        calc: (d) => {
            const hex = d.hexInput || d.colorPicker;
            const r = parseInt(hex.slice(1,3), 16);
            const g = parseInt(hex.slice(3,5), 16);
            const b = parseInt(hex.slice(5,7), 16);
            return { result: `R: ${r}, G: ${g}, B: ${b}`, details: [], colorPreview: hex };
        },
        visual: 'color-picker'
    },

    // Image Tools
    'tool-image-size': {
        title: 'حجم الصورة',
        tag: 'Storage',
        category: 'image',
        inputs: [
            { id: 'imageType', label: 'نوع الصورة', type: 'select', options: [
                { value: 'color', label: 'ملونة (24-bit)' },
                { value: 'grayscale', label: 'رمادية (8-bit)' },
                { value: 'binary', label: 'ثنائية (1-bit)' }
            ]},
            { id: 'imgWidth', label: 'العرض (بكسالات)', type: 'number', placeholder: '1920' },
            { id: 'imgHeight', label: 'الارتفاع (بكسالات)', type: 'number', placeholder: '1080' }
        ],
        calc: (d) => {
            const bpp = d.imageType === 'color' ? 3 : d.imageType === 'grayscale' ? 1 : 0.125;
            const bytes = d.imgWidth * d.imgHeight * bpp;
            return { 
                result: `${bytes.toLocaleString()} بايت = ${(bytes/1024).toFixed(2)} KB = ${(bytes/1024/1024).toFixed(4)} MB`,
                details: [`${(d.imgWidth*d.imgHeight).toLocaleString()} بكسل`]
            };
        },
        visual: 'image'
    },

    'tool-grayscale': {
        title: 'تحويل رمادي',
        tag: 'Grayscale',
        category: 'image',
        inputs: [
            { id: 'grayR', label: 'أحمر (R)', type: 'number', min: 0, max: 255, placeholder: '128' },
            { id: 'grayG', label: 'أخضر (G)', type: 'number', min: 0, max: 255, placeholder: '64' },
            { id: 'grayB', label: 'أزرق (B)', type: 'number', min: 0, max: 255, placeholder: '32' }
        ],
        calc: (d) => {
            const gray = Math.round(0.299*d.grayR + 0.587*d.grayG + 0.114*d.grayB);
            return { result: `${gray}`, details: [`0.299×${d.grayR} + 0.587×${d.grayG} + 0.114×${d.grayB} = ${gray.toFixed(1)}`], colorPreview: `rgb(${gray},${gray},${gray})` };
        },
        visual: 'grayscale'
    },

    'tool-negative': {
        title: 'قلب الصورة',
        tag: 'Negative',
        category: 'image',
        inputs: [
            { id: 'negativeValue', label: 'قيمة البكسل', type: 'number', min: 0, max: 255, placeholder: '128' }
        ],
        calc: (d) => {
            const neg = 255 - d.negativeValue;
            return { result: `${neg}`, details: [`255 - ${d.negativeValue} = ${neg}`], colorPreview: `rgb(${neg},${neg},${neg})` };
        },
        visual: 'negative'
    },

    'tool-threshold': {
        title: 'العتبة الثنائية',
        tag: 'Threshold',
        category: 'image',
        inputs: [
            { id: 'thresholdPixels', label: 'قيم البكسلات (فصل بفواصل)', type: 'textarea', placeholder: '12, 14, 28, 40, 5, 9' },
            { id: 'thresholdMethod', label: 'الطريقة', type: 'select', options: [
                { value: 'manual', label: 'يدوي' },
                { value: 'mean', label: 'الوسط الحسابي' }
            ]},
            { id: 'manualThreshold', label: 'العتبة (يدوي)', type: 'number', min: 0, max: 255, value: '127' }
        ],
        calc: (d) => {
            const pixels = d.thresholdPixels.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
            const thresh = d.thresholdMethod === 'mean' ? pixels.reduce((a,b)=>a+b,0)/pixels.length : d.manualThreshold;
            const binary = pixels.map(p => p >= thresh ? 1 : 0);
            return { result: `العتبة: ${thresh.toFixed(1)} | النتيجة: ${binary.join(', ')}`, details: [`آحاد: ${binary.filter(x=>x).length}, أصفار: ${binary.filter(x=>!x).length}`] };
        },
        visual: 'threshold'
    },

    'tool-brightness': {
        title: 'تعديل السطوع',
        tag: 'Brightness',
        category: 'image',
        inputs: [
            { id: 'brightnessValue', label: 'قيمة البكسل', type: 'number', min: 0, max: 255, placeholder: '100' },
            { id: 'brightnessType', label: 'نوع التعديل', type: 'select', options: [
                { value: 'increase', label: 'زيادة (+)' },
                { value: 'decrease', label: 'إنقاص (-)' }
            ]},
            { id: 'brightnessChange', label: 'قيمة التغيير', type: 'number', min: 0, max: 255, value: '30' }
        ],
        calc: (d) => {
            const result = d.brightnessType === 'increase' ? Math.min(255, d.brightnessValue + d.brightnessChange) : Math.max(0, d.brightnessValue - d.brightnessChange);
            return { result: `${result}`, details: [`${d.brightnessValue} ${d.brightnessType === 'increase' ? '+' : '-'} ${d.brightnessChange} = ${result}`] };
        },
        visual: 'brightness'
    },

    'tool-resolution': {
        title: 'دقة الصورة',
        tag: 'Resolution',
        category: 'image',
        inputs: [
            { id: 'resWidth', label: 'العرض', type: 'number', placeholder: '1920' },
            { id: 'resHeight', label: 'الارتفاع', type: 'number', placeholder: '1080' }
        ],
        calc: (d) => {
            const total = d.resWidth * d.resHeight;
            const gcd = (a,b) => b===0 ? a : gcd(b, a%b);
            const g = gcd(d.resWidth, d.resHeight);
            return { result: `${total.toLocaleString()} بكسل (${(total/1000000).toFixed(2)} MP)`, details: [`نسبة العرض:الارتفاع = ${d.resWidth/g}:${d.resHeight/g}`] };
        },
        visual: 'resolution'
    },

    // Compression Tools
    'tool-rle': {
        title: 'ضغط RLE',
        tag: 'RLE',
        category: 'compression',
        inputs: [
            { id: 'rleInput', label: 'البيانات', type: 'text', placeholder: 'AAAAABBBCCDAA' }
        ],
        calc: (d) => {
            let compressed = [], count = 1;
            for (let i = 1; i <= d.rleInput.length; i++) {
                if (i < d.rleInput.length && d.rleInput[i] === d.rleInput[i-1]) count++;
                else { compressed.push(`${d.rleInput[i-1]}${count}`); count = 1; }
            }
            return { result: compressed.join(' '), details: [`Original: ${d.rleInput.length} bytes`, `Compressed: ${compressed.join('').length} bytes`, `Ratio: ${(d.rleInput.length/compressed.join('').length).toFixed(2)}`], visualData: { original: d.rleInput, compressed: compressed.join('') } };
        },
        visual: 'compression'
    },

    'tool-huffman': {
        title: 'ترميز هوفمان',
        tag: 'Huffman',
        category: 'compression',
        inputs: [
            { id: 'huffmanInput', label: 'النص', type: 'text', placeholder: 'ABRAKADABRA' }
        ],
        calc: (d) => {
            const freq = {};
            for (const c of d.huffmanInput) freq[c] = (freq[c]||0) + 1;
            const chars = Object.keys(freq).sort((a,b) => freq[a] - freq[b]);
            const codes = {};
            chars.forEach((c,i) => codes[c] = i.toString(2).padStart(Math.ceil(Math.log2(chars.length)), '0'));
            let encoded = '';
            for (const c of d.huffmanInput) encoded += codes[c];
            return { result: encoded, details: Object.entries(codes).map(([c,code]) => `${c}: ${code}`).join(' | ') };
        },
        visual: 'huffman'
    },

    'tool-lzw': {
        title: 'ضغط LZW',
        tag: 'LZW',
        category: 'compression',
        inputs: [
            { id: 'lzwInput', label: 'البيانات', type: 'text', placeholder: 'ABABBABCABABBA' }
        ],
        calc: (d) => {
            const dict = {};
            let nextCode = 256, output = [];
            for (let i = 0; i < 256; i++) dict[String.fromCharCode(i)] = i;
            let s = d.lzwInput[0];
            for (let i = 1; i < d.lzwInput.length; i++) {
                const sc = s + d.lzwInput[i];
                if (dict[sc] !== undefined) s = sc;
                else { output.push(dict[s]); dict[sc] = nextCode++; s = d.lzwInput[i]; }
            }
            output.push(dict[s]);
            return { result: output.join(', '), details: [`Dictionary size: ${nextCode-256} entries`] };
        },
        visual: 'lzw'
    },

    'tool-arithmetic': {
        title: 'الترميز الحسابي',
        tag: 'Arithmetic',
        category: 'compression',
        inputs: [
            { id: 'arithMessage', label: 'الرسالة', type: 'text', placeholder: 'abc' },
            { id: 'arithFreq', label: 'التكرار (حرف:تكرار)', type: 'text', placeholder: 'a:2,b:7,c:1' }
        ],
        calc: (d) => {
            const freq = {};
            d.arithFreq.split(',').forEach(p => { const [c,n] = p.split(':'); freq[c.trim()] = parseInt(n); });
            const total = Object.values(freq).reduce((a,b)=>a+b,0);
            let prob = {}, cum = 0;
            Object.keys(freq).sort().forEach(c => { prob[c] = {s:cum/total, e:(cum+freq[c])/total}; cum = prob[c].e; });
            let low = 0, high = 1;
            for (const c of d.arithMessage) { const r = high-low; high = low + r*prob[c].e; low = low + r*prob[c].s; }
            return { result: ((low+high)/2).toFixed(8), details: [`Range: [${low.toFixed(4)}, ${high.toFixed(4)})`] };
        },
        visual: 'arithmetic'
    },

    'tool-compression-ratio': {
        title: 'نسبة الضغط',
        tag: 'Ratio',
        category: 'compression',
        inputs: [
            { id: 'originalSize', label: 'الحجم الأصلي (بايت)', type: 'number', placeholder: '1000' },
            { id: 'compressedSize', label: 'الحجم المضغوط (بايت)', type: 'number', placeholder: '400' }
        ],
        calc: (d) => {
            const ratio = d.originalSize / d.compressedSize;
            const saved = ((d.originalSize - d.compressedSize) / d.originalSize * 100).toFixed(2);
            return { result: `${ratio.toFixed(2)}:1`, details: [`معدل الضغط: ${(d.compressedSize/d.originalSize*100).toFixed(1)}%`, `توفير: ${saved}%`] };
        },
        visual: 'ratio'
    },

    // Audio Tools
    'tool-audio-size': {
        title: 'حجم ملف الصوت',
        tag: 'Size',
        category: 'audio',
        inputs: [
            { id: 'sampleRate', label: 'معدل العينة', type: 'select', options: [
                { value: '44100', label: '44.1 kHz (CD)' },
                { value: '22050', label: '22.05 kHz' },
                { value: '11025', label: '11.025 kHz' },
                { value: '48000', label: '48 kHz' }
            ]},
            { id: 'bitDepth', label: 'عمق العينة', type: 'select', options: [
                { value: '8', label: '8 بت' },
                { value: '16', label: '16 بت' },
                { value: '24', label: '24 بت' }
            ]},
            { id: 'audioChannels', label: 'القنوات', type: 'select', options: [
                { value: '1', label: 'مونو' },
                { value: '2', label: 'ستيريو' }
            ]},
            { id: 'audioDuration', label: 'المدة (ثواني)', type: 'number', step: 0.1, placeholder: '60' }
        ],
        calc: (d) => {
            const bytes = d.sampleRate * (d.bitDepth/8) * d.audioChannels * d.audioDuration;
            return { result: `${(bytes/1024/1024).toFixed(4)} MB`, details: [`${bytes.toLocaleString()} بايت`, `معدل البت: ${(d.sampleRate*d.bitDepth*d.audioChannels/1000).toFixed(0)} kbps`] };
        },
        visual: 'audio'
    },

    'tool-audio-duration': {
        title: 'مدة التسجيل',
        tag: 'Duration',
        category: 'audio',
        inputs: [
            { id: 'fileSizeMB', label: 'حجم الملف (MB)', type: 'number', step: 0.01, placeholder: '10' },
            { id: 'durationSampleRate', label: 'معدل العينة', type: 'select', options: [
                { value: '44100', label: '44.1 kHz' },
                { value: '22050', label: '22.05 kHz' }
            ]},
            { id: 'durationBitDepth', label: 'عمق العينة', type: 'select', options: [
                { value: '8', label: '8 بت' },
                { value: '16', label: '16 بت' }
            ]},
            { id: 'durationChannels', label: 'القنوات', type: 'select', options: [
                { value: '1', label: 'مونو' },
                { value: '2', label: 'ستيريو' }
            ]}
        ],
        calc: (d) => {
            const bytes = d.fileSizeMB * 1024 * 1024;
            const secs = bytes / (d.durationSampleRate * (d.durationBitDepth/8) * d.durationChannels);
            const m = Math.floor(secs/60), s = (secs%60).toFixed(1);
            return { result: `${m}m ${s}s`, details: [`${secs.toFixed(2)} ثانية`] };
        },
        visual: 'audio'
    },

    'tool-bitrate': {
        title: 'معدل البت',
        tag: 'Bitrate',
        category: 'audio',
        inputs: [
            { id: 'bitrateSampleRate', label: 'معدل العينة (Hz)', type: 'number', placeholder: '44100' },
            { id: 'bitrateDepth', label: 'عمق العينة (بت)', type: 'number', placeholder: '16' },
            { id: 'bitrateChannels', label: 'القنوات', type: 'number', value: '2' }
        ],
        calc: (d) => {
            const bps = d.bitrateSampleRate * d.bitrateDepth * d.bitrateChannels;
            return { result: `${(bps/1000).toFixed(0)} kbps`, details: [`${bps.toLocaleString()} bps`, `${(bps/1000000).toFixed(2)} Mbps`] };
        },
        visual: 'audio'
    },

    'tool-db': {
        title: 'مستوى الصوت (dB)',
        tag: 'Decibel',
        category: 'audio',
        inputs: [
            { id: 'dbType', label: 'النوع', type: 'select', options: [
                { value: 'amplitude', label: 'من السعة' },
                { value: 'power', label: 'من الطاقة' }
            ]},
            { id: 'dbValue', label: 'القيمة', type: 'number', step: 0.01, placeholder: '10' }
        ],
        calc: (d) => {
            const db = d.dbType === 'amplitude' ? 20*Math.log10(d.dbValue) : 10*Math.log10(d.dbValue);
            return { result: `${db.toFixed(2)} dB`, details: [db > 0 ? 'مضخم' : db < 0 ? 'مضعف' : 'بدون تغيير'] };
        },
        visual: 'db'
    }
};

// Visual Aid Renderers
const VisualAids = {
    color: (toolData, result) => {
        if (!result.colorPreview) return '';
        return `
            <div class="visual-aid">
                <h4>معاينة اللون</h4>
                <div class="visual-color-preview">
                    <div class="visual-color-box" style="background: ${result.colorPreview}"></div>
                    <div class="visual-color-values">
                        <div>${result.result}</div>
                    </div>
                </div>
            </div>
        `;
    },
    
    'color-interpolation': (toolData, result) => {
        return `
            <div class="visual-aid">
                <h4>معاينة interpolating اللون</h4>
                <div class="visual-color-preview">
                    <div class="visual-color-box" style="background: ${result.colorPreview || '#808080'}"></div>
                </div>
            </div>
        `;
    },

    animation: (toolData, result) => {
        return `
            <div class="visual-aid">
                <h4>معاينة الحركة</h4>
                <div class="visual-animation-preview">
                    <div class="animation-demo" id="animDemo">📍</div>
                    <div class="animation-info">
                        ${result.details ? result.details.map(d => `<div>${d}</div>`).join('') : ''}
                    </div>
                </div>
            </div>
        `;
    },

    compression: (toolData, result) => {
        if (!result.visualData) return '';
        const { original, compressed } = result.visualData;
        return `
            <div class="visual-aid">
                <h4>معاينة الضغط</h4>
                <div style="display: flex; gap: 20px; align-items: center;">
                    <div style="flex: 1;">
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 5px;">Original: ${original.length} chars</div>
                        <div style="background: var(--surface-bg); padding: 10px; border-radius: 5px; word-break: break-all;">${original}</div>
                    </div>
                    <div style="font-size: 2rem;">→</div>
                    <div style="flex: 1;">
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 5px;">Compressed: ${compressed.length} chars</div>
                        <div style="background: var(--surface-bg); padding: 10px; border-radius: 5px; word-break: break-all;">${compressed}</div>
                    </div>
                </div>
            </div>
        `;
    },

    audio: () => {
        return `
            <div class="visual-aid">
                <h4>معلومات الصوت</h4>
                <div class="visual-slider">
                    <input type="range" min="0" max="100" value="50" disabled>
                    <span class="slider-value">🎵</span>
                </div>
            </div>
        `;
    },

    default: () => ''
};

// App Router
class App {
    constructor() {
        this.currentTool = null;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
        this.setupNavigation();
        this.renderAllToolsInline();
    }

    renderAllToolsInline() {
        const container = document.getElementById('allToolsContainer');
        if (!container) return;

        const categoryOrder = ['animation', 'colors', 'image', 'compression', 'audio'];
        const categoryNames = {
            'animation': '🎬 الرسوم المتحركة',
            'colors': '🎨 نماذج الألوان',
            'image': '🖼️ معالجة الصور',
            'compression': '📦 ضغط البيانات',
            'audio': '🔊 الصوت'
        };

        let html = '';
        
        categoryOrder.forEach(category => {
            const toolsInCategory = Object.entries(ToolsData).filter(([id, tool]) => tool.category === category);
            if (toolsInCategory.length === 0) return;

            html += `<div class="index-section">
                <h3 class="index-title">${categoryNames[category]}</h3>`;

            toolsInCategory.forEach(([toolId, tool]) => {
                const formHtml = this.generateInlineToolForm(toolId, tool);
                html += `
                    <div class="inline-tool-card" id="card-${toolId}">
                        <div class="inline-tool-header" onclick="toggleToolCard('${toolId}')">
                            <h3>${tool.title} <span class="tool-tag">${tool.tag}</span></h3>
                            <span class="tool-toggle-icon">▼</span>
                        </div>
                        <div class="inline-tool-body">
                            <div class="inline-tool-content">
                                <div class="inline-tool-form-area">${formHtml}</div>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
        });

        container.innerHTML = html;
    }

    generateInlineToolForm(toolId, tool) {
        let formHtml = `<form class="inline-tool-form" id="form-${toolId}">`;

        tool.inputs.forEach(input => {
            if (input.type === 'select') {
                formHtml += `
                    <div class="form-group">
                        <label>${input.label}</label>
                        <select id="${toolId}-${input.id}">
                            ${input.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else if (input.type === 'textarea') {
                formHtml += `
                    <div class="form-group">
                        <label>${input.label}</label>
                        <textarea id="${toolId}-${input.id}" placeholder="${input.placeholder || ''}" rows="2"></textarea>
                    </div>
                `;
            } else if (input.type === 'color') {
                formHtml += `
                    <div class="form-group">
                        <label>${input.label}</label>
                        <input type="color" id="${toolId}-${input.id}" value="${input.value || '#ff0000'}">
                    </div>
                `;
            } else {
                formHtml += `
                    <div class="form-group">
                        <label>${input.label}</label>
                        <input type="${input.type}" id="${toolId}-${input.id}" 
                            ${input.placeholder ? `placeholder="${input.placeholder}"` : ''}
                            ${input.value !== undefined ? `value="${input.value}"` : ''}
                            ${input.min !== undefined ? `min="${input.min}"` : ''}
                            ${input.max !== undefined ? `max="${input.max}"` : ''}
                            ${input.step !== undefined ? `step="${input.step}"` : ''}>
                    </div>
                `;
            }
        });

        formHtml += `
            <button type="submit" class="btn btn-primary">احسب</button>
        </form>
        <div class="inline-tool-result" id="result-${toolId}">
            <div class="result-value">أدخل القيم واضغط احسب</div>
        </div>
        <div class="inline-tool-quiz">
            <h4>📝 اختبار ذاتي:</h4>
            <p id="q-${toolId}">اضغط "سؤال جديد" للبدء</p>
            <div class="quiz-input">
                <input type="text" id="ans-${toolId}" placeholder="أدخل إجابتك">
                <button type="button" class="btn btn-primary" onclick="checkQuiz('${toolId}')">تحقق</button>
            </div>
            <div class="quiz-result" id="res-${toolId}"></div>
            <button type="button" class="btn btn-secondary" onclick="generateQuiz('${toolId}')">سؤال جديد</button>
        </div>
        `;

        return formHtml;
    }

    setupInlineToolEvents() {
        Object.keys(ToolsData).forEach(toolId => {
            const form = document.getElementById(`form-${toolId}`);
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateInlineTool(toolId);
            });
        });
    }

    calculateInlineTool(toolId) {
        const tool = ToolsData[toolId];
        if (!tool) return;

        const data = {};
        tool.inputs.forEach(input => {
            const el = document.getElementById(`${toolId}-${input.id}`);
            if (el) {
                data[input.id] = input.type === 'number' ? parseFloat(el.value) : el.value;
            }
        });

        const result = tool.calc(data);
        const resultEl = document.getElementById(`result-${toolId}`);
        
        if (resultEl) {
            let html = `<div class="result-value">${result.result}</div>`;
            if (result.details && result.details.length) {
                result.details.forEach(d => {
                    html += `<div class="result-value" style="font-size: 0.9rem; color: var(--text-secondary);">${d}</div>`;
                });
            }
            resultEl.innerHTML = html;
        }
    }

    generateInlineQuiz(toolId) {
        const tool = ToolsData[toolId];
        let currentQ = null;

        if (tool && tool.quiz && tool.quiz.generate) {
            currentQ = tool.quiz.generate();
        } else {
            currentQ = window.QuizManager.generate(toolId);
        }

        const qEl = document.getElementById(`q-${toolId}`);
        const resEl = document.getElementById(`res-${toolId}`);
        const ansEl = document.getElementById(`ans-${toolId}`);

        if (qEl) qEl.textContent = currentQ.question;
        if (resEl) {
            resEl.className = 'quiz-result';
            resEl.textContent = '';
        }
        if (ansEl) ansEl.value = '';

        window[`currentQuiz_${toolId}`] = currentQ;
    }

    checkInlineQuiz(toolId) {
        const currentQ = window[`currentQuiz_${toolId}`];
        const ansEl = document.getElementById(`ans-${toolId}`);
        const resEl = document.getElementById(`res-${toolId}`);

        if (!currentQ || !ansEl || !resEl) return;

        const userAns = ansEl.value.trim().toLowerCase();
        const correctAns = currentQ.answer.toString().toLowerCase().trim();

        if (userAns === correctAns) {
            resEl.className = 'quiz-result correct';
            resEl.innerHTML = '✓ إجابة صحيحة!<br><small>' + (currentQ.hint || '') + '</small>';
        } else {
            resEl.className = 'quiz-result wrong';
            resEl.innerHTML = '✗ الإجابة الصحيحة: ' + currentQ.answer + '<br><small>' + (currentQ.hint || '') + '</small>';
        }
    }

    handleRoute() {
        const hash = window.location.hash;
        const homeSection = document.getElementById('home');
        const toolsIndex = document.getElementById('toolsIndex');
        const allToolsSection = document.getElementById('allToolsSection');
        const toolPage = document.getElementById('toolPage');

        // Hide all sections first
        homeSection.style.display = 'none';
        toolsIndex.style.display = 'none';
        allToolsSection.style.display = 'none';
        toolPage.style.display = 'none';

        if (hash === '' || hash === '#' || hash === '#home') {
            homeSection.style.display = 'block';
            toolsIndex.style.display = 'block';
            allToolsSection.style.display = 'none';
        } else if (hash.startsWith('#tool-')) {
            const toolId = hash.substring(1);
            if (ToolsData[toolId]) {
                this.loadTool(toolId);
                toolPage.style.display = 'block';
            }
        }
        
        // Update nav active state
        document.querySelectorAll('.nav-home').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === (hash || '#')) {
                link.classList.add('active');
            }
        });
    }

    loadTool(toolId) {
        const tool = ToolsData[toolId];
        if (!tool) return;

        this.currentTool = toolId;
        
        // Update page title
        document.getElementById('toolPageTitle').textContent = tool.title;

        // Generate form HTML
        let formHtml = `
            <div class="tool-card">
                <div class="tool-header">
                    <h3>${tool.title}</h3>
                    <span class="tool-tag">${tool.tag}</span>
                </div>
                <form class="tool-form" id="toolForm">
        `;

        tool.inputs.forEach(input => {
            if (input.type === 'select') {
                formHtml += `
                    <div class="form-group">
                        <label>${input.label}</label>
                        <select id="${input.id}">
                            ${input.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else if (input.type === 'textarea') {
                formHtml += `
                    <div class="form-group">
                        <label>${input.label}</label>
                        <textarea id="${input.id}" placeholder="${input.placeholder || ''}" rows="3"></textarea>
                    </div>
                `;
            } else if (input.type === 'color') {
                formHtml += `
                    <div class="form-group">
                        <label>${input.label}</label>
                        <input type="color" id="${input.id}" value="${input.value || '#ff0000'}">
                    </div>
                `;
            } else {
                formHtml += `
                    <div class="form-group">
                        <label>${input.label}</label>
                        <input type="${input.type}" id="${input.id}" 
                            ${input.placeholder ? `placeholder="${input.placeholder}"` : ''}
                            ${input.value !== undefined ? `value="${input.value}"` : ''}
                            ${input.min !== undefined ? `min="${input.min}"` : ''}
                            ${input.max !== undefined ? `max="${input.max}"` : ''}
                            ${input.step !== undefined ? `step="${input.step}"` : ''}
                            required>
                    </div>
                `;
            }
        });

        formHtml += `
                    <button type="submit" class="btn btn-primary">احسب</button>
                </form>
                <div class="tool-result" id="toolResult">
                    <div class="result-label">النتيجة</div>
                    <div class="result-value">أدخل القيم واضغط احسب</div>
                </div>
            </div>
        `;

        // Add visual aid section
        const visualAid = VisualAids[tool.visual] || VisualAids.default;
        const visualHtml = `
            <div class="tool-sidebar">
                ${visualAid(tool, {})}
            </div>
        `;

        document.getElementById('toolContainer').innerHTML = formHtml + visualHtml;

        // Setup form handler
        document.getElementById('toolForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {};
            tool.inputs.forEach(input => {
                data[input.id] = input.type === 'number' || input.type === 'range' ? 
                    parseFloat(document.getElementById(input.id).value) : 
                    document.getElementById(input.id).value;
            });

            const result = tool.calc(data);
            const resultEl = document.getElementById('toolResult');
            
            let html = `<div class="result-label">النتيجة</div><div class="result-value highlight">${result.result}</div>`;
            if (result.details && result.details.length) {
                result.details.forEach(d => {
                    html += `<div class="result-value">${d}</div>`;
                });
            }
            resultEl.innerHTML = html;

            // Update visual aid if applicable
            if (tool.visual && VisualAids[tool.visual]) {
                const visualEl = document.querySelector('.visual-aid');
                if (visualEl) {
                    const newVisual = VisualAids[tool.visual](tool, result);
                    if (newVisual) {
                        visualEl.outerHTML = newVisual;
                    }
                }
            }
        });

        // Setup quiz for this tool
        this.setupToolQuiz(toolId);
    }

    setupToolQuiz(toolId) {
        const quizToggle = document.getElementById('quizToggle');
        const quizContent = document.getElementById('quizContent');
        const quizNext = document.getElementById('quizNext');
        const quizSubmit = document.getElementById('quizSubmit');
        const quizAnswer = document.getElementById('quizAnswer');
        const quizResult = document.getElementById('quizResult');
        const qText = document.getElementById('qText');

        if (!quizToggle) return;

        let currentQ = null;

        quizToggle.addEventListener('click', () => {
            quizContent.classList.toggle('active');
            quizToggle.classList.toggle('active');
        });

        quizNext.addEventListener('click', () => {
            currentQ = window.QuizManager.generate(toolId);
            qText.textContent = currentQ.question;
            quizAnswer.value = '';
            quizResult.className = 'quiz-result';
            quizResult.textContent = '';
        });

        quizSubmit.addEventListener('click', () => {
            if (!currentQ) return;
            const userAns = quizAnswer.value.trim().toLowerCase();
            const correctAns = currentQ.answer.toString().toLowerCase().trim();
            
            if (userAns === correctAns) {
                quizResult.className = 'quiz-result correct';
                quizResult.innerHTML = '✓ إجابة صحيحة!<br><small>' + (currentQ.hint || '') + '</small>';
            } else {
                quizResult.className = 'quiz-result wrong';
                quizResult.innerHTML = '✗ الإجابة الصحيحة: ' + currentQ.answer + '<br><small>' + (currentQ.hint || '') + '</small>';
            }
        });
        
        quizNext.click();
    }

    setupNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-home').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                }
            });
        });

        this.setupInlineToolEvents();
    }
}

function toggleToolCard(toolId) {
    const card = document.getElementById(`card-${toolId}`);
    if (card) {
        card.classList.toggle('expanded');
    }
}

function generateQuiz(toolId) {
    const app = window.appInstance;
    if (app) {
        app.generateInlineQuiz(toolId);
    }
}

function checkQuiz(toolId) {
    const app = window.appInstance;
    if (app) {
        app.checkInlineQuiz(toolId);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.appInstance = new App();
});
