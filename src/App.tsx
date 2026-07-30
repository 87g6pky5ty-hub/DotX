import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, StepForward, RotateCcw, Share2, Save, Download, Upload, Library, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, AlignLeft, Palette, History, FlaskConical, Archive } from 'lucide-react';
import { DotX } from './engine';
import { VisualThemeBuilder } from './VisualThemeBuilder';
import Editor from 'react-simple-code-editor';
import getCaretCoordinates from 'textarea-caret';
import { TUTORIALS } from './games';




export type ConsoleThemeConfig = {
  id: string;
  name: string;
  body: string;
  border: string;
  dpad: string;
  dpadActive: string;
  dpadShadow: string;
  btnA: string;
  btnAActive: string;
  btnAShadow: string;
  btnB: string;
  btnBActive: string;
  btnBShadow: string;
  btnRun: string;
  btnRunHover: string;
  btnRunShadow: string;
  btnPause: string;
  btnPauseHover: string;
  btnPauseShadow: string;
  btnStep: string;
  btnStepHover: string;
  btnStepShadow: string;
  btnReset: string;
  btnResetHover: string;
  btnResetShadow: string;
  textRun: string;
  textPause: string;
  textStep: string;
  textReset: string;
  layout?: 'default' | 'inverted';
  screenSize?: number;
  customActionButtons?: number;
  btnX?: string;
  btnXActive?: string;
  btnXShadow?: string;
  btnY?: string;
  btnYActive?: string;
  btnYShadow?: string;
  borderStyle?: string;
};

export const DEFAULT_CONSOLE_THEMES: Record<string, ConsoleThemeConfig> = {

  monokai: {
    id: 'monokai', name: 'Monokai',
    body: '#272822', border: '#1e1f1c',
    dpad: '#49483e', dpadActive: '#66d9ef', dpadShadow: '#1e1f1c',
    btnA: '#a6e22e', btnAActive: '#a6e22e', btnAShadow: '#75715e',
    btnB: '#f92672', btnBActive: '#f92672', btnBShadow: '#75715e',
    btnRun: '#a6e22e', btnRunHover: '#a6e22e', btnRunShadow: '#75715e',
    btnPause: '#e6db74', btnPauseHover: '#e6db74', btnPauseShadow: '#75715e',
    btnStep: '#66d9ef', btnStepHover: '#66d9ef', btnStepShadow: '#75715e',
    btnReset: '#f92672', btnResetHover: '#f92672', btnResetShadow: '#75715e',
    textRun: '#272822', textPause: '#272822', textStep: '#272822', textReset: '#272822',
    layout: 'default'
  },
  nord: {
    id: 'nord', name: 'Nord',
    body: '#2e3440', border: '#242933',
    dpad: '#434c5e', dpadActive: '#88c0d0', dpadShadow: '#242933',
    btnA: '#a3be8c', btnAActive: '#a3be8c', btnAShadow: '#3b4252',
    btnB: '#bf616a', btnBActive: '#bf616a', btnBShadow: '#3b4252',
    btnRun: '#a3be8c', btnRunHover: '#a3be8c', btnRunShadow: '#3b4252',
    btnPause: '#ebcb8b', btnPauseHover: '#ebcb8b', btnPauseShadow: '#3b4252',
    btnStep: '#81a1c1', btnStepHover: '#81a1c1', btnStepShadow: '#3b4252',
    btnReset: '#bf616a', btnResetHover: '#bf616a', btnResetShadow: '#3b4252',
    textRun: '#2e3440', textPause: '#2e3440', textStep: '#2e3440', textReset: '#2e3440',
    layout: 'default'
  },
  solarizedDark: {
    id: 'solarizedDark', name: 'Solarized Dark',
    body: '#002b36', border: '#001e26',
    dpad: '#073642', dpadActive: '#268bd2', dpadShadow: '#001e26',
    btnA: '#859900', btnAActive: '#859900', btnAShadow: '#001e26',
    btnB: '#dc322f', btnBActive: '#dc322f', btnBShadow: '#001e26',
    btnRun: '#859900', btnRunHover: '#859900', btnRunShadow: '#001e26',
    btnPause: '#b58900', btnPauseHover: '#b58900', btnPauseShadow: '#001e26',
    btnStep: '#268bd2', btnStepHover: '#268bd2', btnStepShadow: '#001e26',
    btnReset: '#dc322f', btnResetHover: '#dc322f', btnResetShadow: '#001e26',
    textRun: '#002b36', textPause: '#002b36', textStep: '#002b36', textReset: '#002b36',
    layout: 'default'
  },
  gruvbox: {
    id: 'gruvbox', name: 'Gruvbox Dark',
    body: '#282828', border: '#3c3836',
    dpad: '#504945', dpadActive: '#83a598', dpadShadow: '#1d2021',
    btnA: '#b8bb26', btnAActive: '#b8bb26', btnAShadow: '#79740e',
    btnB: '#fb4934', btnBActive: '#fb4934', btnBShadow: '#9d0006',
    btnRun: '#8ec07c', btnRunHover: '#8ec07c', btnRunShadow: '#427b58',
    btnPause: '#fabd2f', btnPauseHover: '#fabd2f', btnPauseShadow: '#b57614',
    btnStep: '#83a598', btnStepHover: '#83a598', btnStepShadow: '#076678',
    btnReset: '#fb4934', btnResetHover: '#fb4934', btnResetShadow: '#9d0006',
    textRun: '#282828', textPause: '#282828', textStep: '#282828', textReset: '#282828',
    layout: 'default'
  },
  orange: {
    id: 'orange', name: 'Retro Orange',
    body: '#e86a17', border: '#cc5500',
    dpad: '#4b6584', dpadActive: '#f97316', dpadShadow: '#384e68',
    btnA: '#f97316', btnAActive: '#ff9f43', btnAShadow: '#c2560b',
    btnB: '#4b6584', btnBActive: '#778ca3', btnBShadow: '#2d3e50',
    btnRun: '#20bf6b', btnRunHover: '#26de81', btnRunShadow: '#0f8045', textRun: '#000000',
    btnPause: '#f7b731', btnPauseHover: '#fed330', btnPauseShadow: '#a87a17', textPause: '#000000',
    btnStep: '#4b6584', btnStepHover: '#778ca3', btnStepShadow: '#2d3e50', textStep: '#ffffff',
    btnReset: '#eb3b5a', btnResetHover: '#fc5c65', btnResetShadow: '#a5233d', textReset: '#ffffff',
  },
  atomic: {
    id: 'atomic', name: 'Atomic Purple',
    body: '#8e44ad', border: '#5b2c6f',
    dpad: '#2c3e50', dpadActive: '#9b59b6', dpadShadow: '#1a252f',
    btnA: '#9b59b6', btnAActive: '#b27ad0', btnAShadow: '#6c3483',
    btnB: '#3498db', btnBActive: '#5dade2', btnBShadow: '#21618c',
    btnRun: '#2ecc71', btnRunHover: '#27ae60', btnRunShadow: '#1d8348', textRun: '#000000',
    btnPause: '#f1c40f', btnPauseHover: '#f39c12', btnPauseShadow: '#b7950b', textPause: '#000000',
    btnStep: '#34495e', btnStepHover: '#2c3e50', btnStepShadow: '#1a252f', textStep: '#ffffff',
    btnReset: '#e74c3c', btnResetHover: '#c0392b', btnResetShadow: '#943126', textReset: '#ffffff',
  },
  glacier: {
    id: 'glacier', name: 'Glacier White',
    body: '#f1f2f6', border: '#ced6e0',
    dpad: '#747d8c', dpadActive: '#a4b0be', dpadShadow: '#57606f',
    btnA: '#3742fa', btnAActive: '#5352ed', btnAShadow: '#1e90ff',
    btnB: '#ff4757', btnBActive: '#ff6b81', btnBShadow: '#ff7f50',
    btnRun: '#2ed573', btnRunHover: '#7bed9f', btnRunShadow: '#1e8449', textRun: '#000000',
    btnPause: '#ffa502', btnPauseHover: '#eccc68', btnPauseShadow: '#ff7f50', textPause: '#000000',
    btnStep: '#57606f', btnStepHover: '#747d8c', btnStepShadow: '#2f3542', textStep: '#ffffff',
    btnReset: '#ff4757', btnResetHover: '#ff6b81', btnResetShadow: '#ff7f50', textReset: '#ffffff',
  },
  midnight: {
    id: 'midnight', name: 'Midnight Black',
    body: '#2d3436', border: '#1e272e',
    dpad: '#636e72', dpadActive: '#b2bec3', dpadShadow: '#000000',
    btnA: '#d63031', btnAActive: '#ff7675', btnAShadow: '#b33939',
    btnB: '#0984e3', btnBActive: '#74b9ff', btnBShadow: '#227093',
    btnRun: '#00b894', btnRunHover: '#55efc4', btnRunShadow: '#009432', textRun: '#000000',
    btnPause: '#fdcb6e', btnPauseHover: '#ffeaa7', btnPauseShadow: '#cc8e35', textPause: '#000000',
    btnStep: '#636e72', btnStepHover: '#b2bec3', btnStepShadow: '#2d3436', textStep: '#ffffff',
    btnReset: '#d63031', btnResetHover: '#ff7675', btnResetShadow: '#b33939', textReset: '#ffffff',
  }
};

