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

    let scriptEventFunctionName =
      ScriptEventFunctionNodeNameAssetService.getNewName()
      ->(
          OperateTreeAssetLogicService.getUniqueScriptEventFunctionNodeName(
            targetTreeNode,
            (editorState, engineState),
          )
        );

    let editorState =
      ScriptEventFunctionNodeAssetEditorService.addScriptNodeToAssetTree(
        targetTreeNode,
        ScriptEventFunctionNodeAssetService.buildNode(
          ~nodeId=newNodeId,
          ~name=scriptEventFunctionName,
          ~eventFunctionData=
            ScriptEventFunctionEngineService.createEmptyScriptEventFunctionData(),
        ),
        editorState,
      );

    editorState |> StateEditorService.setState |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);