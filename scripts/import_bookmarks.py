#!/usr/bin/env python3
import argparse
import logging
import os
import re
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

BOOKMARK_COMPONENT_IMPORT = "import { Bookmark } from '@/components/bookmark';"

class BookmarkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.bookmarks = []
        self.current_folder = []
        self.in_dt = False
        self.in_h3 = False
        self.current_link = None
        self.current_title = None

    def handle_starttag(self, tag, attrs):
        if tag == "h3":
            self.in_h3 = True
        elif tag == "a":
            self.current_link = dict(attrs).get("href")
            self.current_add_date = dict(attrs).get("add_date")

    def handle_endtag(self, tag):
        if tag == "h3":
            self.in_h3 = False
        elif tag == "a":
            if self.current_link and self.current_title:
                self.bookmarks.append({
                    "url": self.current_link,
                    "title": self.current_title,
                    "folder": list(self.current_folder),
                    "description": "" # Description might be in DD tag, simpler parsing for now
                })
            self.current_link = None
            self.current_title = None
        elif tag == "dl":
            if self.current_folder:
                self.current_folder.pop()

    def handle_data(self, data):
        if self.in_h3:
            self.current_folder.append(data.strip())
        elif self.current_link:
            self.current_title = data.strip()

def parse_bookmarks_html(file_path: Path) -> List[Dict]:
    """Parses a Netscape Bookmark HTML file."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Netscape format is messy, standard HTMLParser might struggle with nested DL/DT/DD without closing tags.
        # Let's use a slightly more robust regex/line-based approach for the structure if HTMLParser fails,
        # but let's try a custom parser that handles the nesting logic manually if needed.
        # Actually, for standard exports, a simple regex for <H3> and <A> might be enough if we track indentation or DL nesting.
        # But let's stick to a simpler assumption: Folders are H3, Links are A.
        # The nesting is defined by DL/p wrapping.

        # Re-implementing a simple stack-based parser for Netscape format
        bookmarks = []
        folder_stack = []

        lines = content.splitlines()
        for line in lines:
            line = line.strip()
            # Check for folder start
            folder_match = re.search(r'<H3.*?>(.*?)</H3>', line, re.IGNORECASE)
            if folder_match:
                folder_name = folder_match.group(1)
                folder_stack.append(folder_name)
                continue

            # Check for folder end (DL end)
            if "</DL>" in line.upper():
                if folder_stack:
                    folder_stack.pop()
                continue

            # Check for link
            link_match = re.search(r'<A HREF="(.*?)".*?>(.*?)</A>', line, re.IGNORECASE)
            if link_match:
                url = link_match.group(1)
                title = link_match.group(2)
                bookmarks.append({
                    "url": url,
                    "title": title,
                    "folder": list(folder_stack),
                    "description": ""
                })
                continue

            # Check for description
            if line.upper().startswith("<DD>") and bookmarks:
                desc = line[4:].strip()
                bookmarks[-1]["description"] = desc

        return bookmarks

    except Exception as e:
        logger.error(f"Failed to parse bookmark file: {e}")
        raise

def get_existing_urls(mdx_path: Path) -> Set[str]:
    """Extracts existing bookmark URLs from an MDX file."""
    urls = set()
    if not mdx_path.exists():
        return urls

    with open(mdx_path, "r", encoding="utf-8") as f:
        content = f.read()
        # Match <Bookmark url="..." ... />
        matches = re.findall(r'<Bookmark\s+[^>]*url="([^"]+)"', content)
        urls.update(matches)
    return urls

def create_mdx_file(mdx_path: Path, title: str):
    """Creates a new MDX file with frontmatter."""
    content = f"""---
title: {title}
---

{BOOKMARK_COMPONENT_IMPORT}

