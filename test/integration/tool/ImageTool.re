let buildImage = (~name="", ()) => {"name": name};

let buildImageWithSrc = src => {
  "src": src,
  "onload": Js.Nullable.null,
  "complete": true,
};