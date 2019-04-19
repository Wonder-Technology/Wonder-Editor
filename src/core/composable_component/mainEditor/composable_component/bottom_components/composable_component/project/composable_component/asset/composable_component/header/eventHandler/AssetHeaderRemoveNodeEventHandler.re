open Js.Promise;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let _isRemoveAssetTreeNode =
      (currentNodeId, selectedFolderNodeIdInAssetTree) =>
    NodeAssetService.isIdEqual(
      currentNodeId,
      selectedFolderNodeIdInAssetTree,
    );

  let handleSelfLogic = ((uiState, dispatchFunc), (), ()) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let currentNodeId =
      editorState |> CurrentNodeIdAssetEditorService.unsafeGetCurrentNodeId;
    let currentNode =
      OperateTreeAssetEditorService.unsafeFindNodeById(
        currentNodeId,
        editorState,
      );
    let useTextureMaterialArray =
      AssetHeaderRemoveNodeUtils.getUseTextureMaterialArray(
        currentNode,
        engineState,
      );

    let (editorState, engineState) =
      DisposeTreeAssetLogicService.disposeNode(
        currentNode,
        (editorState, engineState),
      );

    StateLogicService.refreshEngineState(engineState);

    let editorState =
      _isRemoveAssetTreeNode(
        currentNodeId,
        TreeAssetEditorService.getSelectedFolderNodeIdInAssetTree(
          editorState,
        ),
      ) ?
        editorState
        |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
        |> CurrentNodeIdAssetEditorService.clearCurrentNodeId :
        editorState |> CurrentNodeIdAssetEditorService.clearCurrentNodeId;

    editorState |> StateEditorService.setState |> ignore;

    switch (useTextureMaterialArray) {
    | None => ()
    | Some(useTextureMaterialArray) =>
      let engineState = StateEngineService.unsafeGetState();

      let (editorState, inspectorEngineState) =
        AssetHeaderRemoveNodeUtils.redrawAllMaterialSetToImageDataMap(
          useTextureMaterialArray,
          engineState,
          (
            StateEditorService.getState(),
            StateInspectorEngineService.unsafeGetState(),
          ),
        );

      (editorState, inspectorEngineState)
      |> AssetTreeInspectorUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
      |> StateInspectorEngineService.setState
      |> ignore;

      editorState |> StateEditorService.setState |> ignore;
    };

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);