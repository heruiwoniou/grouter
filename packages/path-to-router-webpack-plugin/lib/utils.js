export default {
  getFiles(source) {
    let result = [];
    Object.keys(source).forEach(
      dirAndFiles =>
        (result = result.concat(
          dirAndFiles.filter(item => item.charAt(item.length - 1) == "/")
        ))
    );
    return result;
  }
};
