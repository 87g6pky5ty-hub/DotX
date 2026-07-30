export interface Rule {
  conditionBuffer?: string;
  conditionValue?: string;
  priority: number;
  target: string;
  pattern: string;
  flags: string;
  replacement: string;
  originalLine: number;
}

export class DotX {
  buffers: Record<string, string> = {
    SCREEN: '.'.repeat(200),
    INPUT: '',
    DATA: '',
    COLORS: ''
  };
  rules: Rule[] = [];
  error: string | null = null;
  width = 20;
  height = 10;

  init() {
    this.buffers = {
      SCREEN: '.'.repeat(this.width * this.height),
      INPUT: '',
      DATA: '',
      COLORS: ''
    };
  }

  compile(code: string) {
    this.rules = [];
    this.error = null;
    
    // Strip multi-line comments before processing
    let processedCode = code.replace(/\/\*[\s\S]*?\*\//g, match => match.replace(/[^\n]/g, ''));
    
    const lines = processedCode.split('\n');
    let currentBuffer: string | null = null;
    let bufferContent = '';

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line || line.startsWith('//')) continue;
      
      const setupMatch = line.match(/^@([A-Z]+)\s+(?:→|->)\s*(.*)$/);
      if (setupMatch) {
         if (currentBuffer) {
           this.buffers[currentBuffer] = bufferContent;
         }
         currentBuffer = setupMatch[1];
         bufferContent = setupMatch[2];
         continue;
      }
      
      let conditionBuffer, conditionValue;
      const condMatch = line.match(/^\?@([A-Z]+)=([^\s]+)\s+/);
      let ruleLine = line;
      if (condMatch) {
        conditionBuffer = condMatch[1];
        conditionValue = condMatch[2];
        ruleLine = ruleLine.substring(condMatch[0].length);
      }
      
      const match = ruleLine.match(/^\[P:(\d+)\]\s+@([A-Z]+)\s+\/(.+?)\/([a-z]*)\s+(?:→|->)\s*(.*)$/);
      const repeatMatch = line === 'REPEAT_UNTIL' || line === '?';
      
      // If we are currently parsing a buffer and this line is NOT a rule/condition/repeat,
      // then we treat it as a continuation of the buffer.
      if (!condMatch && !match && !repeatMatch && currentBuffer) {
        bufferContent += line;
        continue;
      }
      
      // If we reach here, it's a rule (or syntax error), so commit the buffer.
      if (currentBuffer) {
        this.buffers[currentBuffer] = bufferContent;
        currentBuffer = null;
      }
      
      if (repeatMatch) {
         // (Not fully implementing REPEAT_UNTIL execution yet, but allowing syntax)
         continue;
      }
      
      if (match) {
        try {
          new RegExp(match[3], match[4]); 
          this.rules.push({
            conditionBuffer,
            conditionValue,
            priority: parseInt(match[1], 10),
            target: match[2],
            pattern: match[3],
            flags: match[4],
            replacement: match[5].replace(/\\n/g, '\n'),
            originalLine: i + 1
          });
        } catch (e: any) {
          this.error = `Line ${i + 1}: Invalid Regex - ${e.message}`;
          return false;
        }
      } else {
        this.error = `Line ${i + 1}: Syntax error`;
        return false;
      }
    }
    
    // Commit any trailing buffer
    if (currentBuffer) {
      this.buffers[currentBuffer] = bufferContent;
    }
    
    this.rules.sort((a, b) => a.priority - b.priority);
    return true;
  }

  tick() {
    for (const rule of this.rules) {
      if (rule.conditionBuffer && rule.conditionValue) {
        if (!this.buffers[rule.conditionBuffer]?.includes(rule.conditionValue)) {
          continue;
        }
      }
      
      const buf = this.buffers[rule.target] || '';
      try {
        const regex = new RegExp(rule.pattern, rule.flags);
        this.buffers[rule.target] = buf.replace(regex, rule.replacement);
      } catch (e) {
        // Ignore runtime regex errors
      }
    }
  }
}
