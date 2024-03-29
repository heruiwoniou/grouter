const getRoutePathExtension = key => {
  if (key === "_") {
    return "*";
  }

  if (key.startsWith("_")) {
    return `:${key.substr(1)}`;
  }

  return key;
};

function cleanChildrenRoutes(routes, isChild = false, routeNameSplitter = "-") {
  let start = -1;
  const regExpIndex = new RegExp(`${routeNameSplitter}index$`);
  const routesIndex = [];
  routes.forEach(route => {
    if (regExpIndex.test(route.name) || route.name === "index") {
      // Save indexOf 'index' key in name
      const res = route.name.split(routeNameSplitter);
      const s = res.indexOf("index");
      start = start === -1 || s < start ? s : start;
      routesIndex.push(res);
    }
  });
  routes.forEach(route => {
    route.path = isChild ? route.path.replace("/", "") : route.path;
    if (route.path.includes("?")) {
      const names = route.name.split(routeNameSplitter);
      const paths = route.path.split("/");
      if (!isChild) {
        paths.shift();
      } // clean first / for parents
      routesIndex.forEach(r => {
        const i = r.indexOf("index") - start; //  children names
        if (i < paths.length) {
          for (let a = 0; a <= i; a++) {
            if (a === i) {
              paths[a] = paths[a].replace("?", "");
            }
            if (a < i && names[a] !== r[a]) {
              break;
            }
          }
        }
      });
      route.path = (isChild ? "" : "/") + paths.join("/");
    }
    route.name = route.name.replace(regExpIndex, "");
    if (route.children) {
      if (route.children.find(child => child.path === "")) {
        delete route.name;
      }
      route.children = cleanChildrenRoutes(
        route.children,
        true,
        routeNameSplitter
      );
    }
  });
  return routes;
}

const DYNAMIC_ROUTE_REGEX = /^\/([:*])/;

function sortRoutes(routes) {
  routes.sort((a, b) => {
    if (!a.path.length) {
      return -1;
    }
    if (!b.path.length) {
      return 1;
    }
    // Order: /static, /index, /:dynamic
    // Match exact route before index: /login before /index/_slug
    if (a.path === "/") {
      return DYNAMIC_ROUTE_REGEX.test(b.path) ? -1 : 1;
    }
    if (b.path === "/") {
      return DYNAMIC_ROUTE_REGEX.test(a.path) ? 1 : -1;
    }

    let i;
    let res = 0;
    let y = 0;
    let z = 0;
    const _a = a.path.split("/");
    const _b = b.path.split("/");
    for (i = 0; i < _a.length; i++) {
      if (res !== 0) {
        break;
      }
      y = _a[i] === "*" ? 2 : _a[i].includes(":") ? 1 : 0;
      z = _b[i] === "*" ? 2 : _b[i].includes(":") ? 1 : 0;
      res = y - z;
      // If a.length >= b.length
      if (i === _b.length - 1 && res === 0) {
        // unless * found sort by level, then alphabetically
        res =
          _a[i] === "*"
            ? -1
            : _a.length === _b.length
            ? a.path.localeCompare(b.path)
            : _a.length - _b.length;
      }
    }

    if (res === 0) {
      // unless * found sort by level, then alphabetically
      res =
        _a[i - 1] === "*" && _b[i]
          ? 1
          : _a.length === _b.length
          ? a.path.localeCompare(b.path)
          : _a.length - _b.length;
    }
    return res;
  });

  routes.forEach(route => {
    if (route.children) {
      sortRoutes(route.children);
    }
  });

  return routes;
}

export function getFiles(source) {
  let result = [];
  Object.keys(source).forEach(key => {
    result = result.concat(
      source[key].filter(item => item.charAt(item.length - 1) !== "/")
    );
  });
  return result;
}

export function createRoutes(
  files,
  pagesDir,
  routeNameSplitter = "-"
) {
  const supportedExtensions = ["js", "ts", "tsx", "jsx"];
  const routes = [];
  files.forEach(absoluteFile => {
    let file = absoluteFile.replace(new RegExp(`^${pagesDir}`), "");
    const keys = absoluteFile
      .replace(new RegExp(`^${pagesDir}`), "")
      .replace(new RegExp(`\\.(${supportedExtensions.join("|")})$`), "")
      .split("/")
      .slice(1);
    const route = { name: "", path: "", component: file };
    let parent = routes;
    keys.forEach((key, i) => {
      // remove underscore only, if its the prefix
      const sanitizedKey = key.startsWith("_") ? key.substr(1) : key;

      route.name = route.name
        ? route.name + routeNameSplitter + sanitizedKey
        : sanitizedKey;
      route.name += key === "_" ? "all" : "";
      route.chunkName = file.replace(
        new RegExp(`\\.(${supportedExtensions.join("|")})$`),
        ""
      );
      const child = parent.find(parentRoute => parentRoute.name === route.name);

      if (child) {
        child.children = child.children || [];
        parent = child.children;
        route.path = "";
      } else if (key === "index" && i + 1 === keys.length) {
        route.path += i > 0 ? "" : "/";
      } else {
        route.path += "/" + getRoutePathExtension(key);

        if (key.startsWith("_") && key.length > 1) {
          route.path += "?";
        }
      }
    });
    parent.push(route);
  });

  sortRoutes(routes);
  return cleanChildrenRoutes(routes, false, routeNameSplitter);
}