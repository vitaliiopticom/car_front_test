import { getFilenameFromUrl } from './download';
import { test, expect } from 'vitest';

test('returns filename without query parameters', () => {
  const url = 'https://example.com/files/document.pdf';
  const expected = 'document.pdf';
  const result = getFilenameFromUrl(url);
  expect(result).toBe(expected);
});

test('returns filename without query parameters when URL has query parameters', () => {
  const url = 'https://example.com/files/document.pdf?version=1.0';
  const expected = 'document.pdf';
  const result = getFilenameFromUrl(url);
  expect(result).toBe(expected);
});

test('returns empty string for empty URL', () => {
  const url = '';
  const expected = '';
  const result = getFilenameFromUrl(url);
  expect(result).toBe(expected);
});
