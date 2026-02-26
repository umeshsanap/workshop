
import React, { useState } from 'react';
import { GitBranch, ArrowDown, ArrowUp, FolderPlus, Link2, ListChecks, FolderInput, Save, CloudDownload, ChevronLeft, ChevronRight } from 'lucide-react';

const commands = [
  {
    id: 'remote-v',
    command: 'git remote -v',
    description: 'List all remote connections (fetch & push URLs).',
    icon: <Link2 className="w-6 h-6 text-[#00d4ff]" />,
    diagram: (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="glass rounded-xl px-8 py-5 text-left w-full max-w-md">
          <div className="text-sm text-[#f5a623] font-mono mb-3">Remote: origin</div>
          <div className="text-sm text-slate-400 font-mono">fetch: https://github.com/user/repo.git</div>
          <div className="text-sm text-slate-400 font-mono">push:  https://github.com/user/repo.git</div>
        </div>
        <div className="text-sm text-slate-500">↑ Output shows your remote names and URLs</div>
      </div>
    ),
  },
  {
    id: 'init',
    command: 'git init',
    description: 'Create a new Git repository in the current folder.',
    icon: <FolderPlus className="w-6 h-6 text-[#2ecc71]" />,
    diagram: (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="flex items-center gap-6">
          <div className="glass rounded-lg px-6 py-4 border border-slate-600">
            <span className="text-base font-mono text-slate-400">my-project/</span>
            <span className="text-slate-600"> (empty)</span>
          </div>
          <span className="text-[#2ecc71] font-bold text-xl">→</span>
          <div className="glass rounded-lg px-6 py-4 border border-[#2ecc71]/50">
            <span className="text-base font-mono text-slate-300">my-project/</span>
            <div className="mt-2 pl-3 border-l-2 border-[#2ecc71]">
              <span className="text-sm font-mono text-[#2ecc71]">.git/</span>
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-500">New .git folder = repo initialized</div>
      </div>
    ),
  },
  {
    id: 'remote-add',
    command: 'git remote add origin <origin url>',
    description: 'Link your local repo to a remote (e.g. GitHub).',
    icon: <Link2 className="w-6 h-6 text-[#f5a623]" />,
    diagram: (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="flex items-center justify-between w-full max-w-lg gap-6">
          <div className="glass rounded-xl px-6 py-4 flex-1 text-center border border-[#00d4ff]/30">
            <div className="text-sm text-[#00d4ff] font-mono mb-1">Local Repo</div>
            <div className="text-xs text-slate-500">your machine</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#f5a623]" style={{ boxShadow: '0 0 12px rgba(245,166,35,0.4)' }}>
              <span className="text-[#f5a623] text-sm font-bold">origin</span>
            </div>
            <div className="text-xs text-[#f5a623] mt-1">link</div>
          </div>
          <div className="glass rounded-xl px-6 py-4 flex-1 text-center border border-[#2ecc71]/30">
            <div className="text-sm text-[#2ecc71] font-mono mb-1">Remote</div>
            <div className="text-xs text-slate-500">GitHub / URL</div>
          </div>
        </div>
        <div className="text-sm text-slate-500">"origin" points local → remote URL</div>
      </div>
    ),
  },
  {
    id: 'status',
    command: 'git status',
    description: 'See what files are changed, staged, or untracked.',
    icon: <ListChecks className="w-6 h-6 text-[#00d4ff]" />,
    diagram: (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="flex gap-6 w-full max-w-lg justify-center">
          <div className="glass rounded-lg px-4 py-3 flex-1 border border-amber-500/40">
            <div className="text-xs text-amber-400 font-mono mb-1">Working directory</div>
            <div className="text-xs text-slate-500">modified / untracked</div>
          </div>
          <div className="glass rounded-lg px-4 py-3 flex-1 border border-[#00d4ff]/40">
            <div className="text-xs text-[#00d4ff] font-mono mb-1">Staged</div>
            <div className="text-xs text-slate-500">git add</div>
          </div>
          <div className="glass rounded-lg px-4 py-3 flex-1 border border-[#2ecc71]/40">
            <div className="text-xs text-[#2ecc71] font-mono mb-1">Committed</div>
            <div className="text-xs text-slate-500">saved</div>
          </div>
        </div>
        <div className="text-sm text-slate-500">git status shows which area each file is in</div>
      </div>
    ),
  },
  {
    id: 'add',
    command: 'git add .',
    description: 'Stage all changes in the current directory for the next commit.',
    icon: <FolderInput className="w-6 h-6 text-[#f5a623]" />,
    diagram: (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="flex items-center justify-center gap-6 w-full">
          <div className="glass rounded-xl px-6 py-4 border border-amber-500/40">
            <div className="text-sm text-amber-400 font-mono mb-2">Working dir</div>
            <div className="text-sm text-slate-400 font-mono">file1.tsx</div>
            <div className="text-sm text-slate-400 font-mono">file2.css</div>
          </div>
          <div className="flex flex-col items-center text-[#f5a623]">
            <ArrowDown className="w-8 h-8 rotate-[-90deg]" />
            <span className="text-xs font-mono">git add .</span>
          </div>
          <div className="glass rounded-xl px-6 py-4 border border-[#00d4ff]/50">
            <div className="text-sm text-[#00d4ff] font-mono mb-2">Staging area</div>
            <div className="text-sm text-slate-400 font-mono">file1.tsx</div>
            <div className="text-sm text-slate-400 font-mono">file2.css</div>
          </div>
        </div>
        <div className="text-sm text-slate-500">All current changes move to staging</div>
      </div>
    ),
  },
  {
    id: 'commit',
    command: 'git commit -m "your message"',
    description: 'Save a snapshot of staged changes with a message.',
    icon: <Save className="w-6 h-6 text-[#2ecc71]" />,
    diagram: (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="flex items-center justify-center gap-6 w-full">
          <div className="glass rounded-xl px-6 py-4 border border-[#00d4ff]/40">
            <div className="text-sm text-[#00d4ff] font-mono">Staging</div>
          </div>
          <div className="flex flex-col items-center text-[#2ecc71]">
            <ArrowDown className="w-8 h-8 rotate-[-90deg]" />
            <span className="text-xs font-mono">commit -m "..."</span>
          </div>
          <div className="glass rounded-xl px-6 py-4 border border-[#2ecc71]/50">
            <div className="text-sm text-[#2ecc71] font-mono mb-1">Commit (snapshot)</div>
            <div className="text-xs text-slate-500">"your message"</div>
          </div>
        </div>
        <div className="text-sm text-slate-500">Staged changes become a permanent snapshot</div>
      </div>
    ),
  },
  {
    id: 'push',
    command: 'git push origin <branch name>',
    description: 'Upload your local branch commits to the remote.',
    icon: <ArrowUp className="w-6 h-6 text-[#f5a623]" />,
    diagram: (
      <div className="flex flex-col items-center gap-3 py-6">
        <div className="glass rounded-xl px-6 py-4 border border-[#2ecc71]/40 min-w-[200px]">
          <div className="text-sm text-[#2ecc71] font-mono">Remote (e.g. main)</div>
          <div className="text-xs text-slate-500">GitHub</div>
        </div>
        <div className="flex flex-col items-center text-[#f5a623]">
          <ArrowUp className="w-10 h-10" />
          <span className="text-sm font-mono">push → data flows up</span>
        </div>
        <div className="glass rounded-xl px-6 py-4 border border-[#00d4ff]/40 min-w-[200px]">
          <div className="text-sm text-[#00d4ff] font-mono">Local branch</div>
          <div className="text-xs text-slate-500">your machine</div>
        </div>
        <div className="text-sm text-slate-500">Your commits go from local → remote</div>
      </div>
    ),
  },
  {
    id: 'pull',
    command: 'git pull origin main',
    description: 'Download and merge changes from remote (e.g. main) into your local branch.',
    icon: <CloudDownload className="w-6 h-6 text-[#00d4ff]" />,
    diagram: (
      <div className="flex flex-col items-center gap-3 py-6">
        <div className="glass rounded-xl px-6 py-4 border border-[#2ecc71]/40 min-w-[200px]">
          <div className="text-sm text-[#2ecc71] font-mono">main (remote)</div>
          <div className="text-xs text-slate-500">GitHub</div>
        </div>
        <div className="flex flex-col items-center text-[#00d4ff]">
          <ArrowDown className="w-10 h-10" />
          <span className="text-sm font-mono">pull → data flows down</span>
        </div>
        <div className="glass rounded-xl px-6 py-4 border border-[#00d4ff]/40 min-w-[200px]">
          <div className="text-sm text-[#00d4ff] font-mono">Local branch</div>
          <div className="text-xs text-slate-500">your machine</div>
        </div>
        <div className="text-sm text-slate-500">Remote main merges into your local branch</div>
      </div>
    ),
  },
];

