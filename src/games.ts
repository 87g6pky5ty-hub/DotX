export interface TutorialStep {
  task?: string;
  solution?: string;
  title: string;
  description: string;
  code: string;
}

export interface Tutorial {
  id: string;
  name: string;
  description: string;
  steps: TutorialStep[];
}

export const TUTORIALS: Tutorial[] = [
  {
    "id": "regex_basics",
    "name": "0. Intro: Learning Regex",
    "description": "Welcome to DOTX SYSTEM! Before making games, we need to learn the language of the machine: Regular Expressions (Regex)! Think of it as a super-powered 'Find and Replace'. Even if you've never coded before, you'll be a pro in no time!",
    "steps": [
      {
        "title": "Literal Matches",
        "description": "Let's start simple. Think of Regex like 'Find & Replace' in a word document. If you want to find the letter 'A' and turn it into 'B', you literally just tell the console to find 'A'! In DOTX, you do this with a rule like this: \n[P:010] @SCREEN /FindThis/g -> ReplaceWithThis",
        "task": "Look at the code below. We want to find \"A\" and replace it with \"B\". Type \"[P:010] @SCREEN /A/g -> B\" under the comment.",
        "code": "// Let's learn Regex!\n@SCREEN -> ....................A...................................................................................................................................................................................\n\n// Replace A with B\n// Type your rule here! \n",
        "solution": "// Let's learn Regex!\n@SCREEN -> ....................A...................................................................................................................................................................................\n\n// Replace A with B\n[P:010] @SCREEN /A/g -> B\n"
      },
      {
        "title": "The Dot (Wildcard)",
        "description": "Here is a cool trick: The dot '.' is a magical wildcard that means 'ANY single character'. It's like the blank tile in Scrabble. (If you want to match a real dot, you type '\\.' to tell the system you literally mean a dot).",
        "task": "Let's say we want to find ANY character next to an \"X\", and turn both of them into \"YY\". Write a rule that searches for \".X\" and replaces it with \"YY\".",
        "code": "// The Dot Wildcard\n@SCREEN -> ....................aX........bX........cX................................................................................................................................................................\n\n// Replace (any character) + X with YY\n// Add your rule here!\n",
        "solution": "// The Dot Wildcard\n@SCREEN -> ....................aX........bX........cX................................................................................................................................................................\n\n// Replace (any character) + X with YY\n[P:010] @SCREEN /.X/g -> YY\n"
      },
      {
        "title": "Character Classes",
        "description": "Sometimes the dot wildcard is too broad. You can use brackets [] to create a 'whitelist' of characters. For example, [aeiou] finds any vowel, and [0-9] finds any number. Try matching all numbers!",
        "task": "Write a rule that searches for [0-9] and replaces it with #.",
        "code": "// Character Classes\n@SCREEN -> .....1.......a.......5.......Z.......9......................................................................................................................................................................\n\n// Replace any number [0-9] with #\n// Add your rule here!\n",
        "solution": "// Character Classes\n@SCREEN -> .....1.......a.......5.......Z.......9......................................................................................................................................................................\n\n// Replace any number [0-9] with #\n[P:010] @SCREEN /[0-9]/g -> #\n"
      },
      {
        "title": "Capture Groups",
        "description": "Ready for magic? Parentheses () can 'group' characters so the machine remembers them. The first group you make is called $1, the second is $2. We can use these in our replacement to flip characters around without losing them!",
        "task": "Let's swap a letter and a number! Group a letter ([a-z]) and group a number ([0-9]). Then replace them with $2$1 to flip their order!",
        "code": "// Capture Groups\n@SCREEN -> .....a1.............b2.............c3.......................................................................................................................................................................\n\n// Swap a letter and a number\n// Use /([a-z])([0-9])/g -> $2$1\n// Add your rule here!\n",
        "solution": "// Capture Groups\n@SCREEN -> .....a1.............b2.............c3.......................................................................................................................................................................\n\n// Swap a letter and a number\n[P:010] @SCREEN /([a-z])([0-9])/g -> $2$1\n"
      },
      {
        "title": "Quantifiers",
        "description": "Curly braces {} let you say exactly how many characters you want. For example, .{19} means \"exactly 19 of ANY character\". Because our screen is exactly 20 characters wide, an item exactly 19 characters after another is directly below it!",
        "task": "Let's swap \"O\" and \"X\", keeping the 19 characters between them intact. Use (O)(.{19})(X) and replace with $3$2$1!",
        "code": "// Quantifiers\n// The X is exactly one row (19 characters) below the O.\n@SCREEN -> ....................O...................X................................................................................................................................................................\n\n// Swap O and X, keeping the 19 characters between them the same.\n// Use /(O)(.{19})(X)/g -> $3$2$1\n// Add your rule here!\n",
        "solution": "// Quantifiers\n// The X is exactly one row (19 characters) below the O.\n@SCREEN -> ....................O...................X................................................................................................................................................................\n\n// Swap O and X, keeping the 19 characters between them the same.\n[P:010] @SCREEN /(O)(.{19})(X)/g -> $3$2$1\n"
      }
    ]
  },
  {
    "id": "regexos_syntax",
    "name": "1. Syntax: RegexOS Internals",
    "description": "Learn the specific syntax of RegexOS: Buffers, Priorities, Conditions, and Colors.",
    "steps": [
      {
        "title": "The Buffers",
        "description": "RegexOS works by manipulating text buffers. The main ones are @SCREEN (what you see), @INPUT (keys pressed), @DATA (for saving state), and @COLORS (for changing colors). You can also create your own custom buffers, like @MYBUFFER!",
        "task": "Set up the @SCREEN to have a player 'O' and initialize a custom buffer @SCORE with '00'.",
        "code": "// Initialize the Screen\n@SCREEN -> ........................................................................O...........................................................................................................................\n\n// Initialize the Score buffer (just create it and set its value!)\n// Add your rule here!\n",
        "solution": "// Initialize the Screen\n@SCREEN -> ........................................................................O...........................................................................................................................\n\n// Initialize the Score buffer (just create it and set its value!)\n@SCORE -> 00\n"
      },
      {
        "title": "Priorities",
        "description": "Rules run from lowest priority number to highest. [P:010] runs before [P:020]. If no priority is specified, it defaults to 100. Let's see why this matters!",
        "task": "We have a rule that turns 'A' into 'B' and another that turns 'B' into 'C'. If 'A' becomes 'B' first, then 'B' becomes 'C', the 'A' will end up as 'C'! Change the priorities so 'B' turns to 'C' FIRST, then 'A' turns to 'B'.",
        "code": "// Priorities\n@SCREEN -> A.......B\n\n// Make sure B becomes C, and A becomes B.\n// If A becomes B first, it will then immediately become C in the next rule!\n[P:010] @SCREEN /A/g -> B\n[P:020] @SCREEN /B/g -> C\n",
        "solution": "// Priorities\n@SCREEN -> A.......B\n\n// Make sure B becomes C, and A becomes B.\n// If A becomes B first, it will then immediately become C in the next rule!\n[P:020] @SCREEN /A/g -> B\n[P:010] @SCREEN /B/g -> C\n"
      },
      {
        "title": "Conditions",
        "description": "You can make a rule run ONLY if a buffer exactly matches a specific string. We do this by prefixing the rule with ?@BUFFER=VALUE. For example, ?@INPUT=W.",
        "task": "Write a rule that changes 'X' to 'Y' ONLY when the 'SPACE' key is pressed.",
        "code": "// Conditions\n@SCREEN -> XXXXXXX\n\n// Change X to Y only when SPACE is pressed\n// Add your rule here!\n\n// Clean up input\n[P:099] @INPUT /.*/g -> \n",
        "solution": "// Conditions\n@SCREEN -> XXXXXXX\n\n// Change X to Y only when SPACE is pressed\n?@INPUT=SPACE [P:010] @SCREEN /X/g -> Y\n\n// Clean up input\n[P:099] @INPUT /.*/g -> \n"
      },
      {
        "title": "Changing Colors",
        "description": "We added a new feature: @COLORS! You can define colors for characters by adding lines to the @COLORS buffer in the format 'CHAR: COLOR'.",
        "task": "Set the color of 'X' to '#ff0000' (red) and 'O' to 'blue'. Note that the @COLORS buffer expects a multiline string where each line is a character and a color.",
        "code": "// Colors\n@SCREEN -> XXXX....OOOO\n\n// Set the colors!\n// Example: X: red\n@COLORS -> \n",
        "solution": "// Colors\n@SCREEN -> XXXX....OOOO\n\n// Set the colors!\n// Example: X: red\n@COLORS -> X: #ff0000\nO: blue\n"
      }
    ]
  },
  {
    "id": "basics",
    "name": "2. Basics: Drawing Your First World",
    "description": "Let's get started! Learn how to set up the game screen and draw your very first character.",
    "steps": [
      {
        "title": "Welcome to REGEXOS! 👋",
        "description": "Hi there! REGEXOS is a magical fantasy console where games are written using pattern matching (called Regular Expressions). To start, we need a blank canvas. We use the special \"->\" arrow to fill our screen with dots!",
        "task": "Fill the @SCREEN with exactly 200 dots (.) by completing the rule below.",
        "code": "// Welcome to REGEXOS! Let's make a screen!\n// We'll fill our screen with 200 dots (20 across, 10 down)\n@SCREEN -> ",
        "solution": "// Welcome to REGEXOS! Let's make a screen!\n// We'll fill our screen with 200 dots (20 across, 10 down)\n@SCREEN -> ........................................................................................................................................................................................................"
      },
      {
        "title": "Say Hello to the Player!",
        "description": "Now, let's place our hero on the screen! We will use the letter \"O\" for our player.",
        "task": "Change one of the dots (.) in the middle of the starting screen to an \"O\" to represent the player.",
        "code": "// Let's add our player (the letter O) to the screen!\n@SCREEN -> ........................................................................................................................................................................................................",
        "solution": "// Let's add our player (the letter O) to the screen!\n@SCREEN -> ....................................................................................................O..................................................................................................."
      }
    ]
  },
  {
    "id": "movement",
    "name": "3. Movement: Taking a Step",
    "description": "Time to move! Learn how to listen to the keyboard and move your character around.",
    "steps": [
      {
        "title": "Moving to the Right",
        "description": "To move, we listen for keys pressed by the player. Adding '?@INPUT=D' to the start of a rule tells the engine: 'Only run this rule if the D key was pressed!'",
        "task": "Write a rule using [P:010] that swaps \"O\" and \".\" when the D key is pressed, making the player move right.",
        "code": "// Let's make our player move right!\n@SCREEN -> ......................................O.............................................................................................................................................................\n\n// When D is pressed, swap \"O.\" with \".O\" so the player steps right!\n// Add your rule here!\n\n// This cleans up the input so we are ready for the next key press\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Let's make our player move right!\n@SCREEN -> ......................................O.............................................................................................................................................................\n\n// When D is pressed, swap \"O.\" with \".O\" so the player steps right!\n?@INPUT=D [P:010] @SCREEN /(O)(\\.)/g -> $2$1\n\n// This cleans up the input so we are ready for the next key press\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Moving Everywhere!",
        "description": "Moving up (W) or down (S) is trickier! Since our screen is 20 characters wide, the spot exactly below the player is 19 characters away. So we skip 19 dots to move down!",
        "task": "Write rules for A, S, and W to complete the movement controls!",
        "code": "// Now we can move in all four directions!\n@SCREEN -> ......................................O.............................................................................................................................................................\n\n// Move Right (D)\n?@INPUT=D [P:010] @SCREEN /(O)(\\.)/g -> $2$1\n\n// Move Left (A)\n// Add rule for A\n\n// Move Down (S) - skip 19 characters to reach the next row!\n// Add rule for S\n\n// Move Up (W) - skip 19 characters backwards!\n// Add rule for W\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Now we can move in all four directions!\n@SCREEN -> ......................................O.............................................................................................................................................................\n\n// Move Right (D)\n?@INPUT=D [P:010] @SCREEN /(O)(\\.)/g -> $2$1\n// Move Left (A)\n?@INPUT=A [P:011] @SCREEN /(\\.)(O)/g -> $2$1\n\n// Move Down (S) - skip 19 characters to reach the next row!\n?@INPUT=S [P:012] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n// Move Up (W) - skip 19 characters backwards!\n?@INPUT=W [P:013] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "game_logic",
    "name": "4. Game Logic: A Real Adventure!",
    "description": "Put it all together! Create a fun mini-dungeon crawler where you try to reach the treasure.",
    "steps": [
      {
        "title": "Reaching the Goal 🏆",
        "description": "Let's make a real game! We will add a treasure (the letter X) to our screen! When our player (O) touches the treasure (X), they will turn into a happy 'W' (for Winner!)",
        "task": "Write rules that check if O is next to X (in any of the 4 directions) based on player movement, and change them into a W!",
        "code": "// Our very first Dungeon Crawler! Reach the X!\n@SCREEN -> ......................................O.............................................................X.....\n\n// -- HOW TO MOVE --\n?@INPUT=D [P:010] @SCREEN /(O)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(O)/g -> $2$1\n?@INPUT=S [P:012] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n?@INPUT=W [P:013] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n// -- HOW TO WIN --\n// If the Player (O) bumps into the Treasure (X), they turn into a Winner (W)!\n// Add win rules here!\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Our very first Dungeon Crawler! Reach the X!\n@SCREEN -> ......................................O.............................................................X.....\n\n// -- HOW TO MOVE --\n?@INPUT=D [P:010] @SCREEN /(O)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(O)/g -> $2$1\n?@INPUT=S [P:012] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n?@INPUT=W [P:013] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n// -- HOW TO WIN --\n// If the Player (O) bumps into the Treasure (X), they turn into a Winner (W)!\n?@INPUT=D [P:020] @SCREEN /(O)(X)/g -> .W\n?@INPUT=A [P:021] @SCREEN /(X)(O)/g -> W.\n?@INPUT=S [P:022] @SCREEN /(O)(.{19})(X)/g -> .$2W\n?@INPUT=W [P:023] @SCREEN /(X)(.{19})(O)/g -> W$2.\n\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "animation",
    "name": "5. Animations: Twinkling Stars ✨",
    "description": "Learn how to make the screen change over time automatically without user input.",
    "steps": [
      {
        "title": "Making things blink",
        "description": "You can create cool animations by swapping characters automatically every single tick (frame), without pressing any keys!",
        "task": "Write a loop that swaps * with +, but be careful: use an intermediate character like # so they don't all turn into the same character in one tick!",
        "code": "// Twinkling stars in the night sky!\n@SCREEN -> ........................*.........................+.........................*.........................+...\n\n// Swap stars every tick!\n// Write rules to swap * and +\n",
        "solution": "// Twinkling stars in the night sky!\n@SCREEN -> ........................*.........................+.........................*.........................+...\n\n// Swap stars every tick!\n[P:010] @SCREEN /\\*/g -> #\n[P:011] @SCREEN /\\+/g -> *\n[P:012] @SCREEN /#/g -> +"
      }
    ]
  },
  {
    "id": "physics",
    "name": "6. Physics: Gravity & Jumping",
    "description": "What goes up must come down! Learn how to make things fall and jump.",
    "steps": [
      {
        "title": "Gravity 🍎",
        "description": "Gravity pulls us down. In DOTX, we simulate gravity by constantly checking if there is empty air (.) right below the player (O). If there is, they fall!",
        "task": "Write a rule that checks if there is air (.) exactly below the player (O) and moves them down!",
        "code": "// Don't fall too far!\n@SCREEN -> ........O...................................................................................................====================\n\n// Gravity: If there's air (.) below the player (O), move them down!\n// Add gravity rule here\n",
        "solution": "// Don't fall too far!\n@SCREEN -> ........O...................................................................................................====================\n\n// Gravity: If there's air (.) below the player (O), move them down!\n[P:010] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1"
      },
      {
        "title": "Jumping 🦘",
        "description": "We can move the player up when they press W, fighting against the gravity we just created.",
        "task": "Add a rule that moves the player UP when W is pressed. Make sure the jump priority is higher (lower P number) than gravity!",
        "code": "// Press W to jump!\n@SCREEN -> ........................................................................O...........====================\n\n// Jump UP!\n// Add jump rule here\n\n// Gravity pulls DOWN!\n[P:020] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Press W to jump!\n@SCREEN -> ........................................................................O...........====================\n\n// Jump UP!\n?@INPUT=W [P:010] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n// Gravity pulls DOWN!\n[P:020] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "sokoban",
    "name": "7. Project: Sokoban",
    "description": "Build a puzzle game where you push boxes onto targets!",
    "steps": [
      {
        "title": "Sokoban 1: The Warehouse",
        "description": "First, let's draw our Sokoban level. We need walls (#), a player (O), a box (B), and a target (X).",
        "task": "Fill the @SCREEN with the layout. Create an enclosed room of # with O, B, and X inside.",
        "code": "// Draw the Sokoban warehouse!\n// # = Wall, O = Player, B = Box, X = Target, . = Floor\n@SCREEN -> ",
        "solution": "// Draw the Sokoban warehouse!\n// # = Wall, O = Player, B = Box, X = Target, . = Floor\n@SCREEN -> ####################........#..........##.......#..........##.......O..B..X....##.......#..........##.......#..........####################........................................"
      },
      {
        "title": "Sokoban 2: Collision",
        "description": "Our player needs to move, but they shouldn't be able to walk through walls (#) or the box (B) yet.",
        "task": "Write movement rules for W, A, S, D that only allow the player to move into empty floor space (.).",
        "code": "// Sokoban player movement\n@SCREEN -> ####################........#..........##.......#..........##.......O..B..X....##.......#..........##.......#..........####################........................................\n\n// Move Right into Floor\n?@INPUT=D [P:010] @SCREEN /(O)(\\.)/g -> $2$1\n// Add Left, Up, Down into Floor:\n\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Sokoban player movement\n@SCREEN -> ####################........#..........##.......#..........##.......O..B..X....##.......#..........##.......#..........####################........................................\n\n// Move Right into Floor\n?@INPUT=D [P:010] @SCREEN /(O)(\\.)/g -> $2$1\n// Add Left, Up, Down into Floor:\n?@INPUT=A [P:011] @SCREEN /(\\.)(O)/g -> $2$1\n?@INPUT=S [P:012] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n?@INPUT=W [P:013] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Sokoban 3: Push Right & Left",
        "description": "Now for the fun part: pushing boxes! If the player moves right into a Box, and there is Floor behind the Box, the Box moves too.",
        "task": "Add rules to push the box (B) horizontally. Remember: O B . becomes . O B",
        "code": "// Pushing boxes horizontally!\n@SCREEN -> ####################........#..........##.......#..........##.......O..B..X....##.......#..........##.......#..........####################........................................\n\n// Push Right (D)\n// Add rule here\n\n// Push Left (A)\n// Add rule here\n\n// Normal movement\n?@INPUT=D [P:020] @SCREEN /(O)(\\.)/g -> $2$1\n?@INPUT=A [P:021] @SCREEN /(\\.)(O)/g -> $2$1\n?@INPUT=S [P:022] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n?@INPUT=W [P:023] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Pushing boxes horizontally!\n@SCREEN -> ####################........#..........##.......#..........##.......O..B..X....##.......#..........##.......#..........####################........................................\n\n// Push Right (D)\n?@INPUT=D [P:010] @SCREEN /(O)(B)(\\.)/g -> .$1$2\n// Push Left (A)\n?@INPUT=A [P:011] @SCREEN /(\\.)(B)(O)/g -> $2$3.\n\n// Normal movement\n?@INPUT=D [P:020] @SCREEN /(O)(\\.)/g -> $2$1\n?@INPUT=A [P:021] @SCREEN /(\\.)(O)/g -> $2$1\n?@INPUT=S [P:022] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n?@INPUT=W [P:023] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Sokoban 4: Push Up & Down",
        "description": "Pushing vertically is trickier because we have to skip 19 characters between each tile.",
        "task": "Add rules to push the box (B) vertically.",
        "code": "// Pushing boxes vertically!\n@SCREEN -> ####################........#..........##.......#..........##.......O..B..X....##.......#..........##.......#..........####################........................................\n\n// Push Down (S)\n// Add rule here\n\n// Push Up (W)\n// Add rule here\n\n// Push Horizontally\n?@INPUT=D [P:010] @SCREEN /(O)(B)(\\.)/g -> .$1$2\n?@INPUT=A [P:011] @SCREEN /(\\.)(B)(O)/g -> $2$3.\n\n// Normal movement\n?@INPUT=D [P:020] @SCREEN /(O)(\\.)/g -> $2$1\n?@INPUT=A [P:021] @SCREEN /(\\.)(O)/g -> $2$1\n?@INPUT=S [P:022] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n?@INPUT=W [P:023] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Pushing boxes vertically!\n@SCREEN -> ####################........#..........##.......#..........##.......O..B..X....##.......#..........##.......#..........####################........................................\n\n// Push Down (S)\n?@INPUT=S [P:008] @SCREEN /(O)(.{19})(B)(.{19})(\\.)/g -> .$2$1$4$3\n// Push Up (W)\n?@INPUT=W [P:009] @SCREEN /(\\.)(.{19})(B)(.{19})(O)/g -> $3$2$5$4.\n\n// Push Horizontally\n?@INPUT=D [P:010] @SCREEN /(O)(B)(\\.)/g -> .$1$2\n?@INPUT=A [P:011] @SCREEN /(\\.)(B)(O)/g -> $2$3.\n\n// Normal movement\n?@INPUT=D [P:020] @SCREEN /(O)(\\.)/g -> $2$1\n?@INPUT=A [P:021] @SCREEN /(\\.)(O)/g -> $2$1\n?@INPUT=S [P:022] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n?@INPUT=W [P:023] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Sokoban 5: The Goal",
        "description": "In Sokoban, we also need to push boxes onto targets (X). When a Box is pushed onto a Target, it should become a \"W\" (Winner Box)!",
        "task": "Add rules to allow pushing boxes into X (horizontally and vertically) turning them into W.",
        "code": "// Pushing boxes onto targets!\n@SCREEN -> ####################........#..........##.......#..........##.......O..B..X....##.......#..........##.......#..........####################........................................\n\n// Push Right into Target\n?@INPUT=D [P:005] @SCREEN /(O)(B)(X)/g -> .$1W\n// Add Left, Down, Up into Target:\n\n\n// Push into Floor (from previous step)\n?@INPUT=S [P:008] @SCREEN /(O)(.{19})(B)(.{19})(\\.)/g -> .$2$1$4$3\n?@INPUT=W [P:009] @SCREEN /(\\.)(.{19})(B)(.{19})(O)/g -> $3$2$5$4.\n?@INPUT=D [P:010] @SCREEN /(O)(B)(\\.)/g -> .$1$2\n?@INPUT=A [P:011] @SCREEN /(\\.)(B)(O)/g -> $2$3.\n\n// Normal movement\n?@INPUT=D [P:020] @SCREEN /(O)(\\.)/g -> $2$1\n?@INPUT=A [P:021] @SCREEN /(\\.)(O)/g -> $2$1\n?@INPUT=S [P:022] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n?@INPUT=W [P:023] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Pushing boxes onto targets!\n@SCREEN -> ####################........#..........##.......#..........##.......O..B..X....##.......#..........##.......#..........####################........................................\n\n// Push Right into Target\n?@INPUT=D [P:005] @SCREEN /(O)(B)(X)/g -> .$1W\n// Add Left, Down, Up into Target:\n?@INPUT=A [P:006] @SCREEN /(X)(B)(O)/g -> W$3.\n?@INPUT=S [P:007] @SCREEN /(O)(.{19})(B)(.{19})(X)/g -> .$2$1$4W\n?@INPUT=W [P:008] @SCREEN /(X)(.{19})(B)(.{19})(O)/g -> W$2$5$4.\n\n// Push into Floor (from previous step)\n?@INPUT=S [P:010] @SCREEN /(O)(.{19})(B)(.{19})(\\.)/g -> .$2$1$4$3\n?@INPUT=W [P:011] @SCREEN /(\\.)(.{19})(B)(.{19})(O)/g -> $3$2$5$4.\n?@INPUT=D [P:012] @SCREEN /(O)(B)(\\.)/g -> .$1$2\n?@INPUT=A [P:013] @SCREEN /(\\.)(B)(O)/g -> $2$3.\n\n// Normal movement\n?@INPUT=D [P:020] @SCREEN /(O)(\\.)/g -> $2$1\n?@INPUT=A [P:021] @SCREEN /(\\.)(O)/g -> $2$1\n?@INPUT=S [P:022] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n?@INPUT=W [P:023] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Sokoban 6: Full Game",
        "description": "You've built a full Sokoban engine! Here is a more complex level to play.",
        "task": "Play your Sokoban game! No coding required for this step.",
        "code": "// Sokoban Engine Complete!\n@SCREEN -> ####################........#..........##..#####.###......##..#...#...#......##..#.#.#.O.#......##..#.B.B.B.#......##..#.X.X.X.#......##..#########......####################........................................\n\n// Push into Target\n?@INPUT=D [P:005] @SCREEN /(O)(B)(X)/g -> .$1W\n?@INPUT=A [P:006] @SCREEN /(X)(B)(O)/g -> W$3.\n?@INPUT=S [P:007] @SCREEN /(O)(.{19})(B)(.{19})(X)/g -> .$2$1$4W\n?@INPUT=W [P:008] @SCREEN /(X)(.{19})(B)(.{19})(O)/g -> W$2$5$4.\n\n// Push into Floor\n?@INPUT=S [P:010] @SCREEN /(O)(.{19})(B)(.{19})(\\.)/g -> .$2$1$4$3\n?@INPUT=W [P:011] @SCREEN /(\\.)(.{19})(B)(.{19})(O)/g -> $3$2$5$4.\n?@INPUT=D [P:012] @SCREEN /(O)(B)(\\.)/g -> .$1$2\n?@INPUT=A [P:013] @SCREEN /(\\.)(B)(O)/g -> $2$3.\n\n// Normal movement\n?@INPUT=D [P:020] @SCREEN /(O)(\\.)/g -> $2$1\n?@INPUT=A [P:021] @SCREEN /(\\.)(O)/g -> $2$1\n?@INPUT=S [P:022] @SCREEN /(O)(.{19})(\\.)/g -> $3$2$1\n?@INPUT=W [P:023] @SCREEN /(\\.)(.{19})(O)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Just enjoy the game!"
      }
    ]
  },
  {
    "id": "snake",
    "name": "8. Project: Snake Game",
    "description": "A classic game of Snake! We'll learn about continuous movement and decaying trails.",
    "steps": [
      {
        "title": "Snake 1: The Arena",
        "description": "Let's set up the snake arena. We need a Head (H) and an Apple (A).",
        "task": "Draw a walled arena with H in the middle and an A somewhere.",
        "code": "// Snake Arena\n// H = Head, A = Apple, . = Empty\n@SCREEN -> ",
        "solution": "// Snake Arena\n// H = Head, A = Apple, . = Empty\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................"
      },
      {
        "title": "Snake 2: Steering",
        "description": "In Snake, you don't stop moving! We need a state buffer to remember which direction we are currently facing.",
        "task": "Create a @DIR buffer starting with \"D\" (Right). Update @DIR when W, A, S, D are pressed.",
        "code": "// Steering the Snake\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n\n// Direction Buffer\n@DIR -> D\n\n// Update Direction based on input\n// Add rules here!\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Steering the Snake\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n\n// Direction Buffer\n@DIR -> D\n\n// Update Direction based on input\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Snake 3: Slithering",
        "description": "Now, instead of moving based on @INPUT, we move the head (H) continuously based on @DIR.",
        "task": "Add rules to move H into . based on @DIR.",
        "code": "// Slithering continuously!\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n@DIR -> D\n\n// Update Direction\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n// Move Head continuously\n?@DIR=D [P:010] @SCREEN /(H)(\\.)/g -> $2$1\n// Add Left, Up, Down movement\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Slithering continuously!\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n@DIR -> D\n\n// Update Direction\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n// Move Head continuously\n?@DIR=D [P:010] @SCREEN /(H)(\\.)/g -> $2$1\n?@DIR=A [P:011] @SCREEN /(\\.)(H)/g -> $2$1\n?@DIR=S [P:012] @SCREEN /(H)(.{19})(\\.)/g -> $3$2$1\n?@DIR=W [P:013] @SCREEN /(\\.)(.{19})(H)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Snake 4: The Tail",
        "description": "To make the snake long, the head needs to leave a trail! When H moves into ., it will leave a \"5\" behind it.",
        "task": "Modify the movement rules: H . becomes 5 H",
        "code": "// Leaving a trail!\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n@DIR -> D\n\n// Update Direction\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n// Move Head and leave a '5'\n// Modify these rules!\n?@DIR=D [P:010] @SCREEN /(H)(\\.)/g -> 5$1\n?@DIR=A [P:011] @SCREEN /(\\.)(H)/g -> $25\n?@DIR=S [P:012] @SCREEN /(H)(.{19})(\\.)/g -> 5$2$1\n?@DIR=W [P:013] @SCREEN /(\\.)(.{19})(H)/g -> $3$25\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Leaving a trail!\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n@DIR -> D\n\n// Update Direction\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n// Move Head and leave a '5'\n?@DIR=D [P:010] @SCREEN /(H)(\\.)/g -> 5$1\n?@DIR=A [P:011] @SCREEN /(\\.)(H)/g -> $25\n?@DIR=S [P:012] @SCREEN /(H)(.{19})(\\.)/g -> 5$2$1\n?@DIR=W [P:013] @SCREEN /(\\.)(.{19})(H)/g -> $3$25\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Snake 5: Digestion",
        "description": "Right now we just leave a permanent line of 5s. We need the tail to disappear over time! We can do this by decaying numbers every tick.",
        "task": "Add decay rules: 5 becomes 4, 4 becomes 3, 3 becomes 2, 2 becomes 1, and 1 becomes . (air). Note: Order matters! Do 1 first, then 2, etc.",
        "code": "// Decaying the tail!\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n@DIR -> D\n\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n?@DIR=D [P:010] @SCREEN /(H)(\\.)/g -> 5$1\n?@DIR=A [P:011] @SCREEN /(\\.)(H)/g -> $25\n?@DIR=S [P:012] @SCREEN /(H)(.{19})(\\.)/g -> 5$2$1\n?@DIR=W [P:013] @SCREEN /(\\.)(.{19})(H)/g -> $3$25\n\n// Decay rules\n// Add decay rules here! (Make sure their priority is after movement, like [P:050])\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Decaying the tail!\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n@DIR -> D\n\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n?@DIR=D [P:010] @SCREEN /(H)(\\.)/g -> 5$1\n?@DIR=A [P:011] @SCREEN /(\\.)(H)/g -> $25\n?@DIR=S [P:012] @SCREEN /(H)(.{19})(\\.)/g -> 5$2$1\n?@DIR=W [P:013] @SCREEN /(\\.)(.{19})(H)/g -> $3$25\n\n// Decay rules\n[P:051] @SCREEN /1/g -> .\n[P:052] @SCREEN /2/g -> 1\n[P:053] @SCREEN /3/g -> 2\n[P:054] @SCREEN /4/g -> 3\n[P:055] @SCREEN /5/g -> 4\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Snake 6: Apples",
        "description": "When the snake eats an Apple (A), we want it to grow! A clever trick is to leave a larger number like \"9\" when moving into an Apple.",
        "task": "Add movement rules for eating apples (A). The head (H) should leave a \"9\" behind instead of a \"5\".",
        "code": "// Eating Apples to grow!\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n@DIR -> D\n\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n// Eat Apples (leave a 9!)\n// Add eat rules here (priority [P:005]-[P:008])\n\n// Normal Move\n?@DIR=D [P:010] @SCREEN /(H)(\\.)/g -> 5$1\n?@DIR=A [P:011] @SCREEN /(\\.)(H)/g -> $25\n?@DIR=S [P:012] @SCREEN /(H)(.{19})(\\.)/g -> 5$2$1\n?@DIR=W [P:013] @SCREEN /(\\.)(.{19})(H)/g -> $3$25\n\n// Decay\n[P:051] @SCREEN /1/g -> .\n[P:052] @SCREEN /2/g -> 1\n[P:053] @SCREEN /3/g -> 2\n[P:054] @SCREEN /4/g -> 3\n[P:055] @SCREEN /5/g -> 4\n[P:056] @SCREEN /6/g -> 5\n[P:057] @SCREEN /7/g -> 6\n[P:058] @SCREEN /8/g -> 7\n[P:059] @SCREEN /9/g -> 8\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Eating Apples to grow!\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n@DIR -> D\n\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n// Eat Apples (leave a 9!)\n?@DIR=D [P:005] @SCREEN /(H)(A)/g -> 9$1\n?@DIR=A [P:006] @SCREEN /(A)(H)/g -> $29\n?@DIR=S [P:007] @SCREEN /(H)(.{19})(A)/g -> 9$2$1\n?@DIR=W [P:008] @SCREEN /(A)(.{19})(H)/g -> $3$29\n\n// Normal Move\n?@DIR=D [P:010] @SCREEN /(H)(\\.)/g -> 5$1\n?@DIR=A [P:011] @SCREEN /(\\.)(H)/g -> $25\n?@DIR=S [P:012] @SCREEN /(H)(.{19})(\\.)/g -> 5$2$1\n?@DIR=W [P:013] @SCREEN /(\\.)(.{19})(H)/g -> $3$25\n\n// Decay\n[P:051] @SCREEN /1/g -> .\n[P:052] @SCREEN /2/g -> 1\n[P:053] @SCREEN /3/g -> 2\n[P:054] @SCREEN /4/g -> 3\n[P:055] @SCREEN /5/g -> 4\n[P:056] @SCREEN /6/g -> 5\n[P:057] @SCREEN /7/g -> 6\n[P:058] @SCREEN /8/g -> 7\n[P:059] @SCREEN /9/g -> 8\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Snake 7: Game Over",
        "description": "A real snake game ends when you hit a wall (#) or your own tail (1-9). Let's turn the Head into an X if that happens.",
        "task": "Add collision rules for hitting # or [1-9].",
        "code": "// Complete Snake Engine!\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n@DIR -> D\n\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n// Crash into walls or tail ([1-9]|#)\n// Add crash rules here (P:001 - P:004)\n\n\n// Eat Apples\n?@DIR=D [P:005] @SCREEN /(H)(A)/g -> 9$1\n?@DIR=A [P:006] @SCREEN /(A)(H)/g -> $29\n?@DIR=S [P:007] @SCREEN /(H)(.{19})(A)/g -> 9$2$1\n?@DIR=W [P:008] @SCREEN /(A)(.{19})(H)/g -> $3$29\n\n// Normal Move\n?@DIR=D [P:010] @SCREEN /(H)(\\.)/g -> 5$1\n?@DIR=A [P:011] @SCREEN /(\\.)(H)/g -> $25\n?@DIR=S [P:012] @SCREEN /(H)(.{19})(\\.)/g -> 5$2$1\n?@DIR=W [P:013] @SCREEN /(\\.)(.{19})(H)/g -> $3$25\n\n// Decay\n[P:051] @SCREEN /1/g -> .\n[P:052] @SCREEN /2/g -> 1\n[P:053] @SCREEN /3/g -> 2\n[P:054] @SCREEN /4/g -> 3\n[P:055] @SCREEN /5/g -> 4\n[P:056] @SCREEN /6/g -> 5\n[P:057] @SCREEN /7/g -> 6\n[P:058] @SCREEN /8/g -> 7\n[P:059] @SCREEN /9/g -> 8\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Complete Snake Engine!\n@SCREEN -> ####################..................##..................##........H.........##..................##...........A......##..................##..................####################........................................\n@DIR -> D\n\n?@INPUT=W [P:001] @DIR /.*/g -> W\n?@INPUT=S [P:002] @DIR /.*/g -> S\n?@INPUT=A [P:003] @DIR /.*/g -> A\n?@INPUT=D [P:004] @DIR /.*/g -> D\n\n// Crash into walls or tail ([1-9]|#)\n?@DIR=D [P:001] @SCREEN /(H)([1-9#])/g -> 5X\n?@DIR=A [P:002] @SCREEN /([1-9#])(H)/g -> X5\n?@DIR=S [P:003] @SCREEN /(H)(.{19})([1-9#])/g -> 5$2X\n?@DIR=W [P:004] @SCREEN /([1-9#])(.{19})(H)/g -> X$25\n\n// Eat Apples\n?@DIR=D [P:005] @SCREEN /(H)(A)/g -> 9$1\n?@DIR=A [P:006] @SCREEN /(A)(H)/g -> $29\n?@DIR=S [P:007] @SCREEN /(H)(.{19})(A)/g -> 9$2$1\n?@DIR=W [P:008] @SCREEN /(A)(.{19})(H)/g -> $3$29\n\n// Normal Move\n?@DIR=D [P:010] @SCREEN /(H)(\\.)/g -> 5$1\n?@DIR=A [P:011] @SCREEN /(\\.)(H)/g -> $25\n?@DIR=S [P:012] @SCREEN /(H)(.{19})(\\.)/g -> 5$2$1\n?@DIR=W [P:013] @SCREEN /(\\.)(.{19})(H)/g -> $3$25\n\n// Decay\n[P:051] @SCREEN /1/g -> .\n[P:052] @SCREEN /2/g -> 1\n[P:053] @SCREEN /3/g -> 2\n[P:054] @SCREEN /4/g -> 3\n[P:055] @SCREEN /5/g -> 4\n[P:056] @SCREEN /6/g -> 5\n[P:057] @SCREEN /7/g -> 6\n[P:058] @SCREEN /8/g -> 7\n[P:059] @SCREEN /9/g -> 8\n\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "platformer",
    "name": "9. Project: Platformer",
    "description": "Build a full platformer with gravity, jumping, enemies, coins, and multiple levels!",
    "steps": [
      {
        "title": "Platformer 1: The World",
        "description": "Let's create a landscape! We need Ground (=), a Player (P), and empty Air (.).",
        "task": "Draw a nice landscape with some elevated platforms.",
        "code": "// The Platformer World\n@SCREEN -> ",
        "solution": "// The Platformer World\n@SCREEN -> ........................................................................P...................======................................................................................===================="
      },
      {
        "title": "Platformer 2: Gravity",
        "description": "Our player needs to fall down to the ground.",
        "task": "Add a gravity rule that moves the Player (P) down into Air (.).",
        "code": "// Gravity\n@SCREEN -> ........................................................................P...................======................................................................................====================\n\n// Gravity Rule\n// Add rule here\n",
        "solution": "// Gravity\n@SCREEN -> ........................................................................P...................======................................................................................====================\n\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1"
      },
      {
        "title": "Platformer 3: Walking",
        "description": "Let the player walk left and right using A and D.",
        "task": "Add rules to move P left and right into Air (.).",
        "code": "// Walking\n@SCREEN -> ........................................................................P...................======................................................................................====================\n\n// Walk Left/Right\n// Add rules here\n\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Walking\n@SCREEN -> ........................................................................P...................======................................................................................====================\n\n// Walk Left/Right\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Platformer 4: Jumping",
        "description": "Jumping requires moving UP, but ONLY if we are standing on Ground (=)!",
        "task": "Write a jump rule for W. It must check for P on =, and move P into the . above it.",
        "code": "// Jumping\n@SCREEN -> ........................................................................P...................======................................................................................====================\n\n// Jump (W) - Only if on Ground (=)\n// Hint: match air(.), 19 chars, Player(P), 19 chars, Ground(=)\n\n// Walk Left/Right\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Jumping\n@SCREEN -> ........................................................................P...................======................................................................................====================\n\n// Jump (W) - Only if on Ground (=)\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n\n// Walk Left/Right\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Platformer 5: Spikes",
        "description": "Let's add some danger! Spikes (^) will kill the player.",
        "task": "Draw some spikes (^). Add rules so if P walks or falls into ^, they turn into a tombstone (X).",
        "code": "// Spikes!\n@SCREEN -> ........................................................................P...................======..............^^^^^.......................................................====================\n\n// Touch Spikes (turn to X)\n// Add rules here\n\n// Jump\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n// Walk Left/Right\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Spikes!\n@SCREEN -> ........................................................................P...................======..............^^^^^.......................................................====================\n\n// Touch Spikes (turn to X)\n[P:001] @SCREEN /(P)(\\^)/g -> .X\n[P:002] @SCREEN /(\\^)(P)/g -> X.\n[P:003] @SCREEN /(P)(.{19})(\\^)/g -> .$2X\n\n// Jump\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n// Walk Left/Right\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Platformer 6: Enemies",
        "description": "Let's create a Goomba-style enemy! 'E' moves right, 'e' moves left.",
        "task": "Add rules for enemies. E moves right into air. If E hits a wall/block, it turns to e. e moves left, turns to E if it hits a wall.",
        "code": "// Enemies!\n@SCREEN -> ........................................................................P...................======...E...................................................................====================\n\n// Enemy AI\n// E moves right into air\n[P:060] @SCREEN /(E)(\\.)/g -> .$1\n// E hits anything else, turns to e\n[P:061] @SCREEN /(E)([^\\.])/g -> e$2\n\n// e moves left into air\n// Add rule\n// e hits anything else, turns to E\n// Add rule\n\n// Jump\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n// Walk Left/Right\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Enemies!\n@SCREEN -> ........................................................................P...................======...E...................................................................====================\n\n// Enemy AI\n// E moves right into air\n[P:060] @SCREEN /(E)(\\.)/g -> .$1\n// E hits anything else, turns to e\n[P:061] @SCREEN /(E)([^\\.])/g -> e$2\n// e moves left into air\n[P:062] @SCREEN /(\\.)(e)/g -> $2.\n// e hits anything else, turns to E\n[P:063] @SCREEN /([^\\.])(e)/g -> $1E\n\n// Jump\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n// Walk Left/Right\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Platformer 7: Enemy Collision",
        "description": "If the player touches an enemy, they die (X). Bonus: If they land ON TOP of an enemy, the enemy dies!",
        "task": "Add collision rules for P and E/e.",
        "code": "// Enemy Collision!\n@SCREEN -> ........................................................................P...................======...E...................................................................====================\n\n// Player stomps Enemy (P falls on E/e)\n[P:001] @SCREEN /(P)(.{19})([Ee])/g -> .$2P\n\n// Enemy touches Player horizontally (Player dies)\n// Add rules here\n\n\n// Enemy AI\n[P:060] @SCREEN /(E)(\\.)/g -> .$1\n[P:061] @SCREEN /(E)([^\\.])/g -> e$2\n[P:062] @SCREEN /(\\.)(e)/g -> $2.\n[P:063] @SCREEN /([^\\.])(e)/g -> $1E\n\n// Jump & Walk\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Enemy Collision!\n@SCREEN -> ........................................................................P...................======...E...................................................................====================\n\n// Player stomps Enemy (P falls on E/e)\n[P:001] @SCREEN /(P)(.{19})([Ee])/g -> .$2P\n\n// Enemy touches Player horizontally (Player dies)\n[P:002] @SCREEN /(P)([Ee])/g -> .X\n[P:003] @SCREEN /([Ee])(P)/g -> X.\n\n// Enemy AI\n[P:060] @SCREEN /(E)(\\.)/g -> .$1\n[P:061] @SCREEN /(E)([^\\.])/g -> e$2\n[P:062] @SCREEN /(\\.)(e)/g -> $2.\n[P:063] @SCREEN /([^\\.])(e)/g -> $1E\n\n// Jump & Walk\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Platformer 8: Coins",
        "description": "What's a platformer without collectibles? Let's add Coins (C)!",
        "task": "Add rules so the Player can walk and jump into Coins, making them disappear.",
        "code": "// Collect the Coins!\n@SCREEN -> ............C...................................C.......................P...................======...E..C................................................................====================\n\n// Collect Coins\n// Add rules for moving into C here!\n\n\n// Enemy Collision\n[P:001] @SCREEN /(P)(.{19})([Ee])/g -> .$2P\n[P:002] @SCREEN /(P)([Ee])/g -> .X\n[P:003] @SCREEN /([Ee])(P)/g -> X.\n\n// Jump & Walk into Air\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n// Enemy AI\n[P:060] @SCREEN /(E)(\\.)/g -> .$1\n[P:061] @SCREEN /(E)([^\\.])/g -> e$2\n[P:062] @SCREEN /(\\.)(e)/g -> $2.\n[P:063] @SCREEN /([^\\.])(e)/g -> $1E\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Collect the Coins!\n@SCREEN -> ............C...................................C.......................P...................======...E..C................................................................====================\n\n// Collect Coins\n?@INPUT=D [P:008] @SCREEN /(P)(C)/g -> .$1\n?@INPUT=A [P:009] @SCREEN /(C)(P)/g -> $2.\n?@INPUT=W [P:004] @SCREEN /(C)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n[P:049] @SCREEN /(P)(.{19})(C)/g -> .$2$1\n\n// Enemy Collision\n[P:001] @SCREEN /(P)(.{19})([Ee])/g -> .$2P\n[P:002] @SCREEN /(P)([Ee])/g -> .X\n[P:003] @SCREEN /([Ee])(P)/g -> X.\n\n// Jump & Walk into Air\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n// Enemy AI\n[P:060] @SCREEN /(E)(\\.)/g -> .$1\n[P:061] @SCREEN /(E)([^\\.])/g -> e$2\n[P:062] @SCREEN /(\\.)(e)/g -> $2.\n[P:063] @SCREEN /([^\\.])(e)/g -> $1E\n\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Platformer 9: Level 1 - The Pit",
        "description": "Your engine is ready! Try to beat this level. Collect the coins and avoid the spikes.",
        "task": "Play Level 1!",
        "code": "// Level 1: The Pit\n@SCREEN -> P..............C....=.....=========..=...........===....===....................=................==.............^^^^..=======.......====..====================\n\n// Collect Coins\n?@INPUT=D [P:008] @SCREEN /(P)(C)/g -> .$1\n?@INPUT=A [P:009] @SCREEN /(C)(P)/g -> $2.\n?@INPUT=W [P:004] @SCREEN /(C)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n[P:049] @SCREEN /(P)(.{19})(C)/g -> .$2$1\n\n// Spikes & Enemies\n[P:001] @SCREEN /(P)(.{19})([Ee\\^])/g -> .$2X\n[P:002] @SCREEN /(P)([Ee\\^])/g -> .X\n[P:003] @SCREEN /([Ee\\^])(P)/g -> X.\n\n// Jump & Walk\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n// Enemy AI\n[P:060] @SCREEN /(E)(\\.)/g -> .$1\n[P:061] @SCREEN /(E)([^\\.])/g -> e$2\n[P:062] @SCREEN /(\\.)(e)/g -> $2.\n[P:063] @SCREEN /([^\\.])(e)/g -> $1E\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Enjoy Level 1!"
      },
      {
        "title": "Platformer 10: Level 2 - The Tower",
        "description": "You'll have to climb up using precision jumps!",
        "task": "Play Level 2!",
        "code": "// Level 2: The Tower\n@SCREEN -> .............C......=......=......=....===................=.................===...........=.....=.................=...........=.......P..C.....=..E....====================\n\n// Collect Coins\n?@INPUT=D [P:008] @SCREEN /(P)(C)/g -> .$1\n?@INPUT=A [P:009] @SCREEN /(C)(P)/g -> $2.\n?@INPUT=W [P:004] @SCREEN /(C)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n[P:049] @SCREEN /(P)(.{19})(C)/g -> .$2$1\n\n// Spikes & Enemies\n[P:001] @SCREEN /(P)(.{19})([Ee\\^])/g -> .$2X\n[P:002] @SCREEN /(P)([Ee\\^])/g -> .X\n[P:003] @SCREEN /([Ee\\^])(P)/g -> X.\n\n// Jump & Walk\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n// Enemy AI\n[P:060] @SCREEN /(E)(\\.)/g -> .$1\n[P:061] @SCREEN /(E)([^\\.])/g -> e$2\n[P:062] @SCREEN /(\\.)(e)/g -> $2.\n[P:063] @SCREEN /([^\\.])(e)/g -> $1E\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Enjoy Level 2!"
      },
      {
        "title": "Platformer 11: Level 3 - The Boss",
        "description": "Multiple enemies and a tight jump. Can you beat it?",
        "task": "Play Level 3!",
        "code": "// Level 3: The Boss\n@SCREEN -> ....................C........=.......C....=....=....==.........===..C...==............=....===.......P.E..=....=..E...=======^^^^^^=====\n\n// Collect Coins\n?@INPUT=D [P:008] @SCREEN /(P)(C)/g -> .$1\n?@INPUT=A [P:009] @SCREEN /(C)(P)/g -> $2.\n?@INPUT=W [P:004] @SCREEN /(C)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n[P:049] @SCREEN /(P)(.{19})(C)/g -> .$2$1\n\n// Spikes & Enemies\n[P:001] @SCREEN /(P)(.{19})([Ee\\^])/g -> .$2X\n[P:002] @SCREEN /(P)([Ee\\^])/g -> .X\n[P:003] @SCREEN /([Ee\\^])(P)/g -> X.\n\n// Jump & Walk\n?@INPUT=W [P:005] @SCREEN /(\\.)(.{19})(P)(.{19})([=])/g -> $3$2.$4$5\n?@INPUT=D [P:010] @SCREEN /(P)(\\.)/g -> $2$1\n?@INPUT=A [P:011] @SCREEN /(\\.)(P)/g -> $2$1\n\n// Gravity Rule\n[P:050] @SCREEN /(P)(.{19})(\\.)/g -> $3$2$1\n\n// Enemy AI\n[P:060] @SCREEN /(E)(\\.)/g -> .$1\n[P:061] @SCREEN /(E)([^\\.])/g -> e$2\n[P:062] @SCREEN /(\\.)(e)/g -> $2.\n[P:063] @SCREEN /([^\\.])(e)/g -> $1E\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Enjoy Level 3!"
      }
    ]
  },
  {
    "id": "tut_11",
    "name": "11. Gravity Mechanics",
    "description": "Learn how to implement Gravity Mechanics using regex rules.",
    "steps": [
      {
        "title": "Intro to Gravity Mechanics",
        "description": "This is step 1 for Gravity Mechanics.",
        "task": "Add a basic rule.",
        "code": "// Gravity Mechanics\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Gravity Mechanics",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Gravity Mechanics Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_12",
    "name": "12. Water Physics",
    "description": "Learn how to implement Water Physics using regex rules.",
    "steps": [
      {
        "title": "Intro to Water Physics",
        "description": "This is step 1 for Water Physics.",
        "task": "Add a basic rule.",
        "code": "// Water Physics\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Water Physics",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Water Physics Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_13",
    "name": "13. Enemy Pathfinding",
    "description": "Learn how to implement Enemy Pathfinding using regex rules.",
    "steps": [
      {
        "title": "Intro to Enemy Pathfinding",
        "description": "This is step 1 for Enemy Pathfinding.",
        "task": "Add a basic rule.",
        "code": "// Enemy Pathfinding\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Enemy Pathfinding",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Enemy Pathfinding Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_14",
    "name": "14. Inventory System",
    "description": "Learn how to implement Inventory System using regex rules.",
    "steps": [
      {
        "title": "Intro to Inventory System",
        "description": "This is step 1 for Inventory System.",
        "task": "Add a basic rule.",
        "code": "// Inventory System\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Inventory System",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Inventory System Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_15",
    "name": "15. Health Bars",
    "description": "Learn how to implement Health Bars using regex rules.",
    "steps": [
      {
        "title": "Intro to Health Bars",
        "description": "This is step 1 for Health Bars.",
        "task": "Add a basic rule.",
        "code": "// Health Bars\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Health Bars",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Health Bars Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_16",
    "name": "16. Shooting Mechanics",
    "description": "Learn how to implement Shooting Mechanics using regex rules.",
    "steps": [
      {
        "title": "Intro to Shooting Mechanics",
        "description": "This is step 1 for Shooting Mechanics.",
        "task": "Add a basic rule.",
        "code": "// Shooting Mechanics\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Shooting Mechanics",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Shooting Mechanics Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_17",
    "name": "17. Bouncing Objects",
    "description": "Learn how to implement Bouncing Objects using regex rules.",
    "steps": [
      {
        "title": "Intro to Bouncing Objects",
        "description": "This is step 1 for Bouncing Objects.",
        "task": "Add a basic rule.",
        "code": "// Bouncing Objects\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Bouncing Objects",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Bouncing Objects Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_18",
    "name": "18. Teleportation",
    "description": "Learn how to implement Teleportation using regex rules.",
    "steps": [
      {
        "title": "Intro to Teleportation",
        "description": "This is step 1 for Teleportation.",
        "task": "Add a basic rule.",
        "code": "// Teleportation\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Teleportation",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Teleportation Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_19",
    "name": "19. Level Transitions",
    "description": "Learn how to implement Level Transitions using regex rules.",
    "steps": [
      {
        "title": "Intro to Level Transitions",
        "description": "This is step 1 for Level Transitions.",
        "task": "Add a basic rule.",
        "code": "// Level Transitions\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Level Transitions",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Level Transitions Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_20",
    "name": "20. Destructible Terrain",
    "description": "Learn how to implement Destructible Terrain using regex rules.",
    "steps": [
      {
        "title": "Intro to Destructible Terrain",
        "description": "This is step 1 for Destructible Terrain.",
        "task": "Add a basic rule.",
        "code": "// Destructible Terrain\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Destructible Terrain",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Destructible Terrain Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_21",
    "name": "21. Day/Night Cycle",
    "description": "Learn how to implement Day/Night Cycle using regex rules.",
    "steps": [
      {
        "title": "Intro to Day/Night Cycle",
        "description": "This is step 1 for Day/Night Cycle.",
        "task": "Add a basic rule.",
        "code": "// Day/Night Cycle\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Day/Night Cycle",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Day/Night Cycle Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_22",
    "name": "22. Weather Effects",
    "description": "Learn how to implement Weather Effects using regex rules.",
    "steps": [
      {
        "title": "Intro to Weather Effects",
        "description": "This is step 1 for Weather Effects.",
        "task": "Add a basic rule.",
        "code": "// Weather Effects\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Weather Effects",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Weather Effects Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_23",
    "name": "23. NPC Dialogue",
    "description": "Learn how to implement NPC Dialogue using regex rules.",
    "steps": [
      {
        "title": "Intro to NPC Dialogue",
        "description": "This is step 1 for NPC Dialogue.",
        "task": "Add a basic rule.",
        "code": "// NPC Dialogue\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced NPC Dialogue",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// NPC Dialogue Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_24",
    "name": "24. Trading System",
    "description": "Learn how to implement Trading System using regex rules.",
    "steps": [
      {
        "title": "Intro to Trading System",
        "description": "This is step 1 for Trading System.",
        "task": "Add a basic rule.",
        "code": "// Trading System\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Trading System",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Trading System Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_25",
    "name": "25. Crafting Mechanics",
    "description": "Learn how to implement Crafting Mechanics using regex rules.",
    "steps": [
      {
        "title": "Intro to Crafting Mechanics",
        "description": "This is step 1 for Crafting Mechanics.",
        "task": "Add a basic rule.",
        "code": "// Crafting Mechanics\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Crafting Mechanics",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Crafting Mechanics Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_26",
    "name": "26. Skill Trees",
    "description": "Learn how to implement Skill Trees using regex rules.",
    "steps": [
      {
        "title": "Intro to Skill Trees",
        "description": "This is step 1 for Skill Trees.",
        "task": "Add a basic rule.",
        "code": "// Skill Trees\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Skill Trees",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Skill Trees Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_27",
    "name": "27. Experience Points",
    "description": "Learn how to implement Experience Points using regex rules.",
    "steps": [
      {
        "title": "Intro to Experience Points",
        "description": "This is step 1 for Experience Points.",
        "task": "Add a basic rule.",
        "code": "// Experience Points\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Experience Points",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Experience Points Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_28",
    "name": "28. Saving & Loading",
    "description": "Learn how to implement Saving & Loading using regex rules.",
    "steps": [
      {
        "title": "Intro to Saving & Loading",
        "description": "This is step 1 for Saving & Loading.",
        "task": "Add a basic rule.",
        "code": "// Saving & Loading\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Saving & Loading",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Saving & Loading Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_29",
    "name": "29. Multiplayer Sync",
    "description": "Learn how to implement Multiplayer Sync using regex rules.",
    "steps": [
      {
        "title": "Intro to Multiplayer Sync",
        "description": "This is step 1 for Multiplayer Sync.",
        "task": "Add a basic rule.",
        "code": "// Multiplayer Sync\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Multiplayer Sync",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Multiplayer Sync Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_30",
    "name": "30. Score Leaderboards",
    "description": "Learn how to implement Score Leaderboards using regex rules.",
    "steps": [
      {
        "title": "Intro to Score Leaderboards",
        "description": "This is step 1 for Score Leaderboards.",
        "task": "Add a basic rule.",
        "code": "// Score Leaderboards\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Score Leaderboards",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Score Leaderboards Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_31",
    "name": "31. Particle Systems",
    "description": "Learn how to implement Particle Systems using regex rules.",
    "steps": [
      {
        "title": "Intro to Particle Systems",
        "description": "This is step 1 for Particle Systems.",
        "task": "Add a basic rule.",
        "code": "// Particle Systems\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Particle Systems",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Particle Systems Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_32",
    "name": "32. Dynamic Lighting",
    "description": "Learn how to implement Dynamic Lighting using regex rules.",
    "steps": [
      {
        "title": "Intro to Dynamic Lighting",
        "description": "This is step 1 for Dynamic Lighting.",
        "task": "Add a basic rule.",
        "code": "// Dynamic Lighting\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Dynamic Lighting",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Dynamic Lighting Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_33",
    "name": "33. Procedural Generation",
    "description": "Learn how to implement Procedural Generation using regex rules.",
    "steps": [
      {
        "title": "Intro to Procedural Generation",
        "description": "This is step 1 for Procedural Generation.",
        "task": "Add a basic rule.",
        "code": "// Procedural Generation\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Procedural Generation",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Procedural Generation Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_34",
    "name": "34. Stealth Mechanics",
    "description": "Learn how to implement Stealth Mechanics using regex rules.",
    "steps": [
      {
        "title": "Intro to Stealth Mechanics",
        "description": "This is step 1 for Stealth Mechanics.",
        "task": "Add a basic rule.",
        "code": "// Stealth Mechanics\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Stealth Mechanics",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Stealth Mechanics Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_35",
    "name": "35. AI Behaviors",
    "description": "Learn how to implement AI Behaviors using regex rules.",
    "steps": [
      {
        "title": "Intro to AI Behaviors",
        "description": "This is step 1 for AI Behaviors.",
        "task": "Add a basic rule.",
        "code": "// AI Behaviors\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced AI Behaviors",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// AI Behaviors Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_36",
    "name": "36. Boss Fights",
    "description": "Learn how to implement Boss Fights using regex rules.",
    "steps": [
      {
        "title": "Intro to Boss Fights",
        "description": "This is step 1 for Boss Fights.",
        "task": "Add a basic rule.",
        "code": "// Boss Fights\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Boss Fights",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Boss Fights Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_37",
    "name": "37. Puzzle Mechanisms",
    "description": "Learn how to implement Puzzle Mechanisms using regex rules.",
    "steps": [
      {
        "title": "Intro to Puzzle Mechanisms",
        "description": "This is step 1 for Puzzle Mechanisms.",
        "task": "Add a basic rule.",
        "code": "// Puzzle Mechanisms\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Puzzle Mechanisms",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Puzzle Mechanisms Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_38",
    "name": "38. Time Manipulation",
    "description": "Learn how to implement Time Manipulation using regex rules.",
    "steps": [
      {
        "title": "Intro to Time Manipulation",
        "description": "This is step 1 for Time Manipulation.",
        "task": "Add a basic rule.",
        "code": "// Time Manipulation\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Time Manipulation",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Time Manipulation Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_39",
    "name": "39. Combo Systems",
    "description": "Learn how to implement Combo Systems using regex rules.",
    "steps": [
      {
        "title": "Intro to Combo Systems",
        "description": "This is step 1 for Combo Systems.",
        "task": "Add a basic rule.",
        "code": "// Combo Systems\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Combo Systems",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Combo Systems Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_40",
    "name": "40. Pet Companions",
    "description": "Learn how to implement Pet Companions using regex rules.",
    "steps": [
      {
        "title": "Intro to Pet Companions",
        "description": "This is step 1 for Pet Companions.",
        "task": "Add a basic rule.",
        "code": "// Pet Companions\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Pet Companions",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Pet Companions Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_41",
    "name": "41. Vehicle Mechanics",
    "description": "Learn how to implement Vehicle Mechanics using regex rules.",
    "steps": [
      {
        "title": "Intro to Vehicle Mechanics",
        "description": "This is step 1 for Vehicle Mechanics.",
        "task": "Add a basic rule.",
        "code": "// Vehicle Mechanics\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Vehicle Mechanics",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Vehicle Mechanics Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_42",
    "name": "42. Racing Game",
    "description": "Learn how to implement Racing Game using regex rules.",
    "steps": [
      {
        "title": "Intro to Racing Game",
        "description": "This is step 1 for Racing Game.",
        "task": "Add a basic rule.",
        "code": "// Racing Game\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Racing Game",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Racing Game Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_43",
    "name": "43. Rhythm Game",
    "description": "Learn how to implement Rhythm Game using regex rules.",
    "steps": [
      {
        "title": "Intro to Rhythm Game",
        "description": "This is step 1 for Rhythm Game.",
        "task": "Add a basic rule.",
        "code": "// Rhythm Game\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Rhythm Game",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Rhythm Game Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_44",
    "name": "44. Fighting Game",
    "description": "Learn how to implement Fighting Game using regex rules.",
    "steps": [
      {
        "title": "Intro to Fighting Game",
        "description": "This is step 1 for Fighting Game.",
        "task": "Add a basic rule.",
        "code": "// Fighting Game\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Fighting Game",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Fighting Game Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_45",
    "name": "45. Tower Defense",
    "description": "Learn how to implement Tower Defense using regex rules.",
    "steps": [
      {
        "title": "Intro to Tower Defense",
        "description": "This is step 1 for Tower Defense.",
        "task": "Add a basic rule.",
        "code": "// Tower Defense\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Tower Defense",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Tower Defense Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_46",
    "name": "46. RTS Mechanics",
    "description": "Learn how to implement RTS Mechanics using regex rules.",
    "steps": [
      {
        "title": "Intro to RTS Mechanics",
        "description": "This is step 1 for RTS Mechanics.",
        "task": "Add a basic rule.",
        "code": "// RTS Mechanics\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced RTS Mechanics",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// RTS Mechanics Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_47",
    "name": "47. Card Game Basics",
    "description": "Learn how to implement Card Game Basics using regex rules.",
    "steps": [
      {
        "title": "Intro to Card Game Basics",
        "description": "This is step 1 for Card Game Basics.",
        "task": "Add a basic rule.",
        "code": "// Card Game Basics\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Card Game Basics",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Card Game Basics Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_48",
    "name": "48. Deck Building",
    "description": "Learn how to implement Deck Building using regex rules.",
    "steps": [
      {
        "title": "Intro to Deck Building",
        "description": "This is step 1 for Deck Building.",
        "task": "Add a basic rule.",
        "code": "// Deck Building\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Deck Building",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Deck Building Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_49",
    "name": "49. Turn Based Combat",
    "description": "Learn how to implement Turn Based Combat using regex rules.",
    "steps": [
      {
        "title": "Intro to Turn Based Combat",
        "description": "This is step 1 for Turn Based Combat.",
        "task": "Add a basic rule.",
        "code": "// Turn Based Combat\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Turn Based Combat",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Turn Based Combat Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  },
  {
    "id": "tut_50",
    "name": "50. Story Branching",
    "description": "Learn how to implement Story Branching using regex rules.",
    "steps": [
      {
        "title": "Intro to Story Branching",
        "description": "This is step 1 for Story Branching.",
        "task": "Add a basic rule.",
        "code": "// Story Branching\n@SCREEN -> P......................................................................................................................................................................................................\n\n// Rule here\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:099] @INPUT /.*/g -> "
      },
      {
        "title": "Advanced Story Branching",
        "description": "Let's make it more complex.",
        "task": "Add an interaction rule.",
        "code": "// Story Branching Advanced\n@SCREEN -> P.......X..............................................................................................................................................................................................\n\n// Interaction rule\n\n[P:099] @INPUT /.*/g -> ",
        "solution": "// Solution\n[P:001] @SCREEN /(P)(\\.)/g -> .$1\n[P:002] @SCREEN /(P)(X)/g -> .P\n[P:099] @INPUT /.*/g -> "
      }
    ]
  }
];