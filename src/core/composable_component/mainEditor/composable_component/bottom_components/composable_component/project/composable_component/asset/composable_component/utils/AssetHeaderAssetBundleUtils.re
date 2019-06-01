open NodeAssetType;

let getAssetBundleTypeByExtname = extname =>
  switch (extname) {
  | ".rab" => RAB
  | ".sab" => SAB
  | ".wab" => WAB
  | extName =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getAssetBundleTypeByExtname",
        ~description={j|unknown extName: $extName|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };
