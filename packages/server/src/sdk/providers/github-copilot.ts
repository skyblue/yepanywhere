/**
 * GitHub Copilot Provider implementation.
 *
 * Reuses the Codex app-server integration because GitHub Copilot CLI uses the
 * same Codex-compatible agent harness.
 */

import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { ModelInfo } from "@yep-anywhere/shared";
import { whichCommand } from "../cli-detection.js";
import { CodexProvider, type CodexProviderConfig } from "./codex.js";
import type {
  AgentProvider,
  AgentSession,
  AuthStatus,
  StartSessionOptions,
} from "./types.js";

const execAsync = promisify(exec);

export interface GitHubCopilotProviderConfig extends CodexProviderConfig {}

export class GitHubCopilotProvider implements AgentProvider {
  readonly name = "github-copilot" as const;
  readonly displayName = "GitHub Copilot";
  readonly supportsPermissionMode = true;
  readonly supportsThinkingToggle = true;
  readonly supportsSlashCommands = false;

  private readonly delegate: CodexProvider;

  constructor(config: GitHubCopilotProviderConfig = {}) {
    this.delegate = new CodexProvider({ codexPath: "copilot", ...config });
  }

  async isInstalled(): Promise<boolean> {
    try {
      await execAsync(whichCommand("copilot"), { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const status = await this.getAuthStatus();
    return status.authenticated;
  }

  async getAuthStatus(): Promise<AuthStatus> {
    const installed = await this.isInstalled();
    return {
      installed,
      authenticated: installed,
      enabled: installed,
    };
  }

  async startSession(options: StartSessionOptions): Promise<AgentSession> {
    return this.delegate.startSession(options);
  }

  async getAvailableModels(): Promise<ModelInfo[]> {
    return this.delegate.getAvailableModels();
  }
}

export const githubCopilotProvider = new GitHubCopilotProvider();
