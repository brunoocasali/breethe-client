const { expect } = require('chai');
const visit = require('./helpers/visit');

describe('when offline', function() {
  it('the app loads', async function() {
    await visit('/', { waitUntil: 'networkidle0' }, async (page) => {
      await page.setOfflineMode(true);
      await page.reload({ waitUntil: 'networkidle0' });

      let element = await page.$('[data-test-ppm-client]');

      expect(element).to.be.ok;
    });
  });

  it('the app loads on the location route', async function() {
    await visit('/location/2', { waitUntil: 'networkidle0' }, async (page) => {
      await page.setOfflineMode(true);
      await page.reload({ waitUntil: 'networkidle0' });

      let element = await page.$('[data-test-ppm-client]');

      expect(element).to.be.ok;
    });
  });

  it('disables the location search field', async function() {
    await visit('/', async (page) => {
      await page.setOfflineMode(true);

      let element = await page.$('[data-test-search-input]:disabled');

      expect(element).to.be.ok;
    });
  });

  it('disables the location search button', async function() {
    await visit('/', async (page) => {
      await page.setOfflineMode(true);

      let element = await page.$('[data-test-search-submit]:disabled');

      expect(element).to.be.ok;
    });
  });

  describe('when coming back online', function() {
    it('enabled the location search field', async function() {
      await visit('/', async (page) => {
        await page.setOfflineMode(true); // go offline
        await page.setOfflineMode(false); // …and back online 

        let element = await page.$('[data-test-search-input]:enabled');

        expect(element).to.be.ok;
      });
    });

    it('disables the location search button', async function() {
      await visit('/', async (page) => {
        await page.setOfflineMode(true); // go offline
        await page.setOfflineMode(false); // …and back online 

        let element = await page.$('[data-test-search-submit]:enabled');

        expect(element).to.be.ok;
      });
    });
  });
});
