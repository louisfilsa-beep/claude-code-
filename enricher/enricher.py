#!/usr/bin/env python3
"""
Velox AI — Data Enricher
Reads an Excel/CSV file, enriches each row with AI, writes results back to Excel.

Usage:
    python enricher.py --input leads.xlsx --seed-col "Company Name" \
        --fields "industry,website,employee_count,description,hq_city,hq_country"

    python enricher.py --input contacts.csv --seed-col "Full Name" \
        --context-col "Company" \
        --fields "job_title,linkedin_url,email_format"

Requires:
    ANTHROPIC_API_KEY in environment or .env file
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path

import pandas as pd
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

# ── Claude client ──────────────────────────────────────────────────────────────

client = Anthropic()
MODEL  = "claude-haiku-4-5-20251001"   # fast + cheap for batch enrichment


# ── Core enrichment ────────────────────────────────────────────────────────────

def enrich_row(
    seed_col: str,
    seed_val: str,
    fields: list[str],
    context: dict | None = None,
) -> dict:
    """
    Ask Claude to fill in `fields` for a given seed value.
    Returns a dict keyed by field name; unknown values are None.
    """
    fields_str   = ", ".join(fields)
    context_str  = ""
    if context:
        pairs       = "; ".join(f"{k}: {v}" for k, v in context.items() if v)
        context_str = f"\nAdditional context — {pairs}"

    prompt = (
        f"You are a precise business data enrichment assistant.\n"
        f"{seed_col}: {seed_val}{context_str}\n\n"
        f"Return ONLY a valid JSON object with these exact keys: {fields_str}\n"
        f"Rules:\n"
        f"- Use null for any value you are not confident about.\n"
        f"- Strings only (no nested objects).\n"
        f"- No commentary, no markdown fences — raw JSON only."
    )

    for attempt in range(4):
        try:
            msg  = client.messages.create(
                model=MODEL,
                max_tokens=512,
                messages=[{"role": "user", "content": prompt}],
            )
            text = msg.content[0].text.strip()
            # Strip accidental markdown fences
            if text.startswith("```"):
                text = text.split("```", 2)[1]
                if text.startswith("json"):
                    text = text[4:]
                text = text.rsplit("```", 1)[0]
            return json.loads(text)

        except json.JSONDecodeError:
            # Claude returned non-JSON; try once more
            if attempt < 3:
                time.sleep(1)
        except Exception as exc:
            print(f"  ⚠  API error ({exc}); retrying in {2**attempt}s…", file=sys.stderr)
            time.sleep(2 ** attempt)

    # Fallback: return empty dict so the row isn't lost
    return {f: None for f in fields}


# ── I/O helpers ────────────────────────────────────────────────────────────────

def load_file(path: str) -> pd.DataFrame:
    p = Path(path)
    if p.suffix.lower() in (".xlsx", ".xls", ".xlsm"):
        return pd.read_excel(p, dtype=str)
    elif p.suffix.lower() == ".csv":
        return pd.read_csv(p, dtype=str)
    else:
        sys.exit(f"Unsupported file type: {p.suffix}  (use .xlsx or .csv)")


def save_file(df: pd.DataFrame, original: str) -> str:
    p     = Path(original)
    stem  = p.stem
    out   = p.with_name(f"{stem}_enriched.xlsx")
    df.to_excel(out, index=False)
    return str(out)


# ── Main ────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Velox AI — Data Enricher")
    parser.add_argument("--input",       required=True, help="Path to input Excel or CSV file")
    parser.add_argument("--seed-col",    required=True, help="Column whose value is enriched (e.g. 'Company Name')")
    parser.add_argument("--fields",      required=True, help="Comma-separated field names to add (e.g. 'industry,website,employee_count')")
    parser.add_argument("--context-col", default="",   help="Optional extra column(s) to pass as context, comma-separated")
    parser.add_argument("--start-row",   type=int, default=0, help="0-indexed row to start from (resume after interruption)")
    parser.add_argument("--delay",       type=float, default=0.3, help="Seconds between API calls (default 0.3)")
    args = parser.parse_args()

    api_key = os.getenv("ANTHROPIC_API_KEY", "")
    if not api_key:
        sys.exit("Error: ANTHROPIC_API_KEY not set. Add it to your .env file.")

    fields       = [f.strip() for f in args.fields.split(",") if f.strip()]
    context_cols = [c.strip() for c in args.context_col.split(",") if c.strip()] if args.context_col else []

    print(f"\n🔍  Velox AI — Data Enricher")
    print(f"    Input : {args.input}")
    print(f"    Seed  : {args.seed_col}")
    print(f"    Adding: {', '.join(fields)}\n")

    df = load_file(args.input)

    if args.seed_col not in df.columns:
        sys.exit(f"Column '{args.seed_col}' not found. Available: {list(df.columns)}")

    # Pre-create new columns so they appear in order
    for f in fields:
        if f not in df.columns:
            df[f] = None

    total = len(df)
    for i, row in df.iterrows():
        if i < args.start_row:
            continue

        seed_val = str(row[args.seed_col]).strip()
        if not seed_val or seed_val.lower() in ("nan", "none", ""):
            print(f"  [{i+1}/{total}] — skipped (empty seed)")
            continue

        # Skip rows that already have all fields filled
        if all(pd.notna(row.get(f)) and str(row.get(f)).strip() not in ("", "nan", "None") for f in fields):
            print(f"  [{i+1}/{total}] {seed_val[:40]} — already enriched, skipping")
            continue

        context = {c: row.get(c) for c in context_cols if c in row}

        print(f"  [{i+1}/{total}] {seed_val[:55]}…" if len(seed_val) > 55 else f"  [{i+1}/{total}] {seed_val}")

        enriched = enrich_row(args.seed_col, seed_val, fields, context or None)

        for f in fields:
            df.at[i, f] = enriched.get(f)

        # Save a checkpoint every 25 rows
        if (i + 1) % 25 == 0:
            out = save_file(df, args.input)
            print(f"  💾  Checkpoint saved → {out}")

        time.sleep(args.delay)

    out = save_file(df, args.input)
    print(f"\n✅  Done! Enriched file saved to: {out}\n")


if __name__ == "__main__":
    main()
