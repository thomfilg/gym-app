#!/usr/bin/env node
/**
 * Check that modified files have at least 80% test coverage.
 *
 * This script enforces that any .ts/.tsx file modified in a PR
 * must have at least 80% line coverage. This forces developers
 * (and AI) to write tests for any code they touch.
 *
 * Exit codes:
 *   0 - All modified files have adequate coverage
 *   1 - Some files have insufficient coverage
 *
 * Usage:
 *   node scripts/check-modified-files-coverage.js          # All changes since origin/main
 *   node scripts/check-modified-files-coverage.js --head    # Only HEAD changes (lightweight dev check)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Minimum coverage required for modified files
const MIN_COVERAGE = 80;

// Files that are allowed to have lower coverage (with their minimum threshold)
// Format: { pattern: RegExp, minCoverage: number, reason: string }
const LOW_COVERAGE_ALLOWED = [
  // Example:
  // { pattern: /ComplexComponent\/.*\.tsx$/, minCoverage: 50, reason: 'Complex UI migration in progress' },
];

// File patterns to check (source files that should have tests)
const SOURCE_PATTERNS = [
  /\.(ts|tsx)$/,
];

// Files/patterns to exclude from the check
const EXCLUDE_PATTERNS = [
  /\.test\.(ts|tsx)$/,
  /\.spec\.(ts|tsx)$/,
  /\.stories\.(ts|tsx)$/,
  /\.d\.ts$/,
  /\/types\//,
  /\/types\.ts$/,
  /\/interfaces\//,
  /\/interfaces\.ts$/,
  /\/constants\//,
  /\/config\//,
  /vite\.config\./,
  /vitest\.config\./,
  /vitest\.setup\./,
  /jest\.config\./,
  /eslint\.config\./,
  /tailwind\.config\./,
  /postcss\.config\./,
  /index\.ts$/,       // barrel exports
  /main\.tsx?$/,       // entry points
  /App\.tsx?$/,        // root app component
];

// Apps/libs that have coverage configured
const COVERAGE_TARGETS = [
  'apps/gym-api',
  'apps/gym-web-app',
  'apps/workers',
  'libs/shared-helpers',
  'libs/ui',
  'libs/keycloak',
];

const useHeadOnly = process.argv.includes('--head');

/**
 * Get list of files modified in the PR (or just HEAD changes with --head)
 * @returns {string[]} List of modified file paths
 */
function getModifiedFiles() {
  try {
    const diffCmd = useHeadOnly
      ? 'git diff --name-only --diff-filter=d HEAD'
      : 'git diff --name-only --diff-filter=d origin/main...HEAD';
    const output = execSync(diffCmd, {
      cwd: rootDir,
      encoding: 'utf-8',
    });
    let files = output.trim().split('\n').filter(Boolean);

    if (useHeadOnly) {
      // Also include staged files
      const staged = execSync('git diff --name-only --diff-filter=d --cached', {
        cwd: rootDir,
        encoding: 'utf-8',
      });
      const stagedFiles = staged.trim().split('\n').filter(Boolean);
      files = [...new Set([...files, ...stagedFiles])];
    }

    // Filter to only files that exist on disk
    return files.filter(f => fs.existsSync(path.join(rootDir, f)));
  } catch {
    console.error('Failed to get modified files from git');
    return [];
  }
}

/**
 * Get the minimum coverage required for a file
 * @param {string} filePath - File path relative to repo root
 * @returns {{ minCoverage: number, reason: string | null }} Coverage threshold and reason if lowered
 */
function getMinCoverageForFile(filePath) {
  for (const entry of LOW_COVERAGE_ALLOWED) {
    if (entry.pattern.test(filePath)) {
      return { minCoverage: entry.minCoverage, reason: entry.reason };
    }
  }
  return { minCoverage: MIN_COVERAGE, reason: null };
}

/**
 * Check if a file should be checked for coverage
 * @param {string} filePath - File path relative to repo root
 * @returns {boolean} True if file should be checked
 */
