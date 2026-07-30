const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Replace state declarations
code = code.replace(/const \[showGallery, setShowGallery\] = useState\(false\);/, '');
code = code.replace(/const \[showCartridges, setShowCartridges\] = useState\(false\);/, '');
code = code.replace(/const \[showHistory, setShowHistory\] = useState\(false\);/, '');
code = code.replace(/const \[showRegexTester, setShowRegexTester\] = useState\(false\);/, '');
code = code.replace(/const \[showThemeBuilder, setShowThemeBuilder\] = useState\(false\);/, 
  "type ToolTab = 'regex' | 'tutorials' | 'cartridges' | 'history' | 'themes' | null;\n  const [activePane, setActivePane] = useState<ToolTab>(null);");

// 2. Replace toggles
code = code.replace(/setShowThemeBuilder\(true\);/, "setActivePane('themes');");
code = code.replace(/setShowThemeBuilder\(false\)/g, "setActivePane(null)");
code = code.replace(/setShowRegexTester\(!showRegexTester\)/, "setActivePane(p => p === 'regex' ? null : 'regex')");
code = code.replace(/showRegexTester \? 'text-\[\#f97316\]' : 'text-purple-400'/, "activePane === 'regex' ? 'text-[#f97316]' : 'text-purple-400'");
code = code.replace(/setShowGallery\(true\)/, "setActivePane('tutorials')");
code = code.replace(/setShowGallery\(false\)/g, "setActivePane(null)");
code = code.replace(/setShowCartridges\(!showCartridges\)/, "setActivePane(p => p === 'cartridges' ? null : 'cartridges')");
code = code.replace(/setShowCartridges\(false\)/g, "setActivePane(null)");
code = code.replace(/setShowHistory\(!showHistory\)/, "setActivePane(p => p === 'history' ? null : 'history')");
code = code.replace(/setShowHistory\(false\)/g, "setActivePane(null)");

// 3. Remove inline renderings and extract them
// Regex tester
const regexTesterMatch = code.match(/\{\s*\/\* Regex Tester Panel \*\/\s*\}([\s\S]*?)\{showRegexTester && \([\s\S]*?<div className="hidden lg:flex w-80[\s\S]*?<div className="text-gray-500 text-sm italic">No regex rules found in code\.<\/div>[\s\S]*?<\/div>\s*\)\s*\}\s*<\/div>\s*\}\s*<\/div>\s*\)\s*\}/);
// Wait, regex might be tricky. Let's do it with split or manual extraction.
