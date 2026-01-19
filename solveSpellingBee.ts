/**
 * Spelling Bee Solver
 * 
 * Given a center letter (required) and surrounding letters,
 * find all valid words that:
 * 1. Contain the center letter
 * 2. Use only the given letters
 * 3. Are at least 4 letters long
 */

import * as fs from "fs";

interface SpellingBeePuzzle {
  centerLetter: string;
  surroundingLetters: string[];
  allLetters: string[];
}

interface SolverResult {
  pangrams: string[];
  otherAnswers: string[];
  allWords: string[];
}

class SpellingBeeSolver {
  private wordList: Set<string> = new Set();
  private readonly MIN_WORD_LENGTH = 4;

  constructor(wordListPath?: string) {
    this.loadWordList(wordListPath);
  }

  /**
   * Load word list from file
   * If no path provided, uses a basic built-in word list
   */
  private loadWordList(wordListPath?: string): void {
    if (wordListPath && fs.existsSync(wordListPath)) {
      const content = fs.readFileSync(wordListPath, "utf-8");
      const words = content
        .split("\n")
        .map((w) => w.trim().toUpperCase())
        .filter((w) => w.length > 0);
      this.wordList = new Set(words);
      console.log(`Loaded ${this.wordList.size} words from ${wordListPath}`);
    } else {
      // Built-in basic word list for demonstration
      this.wordList = new Set([
        "RAIN",
        "TRAIN",
        "STRAIN",
        "BRAIN",
        "STAIN",
        "BEANS",
        "BEAST",
        "BREAST",
        "BANTER",
        "RABIES",
        "SATIN",
        "SAINT",
        "BRAINIEST",
        "ARTIST",
        "STRAIN",
        "ANISE",
        "ARISE",
        "BAINS",
        "BRANS",
        "INERT",
        "STEIN",
        "STARE",
        "RATES",
        "TEARS",
      ]);
    }
  }

  /**
   * Solve the Spelling Bee puzzle
   * 
   * Rules:
   * 1. Every word must contain the center letter
   * 2. Words must be at least 4 letters long
   * 3. Letters can only be used as many times as they appear in the puzzle
   * 4. All letters must be from the available set
   * 5. Pangrams use all 7 available letters
   */
  solve(puzzle: SpellingBeePuzzle): SolverResult {
    const { centerLetter, allLetters } = puzzle;
    const centerUpper = centerLetter.toUpperCase();
    const allowedLettersSet = new Set(allLetters.map((l) => l.toUpperCase()));

    // Count available letters (handling duplicates)
    const availableLetterCount = new Map<string, number>();
    for (const letter of allLetters.map((l) => l.toUpperCase())) {
      availableLetterCount.set(letter, (availableLetterCount.get(letter) || 0) + 1);
    }

    const pangrams: string[] = [];
    const otherAnswers: string[] = [];

    for (const word of this.wordList) {
      // Check if word is long enough
      if (word.length < this.MIN_WORD_LENGTH) {
        continue;
      }

      // Check if word contains the center letter
      if (!word.includes(centerUpper)) {
        continue;
      }

      // Check if all letters are from allowed set and respect frequency
      if (!this.isValidWord(word, allowedLettersSet, availableLetterCount)) {
        continue;
      }

      // Valid word found
      if (this.isPangram(word, allLetters)) {
        pangrams.push(word);
      } else {
        otherAnswers.push(word);
      }
    }

    return {
      pangrams: pangrams.sort(),
      otherAnswers: otherAnswers.sort(),
      allWords: [...pangrams, ...otherAnswers],
    };
  }

  /**
   * Check if a word is valid given the available letters and their frequencies
   */
  private isValidWord(
    word: string,
    allowedLettersSet: Set<string>,
    availableLetterCount: Map<string, number>
  ): boolean {
    // Create a copy of available letter counts
    const letterCount = new Map(availableLetterCount);

    // Check each letter in the word
    for (const letter of word.split("")) {
      // Letter must be in allowed set
      if (!allowedLettersSet.has(letter)) {
        return false;
      }

      // Letter must be available (not used up)
      const remaining = letterCount.get(letter) || 0;
      if (remaining <= 0) {
        return false;
      }

      // Decrement available count
      letterCount.set(letter, remaining - 1);
    }

    return true;
  }

  /**
   * Check if a word is a pangram (uses all available letters)
   */
  private isPangram(word: string, availableLetters: string[]): boolean {
    const wordLetters = new Set(word.split(""));
    const availableSet = new Set(availableLetters.map((l) => l.toUpperCase()));
    return availableSet.size === wordLetters.size;
  }
}

/**
 * Example usage
 */
function main(): void {
  // Example puzzle from the January 16, 2026 puzzle
  const puzzle: SpellingBeePuzzle = {
    centerLetter: "B",
    surroundingLetters: ["R", "A", "I", "N", "E", "S"],
    allLetters: ["B", "R", "A", "I", "N", "E", "S"],
  };

  console.log("🐝 Spelling Bee Solver\n");
  console.log(`Center Letter: ${puzzle.centerLetter}`);
  console.log(`Surrounding Letters: ${puzzle.surroundingLetters.join(", ")}`);
  console.log(`Available Letters: ${puzzle.allLetters.join(", ")}\n`);

  const solver = new SpellingBeeSolver();
  const result = solver.solve(puzzle);

  console.log(`Found ${result.allWords.length} valid words:\n`);

  if (result.pangrams.length > 0) {
    console.log(`🌟 Pangrams (${result.pangrams.length}):`);
    result.pangrams.forEach((word) => {
      console.log(`  • ${word}`);
    });
    console.log();
  }

  if (result.otherAnswers.length > 0) {
    console.log(`Other Answers (${result.otherAnswers.length}):`);
    result.otherAnswers.forEach((word) => {
      console.log(`  • ${word}`);
    });
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { SolverResult, SpellingBeePuzzle, SpellingBeeSolver };

