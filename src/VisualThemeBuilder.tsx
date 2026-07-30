import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { ConsoleThemeConfig } from './App';

interface Props {
  initialTheme: ConsoleThemeConfig;
  onSave: (theme: ConsoleThemeConfig) => void;
  onCancel: () => void;
}

export function VisualThemeBuilder({ initialTheme, onSave, onCancel }: Props) {
  const [theme, setTheme] = useState<ConsoleThemeConfig>(initialTheme);
  const [name, setName] = useState("My Visual Theme");

  const update = (key: keyof ConsoleThemeConfig, val: string | number) => {
    setTheme(prev => ({ ...prev, [key]: val }));
  };

  const cStyle = {
    '--theme-border-style': theme.borderStyle || 'solid',
    '--theme-body': theme.body,
    '--theme-border': theme.border,
    '--theme-dpad': theme.dpad,
    '--theme-dpad-active': theme.dpadActive,
    '--theme-dpad-shadow': theme.dpadShadow,
    '--theme-btn-a': theme.btnA,
    '--theme-btn-a-active': theme.btnAActive,
    '--theme-btn-a-shadow': theme.btnAShadow,
    '--theme-btn-b': theme.btnB,
    '--theme-btn-b-active': theme.btnBActive,
    '--theme-btn-b-shadow': theme.btnBShadow,
    '--theme-btn-x': theme.btnX || theme.btnB,
    '--theme-btn-x-active': theme.btnXActive || theme.btnBActive,
    '--theme-btn-x-shadow': theme.btnXShadow || theme.btnBShadow,
    '--theme-btn-y': theme.btnY || theme.btnA,
    '--theme-btn-y-active': theme.btnYActive || theme.btnAActive,
    '--theme-btn-y-shadow': theme.btnYShadow || theme.btnAShadow,
    '--theme-btn-run': theme.btnRun,
    '--theme-btn-run-hover': theme.btnRunHover,
    '--theme-btn-run-shadow': theme.btnRunShadow,
    '--theme-text-run': theme.textRun,
    '--theme-btn-pause': theme.btnPause,
    '--theme-btn-pause-hover': theme.btnPauseHover,
    '--theme-btn-pause-shadow': theme.btnPauseShadow,
    '--theme-text-pause': theme.textPause,
    '--theme-btn-step': theme.btnStep,
    '--theme-btn-step-hover': theme.btnStepHover,
    '--theme-btn-step-shadow': theme.btnStepShadow,
    '--theme-text-step': theme.textStep,
    '--theme-btn-reset': theme.btnReset,
    '--theme-btn-reset-hover': theme.btnResetHover,
    '--theme-btn-reset-shadow': theme.btnResetShadow,
    '--theme-text-reset': theme.textReset,
  } as React.CSSProperties;

  const ColorInput = ({ label, field }: { label: string, field: keyof ConsoleThemeConfig }) => (
    <label className="flex items-center gap-2 text-xs">
      <input type="color" value={theme[field] as string} onChange={e => update(field, e.target.value)} className="w-6 h-6 rounded bg-black/20 cursor-pointer" />
      <span className="text-gray-300 w-16 truncate" title={label}>{label}</span>
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#151525] border border-[#f97316]/50 rounded-xl max-w-6xl w-full flex flex-col h-[90vh]">
        <div className="p-4 border-b border-[#f97316]/30 flex justify-between items-center bg-[#151525] rounded-t-xl shrink-0">
          <h2 className="text-xl font-bold text-[#f97316] flex items-center gap-2"><Palette /> Visual Layout Builder</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white p-2"><X size={20}/></button>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Preview */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center overflow-auto bg-black/50">
            <div style={cStyle} className={`w-full max-w-[400px] console-body rounded-[30px] shadow-[0_15px_30px_rgba(0,0,0,0.6),inset_0_5px_15px_rgba(255,255,255,0.2)] border-[4px] flex flex-col overflow-hidden h-[650px] relative transition-colors duration-200 transform scale-75 sm:scale-100 origin-center`}>
              <div className="absolute top-2 left-6 text-black/40 font-bold italic text-xl select-none" style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.2)'}}>DOTX SYSTEM</div>
              
              <div className="mx-4 mt-12 mb-4 bg-black rounded-xl p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-4 border-[#333] relative z-10 flex flex-col items-center justify-center" style={{height: `${theme.screenSize || 250}px`}}>
                <span className="text-white font-mono text-sm opacity-50">SCREEN PREVIEW</span>
              </div>

              <div className="px-6 py-2 shrink-0">
                <div className={`flex justify-between items-center w-full mt-2 ${theme.layout === 'inverted' ? 'flex-row-reverse' : ''}`}>
                  <div className="grid grid-cols-3 gap-1">
                    <div />
                    <button className="w-12 h-12 console-btn-dpad rounded-t-lg shadow-sm flex items-center justify-center text-white">▲</button>
                    <div />
                    <button className="w-12 h-12 console-btn-dpad rounded-l-lg shadow-sm flex items-center justify-center text-white">◀</button>
                    <button className="w-12 h-12 console-btn-dpad rounded-b-lg shadow-sm flex items-center justify-center text-white">▼</button>
                    <button className="w-12 h-12 console-btn-dpad rounded-r-lg shadow-sm flex items-center justify-center text-white">▶</button>
                  </div>
                  
                  <div className="flex gap-4 mt-4 transform -rotate-12">
                    {theme.customActionButtons && theme.customActionButtons >= 4 && (
                       <>
                         <button className="w-14 h-14 rounded-full console-btn-y flex items-center justify-center text-lg font-bold text-white shadow-lg mt-[-16px]">Y</button>
                         <button className="w-14 h-14 rounded-full console-btn-x flex items-center justify-center text-lg font-bold text-white shadow-lg">X</button>
                       </>
                    )}
                    <button className="w-14 h-14 rounded-full console-btn-b flex items-center justify-center text-lg font-bold text-white shadow-lg">B</button>
                    <button className="w-14 h-14 rounded-full console-btn-a flex items-center justify-center text-lg font-bold text-white shadow-lg mt-[-16px]">A</button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="w-full md:w-[320px] lg:w-[400px] border-l border-[#f97316]/30 bg-[#1a1a2e] flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-700">
              <label className="text-xs text-gray-400 font-bold mb-1 block">Theme Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-black/50 border border-gray-700 rounded px-2 py-1.5 text-sm text-white outline-none focus:border-[#f97316]" />
            </div>
            <div className="p-4 border-b border-gray-700">
              <label className="text-xs text-gray-400 font-bold mb-2 block">Layout</label>
              <div className="flex gap-2">
                <button onClick={() => update('layout', 'default')} className={`flex-1 py-1.5 rounded text-xs font-bold border ${theme.layout !== 'inverted' ? 'bg-[#f97316]/20 border-[#f97316] text-[#f97316]' : 'bg-black/50 border-gray-700 text-gray-400 hover:text-white'}`}>Default</button>
                <button onClick={() => update('layout', 'inverted')} className={`flex-1 py-1.5 rounded text-xs font-bold border ${theme.layout === 'inverted' ? 'bg-[#f97316]/20 border-[#f97316] text-[#f97316]' : 'bg-black/50 border-gray-700 text-gray-400 hover:text-white'}`}>Inverted</button>
              </div>
            </div>

            <div className="p-4 border-b border-gray-700">
                <label className="text-xs text-gray-400 font-bold mb-2 block">Border Style</label>
                <select value={theme.borderStyle || 'solid'} onChange={e => update('borderStyle', e.target.value)} className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white outline-none focus:border-[#f97316]">
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="double">Double</option>
                  <option value="groove">Groove</option>
                  <option value="ridge">Ridge</option>
                  <option value="inset">Inset</option>
                  <option value="outset">Outset</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            <div className="p-4 border-b border-gray-700">
              <label className="text-xs text-gray-400 font-bold mb-2 block">Screen Size</label>
              <input type="range" min="200" max="400" value={theme.screenSize || 250} onChange={e => update('screenSize', parseInt(e.target.value))} className="w-full" />
              <div className="text-right text-xs text-gray-500 mt-1">{theme.screenSize || 250}px</div>
            </div>
            <div className="p-4 border-b border-gray-700">
              <label className="text-xs text-gray-400 font-bold mb-2 block">Action Buttons</label>
              <div className="flex gap-2">
                <button onClick={() => update('customActionButtons', 2)} className={`flex-1 py-1.5 rounded text-xs font-bold border ${theme.customActionButtons !== 4 ? 'bg-[#f97316]/20 border-[#f97316] text-[#f97316]' : 'bg-black/50 border-gray-700 text-gray-400 hover:text-white'}`}>2 Buttons (A/B)</button>
                <button onClick={() => update('customActionButtons', 4)} className={`flex-1 py-1.5 rounded text-xs font-bold border ${theme.customActionButtons === 4 ? 'bg-[#f97316]/20 border-[#f97316] text-[#f97316]' : 'bg-black/50 border-gray-700 text-gray-400 hover:text-white'}`}>4 Buttons (A/B/X/Y)</button>
              </div>
            </div>

            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-bold text-[#f97316] mb-3 uppercase tracking-wider">Device</h3>
                <div className="grid grid-cols-2 gap-3">
                  <ColorInput label="Body" field="body" />
                  <ColorInput label="Border" field="border" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#f97316] mb-3 uppercase tracking-wider">D-Pad</h3>
                <div className="grid grid-cols-2 gap-3">
                  <ColorInput label="Main" field="dpad" />
                  <ColorInput label="Active" field="dpadActive" />
                  <ColorInput label="Shadow" field="dpadShadow" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#f97316] mb-3 uppercase tracking-wider">Action Buttons</h3>
                <div className="grid grid-cols-2 gap-3">
                  <ColorInput label="Btn A" field="btnA" />
                  <ColorInput label="A Active" field="btnAActive" />
                  <ColorInput label="A Shadow" field="btnAShadow" />
                  <ColorInput label="Btn B" field="btnB" />
                  <ColorInput label="B Active" field="btnBActive" />
                  <ColorInput label="B Shadow" field="btnBShadow" />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-700 shrink-0">
              <button 
                onClick={() => onSave({...theme, name, id: 'custom_' + Date.now()})} 
                className="w-full py-2 bg-[#f97316] hover:bg-[#ff9f43] text-white font-bold rounded shadow-lg transition-colors"
              >
                Save Theme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