const DEFAULT_CODE = TUTORIALS[0].steps[0].code;

const THEMES = {

  monokai: {
    name: 'Monokai',
    comment: 'text-[#75715e]',
    buffer: 'text-[#66d9ef] font-bold',
    priority: 'text-[#e6db74]',
    expression: 'text-[#a6e22e]',
    arrow: 'text-[#f92672] font-bold',
    question: 'text-[#fd971f] font-bold',
    repeat: 'text-[#f92672] font-bold'
  },
  nord: {
    name: 'Nord',
    comment: 'text-[#4c566a]',
    buffer: 'text-[#88c0d0] font-bold',
    priority: 'text-[#ebcb8b]',
    expression: 'text-[#a3be8c]',
    arrow: 'text-[#81a1c1] font-bold',
    question: 'text-[#bf616a] font-bold',
    repeat: 'text-[#b48ead] font-bold'
  },
  solarizedDark: {
    name: 'Solarized Dark',
    comment: 'text-[#586e75]',
    buffer: 'text-[#268bd2] font-bold',
    priority: 'text-[#b58900]',
    expression: 'text-[#859900]',
    arrow: 'text-[#dc322f] font-bold',
    question: 'text-[#cb4b16] font-bold',
    repeat: 'text-[#d33682] font-bold'
  },
  gruvbox: {
    name: 'Gruvbox',
    comment: 'text-[#928374]',
    buffer: 'text-[#d3869b] font-bold',
    priority: 'text-[#fabd2f]',
    expression: 'text-[#b8bb26]',
    arrow: 'text-[#fe8019] font-bold',
    question: 'text-[#fb4934] font-bold',
    repeat: 'text-[#8ec07c] font-bold'
  },
  default: {
    name: 'Neon',
    comment: 'text-green-500',
    buffer: 'text-purple-400 font-bold',
    priority: 'text-yellow-400',
    expression: 'text-blue-400',
    arrow: 'text-red-400 font-bold',
    question: 'text-pink-400 font-bold',
    repeat: 'text-orange-400 font-bold'
  },
  dracula: {
    name: 'Dracula',
    comment: 'text-[#6272a4]',
    buffer: 'text-[#8be9fd] font-bold',
    priority: 'text-[#f1fa8c]',
    expression: 'text-[#50fa7b]',
    arrow: 'text-[#ff79c6] font-bold',
    question: 'text-[#ff5555] font-bold',
    repeat: 'text-[#ffb86c] font-bold'
  },
};


const SPLASH_SCREEN = [
  "====================",
  "                    ",
  "                    ",
  "                    ",
  "   __         __    ",
  "  /  \\_______/  \\   ",
  "  \\             /   ",
  "   \\   DOT X   /    ",
  "    \\         /     ",
  "     \\_______/      ",
  "                    ",
  "                    ",
  "                    ",
  "     READY...       ",
  "===================="
].join('');

