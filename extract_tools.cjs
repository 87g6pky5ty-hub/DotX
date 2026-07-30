const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

function extractBlock(code, markerStr) {
    const startIndex = code.indexOf(markerStr);
    if (startIndex === -1) return { code, block: '' };
    
    // Find matching parenthesis if it's a `{condition && (` block
    let openCount = 0;
    let endIndex = startIndex;
    let started = false;
    for (let i = startIndex; i < code.length; i++) {
        if (code[i] === '(') { openCount++; started = true; }
        else if (code[i] === ')') { openCount--; }
        
        if (started && openCount === 0) {
            endIndex = i + 1;
            // Also consume the trailing `}` if it's `{condition && (...) }`
            let j = endIndex;
            while (j < code.length && /\s/.test(code[j])) j++;
            if (code[j] === '}') {
                endIndex = j + 1;
            }
            break;
        }
    }
    const block = code.substring(startIndex, endIndex);
    const newCode = code.substring(0, startIndex) + code.substring(endIndex);
    return { code: newCode, block };
}

let themeBuilder, cartridges, history, regexTester, gallery;

let res = extractBlock(code, '{showThemeBuilder && (');
code = res.code; themeBuilder = res.block;

res = extractBlock(code, '{showCartridges && (');
code = res.code; cartridges = res.block;

res = extractBlock(code, '{showHistory && (');
code = res.code; history = res.block;

res = extractBlock(code, '{showRegexTester && (');
code = res.code; regexTester = res.block;

res = extractBlock(code, '{showGallery && (');
code = res.code; gallery = res.block;

fs.writeFileSync('extracted.json', JSON.stringify({ themeBuilder, cartridges, history, regexTester, gallery }));
fs.writeFileSync('App_cleaned.tsx', code);
console.log("Extracted successfully.");
