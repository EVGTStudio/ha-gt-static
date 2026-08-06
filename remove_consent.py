import glob

files = glob.glob('**/index.html', recursive=True)
print(f"Gefundene Dateien: {len(files)}")

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    start_marker = '<!-- wp:go-x/consent-banner'
    end_marker = '<!-- /wp:go-x/privacy-settings -->'

    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    if start_idx == -1 or end_idx == -1:
        print(f"  {filepath}: Marker nicht gefunden, übersprungen")
        continue

    end_idx += len(end_marker)
    new_content = content[:start_idx] + content[end_idx:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    removed = len(content) - len(new_content)
    print(f"  {filepath}: {removed} Zeichen entfernt")

print("Fertig!")