export const GitCommands: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const item = commands[activeIndex];
  const total = commands.length;

  const goPrev = () => setActiveIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setActiveIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <div className="max-w-4xl mx-auto relative z-10 min-h-[80vh] flex flex-col">
      <div className="text-center mb-8">
        <div
          className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-3 animate-fade-in-down stagger-1"
          style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff' }}
        >
          Git &amp; GitHub
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-2 animate-fade-in-up stagger-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Essential <span className="gradient-text">Git Commands</span>
        </h2>
        <p className="text-slate-400 text-sm animate-fade-in-up stagger-3">One command at a time — use arrows or dots to navigate.</p>
      </div>

      {/* Big tab: one command visible */}
      <div className="flex-1 glass rounded-2xl border border-[#00d4ff]/20 overflow-hidden flex flex-col min-h-[420px] animate-scale-in stagger-4">
        <div className="p-8 md:p-10 flex flex-col flex-1">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
            >
              {item.icon}
            </div>
            <div>
              <div className="font-mono text-lg md:text-xl font-semibold text-[#00d4ff]">
                {item.command}
              </div>
              <p className="text-slate-400 mt-1">{item.description}</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center border-t border-[#00d4ff]/10 pt-8">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Visual</div>
            {item.diagram}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#00d4ff]/10 bg-black/20">
          <button
            onClick={goPrev}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)' }}
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          <div className="flex items-center gap-2">
            {commands.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === activeIndex ? 'bg-[#00d4ff] scale-125' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to command ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={goNext}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)' }}
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 text-center animate-fade-in stagger-6">
        <span className="text-slate-500 text-sm">
          <GitBranch className="w-4 h-4 inline mr-1 text-[#f5a623] align-middle" />
          Command {activeIndex + 1} of {total}
        </span>
      </div>

      {/* Section: Local branch, create, checkout, merge */}
      <div className="mt-14 pt-10 border-t border-[#00d4ff]/20">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-[#00d4ff] animate-fade-in-up stagger-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Branches: Create, Switch &amp; Merge
        </h3>

        <div className="space-y-8">
          {/* What is local branch */}
          <div className="glass rounded-2xl p-6 border border-[#00d4ff]/20 animate-fade-in-right stagger-2">
            <h4 className="text-lg font-bold mb-3 text-[#f5a623]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              What is a local branch?
            </h4>
            <p className="text-slate-400 leading-relaxed">
              A <strong className="text-slate-300">local branch</strong> is a separate line of development that exists only on your machine. 
              It lets you work on features or fixes without changing the main code (e.g. <code className="text-[#00d4ff] font-mono text-sm bg-white/5 px-1 rounded">main</code>) until you are ready. 
              Each branch has its own commit history. Think of it as a parallel copy of the project where you can experiment or build something new, then merge it back into <code className="text-[#00d4ff] font-mono text-sm bg-white/5 px-1 rounded">main</code> when done.
            </p>
          </div>

          {/* Create branch + Checkout */}
          <div className="glass rounded-2xl p-6 border border-[#2ecc71]/20 animate-fade-in-left stagger-3">
            <h4 className="text-lg font-bold mb-4 text-[#2ecc71]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Create a local branch &amp; switch to it
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Create a new branch</p>
                <code className="block font-mono text-[#00d4ff] bg-black/30 px-4 py-3 rounded-xl text-sm">
                  git branch &lt;branch-name&gt;
                </code>
                <p className="text-slate-400 text-sm mt-2">
                  Creates a new branch with the given name at your current commit. It does not switch you to that branch yet.
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Switch to that branch (checkout)</p>
                <code className="block font-mono text-[#00d4ff] bg-black/30 px-4 py-3 rounded-xl text-sm">
                  git checkout &lt;branch-name&gt;
                </code>
                <p className="text-slate-400 text-sm mt-2">
                  Moves your working directory to the specified branch. All new commits will go to this branch.
                </p>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-[#2ecc71]/50 pl-4">
                <strong className="text-slate-300">Why we use these:</strong> Creating a branch keeps <code className="text-[#00d4ff] font-mono text-xs">main</code> stable while you develop. Checkout lets you switch between branches so you can work on one feature at a time. You can also use <code className="text-[#00d4ff] font-mono text-xs">git checkout -b &lt;branch-name&gt;</code> to create and switch in one step.
              </p>
            </div>
          </div>

          {/* Merge into main */}
          <div className="glass rounded-2xl p-6 border border-[#f5a623]/20 animate-fade-in-up stagger-4">
            <h4 className="text-lg font-bold mb-4 text-[#f5a623]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Merge your local branch into main
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Step 1 — Switch to main</p>
                <code className="block font-mono text-[#00d4ff] bg-black/30 px-4 py-3 rounded-xl text-sm">
                  git checkout main
                </code>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Step 2 — Merge the branch into main</p>
                <code className="block font-mono text-[#00d4ff] bg-black/30 px-4 py-3 rounded-xl text-sm">
                  git merge &lt;branch-name&gt;
                </code>
                <p className="text-slate-400 text-sm mt-2">
                  Brings all commits from <code className="text-[#00d4ff] font-mono text-xs">&lt;branch-name&gt;</code> into <code className="text-[#00d4ff] font-mono text-xs">main</code>. After this, your local <code className="text-[#00d4ff] font-mono text-xs">main</code> has the combined history.
                </p>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-[#f5a623]/50 pl-4">
                <strong className="text-slate-300">Why we use merge:</strong> Merge is how you integrate a finished feature or fix from a branch into the main line. You always merge from the branch you want to bring in, while you are on the branch that should receive the changes (here, <code className="text-[#00d4ff] font-mono text-xs">main</code>). Then you can push <code className="text-[#00d4ff] font-mono text-xs">main</code> to the remote with <code className="text-[#00d4ff] font-mono text-xs">git push origin main</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
