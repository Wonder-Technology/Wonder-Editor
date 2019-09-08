let getTextureContentIndex = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> TextureNodeAssetService.getTextureContentIndex;

let unsafeGetTextureContentIndex = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> TextureNodeAssetService.unsafeGetTextureContentIndex;

let getId = (nodeId, editorState) =>
  getTextureContentIndex(nodeId, editorState)
  |> Js.Option.map((. textureContentIndex) =>
       IMGUICustomImageTextureContentMapAssetEditorService.getId(
         textureContentIndex,
         editorState,
       )
     );

let unsafeGetId = (nodeId, editorState) =>
  IMGUICustomImageTextureContentMapAssetEditorService.getId(
    unsafeGetTextureContentIndex(nodeId, editorState),
    editorState,
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
       IMGUICustomImageTextureContentMapAssetEditorService.getId(
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
       IMGUICustomImageTextureContentMapAssetEditorService.getId(
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
                   ~expect={j|only has one|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 r |> Js.Array.length == 1
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
  |> ArrayService.unsafeGetFirst;