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

  let _changeScriptAttribute =
      (
        currentScript,
        currentScriptAttributeNodeIdOpt,
        targetScriptAttributeNodeId,
        (editorState, engineState),
      ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|targetScriptAttributeNodeId not be used|j},
                  ~actual={j|be used|j},
                ),
                () => {
                  let (name, _) =
                    ScriptAttributeNodeAssetEditorService.getNameAndAttribute(
                      targetScriptAttributeNodeId,
                      editorState,
                    );

                  ScriptEngineService.hasScriptAttributeData(
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

    let (targetName, targetAttribute) =
      ScriptAttributeNodeAssetEditorService.getNameAndAttribute(
        targetScriptAttributeNodeId,
        editorState,
      );

    switch (currentScriptAttributeNodeIdOpt) {
    | None =>
      ScriptEngineService.addScriptAttribute(
        currentScript,
        targetName,
        targetAttribute,
        engineState,
      )
    | Some(currentScriptAttributeNodeId) =>
      let (sourceName, _) =
        ScriptAttributeNodeAssetEditorService.getNameAndAttribute(
          currentScriptAttributeNodeId,
          editorState,
        );

      ScriptEngineService.replaceScriptAttribute(
        currentScript,
        (sourceName, targetName),
        targetAttribute,
        engineState,
      );
    };
  };

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        sendFunc,
        (script, currentScriptAttributeNodeId, targetScriptAttributeNodeId),
      ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect={j|currentScriptAttributeNodeId|j},
                  ~actual={j|not|j},
                ),
                () =>
                currentScriptAttributeNodeId |> assertExist
              )
            )
          )
        ),
      StateEditorService.getStateIsDebug(),
    );

    MainEditorScriptUtils.isNodeIdEqual(
      currentScriptAttributeNodeId,
      targetScriptAttributeNodeId,
    ) ?
      () :
      {
        _changeScriptAttribute(
          script,
          currentScriptAttributeNodeId,
          targetScriptAttributeNodeId,
        )
        |> StateLogicService.getStateToGetData
        |> StateEngineService.setState;

        sendFunc(
          targetScriptAttributeNodeId,
          MainEditorScriptAttributeUtils.getUnUsedScriptAttributeNodeIds(
            script,
          )
          |> StateLogicService.getStateToGetData,
        );
      };
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);