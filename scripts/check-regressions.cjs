const assert = require('node:assert/strict');
const { chromium } = require(require.resolve('playwright', { paths: [process.env.CODEX_NODE_MODULES || 'C:/Users/geova/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'] }));

async function main() {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  await context.addInitScript(() => localStorage.setItem('naalbertino:cookies', 'aceito'));
  const page = await context.newPage();
  page.setDefaultTimeout(4000);
  const messages = [];
  const failures = [];
  page.on('console', message => {
    if (['warning', 'warn', 'error'].includes(message.type())) messages.push(message.text());
  });
  async function check(name, run) {
    try { await run(); console.log('PASS: ' + name); }
    catch (error) { failures.push(name); console.error('FAIL: ' + name + '\n' + error.message); }
  }
  try {
    await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:5173', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await check('Fresh page has no React or router warnings', async () => assert.equal(messages.length, 0, messages.join('\n')));
    await check('Footer brand returns to the top on the same route', async () => {
      await page.locator('footer').scrollIntoViewIfNeeded();
      assert.ok(await page.evaluate(() => scrollY > 500));
      await page.locator('footer a[href="/"]').click();
      await page.waitForFunction(() => scrollY === 0, null, { timeout: 2000 });
    });
    await check('Back to top includes the header', async () => {
      await page.locator('footer').getByRole('link', { name: 'Voltar ao topo ↑' }).click();
      await page.waitForFunction(() => scrollY === 0, null, { timeout: 2000 });
    });
    await check('Editorial lettering stays inside its panel on tablet', async () => {
      await page.setViewportSize({ width: 768, height: 1000 });
      const heading = page.locator('#sobre img').locator('..').locator('p');
      const bounds = await heading.evaluate(element => {
        const parent = element.parentElement.getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(element);
        return { left: parent.left, right: parent.right, lines: Array.from(range.getClientRects()).map(rect => ({left: rect.left, right: rect.right})) };
      });
      assert.ok(bounds.lines.every(line => line.left >= bounds.left - 1 && line.right <= bounds.right + 1), JSON.stringify(bounds));
    });
    await check('Main navigation marks the active section', async () => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      const cupons = page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Cupons', exact: true });
      await cupons.click();
      await page.waitForFunction(() => document.querySelector('nav a[href="/#cupons"]')?.getAttribute('aria-current') === 'location', null, { timeout: 2000 });
    });
    if (failures.length) throw new Error(failures.length + ' regressions: ' + failures.join('; '));
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error.message); process.exit(1); });
