let getDefaultMimeType = () => "image/png";

let getImageName = image => Obj.magic(image)##name;

let setImageName = (image, name) => Obj.magic(image)##name #= name |> ignore;

let getImageWidth = image => Obj.magic(image)##width;

let getImageHeight = image => Obj.magic(image)##height;

let getImageMimeType = (extName, editorState) =>
  switch (extName) {
  | ".png" => "image/png"
  | ".jpg"
  | ".jpeg" => "image/jpeg"
  | mimeType =>
    ConsoleUtils.error(
      LogUtils.buildErrorMessage(
        ~description={j|unknown image mimeType: $mimeType|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
      editorState,
    );

    mimeType;
  };

let getNullImageSrc = () => "./public/null.png";