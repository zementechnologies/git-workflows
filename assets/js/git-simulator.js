/**
 * Zemen Technologies Interactive Git Visualizer & Simulator
 * An interactive playground showing real-time commit DAG visualization.
 */

(function () {
  class GitSimulator {
    constructor() {
      this.commits = [];
      this.branches = {};
      this.head = { type: 'branch', ref: 'main' };
      this.commitCounter = 1;
      this.logs = [];

      this.svg = document.getElementById('git-svg-canvas');
      this.terminalLog = document.getElementById('terminal-log');
      this.terminalInput = document.getElementById('terminal-input');
      this.branchBadge = document.getElementById('current-branch-badge');

      if (!this.svg || !this.terminalInput) return;

      this.init();
    }

    init() {
      this.resetRepo();

      this.terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = this.terminalInput.value.trim();
          if (cmd) {
            this.executeCommand(cmd);
            this.terminalInput.value = '';
          }
        }
      });

      // Bind presets
      document.querySelectorAll('[data-preset]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const preset = e.target.getAttribute('data-preset');
          this.runPreset(preset);
        });
      });
    }

    resetRepo() {
      this.commits = [];
      this.branches = {};
      this.commitCounter = 1;
      this.logs = [];

      // Initial commit
      const c1 = this.createCommit('Initial commit', null);
      this.branches['main'] = c1.id;
      this.head = { type: 'branch', ref: 'main' };

      // Add second commit on main
      const c2 = this.createCommit('Add project scaffolding', [c1.id]);
      this.branches['main'] = c2.id;

      this.log(`Initialized empty Git repository at /zemen-app/.git/`, 'info');
      this.log(`[main (root-commit) ${c1.shortId}] Initial commit`, 'cmd');
      this.log(`[main ${c2.shortId}] Add project scaffolding`, 'cmd');

      this.render();
    }

    createCommit(message, parentIds) {
      const id = 'c' + this.commitCounter++;
      const hash = Math.random().toString(16).substring(2, 8);
      const commit = {
        id: id,
        hash: hash,
        shortId: hash,
        message: message,
        parents: parentIds ? (Array.isArray(parentIds) ? parentIds : [parentIds]) : []
      };
      this.commits.push(commit);
      return commit;
    }

    getCurrentCommitId() {
      if (this.head.type === 'branch') {
        return this.branches[this.head.ref] || null;
      }
      return this.head.ref;
    }

    executeCommand(cmdStr) {
      this.log(`$ ${cmdStr}`, 'cmd');
      const parts = cmdStr.split(/\s+/);
      const cmd = parts[0];

      if (cmd === 'clear') {
        this.terminalLog.innerHTML = '';
        return;
      }

      if (cmd !== 'git') {
        this.log(`bash: command not found: ${cmd}. Try git commands.`, 'error');
        return;
      }

      const sub = parts[1];

      switch (sub) {
        case 'status':
          this.handleStatus();
          break;
        case 'commit':
          this.handleCommit(parts);
          break;
        case 'branch':
          this.handleBranch(parts);
          break;
        case 'checkout':
        case 'switch':
          this.handleCheckout(parts);
          break;
        case 'merge':
          this.handleMerge(parts);
          break;
        case 'reset':
          this.handleReset(parts);
          break;
        case 'log':
          this.handleLog();
          break;
        case 'help':
          this.log(`Supported: git commit -m "...", git branch <name>, git switch <name>, git switch -c <name>, git merge <branch>, git reset --hard HEAD~1, git status, git log`, 'info');
          break;
        default:
          this.log(`git: '${sub}' is not recognized in this simulator. Try 'git help'`, 'error');
      }

      this.render();
    }

    handleStatus() {
      const currentRef = this.head.type === 'branch' ? this.head.ref : `HEAD detached at ${this.head.ref}`;
      this.log(`On branch ${currentRef}`, 'info');
      this.log(`nothing to commit, working tree clean`, 'info');
    }

    handleCommit(parts) {
      let msg = 'Updated files';
      const mIdx = parts.indexOf('-m');
      if (mIdx !== -1 && parts[mIdx + 1]) {
        msg = parts.slice(mIdx + 1).join(' ').replace(/^["']|["']$/g, '');
      }

      const parentId = this.getCurrentCommitId();
      const newCommit = this.createCommit(msg, parentId ? [parentId] : []);

      if (this.head.type === 'branch') {
        this.branches[this.head.ref] = newCommit.id;
        this.log(`[${this.head.ref} ${newCommit.shortId}] ${msg}`, 'info');
      } else {
        this.head.ref = newCommit.id;
        this.log(`[detached HEAD ${newCommit.shortId}] ${msg}`, 'info');
      }
    }

    handleBranch(parts) {
      if (parts.length === 2 || (parts.length === 3 && parts[2] === '-a')) {
        // List branches
        for (const b in this.branches) {
          const isCurrent = this.head.type === 'branch' && this.head.ref === b;
          this.log(`${isCurrent ? '* ' : '  '}${b}`, isCurrent ? 'cmd' : 'info');
        }
        return;
      }

      const branchName = parts[2];
      if (!branchName) {
        this.log(`fatal: branch name required`, 'error');
        return;
      }

      if (this.branches[branchName]) {
        this.log(`fatal: A branch named '${branchName}' already exists.`, 'error');
        return;
      }

      this.branches[branchName] = this.getCurrentCommitId();
      this.log(`Created branch '${branchName}'`, 'info');
    }

    handleCheckout(parts) {
      // Handles: git checkout -b <name> OR git switch -c <name> OR git checkout <name>
      let create = false;
      let target = '';

      if (parts[2] === '-b' || parts[2] === '-c') {
        create = true;
        target = parts[3];
      } else {
        target = parts[2];
      }

      if (!target) {
        this.log(`fatal: missing branch argument`, 'error');
        return;
      }

      if (create) {
        this.branches[target] = this.getCurrentCommitId();
        this.head = { type: 'branch', ref: target };
        this.log(`Switched to a new branch '${target}'`, 'info');
        return;
      }

      if (this.branches[target]) {
        this.head = { type: 'branch', ref: target };
        this.log(`Switched to branch '${target}'`, 'info');
      } else {
        // Check if commit hash
        const found = this.commits.find(c => c.shortId === target || c.id === target);
        if (found) {
          this.head = { type: 'commit', ref: found.id };
          this.log(`Note: switching to '${target}' (detached HEAD)`, 'info');
        } else {
          this.log(`error: pathspec '${target}' did not match any file(s) known to git`, 'error');
        }
      }
    }

    handleMerge(parts) {
      const targetBranch = parts[2];
      if (!targetBranch || !this.branches[targetBranch]) {
        this.log(`merge: ${targetBranch} - not something we can merge`, 'error');
        return;
      }

      const currentBranch = this.head.type === 'branch' ? this.head.ref : null;
      if (!currentBranch) {
        this.log(`fatal: You are in 'detached HEAD' state. Cannot merge.`, 'error');
        return;
      }

      if (currentBranch === targetBranch) {
        this.log(`Already up to date.`, 'info');
        return;
      }

      const currentCommit = this.branches[currentBranch];
      const targetCommit = this.branches[targetBranch];

      // Fast forward check
      if (currentCommit === targetCommit) {
        this.log(`Already up to date.`, 'info');
        return;
      }

      // Create a 3-way merge commit
      const msg = `Merge branch '${targetBranch}' into ${currentBranch}`;
      const mergeCommit = this.createCommit(msg, [currentCommit, targetCommit]);
      this.branches[currentBranch] = mergeCommit.id;
      this.log(`Merge made by the 'ort' strategy.`, 'info');
      this.log(`[${currentBranch} ${mergeCommit.shortId}] ${msg}`, 'cmd');
    }

    handleReset(parts) {
      if (parts.includes('--hard')) {
        const currentCommit = this.getCurrentCommitId();
        const cur = this.commits.find(c => c.id === currentCommit);
        if (cur && cur.parents.length > 0) {
          const parent = cur.parents[0];
          if (this.head.type === 'branch') {
            this.branches[this.head.ref] = parent;
          } else {
            this.head.ref = parent;
          }
          this.log(`HEAD is now at ${parent} (reset to parent)`, 'info');
        } else {
          this.log(`Cannot reset root commit`, 'error');
        }
      } else {
        this.log(`Try 'git reset --hard HEAD~1'`, 'info');
      }
    }

    handleLog() {
      let curr = this.getCurrentCommitId();
      let count = 0;
      while (curr && count < 6) {
        const c = this.commits.find(item => item.id === curr);
        if (!c) break;
        this.log(`commit ${c.shortId} (HEAD -> ${this.head.ref})`, 'cmd');
        this.log(`Author: Zemen Engineer <dev@zemen.com.et>`, 'info');
        this.log(`    ${c.message}`, 'info');
        curr = c.parents[0];
        count++;
      }
    }

    runPreset(name) {
      if (name === 'feature-branch') {
        this.executeCommand('git switch -c feat/user-auth');
        this.executeCommand('git commit -m "Add JWT authentication handler"');
        this.executeCommand('git commit -m "Add biometric login support"');
      } else if (name === 'merge-feature') {
        this.executeCommand('git switch main');
        this.executeCommand('git merge feat/user-auth');
      } else if (name === 'reset') {
        this.resetRepo();
      }
    }

    log(text, type = 'info') {
      const div = document.createElement('div');
      div.className = `log-entry ${type === 'cmd' ? 'log-cmd' : type === 'error' ? 'log-error' : 'log-info'}`;
      div.textContent = text;
      this.terminalLog.appendChild(div);
      this.terminalLog.scrollTop = this.terminalLog.scrollHeight;
    }

    render() {
      // Update badge
      if (this.branchBadge) {
        const cur = this.head.type === 'branch' ? this.head.ref : `detached (${this.head.ref})`;
        this.branchBadge.textContent = cur;
      }

      // Render SVG Commit Graph
      const svg = this.svg;
      svg.innerHTML = '';

      const nodeRadius = 14;
      const spacingX = 85;
      const branchTrackY = {
        'main': 80,
        'feat/user-auth': 160,
        'fix/login-bug': 220
      };

      // Assign coordinates
      const coords = {};
      let xOffset = 60;

      // Group commits by branch
      this.commits.forEach((c) => {
        // Determine branch row
        let track = 'main';
        for (const [bName, bHead] of Object.entries(this.branches)) {
          if (bName !== 'main' && (bHead === c.id || c.message.toLowerCase().includes(bName.replace('feat/', '')))) {
            track = bName;
            break;
          }
        }
        if (!branchTrackY[track]) {
          branchTrackY[track] = Object.keys(branchTrackY).length * 60 + 60;
        }

        coords[c.id] = {
          x: xOffset,
          y: branchTrackY[track] || 80,
          track: track,
          commit: c
        };
        xOffset += spacingX;
      });

      // SVG dimensions adjustment
      const totalWidth = Math.max(xOffset + 80, 500);
      svg.setAttribute('viewBox', `0 0 ${totalWidth} 280`);

      // 1. Draw connection lines
      this.commits.forEach((c) => {
        const target = coords[c.id];
        c.parents.forEach((parentId) => {
          const source = coords[parentId];
          if (source && target) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const d = `M ${source.x} ${source.y} C ${source.x + 35} ${source.y}, ${target.x - 35} ${target.y}, ${target.x} ${target.y}`;
            line.setAttribute('d', d);
            line.setAttribute('stroke', '#4B5563');
            line.setAttribute('stroke-width', '3');
            line.setAttribute('fill', 'none');
            svg.appendChild(line);
          }
        });
      });

      // 2. Draw commit nodes
      this.commits.forEach((c) => {
        const pos = coords[c.id];
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', nodeRadius);

        const isCurrent = (this.head.type === 'branch' && this.branches[this.head.ref] === c.id) ||
                          (this.head.type === 'commit' && this.head.ref === c.id);

        circle.setAttribute('fill', isCurrent ? '#A51C30' : (pos.track === 'main' ? '#0C2340' : '#059669'));
        circle.setAttribute('stroke', isCurrent ? '#FFFFFF' : '#E8E3D8');
        circle.setAttribute('stroke-width', isCurrent ? '3' : '2');
        g.appendChild(circle);

        // Commit hash label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y + 4);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#FFFFFF');
        text.setAttribute('font-size', '9px');
        text.setAttribute('font-family', 'monospace');
        text.setAttribute('font-weight', 'bold');
        text.textContent = c.shortId.substring(0, 4);
        g.appendChild(text);

        // Commit message above
        const msgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        msgText.setAttribute('x', pos.x);
        msgText.setAttribute('y', pos.y - 20);
        msgText.setAttribute('text-anchor', 'middle');
        msgText.setAttribute('fill', '#8B949E');
        msgText.setAttribute('font-size', '10px');
        msgText.setAttribute('font-family', 'sans-serif');
        msgText.textContent = c.message.length > 18 ? c.message.substring(0, 16) + '…' : c.message;
        g.appendChild(msgText);

        svg.appendChild(g);
      });

      // 3. Draw branch labels
      for (const [bName, cId] of Object.entries(this.branches)) {
        const pos = coords[cId];
        if (pos) {
          const isHead = this.head.type === 'branch' && this.head.ref === bName;
          const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          bg.setAttribute('x', pos.x - 30);
          bg.setAttribute('y', pos.y + 24);
          bg.setAttribute('width', Math.max(bName.length * 7 + 16, 60));
          bg.setAttribute('height', '18');
          bg.setAttribute('rx', '4');
          bg.setAttribute('fill', isHead ? '#A51C30' : '#1F2937');
          bg.setAttribute('stroke', isHead ? '#E8E3D8' : '#374151');
          bg.setAttribute('stroke-width', '1');
          svg.appendChild(bg);

          const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          lbl.setAttribute('x', pos.x - 30 + Math.max(bName.length * 7 + 16, 60) / 2);
          lbl.setAttribute('y', pos.y + 36);
          lbl.setAttribute('text-anchor', 'middle');
          lbl.setAttribute('fill', '#FFFFFF');
          lbl.setAttribute('font-size', '9.5px');
          lbl.setAttribute('font-family', 'monospace');
          lbl.setAttribute('font-weight', '600');
          lbl.textContent = isHead ? `* ${bName}` : bName;
          svg.appendChild(lbl);
        }
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new GitSimulator();
  });
})();

