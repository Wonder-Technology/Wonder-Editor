open ExportAssetType;

let convertDataToRecord = jsonData => {
  let json = jsonData |> Js.Json.parseExn;
  WonderBsJson.Json.(
    Decode.{
      textures:
        json
        |> field(
             "textures",
             array(jsonAtom =>
               {
                 path: jsonAtom |> field("path", string),
                 textureIndex: jsonAtom |> field("textureIndex", int),
                 warpT: jsonAtom |> field("warpT", int),
                 warpS: jsonAtom |> field("warpS", int),
                 minFilter: jsonAtom |> field("minFilter", int),
                 magFilter: jsonAtom |> field("magFilter", int),
               }
             ),
           ),
      sources:
        json
        |> field(
             "sources",
             array(jsonAtom =>
               {
                 base64: jsonAtom |> field("base64", string),
                 name: jsonAtom |> field("name", string),
                 textureArray: jsonAtom |> field("textureArray", array(int)),
               }
             ),
           ),
    }
  );
};

let handleAssetsTexture = ({textures, sources}) =>
  textures
  |> Js.Array.forEach(
       ({path, textureIndex, warpS, warpT, minFilter, magFilter}) => {
       let (folderPath, textureName) =
         FileNameService.getTextureFolderPathAndName(path);
       let textureParentId =
         HeaderImportFolderUtils.handleImportFolder(
           folderPath |> Js.Undefined.getExn,
         )
         |> OptionService.unsafeGet;
       let (editorState, newIndex) =
         AssetIdUtils.getAssetId |> StateLogicService.getEditorState;

       WonderLog.Log.print((folderPath, textureName)) |> ignore;

       WonderLog.Log.print(textureParentId) |> ignore;
       ();
     });

let handleImportAssetsJson = jsonResult => {
  let assetRecord = jsonResult |> convertDataToRecord;

  handleAssetsTexture(assetRecord);
};