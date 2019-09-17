let _getTextureContentIndexByNode = node =>
  node |> TextureNodeAssetService.getTextureContentIndex;

let getTextureContentIndex = (nodeId, editorState) =>
  _getTextureContentIndexByNode(
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState),
  );

let unsafeGetTextureContentIndex = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> TextureNodeAssetService.unsafeGetTextureContentIndex;

let getIdByTextureContentIndex = (textureContentIndex, editorState) =>
  IMGUICustomImageTextureContentMapAssetEditorService.getId(
    textureContentIndex,
    editorState,
  );

let unsafeGetIdByTextureContentIndex = (textureContentIndex, editorState) =>
  getIdByTextureContentIndex(textureContentIndex, editorState)
  |> OptionService.unsafeGet;

let getId = (nodeId, editorState) =>
  getTextureContentIndex(nodeId, editorState)
  |> OptionService.bind(textureContentIndex =>
       IMGUICustomImageTextureContentMapAssetEditorService.getId(
         textureContentIndex,
         editorState,
       )
     );

let unsafeGetId = (nodeId, editorState) =>
  getId(nodeId, editorState) |> OptionService.unsafeGet;

let getIdByNode = (node, editorState) =>
  _getTextureContentIndexByNode(node)
  |> OptionService.bind(textureContentIndex =>
       IMGUICustomImageTextureContentMapAssetEditorService.getId(
         textureContentIndex,
         editorState,
       )
     );

let findAllIMGUICustomImageTypeTextureNodes = editorState =>
  TextureNodeAssetEditorService.findAllTextureNodesByType(
    TextureNodeAssetService.isIMGUICustomImageType,
    editorState,
  );

let findAllIds = editorState =>
  editorState
  |> findAllIMGUICustomImageTypeTextureNodes
  |> Js.Array.map(node =>
       IMGUICustomImageTextureContentMapAssetEditorService.unsafeGetId(
         TextureNodeAssetService.unsafeGetTextureContentIndex(node),
         editorState,
       )
     );

let hasId = (id, editorState) =>
  editorState |> findAllIds |> Js.Array.includes(id);

let _findTextureComponentsByCustomImageId =
    (imguiCustomImageTypeTextureNodes, customImageId, editorState) =>
  imguiCustomImageTypeTextureNodes
  |> Js.Array.filter(node =>
       IMGUICustomImageTextureContentMapAssetEditorService.unsafeGetId(
         TextureNodeAssetService.unsafeGetTextureContentIndex(node),
         editorState,
       )
       === customImageId
     )
  |> TextureNodeAssetEditorService.getTextureComponents
  |> WonderLog.Contract.ensureCheck(
       r =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|has one at max|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 r |> Js.Array.length <= 1
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );

let findTextureComponentByCustomImageId =
    (imguiCustomImageTypeTextureNodes, customImageId, editorState) =>
  _findTextureComponentsByCustomImageId(
    imguiCustomImageTypeTextureNodes,
    customImageId,
    editorState,
  )
  |> ArrayService.getFirst;

let _removeImageByCustomImageId = (customImageId, imageNullable) =>
  (
    switch (imageNullable |> Js.Nullable.toOption) {
    | Some(imageId) when imageId !== customImageId => Some(imageId)
    | _ => None
    }
  )
  |> Js.Nullable.fromOption;

let _removeSkinDataByCustomImageId = (customImageId, nodeData) => {
  let (
        {buttonImage, hoverButtonImage, clickButtonImage}: WonderImgui.SkinType.buttonSkinData
      ) as buttonSkinData =
    IMGUISkinNodeAssetService.getButtonSkinData(nodeData);

  {
    ...buttonSkinData,
    buttonImage: _removeImageByCustomImageId(customImageId, buttonImage),
    hoverButtonImage:
      _removeImageByCustomImageId(customImageId, hoverButtonImage),
    clickButtonImage:
      _removeImageByCustomImageId(customImageId, clickButtonImage),
  }
  |> IMGUISkinNodeAssetService.setButtonSkinData(_, nodeData);
};

let removeRelatedSkinDataByCustomImageId = (customImageId, editorState) =>
  editorState
  |> IMGUISkinNodeAssetEditorService.changeSkinData(nodeData =>
       _removeSkinDataByCustomImageId(customImageId, nodeData)
     );