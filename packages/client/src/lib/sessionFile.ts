export interface SessionFileEvent {
  relativePath: string;
  provider?: "claude" | "gemini" | "codex" | "github-copilot";
}

export function extractSessionIdFromFileEvent(
  event: SessionFileEvent,
): string | null {
  const filename = event.relativePath.split(/[\\/]/).pop();
  if (!filename) return null;

  let base = filename;
  if (base.endsWith(".jsonl")) {
    base = base.slice(0, -6);
  } else if (base.endsWith(".json")) {
    base = base.slice(0, -5);
  }

  if (event.provider === "codex" || event.provider === "github-copilot") {
    const match = base.match(/([0-9a-fA-F-]{36})$/);
    if (match) return match[1] ?? null;
  }

  return base;
}
