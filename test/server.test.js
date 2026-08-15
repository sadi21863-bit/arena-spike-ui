'use strict';

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../server');
const { increment, formatCount } = require('../public/app.js');

describe('press-counter server', () => {
  let server;
  let base;

  before(async () => {
    server = createServer();
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    base = `http://127.0.0.1:${server.address().port}`;
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  it('serves the page at /', async () => {
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, /Press Counter/);
    assert.match(html, /id="press-button"/);
  });

  it('serves the app script', async () => {
    const res = await fetch(`${base}/app.js`);
    assert.equal(res.status, 200);
    assert.match(await res.text(), /pressCounter/);
  });

  it('GET /health returns {"status":"ok"}', async () => {
    const res = await fetch(`${base}/health`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.deepEqual(await res.json(), { status: 'ok' });
  });

  it('returns 404 for unknown paths', async () => {
    const res = await fetch(`${base}/no-such-file`);
    assert.equal(res.status, 404);
  });

  it('rejects path traversal', async () => {
    const res = await fetch(`${base}/..%2fserver.js`);
    assert.ok([403, 404].includes(res.status));
  });
});

describe('counter logic', () => {
  it('increments the count by one', () => {
    assert.equal(increment(0), 1);
    assert.equal(increment(4), 5);
  });

  it('formats the count with a label', () => {
    assert.equal(formatCount(0), '0 presses');
    assert.equal(formatCount(1), '1 press');
    assert.equal(formatCount(2), '2 presses');
  });
});
