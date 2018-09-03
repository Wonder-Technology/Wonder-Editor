open Wonderjs;

let init = DirectorAPI.initDirector;

let loopBody =
  Console.tryCatch(
    () => DirectorAPI.loopBody,
    e => Console.throwFatal(e##message),
  );