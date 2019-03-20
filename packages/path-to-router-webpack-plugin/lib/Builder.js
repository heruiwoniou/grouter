import fs, { readFile, writeFile } from "fs-extra";
import utils from "./utils";
import template from "lodash/template";

const cwd = process.cwd();

export default {
  _options: {
    watchAbsoluteDir: null,
    template: null,
    output: null
  },
  setOptions({ watchDir, template, output }) {
    this._options.watchAbsoluteDir = watchDir;
    this._options.watchRelativeDir = watchDir.replace(cwd, "");
    this._options.template = template;
    this._options.output = output;
  },
  async build(source, callback = () => {}) {
    try {
      let files = utils.getFiles(source);
      let tpl = await readFile(this._options.template, "utf-8");
      let compiler = template(tpl);

      await writeFile(this._options.output, compiler(), "utf-8");

      callback();

    } catch (e) {
      callback(e);
    }
  }
};
