const fs = require('fs');
const data = JSON.parse(fs.readFileSync('extracted.json'));

let code = fs.readFileSync('App_cleaned.tsx', 'utf-8');

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

// Replace modal / dropdown specific wrappers in the extracted blocks
let themeBlock = data.themeBuilder.replace(/\{showThemeBuilder && \(\s*<VisualThemeBuilder/, '<VisualThemeBuilder')
                                  .replace(/}\s*$/, '');
// Note: VisualThemeBuilder is just a component.

let galleryBlock = data.gallery.replace(/\{showGallery && \(\s*<div className="fixed inset-0 bg-black\/80 flex items-center justify-center z-50 p-4">\s*<div className="bg-\[\#151525\] border border-\[\#f97316\]\/30 rounded-lg max-w-2xl w-full max-h-\[80vh\] flex flex-col shadow-2xl">/, '<div className="flex-1 flex flex-col min-h-0">')
                               .replace(/<\/div>\s*<\/div>\s*\)\s*}/, '');
// Remove the header of the gallery since we'll make a unified header
galleryBlock = galleryBlock.replace(/<div className="p-4 border-b border-\[\#f97316\]\/30 flex justify-between items-center">[\s\S]*?<\/div>/, '');

let regexBlock = data.regexTester.replace(/\{showRegexTester && \(\s*<div className="hidden lg:flex w-80 bg-\[\#151525\] border-l border-\[\#f97316\]\/30 flex-col h-full z-20 shrink-0">/, '<div className="flex-1 flex flex-col min-h-0">')
                                 .replace(/<\/div>\s*\)\s*}/, '');
regexBlock = regexBlock.replace(/<div className="p-4 border-b border-\[\#f97316\]\/30 flex justify-between items-center bg-\[\#151525\] shrink-0">[\s\S]*?<\/div>/, '');

let cartBlock = data.cartridges.replace(/\{showCartridges && \(\s*<div className="absolute top-full mt-2 right-0 bg-\[\#2a2a4e\] border border-\[\#f97316\]\/50 rounded shadow-2xl z-50 w-72 max-h-96 overflow-y-auto">/, '<div className="flex-1 flex flex-col min-h-0 overflow-y-auto">')
                               .replace(/<\/div>\s*\)\s*}/, '');
cartBlock = cartBlock.replace(/<div className="flex justify-between items-center mb-2">[\s\S]*?<\/div>/, ''); // Remove the title and close button from the top

let histBlock = data.history.replace(/\{showHistory && \(\s*<div className="absolute top-full mt-2 right-0 bg-\[\#2a2a4e\] border border-\[\#f97316\]\/50 rounded shadow-2xl z-50 w-72 max-h-96 overflow-y-auto">/, '<div className="flex-1 flex flex-col min-h-0 overflow-y-auto">')
                            .replace(/<\/div>\s*\)\s*}/, '');
histBlock = histBlock.replace(/<div className="p-3 border-b border-\[\#f97316\]\/30 flex justify-between items-center sticky top-0 bg-\[\#2a2a4e\]">[\s\S]*?<\/div>/, ''); // Remove the title and close button

// Now construct the unified tools pane
const toolsPane = `
      {/* Tools Pane */}
      {activePane && (
        <div className="fixed inset-0 lg:static lg:w-96 bg-[#151525] border-l border-[#f97316]/30 flex flex-col z-50 shrink-0 lg:h-full max-h-screen">
          {/* Header */}
          <div className="p-2 border-b border-[#f97316]/30 flex flex-col shrink-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-[#f97316] uppercase tracking-wider text-sm">Tools</h3>
              <button onClick={() => setActivePane(null)} className="text-gray-400 hover:text-white p-1">&times;</button>
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              <button onClick={() => setActivePane('tutorials')} className={\`px-3 py-1 text-sm rounded font-bold transition-colors whitespace-nowrap \${activePane === 'tutorials' ? 'bg-[#f97316]/20 text-[#f97316]' : 'text-gray-500 hover:bg-white/5'}\`}>Tutorials</button>
              <button onClick={() => setActivePane('regex')} className={\`px-3 py-1 text-sm rounded font-bold transition-colors whitespace-nowrap \${activePane === 'regex' ? 'bg-[#f97316]/20 text-[#f97316]' : 'text-gray-500 hover:bg-white/5'}\`}>Regex</button>
              <button onClick={() => setActivePane('cartridges')} className={\`px-3 py-1 text-sm rounded font-bold transition-colors whitespace-nowrap \${activePane === 'cartridges' ? 'bg-[#f97316]/20 text-[#f97316]' : 'text-gray-500 hover:bg-white/5'}\`}>Cartridges</button>
              <button onClick={() => setActivePane('history')} className={\`px-3 py-1 text-sm rounded font-bold transition-colors whitespace-nowrap \${activePane === 'history' ? 'bg-[#f97316]/20 text-[#f97316]' : 'text-gray-500 hover:bg-white/5'}\`}>History</button>
              <button onClick={() => setActivePane('themes')} className={\`px-3 py-1 text-sm rounded font-bold transition-colors whitespace-nowrap \${activePane === 'themes' ? 'bg-[#f97316]/20 text-[#f97316]' : 'text-gray-500 hover:bg-white/5'}\`}>Theme Builder</button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto flex flex-col bg-[#0a0a14]">
            {activePane === 'tutorials' && (
              ${galleryBlock}
            )}
            {activePane === 'regex' && (
              ${regexBlock}
            )}
            {activePane === 'cartridges' && (
              ${cartBlock}
            )}
            {activePane === 'history' && (
              ${histBlock}
            )}
            {activePane === 'themes' && (
              ${themeBlock}
            )}
          </div>
        </div>
      )}
`;

// Insert just before the final </div> of the main flex container
// Wait, the main container ends with:
//       </div>
//     </div>
//   );
// }

const endPattern = "    </div>\n  );\n}";
code = code.replace(endPattern, toolsPane + "\n" + endPattern);

fs.writeFileSync('src/App.tsx', code);
console.log("Injected ToolsPane");
