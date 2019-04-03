module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), ()) => {
    let engineState = StateEngineService.unsafeGetState();
    let (editorState, newNodeId) =
      IdAssetEditorService.generateNodeId |> StateLogicService.getEditorState;
    let targetTreeNode =
      editorState
      |> OperateTreeAssetEditorService.unsafeGetSelectedFolderNodeInAssetTree;

    let scriptAttributeName =
      ScriptAttributeNodeNameAssetService.getNewAttributeName()
      ->(
          OperateTreeAssetLogicService.getUniqueScriptAttributeNodeName(
            targetTreeNode,
            (editorState, engineState),
          )
        );

    let editorState =
      ScriptAttributeNodeAssetEditorService.addScriptAttributeNodeToAssetTree(
        targetTreeNode,
        ScriptAttributeNodeAssetService.buildNode(
          ~nodeId=newNodeId,
          ~name=scriptAttributeName,
          ~attribute=ScriptAttributeEngineService.createScriptAttribute(),
        ),
        editorState,
      );

    editorState |> StateEditorService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);