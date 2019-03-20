import Watcher from "./Watcher";
import Builder from "./Builder";

const PLUGIN_NAME = "path-to-router-webpack-plugin";

const REQUIRED_CONFIGS = ["watchDir", "template", "output"];

module.exports = class GenerateRouterWebpackPlugin {
  constructor(options = {}) {
    this.output = {
      warnings: [],
      errors: []
    };

    options.exclude = options.exclude || /__.*?__/;

    REQUIRED_CONFIGS.forEach(
      configName =>
        options[configName] ||
        this.output.errors.push(
          `${PLUGIN_NAME}: Missing ${configName} configuration.`
        )
    );

    Watcher.setOptions(options);
    Builder.setOptions(options);
  }

  hook(compiler, hookName, cb) {
    compiler.hooks[hookName].tapAsync(PLUGIN_NAME, cb);
  }

  apply(compiler) {
    this.hook(
      compiler,
      "watchRun",
      this.BeforeActuallyCompileHandle.bind(this)
    );
    this.hook(compiler, "emit", this.AfterGenerateHandle.bind(this));
  }

  BeforeActuallyCompileHandle(watching, watchRunCallback) {
    if (Watcher.instance) return watchRunCallback();
    Watcher.watch().then(
      watcher => watcher.on("all", () => Builder.build(Watcher.source())),
      watchRunCallback
    );
    Builder.build(Watcher.source(), watchRunCallback);
  }

  AfterGenerateHandle(compilation, cb) {
    compilation.errors = compilation.errors.concat(
      this.output.errors.map(msg => `${PLUGIN_NAME}: ${msg}`)
    );
    compilation.warnings = compilation.warnings.concat(
      this.output.warnings.map(msg => `${PLUGIN_NAME}: ${msg}`)
    );
    cb();
  }
};
