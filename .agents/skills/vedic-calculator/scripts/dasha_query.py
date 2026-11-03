#!/usr/bin/env python3
"""Progressive reader for calculator-generated ``structured_data.md`` files.

The canonical file keeps all 9 MD, 81 AD, and 729 PD rows.  This helper keeps
the model-facing context small: ``--overview`` collapses the full PD tables,
while date queries return only the PD rows that overlap the requested window
plus a small amount of adjacent context.
"""

import argparse
import calendar
import re
import sys
from datetime import date, timedelta


PD_HEADING_RE = re.compile(r"^### .*Pratyantardasha（三级运）\s*$")
PD_ROW_RE = re.compile(
    r"^\|\s*([A-Za-z]+-[A-Za-z]+-[A-Za-z]+)\s*\|\s*"
    r"(\d{4}-\d{2}-\d{2})\s*\|\s*(\d{4}-\d{2}-\d{2})\s*\|"
)


def parse_date(value):
    try:
        return date.fromisoformat(value)
    except ValueError as exc:
        raise ValueError("date must use YYYY-MM-DD: %s" % value) from exc


def read_text(path):
    with open(path, "r", encoding="utf-8") as handle:
        return handle.read()


def collapsed_overview(text):
    output = []
    skipping_pd = False
    for line in text.splitlines():
        if PD_HEADING_RE.match(line):
            skipping_pd = True
            output.append(line)
            output.append(
                "> 已折叠完整PD表；月/日级审计用 "
                "`dasha_query.py --month/--date/--start --end` 按需读取。"
            )
            continue
        if skipping_pd:
            if not line.strip():
                output.append("")
                skipping_pd = False
            continue
        output.append(line)
    return "\n".join(output) + "\n"


def parse_pd_rows(text):
    rows = []
    for line_no, line in enumerate(text.splitlines(), 1):
        match = PD_ROW_RE.match(line)
        if not match:
            continue
        rows.append(
            {
                "path": match.group(1),
                "start": parse_date(match.group(2)),
                "end": parse_date(match.group(3)),
                "line": line_no,
            }
        )
    rows.sort(key=lambda row: (row["start"], row["end"], row["path"]))
    return rows


def validate_pd_rows(rows):
    if len(rows) != 729:
        raise ValueError(
            "PD completeness failed: found %d rows, expected 729. "
            "Regenerate structured_data.md with vedic-calculator before "
            "making a month/day-level judgment." % len(rows)
        )
    invalid = [row for row in rows if row["end"] <= row["start"]]
    if invalid:
        raise ValueError("PD interval is not positive at source line %d" % invalid[0]["line"])
    for previous, current in zip(rows, rows[1:]):
        if previous["end"] != current["start"]:
            raise ValueError(
                "PD continuity failed between source lines %d and %d: %s != %s"
                % (
                    previous["line"],
                    current["line"],
                    previous["end"].isoformat(),
                    current["start"].isoformat(),
                )
            )


def month_window(value):
    try:
        year, month = [int(part) for part in value.split("-")]
        start = date(year, month, 1)
    except (TypeError, ValueError) as exc:
        raise ValueError("month must use YYYY-MM: %s" % value) from exc
    last_day = calendar.monthrange(year, month)[1]
    return start, date(year, month, last_day) + timedelta(days=1)


def query_window(args):
    modes = sum(
        [
            bool(args.month),
            bool(args.date),
            bool(args.start or args.end),
        ]
    )
    if modes != 1:
        raise ValueError(
            "choose exactly one query: --month, --date, or the --start/--end pair"
        )
    if args.month:
        return month_window(args.month)
    if args.date:
        start = parse_date(args.date)
        return start, start + timedelta(days=1)
    if not args.start or not args.end:
        raise ValueError("--start and --end must be supplied together")
    start = parse_date(args.start)
    end = parse_date(args.end)
    if end <= start:
        raise ValueError("--end must be later than --start; intervals use [start,end)")
    return start, end


def render_query(rows, start, end, context):
    hits = [index for index, row in enumerate(rows) if row["start"] < end and row["end"] > start]
    if not hits:
        raise ValueError(
            "query window %s to %s is outside the available PD timeline"
            % (start.isoformat(), end.isoformat())
        )
    first = max(0, hits[0] - context)
    last = min(len(rows), hits[-1] + context + 1)
    hit_set = set(hits)
    output = [
        "# 局部三级运窗口",
        "",
        "> 查询区间：`[%s, %s)`" % (start.isoformat(), end.isoformat()),
        "> 完整性：MD/AD/PD canonical PD = 729/729，`[start,end)` 全程连续。",
        "",
        "| 关系 | MD-AD-PD | 起始 | 结束 | 源行 |",
        "|------|----------|------|------|------|",
    ]
    for index in range(first, last):
        row = rows[index]
        relation = "命中窗口" if index in hit_set else "相邻上下文"
        output.append(
            "| %s | %s | %s | %s | %d |"
            % (
                relation,
                row["path"],
                row["start"].isoformat(),
                row["end"].isoformat(),
                row["line"],
            )
        )
    return "\n".join(output) + "\n"


def build_parser():
    parser = argparse.ArgumentParser(
        description="Read structured_data progressively without loading all 729 PD rows into model context"
    )
    parser.add_argument("--file", required=True, help="path to structured_data.md")
    parser.add_argument("--check", action="store_true", help="validate 729 PD rows and continuity without printing the table")
    parser.add_argument("--overview", action="store_true", help="print all non-PD content and collapse PD tables")
    parser.add_argument("--month", help="query a calendar month, YYYY-MM")
    parser.add_argument("--date", help="query one date, YYYY-MM-DD")
    parser.add_argument("--start", help="query start date, inclusive, YYYY-MM-DD")
    parser.add_argument("--end", help="query end date, exclusive, YYYY-MM-DD")
    parser.add_argument("--context", type=int, default=1, help="adjacent PD rows to include on each side (default: 1)")
    return parser


def main():
    parser = build_parser()
    args = parser.parse_args()
    if args.context < 0:
        parser.error("--context must be non-negative")
    text = read_text(args.file)
    try:
        if args.check:
            if args.overview or args.month or args.date or args.start or args.end:
                raise ValueError("--check cannot be combined with overview or a date query")
            rows = parse_pd_rows(text)
            validate_pd_rows(rows)
            sys.stdout.write("PD_OK: 729/729 rows; [start,end) continuity passed.\n")
            return
        if args.overview:
            if args.month or args.date or args.start or args.end:
                raise ValueError("--overview cannot be combined with a PD date query")
            sys.stdout.write(collapsed_overview(text))
            return
        start, end = query_window(args)
        rows = parse_pd_rows(text)
        validate_pd_rows(rows)
        sys.stdout.write(render_query(rows, start, end, args.context))
    except ValueError as exc:
        parser.error(str(exc))


if __name__ == "__main__":
    main()
