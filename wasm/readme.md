to compile and deploy the files to `/v2`
```
em++ test.cpp -o "../v2/public/wasm/test.js" -s MODULARIZE -s WASM=1 -s EXPORT_NAME="SZU" -s ENVIRONMENT="web" -s EXPORTED_FUNCTIONS=_getRand -s EXPORTED_RUNTIME_METHODS=ccall,cwrap
```

# Problems
1. It seems the animation only works when one tab is open. The animation stops working when multiple tabs open in browser.