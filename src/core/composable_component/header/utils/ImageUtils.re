let getImageName = image => Obj.magic(image)##name;

let setImageName = (image, name) => {
  Obj.magic(image)##name#=name;

  ();
};

let getImageWidth = image => Obj.magic(image)##width;

let getImageHeight = image => Obj.magic(image)##height;

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

let getNullImageSrc = () => "./public/null.png";