let createWDBIntoInspectorCanvas = (editorState, inspectorEngineState) => {
  let editorState = StateEditorService.getState();

  let currentNodeId =
    NodeAssetService.getNodeId(
      ~node=
        OperateTreeAssetEditorService.getCurrentNode(editorState)
        |> OptionService.unsafeGet,
    );

  let wdbGameObject =
    StateEditorService.getState()
    |> OperateTreeAssetEditorService.unsafeFindNodeById(currentNodeId)
    |> WDBNodeAssetService.getWDBGameObject;
  ();
};