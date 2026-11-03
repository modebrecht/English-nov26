#!/usr/bin/env python3
"""Regenerate the all-in-one offline HTML from editable sources."""
from pathlib import Path
p=Path(__file__).resolve().parent.parent
(p/"classroom-standalone.html").write_text(
    (p/"index.html").read_text(encoding="utf-8")
    .replace('<link rel="stylesheet" href="styles.css" />', "<style>\n"+(p/"styles.css").read_text(encoding="utf-8")+"\n</style>")
    .replace('<script src="data.js" defer></script>', "<script>\n"+(p/"data.js").read_text(encoding="utf-8")+"\n</script>")
    .replace('<script src="assets.js" defer></script>', "<script>\n"+(p/"assets.js").read_text(encoding="utf-8")+"\n</script>")
    .replace('<script src="app.js" defer></script>', "<script>\n"+(p/"app.js").read_text(encoding="utf-8")+"\n</script>"),
    encoding="utf-8"
)
print("Standalone HTML regenerated.")
