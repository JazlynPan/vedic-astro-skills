#!/usr/bin/env python3
"""Vendor complete official Codex skills; preserve local files and instruction text."""
import argparse
import hashlib
import json
import re
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCK = ROOT / 'vedic-upstream.lock.json'
BEGIN = '<!-- BEGIN MANAGED VEDIC ROUTER -->'
END = '<!-- END MANAGED VEDIC ROUTER -->'
SKILLS = {'vedic-calculator', 'vedic-core', 'vedic-career', 'vedic-love',
          'vedic-reader', 'vedic-rectifier', 'vedic-synastry', 'vedic-prashna'}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def git(source, *args):
    return subprocess.check_output(['git', '-C', str(source), *args], text=True).strip()


def install(source):
    revision = git(source, 'rev-parse', 'HEAD')
    if git(source, 'status', '--porcelain'):
        raise SystemExit('Source must be a clean upstream checkout')
    skills = source / 'codex/skills'
    if {p.name for p in skills.glob('vedic-*') if p.is_dir()} != SKILLS:
        raise SystemExit('Upstream skill inventory changed; review before updating')
    patch = source / 'codex-patch'
    if len(list(patch.glob('vedic_*.md'))) != 11:
        raise SystemExit('Expected eleven patch modules')
    old = json.loads(LOCK.read_text()) if LOCK.exists() else {'files': {}, 'instruction_blocks': {}}
    payload = {}
    for folder, target in [(skills, '.agents/skills'), (patch, 'vendor/vedic-upstream/codex-patch')]:
        for p in folder.rglob('*'):
            if p.is_file():
                payload[f'{target}/{p.relative_to(folder).as_posix()}'] = p.read_bytes()
    for name in ('LICENSE', 'COMMERCIAL_NOTICE'):
        payload[f'vendor/vedic-upstream/{name}'] = (source / name).read_bytes()
    for p in patch.glob('vedic_*.md'):
        payload[f'.codex/{p.name}'] = p.read_text().replace('~/.codex/', '.codex/').encode()
    router = (patch / 'AGENTS.md').read_text().replace('~/.codex/', '.codex/')
    router = router.replace('<active CODEX_HOME>', '<project root>/.codex')
    router = router.replace('Resolve paths against the active `CODEX_HOME`; paths below show the default.',
                            'Resolve all module paths against this project root, using `.codex/`.')
    body = ('\n' + router.rstrip() + '\n\n' + (ROOT / 'scripts/vedic_policy_tw.md').read_text().rstrip() + '\n')
    block = BEGIN + body + END
    instructions = {}
    # An override at the same level shadows AGENTS.md: merge into both if present.
    names = ['AGENTS.md'] + (['AGENTS.override.md'] if (ROOT / 'AGENTS.override.md').exists() else [])
    for name in names:
        original = (ROOT / name).read_text() if (ROOT / name).exists() else ''
        if BEGIN in original or END in original:
            pattern = re.escape(BEGIN) + r'.*?' + re.escape(END)
            found = re.findall(pattern, original, re.S)
            if len(found) != 1 or digest(found[0].encode()) != old.get('instruction_blocks', {}).get(name):
                raise SystemExit(f'Locally modified or malformed managed block: {name}')
            updated = re.sub(pattern, lambda _: block, original, flags=re.S)
        else:
            updated = original + ('\n\n' if original else '') + block + '\n'
        payload[name] = updated.encode()
        instructions[name] = digest(block.encode())
    # Preflight every destination before any write. Never silently overwrite changes.
    tracked_payload = {k: v for k, v in payload.items() if k not in names}
    for name, data in tracked_payload.items():
        p = ROOT / name
        if p.exists() and p.read_bytes() != data and digest(p.read_bytes()) != old['files'].get(name):
            raise SystemExit(f'Refusing to overwrite local file: {name}')
    removed = set(old['files']) - set(tracked_payload)
    for name in removed:
        p = ROOT / name
        if p.exists() and digest(p.read_bytes()) != old['files'][name]:
            raise SystemExit(f'Refusing to remove locally modified file: {name}')
    for name in removed:
        (ROOT / name).unlink(missing_ok=True)
    for name, data in payload.items():
        p = ROOT / name
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(data)
    suite_version = re.search(r'Vedic Astro Skills v([\d.]+)', (source / 'README.md').read_text()).group(1)
    patch_version = re.search(r'Codex Patch v([\d.]+)', (patch / 'README.md').read_text()).group(1)
    manifest = {'repository': 'https://github.com/CNWU16/vedic-astro-skills',
                'commit': revision, 'suite_version': suite_version, 'patch_version': patch_version,
                'skills': sorted(SKILLS), 'instruction_blocks': instructions,
                'files': {k: digest(v) for k, v in sorted(tracked_payload.items())}}
    LOCK.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
    print(f'Installed {len(SKILLS)} skills, 11 modules; {len(tracked_payload)} files; upstream {revision}')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, help='Clean official local checkout')
    parser.add_argument('--ref', help='Explicit reviewed upstream revision; default: locked commit')
    args = parser.parse_args()
    if args.source:
        if args.ref and git(args.source, 'rev-parse', 'HEAD') != git(args.source, 'rev-parse', args.ref):
            raise SystemExit('--source HEAD differs from --ref')
        install(args.source)
    else:
        revision = args.ref or json.loads(LOCK.read_text())['commit']
        with tempfile.TemporaryDirectory(prefix='vedic-upstream-') as temp:
            subprocess.run(['git', 'clone', '--quiet', 'https://github.com/CNWU16/vedic-astro-skills.git', temp], check=True)
            subprocess.run(['git', '-C', temp, 'checkout', '--quiet', '--detach', revision], check=True)
            install(Path(temp))


if __name__ == '__main__':
    main()
