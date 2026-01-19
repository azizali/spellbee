#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Spelling Bee Solver - Full Dictionary Version
 * 
 * NY Times Spelling Bee Rules:
 * 1. Create words using only the available letters
 * 2. The center letter MUST be in every word
 * 3. Minimum 4 letters per word
 * 4. Letters can be repeated as many times as needed
 * 5. Proper nouns and hyphenated words don't count
 * 6. Pangrams (using all 7 letters) earn bonus points
 * 
 * Usage:
 *   pnpx tsx solveSpellingBeeSimple.ts <centerLetter> <letter1> <letter2> ...
 * 
 * Example:
 *   pnpx tsx solveSpellingBeeSimple.ts B R A I N E S
 */


export interface SpellingBeePuzzle {
  centerLetter: string;
  allLetters: string[];
}

export interface SolverResult {
  pangrams: string[];
  other: string[];
}

/**
 * Solves Spelling Bee puzzle
 * @param centerLetter - The required center letter
 * @param allLetters - All 7 available letters (including center)
 * @param wordList - Array of valid English words to check
 */
export function solveSpellingBee(
  centerLetter: string,
  allLetters: string[],
  wordList: string[]
): SolverResult {
  const center = centerLetter.toUpperCase();
  const allowedLetters = new Set(allLetters.map((l) => l.toUpperCase()));

  const pangrams: string[] = [];
  const other: string[] = [];

  for (const word of wordList) {
    const upper = word.toUpperCase();

    // Must be at least 4 letters
    if (upper.length < 4) continue;

    // Must contain center letter
    if (!upper.includes(center)) continue;

    // Check if all letters in word are from allowed set (letters can repeat)
    const isValid = upper.split("").every((letter) => allowedLetters.has(letter));
    if (!isValid) continue;

    // Valid word! Check if it's a pangram (uses all 7 letters)
    const wordLetters = new Set(upper.split(""));
    if (wordLetters.size === allowedLetters.size) {
      pangrams.push(upper);
    } else {
      other.push(upper);
    }
  }

  return {
    pangrams: [...new Set(pangrams)].sort(),
    other: [...new Set(other)].sort(),
  };
}

/**
 * Load word list from local file or system dictionary
 */
function loadDictionary(): string[] {
  // First try local dictionary file in project
  const localDictPath = path.join(__dirname, "words.txt");
  
  if (fs.existsSync(localDictPath)) {
    try {
      const content = fs.readFileSync(localDictPath, "utf-8");
      const words = content
        .split("\n")
        .map((w) => w.trim().toLowerCase())
        .filter((w) => w.length >= 4 && /^[a-z]+$/.test(w));
      console.error(`✓ Loaded ${words.length} words from local dictionary (${localDictPath})`);
      return words;
    } catch (e) {
      console.error(`⚠ Error reading local dictionary: ${e}`);
    }
  }

  // Fallback to system dictionary
  const possiblePaths = [
    "/usr/share/dict/words",           // Linux, macOS
    "/usr/dict/words",                 // BSD
    "/opt/local/share/dict/words",     // MacPorts on macOS
  ];

  for (const dictPath of possiblePaths) {
    if (fs.existsSync(dictPath)) {
      try {
        const content = fs.readFileSync(dictPath, "utf-8");
        const words = content
          .split("\n")
          .map((w) => w.trim().toLowerCase())
          .filter((w) => w.length >= 4 && /^[a-z]+$/.test(w));
        console.error(`✓ Loaded ${words.length} words from system dictionary (${dictPath})`);
        return words;
      } catch (e) {
        // Continue to next path
      }
    }
  }

  throw new Error("Dictionary not found. Please ensure words.txt exists in the project directory.");
}

/**
 * Main function - run from CLI
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("🐝 NY Times Spelling Bee Solver\n");
    console.log("Usage: pnpx tsx solveSpellingBeeSimple.ts <centerLetter> <letter1> <letter2> ...\n");
    console.log("Example:");
    console.log("  pnpx tsx solveSpellingBeeSimple.ts B R A I N E S\n");
    console.log("This will solve a puzzle with:");
    console.log("  - Center Letter: B (required in every word)");
    console.log("  - Available Letters: B, R, A, I, N, E, S\n");
    return;
  }

  const centerLetter = args[0];
  const allLetters = args;
  
  console.error("Loading dictionary...");
  const wordList = loadDictionary();

  const result = solveSpellingBee(centerLetter, allLetters, wordList);

  console.log("🐝 NY Times Spelling Bee Solver\n");
  console.log(`Center Letter: ${centerLetter} (required in every word)`);
  console.log(`Available Letters: ${allLetters.join(", ")} (${allLetters.length} total)\n`);

  if (result.pangrams.length > 0) {
    console.log(`⭐ Pangrams - ${result.pangrams.length} (uses all ${allLetters.length} letters):`);
    result.pangrams.forEach((w) => console.log(`   ${w}`));
    console.log();
  }

  console.log(`📝 Other Valid Words - ${result.other.length}:`);
  result.other.forEach((w) => console.log(`   ${w}`));

  console.log(`\n✅ Total Valid Words: ${result.pangrams.length + result.other.length}`);
}

// Run if executed directly
main();
