# UCM Media Engine Integration Blueprint

## Boundary

The Media Engine is a controlled production service behind the Growth Center. It is not the customer website and does not publish without approval.

## UCM Pipeline

`Approved source -> ingest -> transcribe -> understand -> suggest clips -> apply UCM brand -> claims check -> human approval -> publish -> measure -> learn`

## Required Inputs

- Source asset and owner.
- Customer/site consent status.
- Service, buyer and target zone.
- Campaign and intended CTA.
- Proof status and allowed platforms.

## Required Outputs

- Transcript and source timestamps.
- Suggested hook and clip window.
- Script, caption and thumbnail brief.
- Platform variants and claims decision.
- Approval record.
- Published post IDs and URLs.
- Performance and lead attribution.

## Production Readiness Gates

1. Rotate exposed credentials and remove committed secrets from active use.
2. Replace hardcoded environment paths.
3. Repair undefined pipeline variables and imports.
4. Connect real transcription and validate retention.
5. Test FFmpeg with representative UCM footage.
6. Replace mocked Instagram, TikTok and metrics adapters.
7. Verify YouTube uploads in private mode.
8. Add retries, failure visibility and human recovery.
9. Apply UCM branding and claims rules.
10. Pass a real end-to-end pilot before live publishing.

## Learning Contract

Return performance by content ID, platform, service, buyer, zone, hook, format and CTA. Join this to qualified enquiries and contracts rather than optimising views alone.

