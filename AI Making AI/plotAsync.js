// define function to run in the worker

//Worker is ideal in Javascript, It's kind of annoying to work with in Javascript. When porting to Android or other platforms, this will be a foregone conclusion. But Javascript is Javascript.
/*function workerFunction() {
  self.addEventListener('message', function(e) {
    var result = e.data[0] * e.data[1];
    
    //These should get the full path with a function or global variable that's fetched from the system instead. If that's even possible using a sandboxed thing.
    self.importScripts("file:///C:/Users/Jojo/Dropbox/programming/Web%20Playhouse/AI%20fun/map.js", "file:///C:/Users/Jojo/Dropbox/programming/Web%20Playhouse/AI%20fun/globals.js", "file:///C:/Users/Jojo/Dropbox/programming/Web%20Playhouse/AI%20fun/AI.js");
    this.setInterval(function(e){
      let pa = plotPath();
      self.postMessage(pa);
    }, 1000);
    
    
    //e.data = pa;

    self.postMessage(pa);
  });
}

// create blob URL for worker script
var workerUrl = URL.createObjectURL(new Blob(['(', workerFunction.toString(), ')()'], { type: 'application/javascript' }));

// create worker and send message
var worker = new Worker(workerUrl);
worker.addEventListener('message', function(e) {
  console.log('Result:', e.data);
  path = e.data;
  console.log("Path (Func):"); // Print the path to the console
    console.log(path);
});
worker.postMessage([5, 10]);
*/
function doSomethingAsync() {
  return new Promise((resolve, reject) => {
    // Do some asynchronous operation here
    setInterval(function(e){
      plotPath();
    }, 333);
    
    //setTimeout(() => {
    resolve("Operation completed successfully");
    //}, 1000);
  });
}

// Call the async function and handle the result
doSomethingAsync().then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});

