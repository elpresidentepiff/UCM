#!/usr/bin/env python
"""Small helper for running the UCM Growth Agent operating loop.

This script does not call external AI APIs. It prints structured monthly and
weekly planning skeletons using the agent's local configuration.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path


AGENT_DIR = Path(__file__).resolve().parents[1]
CONFIG_PATH = AGENT_DIR / "agent.config.json"


def load_config() -> dict:
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def print_brief() -> None:
    cfg = load_config()
    print(f"{cfg['name']} ({cfg['agent_id']})")
    print(f"Client: {cfg['client']}")
    print(f"Website: {cfg['client_website']}")
    print(f"Mission: {cfg['mission']}")
    print("\nCommercial priorities:")
    for item in cfg["commercial_priorities"]:
        print(f"- {item}")
    print("\nMonthly deliverables:")
    for key, value in cfg["monthly_deliverables"].items():
        print(f"- {key}: {value}")


def month_plan(month: str) -> None:
    cfg = load_config()
    print(f"# UCM Growth Agent Monthly Plan - {month}")
    print("\n## Commercial Theme")
    print("- Primary: Office/commercial cleaning and property-manager care")
    print("- Secondary: Responsive maintenance and end-of-tenancy turnaround")
    print("\n## Required Deliverables")
    print(f"- {cfg['monthly_deliverables']['social_posts']} social posts")
    print(f"- {cfg['monthly_deliverables']['stories']} stories")
    print("- 3 reel/video concepts")
    print("- 1 content calendar")
    print("- 1 paid ads test plan")
    print("- 1 SEO/GEO action list")
    print("- 1 website conversion recommendation")
    print("- 1 monthly performance report")
    print("\n## Recommended SEO/GEO Actions")
    actions = [
        "Create or improve Office Cleaning London landing page.",
        "Create AI-search summary copy for commercial cleaning and maintenance services.",
        "Add FAQ section to one priority service page.",
        "Write one blog targeting property managers or office managers.",
        "Prepare LocalBusiness/Service schema recommendations.",
    ]
    for action in actions:
        print(f"- {action}")
    print("\n## Paid Media Test")
    print("- Campaign: Commercial cleaning quote campaign")
    print("- Audience: London office managers, facilities managers, property managers")
    print("- CTA: Request a quote / book a site visit")
    print("- Guardrail: Do not scale until conversion tracking is confirmed")
    print("\n## Proof Needed From UCM")
    proof = [
        "Real customer reviews or permission to request them.",
        "Before/after cleaning photos.",
        "Accreditations, insurance or compliance proof.",
        "Team/process photos.",
        "Example jobs for case-study writing.",
    ]
    for item in proof:
        print(f"- {item}")


def week_checkin(week: str) -> None:
    print(f"# UCM Growth Agent Weekly Check-In - {week}")
    print("\n## This Week's Commercial Focus")
    print("Commercial cleaning and quote conversion.")
    print("\n## Work Due")
    for item in [
        "Finalize this week's social posts and stories.",
        "Draft one SEO/GEO page brief.",
        "Check paid campaign readiness and tracking.",
        "Request missing proof assets from UCM.",
        "Review website CTA and form friction.",
    ]:
        print(f"- {item}")
    print("\n## Decisions Needed")
    print("- Which service should be the primary campaign focus this week?")
    print("- Which proof assets can UCM approve for public use?")
    print("\n## Next 5 Actions")
    actions = [
        "Write 3 post captions for the weekly theme.",
        "Prepare 2 story ideas with CTA.",
        "Create one landing-page improvement note.",
        "Draft one paid-ad creative angle.",
        "Update the blocker list.",
    ]
    for index, action in enumerate(actions, 1):
        print(f"{index}. {action}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the UCM Growth Agent helper.")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("brief", help="Print the agent brief.")

    month = sub.add_parser("month", help="Generate a monthly plan skeleton.")
    month.add_argument("--month", required=True)

    week = sub.add_parser("week", help="Generate a weekly check-in skeleton.")
    week.add_argument("--week", required=True)

    args = parser.parse_args()
    if args.command == "brief":
        print_brief()
    elif args.command == "month":
        month_plan(args.month)
    elif args.command == "week":
        week_checkin(args.week)


if __name__ == "__main__":
    main()

