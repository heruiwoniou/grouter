export default (source, callback) => {
  const cwd = process.cwd();
  Object.keys(source).forEach(key => {
    source[key.replace(cwd, "")] = source[key];
    delete source[key];
  });
};
