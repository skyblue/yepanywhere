import { describe, expect, it } from "vitest";
import { GitHubCopilotProvider } from "../../../src/sdk/providers/github-copilot.js";

describe("GitHubCopilotProvider", () => {
  it("returns Copilot-specific model list", async () => {
    const provider = new GitHubCopilotProvider();

    const models = await provider.getAvailableModels();

    expect(models).toEqual([
      { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5" },
      { id: "claude-sonnet-4", name: "Claude Sonnet 4" },
      { id: "gpt-5", name: "GPT-5" },
    ]);
  });
});
