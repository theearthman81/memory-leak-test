# Memory Leak Test Example

## overview
Basic testing of a memory leak in JavaScript to allow gating of memory leak regressions.
The test does not allow memory to rise above 0.05MB.

## requirements
* Node >= 8
* NPM >= 5
* Chrome (preferably latest)

## getting started
install...
```sh
npm install
```
run test...
```sh
npm run test
```

Test will currently fail due to existing memory leak.

## fixing the test
Uncomment the line to clear out the array of DOM nodes in the clear button event handler.
```javascript
// UNCOMMENT TO FIX MEMORY LEAK: by clearing the global 'items' array
//items = [];
```
