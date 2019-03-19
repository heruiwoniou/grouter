import Watcher from "./Watcher";
import Compiler from "./Compiler";

const PLUGIN_NAME = "generate-router-webpack-plugin";

const OPTIONS_CONFIG = ["rootDir", "exclude", "template"];

module.exports = class GenerateRouterWebpackPlugin {
  constructor(options = {}) {
    this.output = {
      warnings: [],
      errors: []
    };

    options.exclude = options.exclude || /__.*?__/;

    if (!options.rootDir)
      this.output.errors.push(`${PLUGIN_NAME}: Missing rootDir configuration.`);
    if (!options.template)
      this.output.errors.push(
        `${PLUGIN_NAME}: Missing template configuration.`
      );

    Watcher.setOptions(options);
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
      watcher => watcher.on("all", () => Compiler(Watcher.source())),
      watchRunCallback
    );
    Compiler(Watcher.source(), watchRunCallback);
  }

  AfterGenerateHandle(compilation, cb) {
    compilation.errors = compilation.errors.concat(
      this.metaOutput.errors.map(msg => `${PLUGIN_NAME}: ${msg}`)
    );
    compilation.warnings = compilation.warnings.concat(
      this.metaOutput.errwarningsors.map(msg => `${PLUGIN_NAME}: ${msg}`)
    );
    cb();
  }
};