function shouldCheckFile(filePath) {
  const isSource = SOURCE_PATTERNS.some(p => p.test(filePath));
  if (!isSource) return false;

  const isExcluded = EXCLUDE_PATTERNS.some(p => p.test(filePath));
  if (isExcluded) return false;

  const isInTarget = COVERAGE_TARGETS.some(target => filePath.startsWith(target + '/'));
  if (!isInTarget) return false;

  return true;
}

/**
 * Find coverage data for a file
 * @param {string} filePath - File path relative to repo root
 * @returns {number|null} Coverage percentage or null if not found
 */
function getFileCoverage(filePath) {
  const target = COVERAGE_TARGETS.find(t => filePath.startsWith(t + '/'));
  if (!target) return null;

  const summaryPath = path.join(rootDir, target, 'coverage', 'coverage-summary.json');
  if (!fs.existsSync(summaryPath)) {
    return null;
  }

  try {
    const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
    const absolutePath = path.join(rootDir, filePath);

    for (const [key, data] of Object.entries(summary)) {
      if (key === 'total') continue;

      const normalizedKey = path.normalize(key);
      const normalizedPath = path.normalize(absolutePath);

      if (normalizedKey === normalizedPath || key.endsWith(filePath)) {
        return data.lines?.pct ?? null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function main() {
  console.log('Checking coverage for modified files...\n');
  console.log(`Minimum required coverage: ${MIN_COVERAGE}%\n`);

  const modifiedFiles = getModifiedFiles();

  if (modifiedFiles.length === 0) {
    console.log('No modified files found.');
    process.exit(0);
  }

  const filesToCheck = modifiedFiles.filter(shouldCheckFile);

  if (filesToCheck.length === 0) {
    console.log('No source files to check for coverage.');
    process.exit(0);
  }

  console.log(`Found ${filesToCheck.length} source files to check:\n`);

  const results = [];
  let hasFailure = false;

  for (const file of filesToCheck) {
    const coverage = getFileCoverage(file);
    const { minCoverage, reason } = getMinCoverageForFile(file);

    if (coverage === null) {
      results.push({
        file,
        coverage: null,
        status: '\u26a0\ufe0f',
        message: 'No coverage data (add tests!)',
      });
      hasFailure = true;
    } else if (coverage < minCoverage) {
      results.push({
        file,
        coverage,
        status: '\u274c',
        message: `${coverage.toFixed(1)}% < ${minCoverage}%`,
      });
      hasFailure = true;
    } else {
      const loweredNote = reason ? ` (lowered: ${reason})` : '';
      results.push({
        file,
        coverage,
        status: '\u2705',
        message: `${coverage.toFixed(1)}%${loweredNote}`,
      });
    }
  }

  for (const r of results) {
    console.log(`  ${r.status} ${r.file}`);
    console.log(`     ${r.message}\n`);
  }

  const passed = results.filter(r => r.status === '\u2705').length;
  const failed = results.filter(r => r.status !== '\u2705').length;

  console.log('\u2500'.repeat(60));
  console.log(`\nSummary: ${passed} passed, ${failed} failed\n`);

  if (hasFailure) {
    console.log('\u2554' + '\u2550'.repeat(70) + '\u2557');
    console.log('\u2551  \u274c MODIFIED FILES COVERAGE CHECK FAILED' + ' '.repeat(32) + '\u2551');
    console.log('\u255a' + '\u2550'.repeat(70) + '\u255d');
    console.log(`\nAll modified source files must have at least ${MIN_COVERAGE}% test coverage.`);
    console.log('\nTO FIX: Add or improve tests for the files listed above.');
    process.exit(1);
  }

  console.log('\u2554' + '\u2550'.repeat(70) + '\u2557');
  console.log('\u2551  \u2705 MODIFIED FILES COVERAGE CHECK PASSED' + ' '.repeat(32) + '\u2551');
  console.log('\u255a' + '\u2550'.repeat(70) + '\u255d');
  process.exit(0);
}

main();
