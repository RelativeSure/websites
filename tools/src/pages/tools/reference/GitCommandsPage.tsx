import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const commands = [
  // Setup & Config
  { command: "git config --global user.name \"name\"", description: "Set your username", category: "Setup & Config" },
  { command: "git config --global user.email \"email\"", description: "Set your email", category: "Setup & Config" },
  { command: "git config --list", description: "List all configuration", category: "Setup & Config" },
  { command: "git init", description: "Initialize a new repository", category: "Setup & Config" },
  { command: "git clone <url>", description: "Clone a repository", category: "Setup & Config" },

  // Basic Workflow
  { command: "git status", description: "Check status of working directory", category: "Basic Workflow" },
  { command: "git add <file>", description: "Stage a file", category: "Basic Workflow" },
  { command: "git add .", description: "Stage all changes", category: "Basic Workflow" },
  { command: "git commit -m \"message\"", description: "Commit staged changes", category: "Basic Workflow" },
  { command: "git commit -am \"message\"", description: "Stage and commit all changes", category: "Basic Workflow" },
  { command: "git diff", description: "Show unstaged changes", category: "Basic Workflow" },
  { command: "git diff --staged", description: "Show staged changes", category: "Basic Workflow" },

  // Branching
  { command: "git branch", description: "List all branches", category: "Branching" },
  { command: "git branch <name>", description: "Create a new branch", category: "Branching" },
  { command: "git checkout <branch>", description: "Switch to a branch", category: "Branching" },
  { command: "git checkout -b <branch>", description: "Create and switch to new branch", category: "Branching" },
  { command: "git switch <branch>", description: "Switch to a branch (newer syntax)", category: "Branching" },
  { command: "git switch -c <branch>", description: "Create and switch to new branch", category: "Branching" },
  { command: "git branch -d <branch>", description: "Delete a branch", category: "Branching" },
  { command: "git branch -D <branch>", description: "Force delete a branch", category: "Branching" },
  { command: "git merge <branch>", description: "Merge branch into current", category: "Branching" },

  // Remote Operations
  { command: "git remote", description: "List remote repositories", category: "Remote" },
  { command: "git remote -v", description: "List remotes with URLs", category: "Remote" },
  { command: "git remote add <name> <url>", description: "Add a remote repository", category: "Remote" },
  { command: "git fetch", description: "Fetch from remote", category: "Remote" },
  { command: "git fetch <remote>", description: "Fetch from specific remote", category: "Remote" },
  { command: "git pull", description: "Fetch and merge from remote", category: "Remote" },
  { command: "git pull --rebase", description: "Fetch and rebase from remote", category: "Remote" },
  { command: "git push", description: "Push to remote", category: "Remote" },
  { command: "git push -u origin <branch>", description: "Push and set upstream", category: "Remote" },
  { command: "git push --force", description: "Force push (use with caution)", category: "Remote" },

  // History
  { command: "git log", description: "Show commit history", category: "History" },
  { command: "git log --oneline", description: "Show condensed history", category: "History" },
  { command: "git log --graph", description: "Show history as graph", category: "History" },
  { command: "git log -p", description: "Show history with patches", category: "History" },
  { command: "git log --author=\"name\"", description: "Filter by author", category: "History" },
  { command: "git show <commit>", description: "Show commit details", category: "History" },
  { command: "git blame <file>", description: "Show who changed each line", category: "History" },

  // Undoing Changes
  { command: "git reset <file>", description: "Unstage a file", category: "Undoing" },
  { command: "git reset --soft HEAD~1", description: "Undo last commit, keep changes staged", category: "Undoing" },
  { command: "git reset --hard HEAD~1", description: "Undo last commit, discard changes", category: "Undoing" },
  { command: "git revert <commit>", description: "Create new commit that undoes changes", category: "Undoing" },
  { command: "git checkout -- <file>", description: "Discard changes in working directory", category: "Undoing" },
  { command: "git restore <file>", description: "Restore file (newer syntax)", category: "Undoing" },
  { command: "git restore --staged <file>", description: "Unstage file", category: "Undoing" },
  { command: "git clean -fd", description: "Remove untracked files and directories", category: "Undoing" },

  // Stashing
  { command: "git stash", description: "Stash changes", category: "Stashing" },
  { command: "git stash save \"message\"", description: "Stash with message", category: "Stashing" },
  { command: "git stash list", description: "List stashes", category: "Stashing" },
  { command: "git stash pop", description: "Apply and remove latest stash", category: "Stashing" },
  { command: "git stash apply", description: "Apply latest stash", category: "Stashing" },
  { command: "git stash drop", description: "Remove latest stash", category: "Stashing" },
  { command: "git stash clear", description: "Remove all stashes", category: "Stashing" },

  // Tagging
  { command: "git tag", description: "List tags", category: "Tagging" },
  { command: "git tag <name>", description: "Create lightweight tag", category: "Tagging" },
  { command: "git tag -a <name> -m \"msg\"", description: "Create annotated tag", category: "Tagging" },
  { command: "git push origin <tag>", description: "Push a tag", category: "Tagging" },
  { command: "git push origin --tags", description: "Push all tags", category: "Tagging" },
  { command: "git tag -d <name>", description: "Delete a tag", category: "Tagging" },

  // Advanced
  { command: "git rebase <branch>", description: "Rebase current branch", category: "Advanced" },
  { command: "git rebase -i HEAD~n", description: "Interactive rebase last n commits", category: "Advanced" },
  { command: "git cherry-pick <commit>", description: "Apply specific commit", category: "Advanced" },
  { command: "git bisect start", description: "Start binary search for bug", category: "Advanced" },
  { command: "git reflog", description: "Show reference logs", category: "Advanced" },
  { command: "git submodule add <url>", description: "Add submodule", category: "Advanced" },
  { command: "git submodule update --init", description: "Initialize submodules", category: "Advanced" },
];

export default function GitCommandsPage() {
  const [search, setSearch] = useState("");

  const filtered = commands.filter(
    (c) =>
      c.command.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(commands.map((c) => c.category)));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Git Commands Reference</h1>
        <p className="text-muted-foreground">
          Essential Git commands for version control
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find Git commands by name or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search commands..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((c) => c.category === category);
        if (items.length === 0) return null;

        return (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-md border border-border hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="font-mono text-sm bg-muted px-3 py-1 rounded flex-1 overflow-x-auto">
                        {item.command}
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.command)}
                        className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            No commands found matching "{search}"
          </CardContent>
        </Card>
      )}
    </div>
  );
}
