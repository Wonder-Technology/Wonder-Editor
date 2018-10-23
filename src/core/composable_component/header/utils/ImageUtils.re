let setImageName = (image, name) => {
  Obj.magic(image)##name#=name;

  ();
};

let getImageMimeType = extName =>
  switch (extName) {
  | ".png" => "image/png"
  | ".jpg"
  | ".jpeg" => "image/jpeg"
  | mimeType =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getImageMimeType",
        ~description={j|unknown image mimeType: $mimeType|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };