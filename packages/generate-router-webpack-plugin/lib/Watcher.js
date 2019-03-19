import gaze from "gaze";

const Watcher = {
  _instance: null,
  _options: null,
  setOptions(options) {
    this._options = options;
  },
  watch() {
    if (this._options) {
      if (Watcher.instance) {
        return Promise.resolve(Watcher.instance);
      } else {
        return new Promise((resolve, reject) => {
          Watcher.instance = gaze(
            this._options.glob || "**/*",
            {
              cwd: this._options.watchDir
            },
            (err, watcher) => (err ? reject(err) : resolve(watcher))
          );
        });
      }
    } else return Promise.reject(new Error("No Configs for Watcher"));
  },
  source() {
    if (Watcher.instance) {
			let paths = Watcher.instance.watched();
			return paths;
    }
  },
  destroy() {
    Watcher.instance && Watcher.instance.close();
  }
};

export default Watcher;
