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
          IMGUISkinNodeAssetEditorService.addIMGUISkinNodeToAssetTree(
            targetTreeNode,
            IMGUISkinNodeAssetService.buildNode(
              ~nodeId,
              ~buttonSkinData=
                ExtendIMGUIEngineService.createDefaultButtonSkinData(),
              ~allCustomStyleData=
                ExtendIMGUIEngineService.createAllCustomStyleData(),
              ~name=
                IMGUISkinNodeNameAssetService.getNewName()
                ->(
                    OperateTreeAssetLogicService.getUniqueIMGUISkinNodeName(
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