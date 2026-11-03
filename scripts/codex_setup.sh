#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
calc=.agents/skills/vedic-calculator
python3 -c 'import sys; assert (3,8) <= sys.version_info[:2] <= (3,13), "Use Python 3.8–3.13"'
python3 scripts/verify_vedic.py --files-only
python3 "$calc/scripts/setup_env.py"
py="$calc/venv/bin/python"
# The lock is the tested Linux/Python 3.12 dependency set. Other Python versions
# still use the official compatible resolver rather than incompatible pins.
if "$py" -c 'import sys; raise SystemExit(sys.version_info[:2] != (3,12))'; then
  "$py" -m pip install --disable-pip-version-check -r requirements-vedic-linux.txt
  "$py" -m pip check
fi
# Repair missing ephemerides even when upstream setup exits early for an existing venv.
"$py" - <<'PY'
from pathlib import Path
import shutil
import jhora
source = Path('.agents/skills/vedic-calculator/scripts/ephe')
target = Path(jhora.__file__).parent / 'data/ephe'
target.mkdir(parents=True, exist_ok=True)
for p in source.glob('*.se1'):
    if not (target / p.name).exists() or (target / p.name).read_bytes() != p.read_bytes():
        shutil.copy2(p, target / p.name)
PY
"$py" "$calc/scripts/check_env.py"
# Official check_env.py may report errors with exit status 0; enforce assertions too.
"$py" scripts/verify_vedic.py