export default function App() {
  const [code, setCode] = useState(() => {
    return (window as any).__STANDALONE_CODE__ || localStorage.getItem('dotx_autosave') || DEFAULT_CODE;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const engineRef = useRef(new DotX());
  const [frame, setFrame] = useState(0);
  const requestRef = useRef<number>(null);
  const lastTickRef = useRef<number>(0);
  const TICK_RATE = 300; // ms per tick

  
  const [mobileTab, setMobileTab] = useState<'editor' | 'game'>('game');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompletePos, setAutocompletePos] = useState({ top: 0, left: 0 });
  const [autocompleteText, setAutocompleteText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const editorRef = useRef<any>(null);

  const [activeTutorialId, setActiveTutorialId] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  
  const [cartridges, setCartridges] = useState<{ id: string, name: string, code: string, timestamp: number }[]>(() => {
    try {
      const saved = localStorage.getItem('dotx_cartridges');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  
  const [newCartName, setNewCartName] = useState('');
  
  const saveCartridge = () => {
    if (!newCartName.trim()) return;
    const newCart = { id: Date.now().toString(), name: newCartName, code, timestamp: Date.now() };
    setCartridges(prev => {
      const next = [newCart, ...prev];
      localStorage.setItem('dotx_cartridges', JSON.stringify(next));
      return next;
    });
    setNewCartName('');
  };
  
  const loadCartridge = (c) => {
    setCode(c.code);
    setActivePane(null);
    setIsRunning(false);
    setMobileTab('editor');
    setFrame(0);
  };

  const [history, setHistory] = useState<{ timestamp: number; code: string }[]>(() => {
    try {
      const saved = localStorage.getItem('dotx_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  
  
  const [showCartridgeMenu, setShowCartridgeMenu] = useState(false);
  const [regexTestString, setRegexTestString] = useState('');
  const [regexTestPattern, setRegexTestPattern] = useState('');
  const [regexTestReplacement, setRegexTestReplacement] = useState('');

  const saveToHistory = (newCode: string) => {
    setHistory(prev => {
      if (prev.length > 0 && prev[0].code === newCode) return prev;
      const next = [{ timestamp: Date.now(), code: newCode }, ...prev].slice(0, 5);
      localStorage.setItem('dotx_history', JSON.stringify(next));
      return next;
    });
  };

  const [theme, setTheme] = useState<keyof typeof THEMES>('default');
  const [customThemes, setCustomThemes] = useState<Record<string, ConsoleThemeConfig>>((window as any).__STANDALONE_CUSTOM_THEMES__ || {});
  const isStandalone = !!(window as any).__STANDALONE_MODE__;
  const [consoleTheme, setConsoleTheme] = useState<string>((window as any).__STANDALONE_THEME__ || 'orange');
  type ToolTab = 'regex' | 'tutorials' | 'cartridges' | 'history' | 'themes' | null;
  const [activePane, setActivePane] = useState<ToolTab>(null);
  

  useEffect(() => {
    if (isStandalone) {
      handlePlay();
    }
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dotx_custom_themes');
      if (saved) setCustomThemes(JSON.parse(saved));
    } catch (e) {}
  }, []);
  
  const CONSOLE_THEMES: Record<string, ConsoleThemeConfig> = { ...DEFAULT_CONSOLE_THEMES, ...customThemes };

  const currentTheme = CONSOLE_THEMES[consoleTheme] || DEFAULT_CONSOLE_THEMES['orange'];
  
  const consoleStyle = {
    '--theme-border-style': currentTheme.borderStyle || 'solid',
    '--theme-body': currentTheme.body,
    '--theme-border': currentTheme.border,
    '--theme-dpad': currentTheme.dpad,
    '--theme-dpad-active': currentTheme.dpadActive,
    '--theme-dpad-shadow': currentTheme.dpadShadow,
    '--theme-btn-a': currentTheme.btnA,
    '--theme-btn-a-active': currentTheme.btnAActive,
    '--theme-btn-a-shadow': currentTheme.btnAShadow,
    '--theme-btn-b': currentTheme.btnB,
    '--theme-btn-b-active': currentTheme.btnBActive,
    '--theme-btn-b-shadow': currentTheme.btnBShadow,
    '--theme-btn-run': currentTheme.btnRun,
    '--theme-btn-run-hover': currentTheme.btnRunHover,
    '--theme-btn-run-shadow': currentTheme.btnRunShadow,
    '--theme-btn-pause': currentTheme.btnPause,
    '--theme-btn-pause-hover': currentTheme.btnPauseHover,
    '--theme-btn-pause-shadow': currentTheme.btnPauseShadow,
    '--theme-btn-step': currentTheme.btnStep,
    '--theme-btn-step-hover': currentTheme.btnStepHover,
    '--theme-btn-step-shadow': currentTheme.btnStepShadow,
    '--theme-btn-reset': currentTheme.btnReset,
    '--theme-btn-reset-hover': currentTheme.btnResetHover,
    '--theme-btn-reset-shadow': currentTheme.btnResetShadow,
    '--theme-text-run': currentTheme.textRun,
    '--theme-text-pause': currentTheme.textPause,
    '--theme-text-step': currentTheme.textStep,
    '--theme-text-reset': currentTheme.textReset,
  } as React.CSSProperties;




  const KEYWORDS = ['@SCREEN', '@INPUT', '@COLORS', '@DATA', '->', 'REPEAT_UNTIL', '?', '[P:000]', '#{'];

  const highlightSyntax = (code: string) => {
    const t = THEMES[theme];
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(\/\*[\s\S]*?\*\/)/g, `<span class="${t.comment}">$1</span>`)
      .replace(/(\/\/.*)/g, `<span class="${t.comment}">$1</span>`)
      .replace(/(@[A-Z_]+)/g, `<span class="${t.buffer}">$1</span>`)
      .replace(/(\[P:\d+\])/g, `<span class="${t.priority}">$1</span>`)
      .replace(/(#{[^}]+})/g, `<span class="${t.expression}">$1</span>`)
      .replace(/(-&gt;)/g, `<span class="${t.arrow}">$1</span>`)
      .replace(/(\?)/g, `<span class="${t.question}">$1</span>`)
      .replace(/\b(REPEAT_UNTIL)\b/g, `<span class="${t.repeat}">$1</span>`);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    const textarea = editorRef.current?._input || document.querySelector('.dotx-editor textarea');
    if (textarea) {
      const cursor = textarea.selectionStart;
      const textBeforeCursor = newCode.substring(0, cursor);
      const match = textBeforeCursor.match(/([a-zA-Z_@#\[\-\?:\{\}0-9]+)$/);
      
      if (match) {
        const coords = getCaretCoordinates(textarea, cursor);
        const matchedText = match[0];
        const newSuggestions = KEYWORDS.filter(k => k.startsWith(matchedText) && k !== matchedText);
        if (newSuggestions.length > 0) {
          setAutocompletePos({ top: coords.top + 20, left: coords.left });
          setAutocompleteText(matchedText);
          setSuggestions(newSuggestions);
          setSelectedIndex(0);
          setShowAutocomplete(true);
        } else {
          setShowAutocomplete(false);
        }
      } else {
        setShowAutocomplete(false);
      }
    }
  };

  const insertSuggestion = (suggestion: string) => {
    const textarea = editorRef.current?._input || document.querySelector('.dotx-editor textarea');
    if (textarea) {
      const cursor = textarea.selectionStart;
      const textBeforeCursor = code.substring(0, cursor);
      const textAfterCursor = code.substring(cursor);
      const match = textBeforeCursor.match(/([a-zA-Z_@#\[\-\?:\{\}0-9]+)$/);
      if (match) {
        const newTextBefore = textBeforeCursor.substring(0, textBeforeCursor.length - match[0].length) + suggestion;
        setCode(newTextBefore + textAfterCursor);
        setShowAutocomplete(false);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = newTextBefore.length;
          textarea.focus();
        }, 0);
      }
    }
  };

  const handleKeyDownEditor = (e: React.KeyboardEvent) => {
    if (showAutocomplete && suggestions.length > 0) {
      if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        insertSuggestion(suggestions[selectedIndex]);
      } else if (e.key === 'Escape') {
        setShowAutocomplete(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      }
    }
  };

  const engine = engineRef.current;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('game');
    if (codeParam) {
      try {
        const decoded = decodeURIComponent(atob(codeParam));
        setCode(decoded);
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch(e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dotx_autosave', code);
  }, [code]);

  const loop = (time: number) => {
    if (time - lastTickRef.current >= TICK_RATE) {
      engine.tick();
      lastTickRef.current = time;
      setFrame(f => f + 1);
    }
    requestRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(loop);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning]);

  const handlePlay = () => {
    engine.init();
    const success = engine.compile(code);
    if (success) {
      setError(null);
      saveToHistory(code);
      setIsRunning(true);
      setFrame(f => f + 1);
    } else {
      setError(engine.error);
    }
  };

  const handlePause = () => setIsRunning(false);

  const handleStep = () => {
    setIsRunning(false);
    if (engine.rules.length === 0) {
      engine.init();
      if (!engine.compile(code)) {
        setError(engine.error);
        return;
      }
      saveToHistory(code);
    }
    engine.tick();
    setFrame(f => f + 1);
  };

  const handleReset = () => {
    setIsRunning(false);
    engine.init();
    engine.compile(code);
    setFrame(f => f + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, string> = {
        'ArrowUp': 'W', 'w': 'W', 'W': 'W',
        'ArrowDown': 'S', 's': 'S', 'S': 'S',
        'ArrowLeft': 'A', 'a': 'A', 'A': 'A',
        'ArrowRight': 'D', 'd': 'D', 'D': 'D',
        ' ': 'SPACE',
        'Enter': 'ENTER'
      };
      
      const activeTag = document.activeElement?.tagName?.toUpperCase();
      const isInputFocused = activeTag === 'TEXTAREA' || activeTag === 'INPUT' || activeTag === 'SELECT';

      if (keyMap[e.key] && !isInputFocused) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter'].includes(e.key)) {
          e.preventDefault();
        }
        engine.buffers.INPUT += keyMap[e.key];
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInput = (key: string) => {
    engine.buffers.INPUT += key;
    if (navigator.vibrate) navigator.vibrate(15);
  };
  
  const handleShare = () => {
    const encoded = btoa(encodeURIComponent(code));
    const url = `${window.location.origin}?game=${encoded}`;
    navigator.clipboard.writeText(url);
    alert('Share link copied to clipboard!');
  };


  
  
  const handleExportHtml = async () => {
    try {
      let html;
      try {
        const res = await fetch('./standalone-template.txt');
        if (!res.ok) throw new Error("Not found");
        html = await res.text();
      } catch(e) {
        // Fallback for offline (file://) usage
        html = "<!doctype html>\n<html lang=\"en\">" + document.documentElement.innerHTML + "</html>";
        // Clean out the root div's content to keep it clean for React mount
        html = html.replace(/<div id="root">.*?<\/div>/s, '<div id="root"></div>');
        // Remove existing standalone injection if it exists
        html = html.replace(/<script id="standalone-injection">.*?<\/script>/s, '');
      }
      
      const injection = `
        <script id="standalone-injection">
          window.__STANDALONE_MODE__ = true;
          window.__STANDALONE_THEME__ = ${JSON.stringify(consoleTheme)};
          window.__STANDALONE_CUSTOM_THEMES__ = ${JSON.stringify(customThemes)};
          window.__STANDALONE_CODE__ = ${JSON.stringify(code).replace(/</g, '\\u003c')};
        </script>
      `;
      
      html = html.replace('</head>', injection + '</head>');
      
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dotx-game-${Date.now()}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert("Failed to export HTML: " + e.message);
    }
  };

  const handleExportCartridge = () => {
    const cartText = `dotx cartridge // DOTX SYSTEM
version 1
__code__
${code}
__theme__
${consoleTheme}
__custom_themes__
${JSON.stringify(customThemes)}`;

    const blob = new Blob([cartText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dotx-cartridge-${Date.now()}.dotx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dotx-project.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (file.name.endsWith('.dotx')) {
          if (text.startsWith('dotx cartridge')) {
            const codeMatch = text.match(/__code__\n([\s\S]*?)(?=\n__|$)/);
            if (codeMatch) setCode(codeMatch[1]);
            
            const themeMatch = text.match(/__theme__\n(.*)/);
            if (themeMatch) setConsoleTheme(themeMatch[1].trim());

            const customThemesMatch = text.match(/__custom_themes__\n([\s\S]*?)(?=\n__|$)/);
            if (customThemesMatch) {
              try {
                const parsed = JSON.parse(customThemesMatch[1]);
                const newThemes = { ...customThemes, ...parsed };
                setCustomThemes(newThemes);
                localStorage.setItem('dotx_custom_themes', JSON.stringify(newThemes));
              } catch(err) {}
            }
          } else {
            alert('Invalid DOTX cartridge file');
          }
        } else {
          setCode(text);
        }
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  };

  const handleFormat = () => {
    const linesStr = code.split('\n');
    const formatted = linesStr.map(line => {
      let l = line.trim();
      
      if (l.startsWith('//')) {
         return l.replace(/^\/\/\s*/, '// ');
      }
      
      const setupMatch = l.match(/^@([A-Z]+)\s+(?:→|->)\s*(.*)$/);
      if (setupMatch) {
         return `@${setupMatch[1]} -> ${setupMatch[2]}`;
      }
      
      const ruleMatch = l.match(/^(?:\?@([A-Z]+)=([A-Za-z0-9_]+)\s+)?\[P:(\d+)\]\s+@([A-Z]+)\s+\/(.+?)\/([a-z]*)\s+(?:→|->)\s*(.*)$/);
      if (ruleMatch) {
         const [_, condBuf, condVal, prio, tgtBuf, regex, flags, repl] = ruleMatch;
         let res = '';
         if (condBuf) res += `?@${condBuf}=${condVal} `;
         res += `[P:${prio}] @${tgtBuf} /${regex}/${flags} -> ${repl !== undefined ? repl : ''}`;
         return res.trim();
      }
      
      return line;
    });
    
    const finalCode = formatted.join('\n').replace(/\n{3,}/g, '\n\n');
    setCode(finalCode);
  };

  const screenContent = (isRunning || frame > 0 || engine.buffers.SCREEN) ? (engine.buffers.SCREEN || '') : SPLASH_SCREEN;
  const lines = screenContent.match(/.{1,20}/g) || [];

  const parseColors = () => {
    const colorBuf = engine.buffers.COLORS || '';
    const colors: Record<string, string> = {};
    colorBuf.split('\n').forEach(line => {
      if (line.includes(':')) {
        const char = line.charAt(0);
        const color = line.substring(line.indexOf(':') + 1).trim();
        colors[char] = color;
      }
    });
    return colors;
  };

  const customColors = parseColors();


  if (isStandalone) {
    return (
      <div className="min-h-screen bg-black/90 text-white font-sans flex items-center justify-center p-4">
        <div className="w-full max-w-[600px] flex flex-col items-center justify-center p-4">
          <div style={consoleStyle} className={`w-full max-w-[500px] console-body rounded-[40px] shadow-[0_15px_30px_rgba(0,0,0,0.6),inset_0_5px_15px_rgba(255,255,255,0.2)] border-[4px] flex flex-col overflow-hidden h-[850px] max-h-[90vh] relative transition-colors duration-500`}>
            
            {/* Console Title & Stickers */}
            <div className="absolute top-2 left-6 text-black/40 font-bold italic text-2xl select-none" style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.2)'}}>DOTX SYSTEM</div>
            
            {/* Screen */}
            <div className="mx-4 sm:mx-6 mt-16 sm:mt-20 mb-6 bg-black rounded-2xl p-4 sm:p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-4 border-[#333] relative z-10 flex flex-col" style={{height: currentTheme.screenSize ? currentTheme.screenSize + 'px' : '350px'}}>
              {error ? (
                <div className="text-red-500 font-bold text-sm whitespace-pre-wrap overflow-auto flex-1">{error}</div>
              ) : (
                <div className="flex-1 w-full relative">
                  <div className="absolute inset-0 flex flex-col">
                    {engine.getScreenLines().map((line, i) => (
                      <div key={i} className="flex-1 flex" style={{ height: `${100 / 10}%` }}>
                        {line.split('').map((char, j) => (
                          <div 
                            key={j} 
                            className="flex-1 flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold shadow-sm"
                            style={{
                              color: engine.getColor(char),
                              backgroundColor: engine.getBgColor(char),
                              width: `${100 / 20}%`,
                              borderRight: '1px solid rgba(255,255,255,0.02)',
                              borderBottom: '1px solid rgba(255,255,255,0.02)'
                            }}
                          >
                            {char !== '.' ? char : ''}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 pointer-events-none crt-overlay mix-blend-overlay"></div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="px-6 py-4 sm:px-8 sm:py-6 shrink-0 pb-safe">
              <div className={`flex justify-between items-center w-full max-w-[400px] mx-auto mt-2 ${currentTheme.layout === 'inverted' ? 'flex-row-reverse' : ''}`}>
                <div className="grid grid-cols-3 gap-2">
                  <div />
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('W'); }} onMouseDown={() => handleInput('W')} className="w-14 h-14 sm:w-16 sm:h-16 console-btn-dpad rounded-t-lg active:translate-y-1 active:shadow-none flex items-center justify-center text-xl text-white">▲</button>
                  <div />
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('A'); }} onMouseDown={() => handleInput('A')} className="w-14 h-14 sm:w-16 sm:h-16 console-btn-dpad rounded-l-lg active:translate-y-1 active:shadow-none flex items-center justify-center text-xl text-white">◀</button>
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('S'); }} onMouseDown={() => handleInput('S')} className="w-14 h-14 sm:w-16 sm:h-16 console-btn-dpad rounded-b-lg active:translate-y-1 active:shadow-none flex items-center justify-center text-xl text-white">▼</button>
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('D'); }} onMouseDown={() => handleInput('D')} className="w-14 h-14 sm:w-16 sm:h-16 console-btn-dpad rounded-r-lg active:translate-y-1 active:shadow-none flex items-center justify-center text-xl text-white">▶</button>
                </div>

                <div className="flex gap-4 sm:gap-6 mt-6 transform -rotate-12">
                  {currentTheme.customActionButtons && currentTheme.customActionButtons >= 4 && (
                    <>
                      <button onTouchStart={(e) => { e.preventDefault(); handleInput('U'); }} onMouseDown={() => handleInput('U')} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full console-btn-y active:translate-y-1 active:shadow-none flex items-center justify-center text-xl font-bold text-white shadow-xl mt-[-20px]">Y</button>
                      <button onTouchStart={(e) => { e.preventDefault(); handleInput('I'); }} onMouseDown={() => handleInput('I')} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full console-btn-x active:translate-y-1 active:shadow-none flex items-center justify-center text-xl font-bold text-white shadow-xl">X</button>
                    </>
                  )}
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('K'); }} onMouseDown={() => handleInput('K')} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full console-btn-b active:translate-y-1 active:shadow-none flex items-center justify-center text-xl font-bold text-white shadow-xl">B</button>
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('J'); }} onMouseDown={() => handleInput('J')} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full console-btn-a active:translate-y-1 active:shadow-none flex items-center justify-center text-xl font-bold text-white shadow-xl mt-[-20px]">A</button>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-10">
                <button onClick={handleReset} className="px-4 py-2 bg-gray-800 text-white rounded-full text-xs font-bold uppercase hover:bg-gray-700">Restart Game</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-gray-200 font-mono flex flex-col lg:flex-row fixed inset-0 overflow-hidden">
      {/* Mobile Tabs */}
      <div className="flex lg:hidden bg-[#151525] border-b border-[#f97316]/30 shrink-0 z-10 w-full relative top-0">
        <button 
          className={`flex-1 py-3 text-sm font-bold transition-colors ${mobileTab === 'editor' ? 'text-[#f97316] border-b-2 border-[#f97316] bg-[#f97316]/10' : 'text-gray-500 hover:text-gray-300'}`}
          onClick={() => setMobileTab('editor')}
        >
          CODE EDITOR
        </button>
        <button 
          className={`flex-1 py-3 text-sm font-bold transition-colors ${mobileTab === 'game' ? 'text-[#f97316] border-b-2 border-[#f97316] bg-[#f97316]/10' : 'text-gray-500 hover:text-gray-300'}`}
          onClick={() => setMobileTab('game')}
        >
          CONSOLE
        </button>
      </div>


      {/* Editor Panel */}
      <div className={`w-full lg:w-[40%] flex-col h-full border-b lg:border-b-0 lg:border-r border-[#f97316]/30 ${mobileTab === 'editor' ? 'flex flex-1' : 'hidden lg:flex'}`}>
        <div className="p-3 border-b border-[#f97316]/30 bg-[#1a1a2e]/95 flex justify-between items-center shrink-0">
          <h1 className="text-xl font-bold text-[#f97316] tracking-wider">DOTX</h1>
          <div className="flex gap-2 relative overflow-x-auto whitespace-nowrap hide-scrollbar pb-1 -mb-1">
             <div className="flex items-center bg-[#151525] rounded px-2 gap-1 border border-[#f97316]/30 hover:border-[#f97316] transition-colors" title="Syntax Theme">
               <Palette size={14} className="text-[#f97316]" />
               <select
                 value={theme}
                 onChange={(e) => setTheme(e.target.value as keyof typeof THEMES)}
                 className="bg-transparent text-xs text-gray-300 outline-none cursor-pointer py-1 border-none appearance-none pr-2"
                 title="Syntax Theme"
               >
                 {Object.entries(THEMES).map(([key, t]) => (
                   <option key={key} value={key} className="bg-[#1a1a2e]">{t.name}</option>
                 ))}
               </select>
             </div>
             <div className="flex items-center bg-[#151525] rounded px-2 gap-1 border border-[#f97316]/30 hover:border-[#f97316] transition-colors" title="Console Theme">
               <Palette size={14} className="text-[#f97316]" />
               <select
                 value={consoleTheme}
                 onChange={(e) => {
                   if (e.target.value === 'build_new') {
                     setActivePane('themes');
                   } else {
                     setConsoleTheme(e.target.value);
                   }
                 }}
                 className="bg-transparent text-xs text-gray-300 outline-none cursor-pointer py-1 border-none appearance-none pr-2"
                 title="Console Theme"
               >
                 {Object.entries(CONSOLE_THEMES).map(([key, t]) => (
                   <option key={key} value={key} className="bg-[#1a1a2e]">{t.name}</option>
                 ))}
                   <option value="build_new" className="bg-[#1a1a2e] text-[#f97316]">Build New Theme...</option>
               </select>
             </div>
             <button onClick={handleFormat} className="p-1.5 hover:bg-[#f97316]/20 rounded transition-colors text-blue-400" title="Format Code"><AlignLeft size={18}/></button>
             <button onClick={() => setActivePane(p => p === 'regex' ? null : 'regex')} className={`p-1.5 hover:bg-[#f97316]/20 rounded transition-colors ${activePane === 'regex' ? 'text-[#f97316]' : 'text-purple-400'}`} title="Regex Tester"><FlaskConical size={18}/></button>
            <button onClick={() => setActivePane('tutorials')} className="p-1.5 hover:bg-[#f97316]/20 rounded transition-colors text-yellow-400" title="Tutorials"><Library size={18}/></button> 
            <button onClick={() => setActivePane(p => p === 'cartridges' ? null : 'cartridges')} className="p-1.5 hover:bg-[#f97316]/20 rounded transition-colors text-green-400" title="My Cartridges"><Save size={18}/></button>
             <button onClick={handleShare} className="p-1.5 hover:bg-[#f97316]/20 rounded transition-colors" title="Share URL"><Share2 size={18}/></button>
             <div className="relative">
               <button onClick={() => setShowCartridgeMenu(!showCartridgeMenu)} className="p-1.5 hover:bg-[#f97316]/20 rounded transition-colors text-purple-400 flex items-center gap-1" title="Cartridge Menu">
                 <Archive size={18}/>
                 <ChevronDown size={14}/>
               </button>
               {showCartridgeMenu && (
                 <div className="absolute top-full mt-2 right-0 bg-[#2a2a4e] border border-[#f97316]/50 rounded shadow-xl z-50 w-48 flex flex-col py-1 overflow-hidden text-sm">
                   <button onClick={() => { handleExportHtml(); setShowCartridgeMenu(false); }} className="px-4 py-2 hover:bg-[#f97316]/20 text-left text-white flex items-center gap-2">
                     <Download size={14} className="text-blue-400" /> Export Game (.html)
                   </button>
                   <button onClick={() => { handleExportCartridge(); setShowCartridgeMenu(false); }} className="px-4 py-2 hover:bg-[#f97316]/20 text-left text-white flex items-center gap-2">
                     <Download size={14} className="text-[#f97316]" /> Save Cartridge
                   </button>
                   <button onClick={() => { handleExport(); setShowCartridgeMenu(false); }} className="px-4 py-2 hover:bg-[#f97316]/20 text-left text-gray-400 flex items-center gap-2">
                     <Download size={14} /> Export Source (.txt)
                   </button>
                   <label className="px-4 py-2 hover:bg-[#f97316]/20 text-left text-white cursor-pointer flex items-center gap-2">
                     <Upload size={14} className="text-green-400" /> Load Cartridge
                     <input type="file" accept=".txt,.dotx" className="hidden" onChange={(e) => { handleImport(e); setShowCartridgeMenu(false); }} />
                   </label>
                 </div>
               )}
             </div>
             <button onClick={() => setActivePane(p => p === 'history' ? null : 'history')} className="p-1.5 hover:bg-[#f97316]/20 rounded transition-colors text-green-400" title="Code History"><History size={18}/></button>
             
             
             


             

             
    
          </div>
        </div>
        {activeTutorialId && (
          <div className="bg-[#2a2a4e] border-b border-[#f97316]/30 p-4 shrink-0 shadow-inner">
            {(() => {
              const tutorial = TUTORIALS.find(t => t.id === activeTutorialId);
              if (!tutorial) return null;
              const step = tutorial.steps[activeStepIndex];
              return (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#a9c2f0]">Step {activeStepIndex + 1} of {tutorial.steps.length}: <span className="text-white">{step.title}</span></h3>
                    <div className="flex items-center gap-2">
                      <button 
                        disabled={activeStepIndex === 0} 
                        onClick={() => {
                          setActiveStepIndex(prev => prev - 1);
                          setCode(tutorial.steps[activeStepIndex - 1].code);
                        }}
                        className="px-2 py-1 bg-[#4b6584] hover:bg-[#778ca3] shadow-[0_4px_0_#2d3e50] disabled:opacity-50 disabled:hover:bg-gray-700 rounded text-xs text-white transition-colors"
                      >
                        Previous
                      </button>
                      <button 
                        disabled={activeStepIndex === tutorial.steps.length - 1} 
                        onClick={() => {
                          setActiveStepIndex(prev => prev + 1);
                          setCode(tutorial.steps[activeStepIndex + 1].code);
                        }}
                        className="px-2 py-1 bg-[#f97316] hover:bg-[#5b3ae0] disabled:opacity-50 disabled:hover:bg-[#f97316] rounded text-xs text-white transition-colors"
                      >
                        Next
                      </button>
                      <button
                        onClick={() => setActiveTutorialId(null)}
                        className="px-2 py-1 bg-[#eb3b5a] hover:bg-[#fc5c65] shadow-[0_4px_0_#a5233d] rounded text-xs text-white transition-colors ml-2"
                        title="Exit Tutorial"
                      >
                        &times; Exit
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{step.description}</p>
                  {step.task && (
                    <div className="bg-[#151525] p-3 rounded border border-[#f97316]/30">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-bold text-[#a9c2f0] flex-1">
                          <span className="text-[#f97316] mr-2">TASK:</span> 
                          {step.task}
                        </p>
                        {step.solution && (
                           <button 
                             onClick={() => setCode(step.solution!)}
                             className="ml-4 px-3 py-1 bg-green-900/40 hover:bg-green-800/60 text-green-400 border border-green-800/50 rounded text-xs transition-colors shrink-0 whitespace-nowrap"
                           >
                             Show Solution
                           </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
        <div className="flex-1 w-full bg-[#1a1a2e] relative overflow-auto">
          <div className="flex min-h-full min-w-max">
            <div 
              className="text-right select-none text-gray-500 font-mono text-sm bg-[#151525] border-r border-[#f97316]/30 shrink-0 sticky left-0 z-10"
              style={{
                 padding: '16px 8px 16px 12px',
                 fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                 lineHeight: '1.25rem' 
              }}
            >
              {code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="dotx-editor relative flex-1 min-h-full" onKeyDown={handleKeyDownEditor}>
              <Editor
                ref={editorRef}
                value={code}
                onValueChange={handleCodeChange}
                highlight={code => <div dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }} />}
                padding={16}
                className="font-mono text-sm min-h-full"
                textareaClassName="!whitespace-pre"
                preClassName="!whitespace-pre"
                style={{
                  fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                  color: '#a9c2f0',
                  outline: 'none',
                  lineHeight: '1.25rem',
                }}
              />
              {showAutocomplete && suggestions.length > 0 && (
                <div 
                  className="absolute bg-[#2a2a4e] border border-[#f97316]/50 rounded shadow-xl z-50 text-sm overflow-hidden"
                  style={{ top: autocompletePos.top, left: autocompletePos.left }}
                >
                  {suggestions.map((s, idx) => (
                    <div 
                      key={s} 
                      className={`px-3 py-1 cursor-pointer hover:bg-[#f97316]/40 ${idx === selectedIndex ? 'bg-[#f97316]/20' : ''}`}
                      onClick={() => insertSuggestion(s)}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {error && (
          <div className="p-3 bg-red-900/50 text-red-200 text-xs border-t border-red-500/30 shrink-0">
            {error}
          </div>
        )}
      </div>

      
      {/* Main Display & Controls */}
      <div className={`flex-col h-full bg-black/40 bg-orange-500/10 ${mobileTab === 'game' ? 'flex flex-1 w-full' : 'hidden lg:flex flex-1'}`}>
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative w-full">
          {/* Handheld Device Body */}
          
          <div style={consoleStyle} className={`w-full max-w-[500px] console-body rounded-[40px] shadow-[0_15px_30px_rgba(0,0,0,0.6),inset_0_5px_15px_rgba(255,255,255,0.2)] border-[4px] flex flex-col overflow-hidden h-full max-h-[850px] relative transition-colors duration-500`}>
            
            {/* Console Title & Stickers */}
            <div className="absolute top-2 left-6 text-black/40 font-bold italic text-2xl select-none" style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.2)'}}>DOTX SYSTEM</div>
            

            {/* Screen Bezel (Added more padding around the screen) */}
            <div className="bg-black rounded-[20px] m-6 sm:m-8 mt-10 sm:mt-12 p-6 sm:p-8 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-[2px] border-gray-800 flex flex-col items-center justify-center relative flex-1 min-h-0" style={{maxHeight: currentTheme.screenSize ? currentTheme.screenSize + 'px' : 'none'}}>

              <div 
                className="bg-[#0a0a14] p-2 sm:p-4 rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.2)] border-2 border-[#f97316]/40 relative overflow-hidden max-w-full flex justify-center items-center flex-col w-full h-full"
                style={{ fontSize: 'clamp(0.7rem, 4.5vw, 2rem)', lineHeight: 1.1, letterSpacing: '0.1em' }}
              >
                {lines.map((line, i) => (
                  <div key={i} className="whitespace-pre flex">
                    {line.split('').map((char, j) => (
                      <span key={j} className={`
                        inline-block w-[1.2ch] text-center
                        ${customColors[char] ? '' : (
                          char === 'O' || char === 'P' ? 'text-green-400 font-bold drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]' : 
                           char === 'X' || char === '*' ? 'text-yellow-400 font-bold drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]' : 
                           char === 'W' ? 'text-purple-400 font-bold animate-pulse drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]' :
                          char === 'S' || char === '1' || char === '2' || char === '3' || char === '4' ? 'text-emerald-400 drop-shadow-[0_0_3px_rgba(52,211,153,0.8)]' :
                          char === '=' ? 'text-blue-500 drop-shadow-[0_0_2px_rgba(59,130,246,0.8)]' :
                          'text-gray-800'
                        )}
                      `}
                      style={customColors[char] ? { color: customColors[char], textShadow: `0 0 5px ${customColors[char]}80` } : undefined}>
                        {char}
                      </span>
                    ))}
                  </div>
                ))}
                <div className="absolute inset-0 pointer-events-none crt-overlay mix-blend-overlay"></div>
              </div>
            </div>

            {/* Controls Panel */}
            <div className="px-6 py-4 sm:px-8 sm:py-6 shrink-0 pb-safe">
              <div className="flex justify-center gap-2 sm:gap-4 mb-4 lg:mb-6">
                {!isRunning ? (
                  <button onClick={() => { handlePlay(); setMobileTab('game'); }} className={`flex-1 flex justify-center items-center gap-2 console-btn-run px-4 py-3 rounded-full font-bold transition-transform active:translate-y-1 active:shadow-none text-sm sm:text-base`}>
                    <Play size={18} /> Run
                  </button>
                ) : (
                  <button onClick={handlePause} className="flex-1 flex justify-center items-center gap-2 console-btn-pause px-4 py-3 rounded-full font-bold transition-transform active:translate-y-1 active:shadow-none text-sm sm:text-base">
                    <Pause size={18} /> Pause
                  </button>
                )}
                <button onClick={handleStep} className={`flex-1 flex justify-center items-center gap-2 console-btn-step px-4 py-3 rounded-full font-bold transition-transform active:translate-y-1 active:shadow-none text-sm sm:text-base`}>
                  <StepForward size={18} /> Step
                </button>
                <button onClick={handleReset} className={`flex-1 flex justify-center items-center gap-2 console-btn-reset px-4 py-3 rounded-full font-bold transition-transform active:translate-y-1 active:shadow-none text-sm sm:text-base`}>
                  <RotateCcw size={18} /> Reset
                </button>
              </div>

              {/* D-Pad and A/B Buttons */}
              <div className={`flex justify-between items-center w-full max-w-[400px] mx-auto mt-6 ${currentTheme.layout === 'inverted' ? 'flex-row-reverse' : ''}`}>
                <div className="grid grid-cols-3 gap-2">
                  <div />
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('W'); }} onMouseDown={() => handleInput('W')} className={`w-14 h-14 sm:w-16 sm:h-16 console-btn-dpad rounded-t-lg active:translate-y-1 active:shadow-none flex items-center justify-center text-xl text-white`}>▲</button>
                  <div />
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('A'); }} onMouseDown={() => handleInput('A')} className={`w-14 h-14 sm:w-16 sm:h-16 console-btn-dpad rounded-l-lg active:translate-y-1 active:shadow-none flex items-center justify-center text-xl text-white`}>◀</button>
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('S'); }} onMouseDown={() => handleInput('S')} className={`w-14 h-14 sm:w-16 sm:h-16 console-btn-dpad rounded-b-lg active:translate-y-1 active:shadow-none flex items-center justify-center text-xl text-white`}>▼</button>
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('D'); }} onMouseDown={() => handleInput('D')} className={`w-14 h-14 sm:w-16 sm:h-16 console-btn-dpad rounded-r-lg active:translate-y-1 active:shadow-none flex items-center justify-center text-xl text-white`}>▶</button>
                </div>

                <div className="flex gap-4 sm:gap-6 mt-6 transform -rotate-12">
                  {currentTheme.customActionButtons && currentTheme.customActionButtons >= 4 && (
                    <>
                      <button onTouchStart={(e) => { e.preventDefault(); handleInput('U'); }} onMouseDown={() => handleInput('U')} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full console-btn-y active:translate-y-1 active:shadow-none flex items-center justify-center text-xl font-bold text-white shadow-xl mt-[-20px]">Y</button>
                      <button onTouchStart={(e) => { e.preventDefault(); handleInput('I'); }} onMouseDown={() => handleInput('I')} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full console-btn-x active:translate-y-1 active:shadow-none flex items-center justify-center text-xl font-bold text-white shadow-xl">X</button>
                    </>
                  )}
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('K'); }} onMouseDown={() => handleInput('K')} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full console-btn-b active:translate-y-1 active:shadow-none flex items-center justify-center text-xl font-bold text-white shadow-xl">B</button>
                  <button onTouchStart={(e) => { e.preventDefault(); handleInput('J'); }} onMouseDown={() => handleInput('J')} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full console-btn-a active:translate-y-1 active:shadow-none flex items-center justify-center text-xl font-bold text-white shadow-xl mt-[-20px]">A</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      {/* Regex Tester Panel */}
      
      
      {/* Debug (Desktop only) */}
        <div className="hidden lg:flex bg-[#151525] border-t border-[#f97316]/30 p-2 gap-4 text-xs overflow-x-auto shrink-0 z-10 w-full relative mt-auto"> 
           {Object.entries(engine.buffers).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <span className="text-[#f97316] font-bold">@{key}:</span>
              <span className="text-gray-400 font-mono truncate max-w-xs">{value || 'empty'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      

      
    </div>
  );

}

