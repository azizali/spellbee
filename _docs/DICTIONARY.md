# Dictionary File

## `words.txt` - Comprehensive English Dictionary

This file contains **370,105 English words** used by the Spelling Bee solver.

### Source
Downloaded from: [dwyl/english-words](https://github.com/dwyl/english-words)
- Comprehensive list of English words
- Includes all word forms (verbs with -ing, -ed, etc.)
- Only alphabetic characters (no hyphens, apostrophes, or proper nouns)

### Usage
The `solveSpellingBeeSimple.ts` script automatically loads this dictionary on startup:
1. First checks for `words.txt` in the project directory
2. Falls back to system dictionary if not found

### Server Deployment
✅ **Server-ready**: The dictionary file is included in your project, so it works consistently across all environments:
- Local development
- Production servers
- Docker containers
- CI/CD pipelines

### File Size
- **Size**: ~4.1 MB
- **Words**: 370,105
- **Format**: Plain text, one word per line

### Updating
To update the dictionary:
```bash
curl -L "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt" -o words.txt
```

### Alternative Dictionaries
If you need a different word list, simply replace `words.txt` with any text file containing one word per line.
