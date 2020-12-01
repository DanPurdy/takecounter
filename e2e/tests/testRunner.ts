const createTestCafe = require('testcafe');

const runInHeadlessMode = process.env.E2E_HEADLESS === 'true';

async function runTests() {
  let testcafe = null;
  let runner = null;

  await createTestCafe('localhost', 1337, 1338)
    .then((tc) => {
      testcafe = tc;
      runner = tc.createRunner();

      return runner
        .src([
          'e2e/tests/default/toggle-pass.test.ts',
          'e2e/tests/default/take-count.test.ts',
          'e2e/tests/default/pass-count.test.ts',
          'e2e/tests/default/select-take.test.ts',
          'e2e/tests/default/reset-clear.test.ts',
          'e2e/tests/default/history-states.test.ts',
        ])
        .browsers([runInHeadlessMode ? 'chrome:headless' : 'chrome'])
        .reporter([
          'spec',
          {
            name: 'xunit',
            output: 'e2e/result.xml',
          },
        ])
        .screenshots({
          path: 'e2e/screenshots/',
          takeOnFails: true,
          pathPattern:
            '${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png',
          fullPage: true,
        })
        .run();
    })
    .then((failedCount) => {
      console.log(`Completed run with failedCount=${failedCount}`);
      testcafe.close();

      process.exit(failedCount > 0 ? 1 : 0);
    });
}
(async () => {
  Promise.resolve()
    .then(async () => {
      await runTests();
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
})();
