"use strict";

module.exports = class HelloWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("Hello World Plugin", (
      stats /* stats is passed as argument when done hook is tapped.  */
    ) => {
      debugger;
      console.log("Hello World!");
    });
  }
};
