open MainEditorLightType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple =
    (NodeAssetType.nodeId, array(NodeAssetType.nodeId)) => unit;
  type dataTuple = (
    Wonderjs.ScriptType.script,
    option(NodeAssetType.nodeId),
    NodeAssetType.nodeId,
  );
  type return = unit;

  let _changeScriptEventFunction =
      (
        currentScript,
        currentScriptEventFunctionNodeIdOpt,
        targetScriptEventFunctionNodeId,
        (editorState, engineState),
      ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|targetScriptEventFunctionNodeId not be used|j},
                  ~actual={j|be used|j},
                ),
                () => {
                  let (name, _) =
                    ScriptEventFunctionNodeAssetEditorService.getNameAndData(
                      targetScriptEventFunctionNodeId,
                      editorState,
                    );

                  ScriptEngineService.hasScriptEventFunctionData(
                    currentScript,
                    name,
                    engineState,
                  )
                  |> assertFalse;
                },
              )
            )
          )
        ),
      StateEditorService.getStateIsDebug(),
    );

    let (targetName, targetEventFunction) =
      ScriptEventFunctionNodeAssetEditorService.getNameAndData(
        targetScriptEventFunctionNodeId,
        editorState,
      );

    switch (currentScriptEventFunctionNodeIdOpt) {
    | None =>
      ScriptEngineService.addScriptEventFunctionData(
        currentScript,
        targetName,
        targetEventFunction,
        engineState,
      )
    | Some(currentScriptEventFunctionNodeId) =>
      let (sourceName, _) =
        ScriptEventFunctionNodeAssetEditorService.getNameAndData(
          currentScriptEventFunctionNodeId,
          editorState,
        );

      ScriptEngineService.replaceScriptEventFunctionData(
        currentScript,
        (sourceName, targetName),
        targetEventFunction,
        engineState,
      );
    };
  };

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        sendFunc,
        (
          script,
          currentScriptEventFunctionNodeId,
          targetScriptEventFunctionNodeId,
        ),
      ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|currentScriptEventFunctionNodeId|j},
                  ~actual={j|not|j},
                ),
                () =>
                currentScriptEventFunctionNodeId |> assertExist
              )
            )
          )
        ),
      StateEditorService.getStateIsDebug(),
    );

    MainEditorScriptUtils.isNodeIdEqual(
      currentScriptEventFunctionNodeId,
      targetScriptEventFunctionNodeId,
    ) ?
      () :
      {
        _changeScriptEventFunction(
          script,
          currentScriptEventFunctionNodeId,
          targetScriptEventFunctionNodeId,
        )
        |> StateLogicService.getStateToGetData
        |> StateEngineService.setState;

        sendFunc(
          targetScriptEventFunctionNodeId,
          MainEditorScriptEventFunctionUtils.getUnUsedScriptEventFunctionNodeIds(
            script,
          )
          |> StateLogicService.getStateToGetData,
        );
      };
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);