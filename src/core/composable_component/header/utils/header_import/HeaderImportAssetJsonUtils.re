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
  |> WonderBsMost.Most.from
  |> WonderBsMost.Most.concatMap(
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
       /* TODO fix? */
       let {base64, name} =
         sources
         |> Js.Array.filter(({textureArray}) =>
              textureArray
              |> Js.Array.filter(texture => texture == textureIndex)
              |> Js.Array.length >= 1
            )
         |> ArrayService.unsafeGetFirst;
       let (newTextureIndex, engineState) =
         TextureUtils.createAndSetTextureProps(
           textureName,
           (warpS, warpT, minFilter, magFilter),
           StateEngineService.unsafeGetState(),
         );

       AssetTreeNodeUtils.handleImageType(
         (textureName, name, base64),
         (newIndex, textureParentId, newTextureIndex),
         (editorState, engineState),
       )
       |> WonderBsMost.Most.fromPromise;
     });

let handleImportAssetsJson = jsonResult => {
  let assetRecord = jsonResult |> convertDataToRecord;

  handleAssetsTexture(assetRecord);
};