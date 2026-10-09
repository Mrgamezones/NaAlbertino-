const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(require.resolve('playwright', { paths: [process.env.CODEX_NODE_MODULES || 'C:/Users/geova/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'] }));

async function main() {
  const out = path.resolve('artifacts');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1080 }, permissions: ['clipboard-read', 'clipboard-write'], reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (['error', 'warn', 'warning'].includes(message.type())) errors.push(message.text()); });
  const base = process.env.PREVIEW_URL || 'http://127.0.0.1:5173';
  try {
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('#produtos article').count(), 4);
    await page.screenshot({ path: path.join(out, 'desktop-with-notice.png') });
    await page.getByRole('button', { name: 'Entendi', exact: true }).click();
    await page.locator('#sobre').scrollIntoViewIfNeeded();
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(out, 'desktop.png'), fullPage: true });

    await page.getByRole('button', { name: 'Masculino', exact: true }).click();
    assert.equal(await page.locator('#produtos article').count(), 2);
    await page.locator('#produtos').getByRole('button', { name: 'Todos', exact: true }).click();
    await page.getByRole('button', { name: 'Ver todos os achadinhos', exact: true }).click();
    assert.equal(await page.locator('#produtos article').count(), 6);
    await page.getByRole('searchbox', { name: 'Buscar produtos' }).fill('calca');
    assert.equal(await page.locator('#produtos article').count(), 1);
    assert.match(await page.locator('#produtos article h3').innerText(), /Calça/);
    await page.getByRole('searchbox', { name: 'Buscar produtos' }).fill('inexistente');
    assert.equal(await page.locator('#produtos article').count(), 0);
    await page.getByRole('button', { name: 'Explorar todos os achadinhos' }).click();
    await page.getByRole('button', { name: 'Salvar nos favoritos: Conjunto Alfaiataria' }).click();
    await page.getByRole('button', { name: 'Salvos (1)', exact: true }).click();
    assert.equal(await page.locator('#produtos article').count(), 1);
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await page.getByRole('dialog', { name: 'Aviso de cookies' }).count(), 0);
    assert.equal(await page.getByRole('button', { name: 'Remover dos favoritos: Conjunto Alfaiataria' }).getAttribute('aria-pressed'), 'true');
    await page.getByRole('button', { name: 'Salvos (1)', exact: true }).click();
    await page.getByRole('button', { name: 'Remover dos favoritos: Conjunto Alfaiataria' }).click();
    assert.equal(await page.locator('#produtos article').count(), 0);

    await page.locator('#cupons').getByRole('button', { name: 'Calçados', exact: true }).click();
    assert.equal(await page.locator('#cupons article').count(), 1);
    await page.getByRole('button', { name: 'Copiar cupom PES20', exact: true }).click();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'PES20');
    assert.match(await page.locator('#cupons [role="status"]').innerText(), /copiado/);
    await page.evaluate(() => { navigator.clipboard.writeText = () => Promise.reject(new Error('Blocked by browser')); });
    await page.getByRole('button', { name: 'Copiar cupom PES20', exact: true }).click();
    assert.match(await page.locator('#cupons [role="status"]').innerText(), /Não foi possível/);
    const affiliateLinks = await page.locator('a[rel~="sponsored"]').evaluateAll(links => links.every(a => a.target === '_blank' && a.rel.includes('noopener')));
    assert.ok(affiliateLinks);

    await page.getByRole('link', { name: 'Política de Privacidade', exact: true }).click();
    await page.getByRole('heading', { name: 'Política de Privacidade', exact: true }).waitFor();
    assert.equal(await page.evaluate(() => window.scrollY), 0);
    await page.screenshot({ path: path.join(out, 'privacy.png'), fullPage: true });
    await page.goto(base, { waitUntil: 'networkidle' });

    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow at ' + width);
      assert.ok(await page.locator('#cupons h3').evaluateAll(headings => headings.every(heading => heading.scrollWidth <= heading.clientWidth)), 'Coupon title overflow at ' + width);
      if (width === 320) {
        await page.locator('#sobre').scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(out, 'mobile-320.png') });
      }
      if (width === 390) {
        await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
        assert.equal(await page.getByRole('button', { name: 'Fechar menu', exact: true }).getAttribute('aria-expanded'), 'true');
        assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Início');
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Achadinhos');
        await page.keyboard.press('Escape');
        assert.equal(await page.getByRole('button', { name: 'Abrir menu', exact: true }).getAttribute('aria-expanded'), 'false');
        assert.equal(await page.evaluate(() => document.activeElement.id), 'menu-toggle');
        await page.keyboard.press('Enter');
        await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Cupons', exact: true }).click();
        assert.equal(await page.getByRole('button', { name: 'Abrir menu', exact: true }).getAttribute('aria-expanded'), 'false');
        await page.getByRole('link', { name: 'Buscar achadinhos', exact: true }).click();
        await page.waitForFunction(() => document.activeElement.id === 'busca-produtos');
        await page.locator('#sobre').scrollIntoViewIfNeeded();
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => { document.activeElement.blur(); window.scrollTo(0, 0); });
        await page.screenshot({ path: path.join(out, 'mobile.png'), fullPage: true });
      }
    }
    assert.ok(await page.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0)), 'An image did not load');
    assert.equal(errors.length, 0, errors.join('\n'));
    console.log('PASS: build preview, category filters, accent-insensitive search, empty states, saved favorites and persistence, coupon filters, clipboard success/failure, affiliate attributes, privacy route, mobile menu, search focus, images, 5 responsive widths, no browser errors.');
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exit(1); });
