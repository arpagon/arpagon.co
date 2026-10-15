// Pi packages maintained and published (npm) by @arpagon.
// Facts from each repo's README/package.json and the npm registry (checked 2026-10-15).
// Web-provider variants credit their upstream; upstream-only forks are not claimed as original work.

export type Screen =
  | { kind: 'video'; webm: string; mp4: string; poster: string; alt: string; caption: string }
  | { kind: 'text'; lines: string[]; caption: string };

export type PiExtension = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  features: string[];
  npm: string;
  repo: string;
  site?: string;
  screen: Screen;
};

export const STATS_DATE = '2026-10';

export const extensions: PiExtension[] = [
  {
    id: 'pi-rewind', name: 'pi-rewind',
    tagline: 'Undo for your agent.',
    desc: 'Automatic git-based checkpoints of your working tree, so you can rewind file changes and conversation state when the agent makes a mistake.',
    features: ['/rewind: checkpoint browser → diff preview → restore', 'Esc+Esc for a quick files-only rewind', 'Restore files, conversation, or both, with a redo stack', 'Safe restore and branch safety; checkpoints survive restarts'],
    npm: 'pi-rewind', repo: 'https://github.com/arpagon/pi-rewind', site: 'https://arpagon.github.io/pi-rewind/',
    screen: { kind: 'text', caption: 'Illustration of the picker described in the README', lines: [
      '<span class="g">❯</span> /rewind',
      '',
      '<span class="h">  Rewind to checkpoint</span>                    <span class="d">◆ 4 checkpoints</span>',
      '<span class="s">› "add retry to client" → edit → client.ts           [feature]</span>',
      '  "write tests" → write → client.test.ts            [feature]',
      '  "user prompt" → write → file.ts, edit → other.ts  [feature]',
      '  "bootstrap" → bash                                <span class="w">⚠️ main</span>',
      '',
      '<span class="d">  Restore:</span> files + conversation · files only · conversation only',
      '<span class="d">  ↩ Undo last rewind</span>',
    ] },
  },
  {
    id: 'pi-animations', name: 'pi-animations',
    tagline: 'A spinner with taste.',
    desc: "Replaces Pi's default spinner with 26 terminal animations for thinking, working and tool execution, from demoscene fire to Matrix rain to Unicode block loaders, rendered inline in ANSI true color with Nerd Font glyphs.",
    features: ['26 animations, each tagged for thinking, working or tool calls', 'ANSI true color + Nerd Font glyphs, rendered inline', 'Interactive showcase to preview and pick'],
    npm: 'pi-animations', repo: 'https://github.com/arpagon/pi-animations',
    screen: { kind: 'video', webm: '/media/pi-animations-demo.webm', mp4: '/media/pi-animations-demo.mp4', poster: '/media/pi-animations-poster.webp', alt: 'pi-animations cycling through terminal animations inside Pi', caption: 'Real recording · v0.1.0 showcase (21 animations at the time)' },
  },
  {
    id: 'pi-context-zone', name: 'pi-context-zone',
    tagline: 'Know when your agent is getting dumb.',
    desc: "A context health bar in the footer: see at a glance whether you're in the smart, warm or dumb zone before context rot sets in. Inspired by Dex Horthy's “No Vibes Allowed” talk.",
    features: ['Smart / warm / dumb zones at a glance', 'Lives in the footer, zero interaction', 'Helps you compact or start fresh at the right time'],
    npm: 'pi-context-zone', repo: 'https://github.com/arpagon/pi-context-zone',
    screen: { kind: 'text', caption: 'Illustration of the footer zones (README)', lines: [
      '<span class="d">~/project (main)</span>',
      '🧠 <span class="g">████████</span>░░░░│░░░░░│░░░░░ <span class="g">smart</span> 64% left',
      '',
      '<span class="d">… a few long tool outputs later …</span>',
      '🧠 <span class="g">████</span>░░░░│░░░░░│░░░░░ <span class="g">smart</span> 36% left',
      '',
      '<span class="d">… keep going …</span>',
      '⚠️ <span class="w">████████████</span>░│░░░░░ <span class="w">warm</span>',
      '🧟 <span class="r">██████████████████</span> <span class="r">dumb</span> — time to compact',
    ] },
  },
  {
    id: 'pi-worktree-tui-status', name: 'pi-worktree-tui-status',
    tagline: 'Which worktree is it touching?',
    desc: 'A TUI-only indicator that shows which git worktree or disposable experiment the agent is touching when it edits files or runs commands on long paths. Detects; never manages.',
    features: ['Detects runs/agents/worktrees/<slug> and runs/experiments/<app>/<slug>', 'Shows branch and dirty state', 'Read-only: no git operations on your behalf'],
    npm: 'pi-worktree-tui-status', repo: 'https://github.com/arpagon/pi-worktree-tui-status',
    screen: { kind: 'text', caption: 'Status lines from the README (example paths)', lines: [
      '<span class="g">❯</span> edit runs/agents/worktrees/issue-42-fix-login/src/auth.ts',
      '',
      '🌳 issue-42-fix-login | 🌿 42-fix-login | <span class="w">dirty +3</span>',
      '',
      '<span class="g">❯</span> bash ls runs/experiments/site/visual-spike',
      '',
      '🧪 site/visual-spike | <span class="d">experiment</span>',
    ] },
  },
  {
    id: 'pi-web-providers-codex-cf', name: 'pi-web-providers-codex-cf',
    tagline: 'Web search on your ChatGPT subscription.',
    desc: 'A security-minimal web extension: web_search, web_answer and web_research through Codex with ChatGPT subscription auth, and web_contents through Cloudflare Browser Rendering markdown. Inspired by mavam/pi-web-providers.',
    features: ['search / answer / research via Codex (ChatGPT auth)', 'contents via Cloudflare Browser Rendering', 'Small surface: only the providers you use'],
    npm: 'pi-web-providers-codex-cf', repo: 'https://github.com/arpagon/pi-web-providers-codex-cf',
    screen: { kind: 'text', caption: 'Config (README)', lines: [
      '<span class="g">❯</span> /web-providers',
      '{',
      '  "tools": { "search": "codex", "contents": "cloudflare",',
      '             "answer": "codex", "research": "codex" },',
      '  "providers": {',
      '    "codex": { "options": { "webSearchEnabled": true,',
      '               "research": { "modelReasoningEffort": "high" } } },',
      '    "cloudflare": { "accountId": "CLOUDFLARE_ACCOUNT_ID" }',
      '  }',
      '}',
    ] },
  },
  {
    id: 'pi-web-providers-az-cf', name: 'pi-web-providers-az-cf',
    tagline: 'Same idea, on Azure OpenAI.',
    desc: 'The same minimal web extension for OpenAI-compatible / Azure OpenAI Responses API (search, answer, deep research) plus Cloudflare Browser Rendering for page contents.',
    features: ['Azure OpenAI / OpenAI-compatible Responses API', 'Deep research model support', 'Cloudflare Browser Rendering for contents'],
    npm: 'pi-web-providers-az-cf', repo: 'https://github.com/arpagon/pi-web-providers-az-cf',
    screen: { kind: 'text', caption: 'Config (README)', lines: [
      '<span class="g">❯</span> /web-providers init',
      '{',
      '  "tools": { "search": "openai", "contents": "cloudflare",',
      '             "answer": "openai", "research": "openai" },',
      '  "providers": {',
      '    "openai": { "baseUrl": "https://YOUR_AZURE_RESOURCE…/openai/v1/",',
      '                "options": { "research": { "model": "o4-mini-deep-research" } } },',
      '    "cloudflare": { "accountId": "CLOUDFLARE_ACCOUNT_ID" }',
      '  }',
      '}',
    ] },
  },
];

export const contributions = [
  { repo: 'mavam/webfox', title: 'Add Cloudflare Browser Rendering provider for web_contents', url: 'https://github.com/mavam/webfox/pull/9', state: 'merged' },
];
