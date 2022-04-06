module.exports = {
  webpack(config) {
    return {
        ...config,
        experiments: {
            ...config.experiments,
            asyncWebAssembly: true
        },
        output: {
            ...config.output,
            webassemblyModuleFilename: 'static/wasm/[modulehash].wasm'
        }
    };
  },
};
