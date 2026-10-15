import assert from 'node:assert/strict';
import test from 'node:test';
import { privacyPatterns } from './privacy-patterns.mjs';

const matches = (value) => privacyPatterns.some((pattern) => pattern.test(value));

test('phone guard still catches local and international phone formats', () => {
  for (const value of ['3001234567', '300 123 4567', '300-123-4567', '+57 300 123 4567']) {
    assert.equal(matches(value), true, value);
  }
});

test('statistical decimals and opaque identifiers are not phone numbers', () => {
  for (const value of ['18.3721369453', '0.3001234567', '3001234567.0', 'a3001234567b', '2023-11-12']) {
    assert.equal(matches(value), false, value);
  }
});
