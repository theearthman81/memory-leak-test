// constant for bytes within MB
const MB = 1048576;

// promise friendly setTimeout to enable waiting
const timeout = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

// collect GC and wait for amount to settle
const collectGC = async () => {
  // call 'gc' 7 times
  // see Chromium benchmarks https://cs.chromium.org/chromium/src/tools/perf/benchmarks/blink_perf.js?q=GCController.collect()&sq=package:chromium&type=cs&l=39
  for (let i = 0; i < 7; i++) {
    // manually collect garbage
    window.gc();
    await timeout(20);
  }
};

const populateList = async () => {
  // add items
  addBtn.click();
  // clear items
  clearBtn.click();
  await timeout(10);
};

describe('Memory Usage Test Suite', () => {
  describe('Example Test', () => {
    it('does not retain unacceptable amount of memory', async () => {
      // construct DOM
      console.log('starting application...');
      window.bootApplication();

      // ensure garbage collection has taken place
      await collectGC();

      // get initial snapshot of memory
      const initial = window.performance.memory.usedJSHeapSize;
      console.log('executing test runs...');
      const testRuns = 10;

      // execute 10 times
      for (let i = 0; i < 10; i++) {
        await populateList();
        console.log(`run ${i + 1}/${testRuns}`);
      }

      console.log('test runs complete');

      // perform garbage collection to expose memory leaks
      await collectGC();

      // collect retained memory
      const retained = window.performance.memory.usedJSHeapSize - initial;

      // assert usage is at most 0.05MB
      console.log(`memory retained: ${retained / MB}MB`);
      assert.isAtMost(retained / MB, 0.05, 'usage is at most 0.05MB');
    }).timeout(60000);
  });
});
