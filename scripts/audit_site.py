from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlsplit, unquote
import json
root = Path(__file__).resolve().parents[1] / 'dist'
issues = []
counts = {}
for path in root.rglob('index.html'):
    soup = BeautifulSoup(path.read_text(encoding='utf-8'), 'html.parser')
    name = path.relative_to(root).as_posix()
    concept = next((x for x in ['design-2','design-3','design-4'] if name.startswith(x+'/')), 'original')
    counts[concept] = counts.get(concept, 0) + 1
    if len(soup.find_all('h1')) != 1: issues.append([name, 'heading hierarchy: expected one H1'])
    if not soup.title or not soup.find('meta', attrs={'name':'description'}): issues.append([name, 'missing metadata'])
    for section in ['care','accucare-plus','how-care-works','wellbeing','coverage','nigeria','consultation','privacy']:
        if len(soup.find_all(id=section)) != 1: issues.append([name, 'missing or duplicate section', section])
    for image in soup.find_all('img'):
        src = image.get('src', '')
        if not image.has_attr('alt'): issues.append([name, 'missing alt', src])
        if src.startswith('/') and not (root/unquote(urlsplit(src).path.lstrip('/'))).is_file(): issues.append([name, 'missing image', src])
    for anchor in soup.find_all('a', href=True):
        href = anchor['href']; url = urlsplit(href)
        if url.scheme or url.netloc or not url.path.startswith('/'): continue
        target = root/unquote(url.path.lstrip('/'))
        if not target.is_file() and not (target/'index.html').is_file(): issues.append([name, 'broken link', href])
        if url.fragment and not soup.find(id=unquote(url.fragment)): issues.append([name, 'missing anchor', href])
        if concept != 'original' and not url.path.startswith('/'+concept+'/') and url.path != '/'+concept and not url.path.endswith('.html'): issues.append([name, 'link escaped concept', href])
if sum(counts.values()) != 4: issues.append(['build','expected exactly four homepage routes'])
report = {'pages':sum(counts.values()), 'per_concept':counts, 'issues':issues}
(root.parent/'.qa/complete-site-static-audit.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
raise SystemExit(1 if issues else 0)
