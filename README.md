# Reddit Subreddit Info — CLI & Web View

A Python CLI tool and HTML/CSS web view for the Web Infrastructure course activity.

## What it does

Queries a favorite subreddit and displays:
- The subreddit name (`r/...`)
- Community description and what kind of people/community it is
- Subreddit rules
- Number of subscribers
- Top 10 posts with the highest upvotes

The tool prints all information in the CLI and generates an `index.html` page styled with `style.css` to display it nicely in a web browser.

## Requirements

- Python 3 (standard library only — no `pip install` required)
- A modern web browser

## How to run

1. Run the CLI tool for the default subreddit (`r/JujutsuKaisen`):
```bash
python3 main.py
```

2. Or query any other subreddit (e.g. `webdev` or `python`):
```bash
python3 main.py webdev
```
*(You can also use `python3 reddit_query.py [subreddit]`)*

3. Open the generated web page in your browser:
```bash
open index.html
```
or serve it with Python's built-in HTTP server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

## Files

- `main.py` — Python CLI script that queries Reddit and generates `index.html`.
- `reddit_query.py` — Alias runner for `main.py`.
- `index.html` — Generated web page displaying the subreddit details.
- `style.css` — Stylesheet for `index.html`.
