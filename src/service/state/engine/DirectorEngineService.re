open Wonderjs;

let init = DirectorAPI.initDirector;

let loopBody = (time, state) =>
  Console.tryCatch(
    () => DirectorAPI.loopBody(time, state),
    e => Console.throwFatal(e),
  );