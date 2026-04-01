import type {
  Provider,
  ProviderCapabilities,
  ProviderMetadata,
} from "../types";

export class GitHubCopilotProvider implements Provider {
  readonly id = "github-copilot";
  readonly displayName = "GitHub Copilot";

  readonly capabilities: ProviderCapabilities = {
    supportsDag: false, // Linear history via Codex-compatible backend
    supportsCloning: true,
  };

  readonly metadata: ProviderMetadata = {
    description:
      "GitHub Copilot CLI using the same Codex-compatible agent harness.",
    limitations: [
      "Requires GitHub Copilot CLI and active Copilot entitlement",
      "Edit details not visible (black box)",
    ],
    website: "https://github.com/features/copilot",
    cliName: "copilot",
  };
}
