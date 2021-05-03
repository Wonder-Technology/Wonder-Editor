module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((uiState, dispatchFunc), (), ()) => {
    (
      editorState => {
        let engineState = StateEngineService.unsafeGetState();

        let (editorState, nodeId) =
          IdAssetEditorService.generateNodeId(editorState);

        let targetTreeNode =
          editorState
          |> OperateTreeAssetEditorService.unsafeGetSelectedFolderNodeInAssetTree;

        let editorState =
          IMGUIExecFuncDataNodeAssetEditorService.addIMGUIExecFuncDataNodeToAssetTree(
            targetTreeNode,
            IMGUIExecFuncDataNodeAssetService.buildNode(
              ~nodeId,
              ~execOrder=0,
              ~execFunc=ExecIMGUIEngineService.createEmptyExecFunc(),
              ~name=
                IMGUIExecFuncDataNodeNameAssetService.getNewName()
                ->(
                    OperateTreeAssetLogicService.getUniqueIMGUIExecFuncDataNodeName(
                      targetTreeNode,
                      (editorState, engineState),
                    )
                  ),
            ),
            editorState,
          );

        editorState;
      }
    )
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);