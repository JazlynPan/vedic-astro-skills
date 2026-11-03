#!/usr/bin/env python3
"""Fail-closed inventory, provenance, ephemeris, SAV and Taiwan timezone checks."""
import argparse
import hashlib
import importlib.metadata
import json
import sys
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--files-only', action='store_true')
    args = parser.parse_args()
    lock = json.loads((ROOT / 'vedic-upstream.lock.json').read_text())
    for name, expected in lock['files'].items():
        assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == expected, name
    skills = ROOT / '.agents/skills'
    assert sorted(p.name for p in skills.glob('vedic-*') if p.is_dir()) == lock['skills']
    for name in lock['skills']:
        assert (skills / name / 'SKILL.md').is_file(), name
        assert (skills / name / 'agents/openai.yaml').is_file(), name
    assert len(list((ROOT / '.codex').glob('vedic_*.md'))) == 11
    for name, expected in lock['instruction_blocks'].items():
        content = (ROOT / name).read_text()
        start = '<!-- BEGIN MANAGED VEDIC ROUTER -->'
        end = '<!-- END MANAGED VEDIC ROUTER -->'
        assert content.count(start) == content.count(end) == 1, name
        block = content[content.index(start):content.index(end) + len(end)]
        assert hashlib.sha256(block.encode()).hexdigest() == expected, name
    if (ROOT / 'AGENTS.override.md').exists():
        assert 'AGENTS.override.md' in lock['instruction_blocks'], 'Rerun sync to merge new override'
    print(f"PASS: 8 complete skills, 11 modules, {len(lock['files'])} file hashes, instruction blocks")
    if args.files_only:
        return
    assert (3, 8) <= sys.version_info[:2] <= (3, 13)
    import jhora
    import swisseph as swe
    import pytz
    assert swe.version != '0.0.0'
    ephe = skills / 'vedic-calculator/scripts/ephe'
    for name in ('seas_18.se1', 'semo_18.se1', 'sepl_18.se1'):
        assert (ephe / name).read_bytes() == (Path(jhora.__file__).parent / 'data/ephe' / name).read_bytes(), name
    sys.path.insert(0, str(skills / 'vedic-calculator/scripts'))
    from engine import calculate_full_chart, local_instant, to_jd
    # Public upstream minimum-test fixture; no user birth data.
    chart = calculate_full_chart(1869, 10, 2, 7, 12, 21.6417, 69.6293, 'Asia/Kolkata')
    assert sum(chart['sav'].values()) == 337
    print('PASS: official Gandhi fixture SAV=337; engine and PyJHora ephemerides match')
    # Synthetic calendar probes verify historical rules and actual engine UTC conversion.
    for zone, year, month, day, offset in [
        ('Asia/Taipei', 1979, 7, 1, 9), ('Asia/Taipei', 1979, 1, 1, 8),
        ('Asia/Taipei', 2026, 7, 1, 8), ('Asia/Shanghai', 1988, 7, 1, 9),
        ('Asia/Shanghai', 1988, 1, 1, 8), ('Asia/Shanghai', 2026, 7, 1, 8),
    ]:
        from zoneinfo import ZoneInfo
        assert datetime(year, month, day, 12, tzinfo=ZoneInfo(zone)).utcoffset() == timedelta(hours=offset)
        instant = local_instant(year, month, day, 12, 0, zone)
        assert instant.utcoffset() == timedelta(hours=offset), (zone, year)
        assert abs(to_jd(year, month, day, 12, 0, zone) - swe.julday(year, month, day, 12-offset)) < 1e-8
    # Taipei: spring gap / autumn overlap in its final DST year.
    for month, day, hour in [(7, 1, 0), (9, 30, 23)]:
        try:
            local_instant(1979, month, day, hour, 30, 'Asia/Taipei')
        except (ValueError, pytz.AmbiguousTimeError, pytz.NonExistentTimeError):
            pass
        else:
            raise AssertionError('Taipei DST gap/overlap must require clarification')
    print('PASS: Taipei/Shanghai historical DST, UTC conversion, Taipei gap and overlap rejection')
    print('Python:', sys.version.split()[0], 'Swiss Ephemeris:', swe.version)
    for package in ('pysweph', 'PyJHora', 'pytz', 'tzdata', 'numpy', 'timezonefinder'):
        print(f'{package}=={importlib.metadata.version(package)}')


if __name__ == '__main__':
    main()
