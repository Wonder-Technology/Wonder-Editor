let enterFolder = (dispatchFunc, nodeId) => {
  FolderNodeAssetEditorService.enterFolder(nodeId)
  |> StateLogicService.getAndSetEditorState;

  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
};