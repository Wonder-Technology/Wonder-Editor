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

  let _removeNodeData =
      (node, (editorState, engineState, inspectorEngineStateOpt)) => {
    let nodeId = NodeAssetService.getNodeId(~node);

    let useTextureMaterialArray =
      AssetHeaderRemoveNodeUtils.getUseTextureMaterialArray(
        node,
        engineState,
      );

    let (editorState, engineState) =
      DisposeTreeAssetLogicService.disposeNode(
        node,
        (editorState, engineState),
      );

    let editorState =
      _isRemoveAssetTreeNode(
        nodeId,
        TreeAssetEditorService.getSelectedFolderNodeIdInAssetTree(
          editorState,
        ),
      ) ?
        editorState
        |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree :
        editorState;

    let (editorState, inspectorEngineStateOpt) =
      switch (useTextureMaterialArray, inspectorEngineStateOpt) {
      | (Some(useTextureMaterialArray), Some(inspectorEngineState)) =>
        let (editorState, inspectorEngineState) =
          AssetHeaderRemoveNodeUtils.redrawAllMaterialSetToImageDataMap(
            useTextureMaterialArray,
            engineState,
            (editorState, inspectorEngineState),
          );

        (editorState, Some(inspectorEngineState));
      | _ => (editorState, inspectorEngineStateOpt)
      };

    (editorState, engineState, inspectorEngineStateOpt);
  };

  let rec _removeNode =
          (node, (editorState, engineState, inspectorEngineStateOpt)) =>
    FolderNodeAssetService.isNode(node) ?
      FolderNodeAssetService.getChildrenNodes(node)
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. (editorState, engineState, inspectorEngineStateOpt), childNode) =>
             _removeNode(
               childNode,
               (editorState, engineState, inspectorEngineStateOpt),
             ),
           (editorState, engineState, inspectorEngineStateOpt),
         )
      |> _removeNodeData(node) :
      _removeNodeData(
        node,
        (editorState, engineState, inspectorEngineStateOpt),
      );

  let handleSelfLogic = ((uiState, dispatchFunc), (), ()) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();
    let inspectorEngineStateOpt = StateInspectorEngineService.getState();

    let (editorState, engineState, inspectorEngineStateOpt) =
      _removeNode(
        OperateTreeAssetEditorService.unsafeFindNodeById(
          editorState |> CurrentNodeIdAssetEditorService.unsafeGetCurrentNodeId,
          editorState,
        ),
        (editorState, engineState, inspectorEngineStateOpt),
      );

    inspectorEngineStateOpt
    |> Js.Option.andThen((. inspectorEngineState) =>
         (
           (editorState, inspectorEngineState)
           |> InspectorCanvasUtils.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory
           |> StateInspectorEngineService.setState
         )
         ->Some
       )
    |> ignore;

    let editorState =
      editorState |> CurrentNodeIdAssetEditorService.clearCurrentNodeId;

    StateLogicService.refreshEngineState(engineState);
    editorState |> StateEditorService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.All|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);