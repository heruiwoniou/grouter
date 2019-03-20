import fs, { readFile, writeFile } from "fs-extra";
import { getFiles, createRoutes } from "./utils";
import template from "lodash/template";

export default {
  _options: {
    template: null,
    template: null,
    output: null
  },
  setOptions({ watchDir, template, output }) {
    this._options.watchDir = watchDir;
    this._options.template = template;
    this._options.output = output;
  },
  async build(source, callback = () => {}) {
    try {
      let files = getFiles(source);
      let tpl = await readFile(this._options.template, "utf-8");
      let compiler = template(tpl);

      let routes = createRoutes(files, this._options.watchDir);

      debugger;

      await writeFile(this._options.output, compiler(), "utf-8");

      callback();

    } catch (e) {
      callback(e);
    }
  }
};