"""
    with open(mdx_path, "w", encoding="utf-8") as f:
        f.write(content)
    logger.info(f"Created new MDX file: {mdx_path}")

def append_bookmark(mdx_path: Path, category: str, bookmark: Dict, dry_run: bool):
    """Appends a bookmark to the MDX file under the correct category."""

    if dry_run:
        logger.info(f"[DRY RUN] Would add '{bookmark['title']}' to '{mdx_path}' under '{category}'")
        return

    if not mdx_path.exists():
        create_mdx_file(mdx_path, mdx_path.stem.capitalize())

    with open(mdx_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # Check if import exists
    has_import = any(BOOKMARK_COMPONENT_IMPORT.strip() in line for line in lines)
    if not has_import:
        # Insert import after frontmatter
        insert_idx = 0
        if lines[0].strip() == "---":
            try:
                insert_idx = lines.index("---\n", 1) + 1
            except ValueError:
                insert_idx = len(lines)
        lines.insert(insert_idx, f"\n{BOOKMARK_COMPONENT_IMPORT}\n")

    # Find category header
    header = f"## {category}"
    header_idx = -1
    for i, line in enumerate(lines):
        if line.strip() == header:
            header_idx = i
            break

    description = bookmark.get("description", "").replace('"', '&quot;')
    if description:
        bookmark_line = f'<Bookmark url="{bookmark["url"]}" title="{bookmark["title"]}" description="{description}" />\n'
    else:
        bookmark_line = f'<Bookmark url="{bookmark["url"]}" title="{bookmark["title"]}" />\n'

    if header_idx != -1:
        # Append after the header and its existing items
        # Find the next header or end of file
        insert_pos = len(lines)
        for i in range(header_idx + 1, len(lines)):
            if lines[i].strip().startswith("## "):
                insert_pos = i
                break
        lines.insert(insert_pos, bookmark_line)
    else:
        # Append new header and bookmark at the end
        if lines and lines[-1].strip() != "":
            lines.append("\n")
        lines.append(f"\n{header}\n\n")
        lines.append(bookmark_line)

    with open(mdx_path, "w", encoding="utf-8") as f:
        f.writelines(lines)

    logger.info(f"Added '{bookmark['title']}' to '{mdx_path}'")

def main():
    parser = argparse.ArgumentParser(description="Import bookmarks from HTML export to Fumadocs.")
    parser.add_argument("file", nargs="?", default="bookmarks.html", type=Path, help="Path to the bookmarks HTML file. Defaults to 'bookmarks.html'.")
    parser.add_argument("--target-dir", "-t", default="fumadocs/content/docs/bookmarks", type=Path, help="Target directory for MDX files.")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing to files.")

    args = parser.parse_args()

    if not args.file.exists():
        logger.error(f"Input file not found: {args.file}")
        logger.info("Please provide a file path or ensure 'bookmarks.html' exists in the current directory.")
        return

    if not args.target_dir.exists():
        logger.error(f"Target directory not found: {args.target_dir}")
        return

    logger.info(f"Parsing bookmarks from {args.file}...")
    bookmarks = parse_bookmarks_html(args.file)
    logger.info(f"Found {len(bookmarks)} bookmarks.")

    for bm in bookmarks:
        folder_path = bm["folder"]
        if not folder_path:
            continue # Skip bookmarks in root

        # Mapping strategy:
        # Top-level folder -> MDX Filename (lowercase)
        # Sub-folder -> H2 Header

        # If only one level, use it as filename and "General" or "Misc" as header?
        # Or just put them in the file without header?
        # Let's assume: folder[0] is filename, folder[1] (if exists) is header.
        # If no folder[1], maybe use "General" or just append to bottom?
        # Let's use "Resources" if no subfolder.

        filename = folder_path[0].lower().replace(" ", "-")
        category = folder_path[1] if len(folder_path) > 1 else "Resources"

        mdx_file = args.target_dir / f"{filename}.mdx"

        existing_urls = get_existing_urls(mdx_file)
        if bm["url"] in existing_urls:
            logger.debug(f"Skipping duplicate: {bm['url']}")
            continue

        append_bookmark(mdx_file, category, bm, args.dry_run)

    logger.info("Import completed.")

if __name__ == "__main__":
    main()
