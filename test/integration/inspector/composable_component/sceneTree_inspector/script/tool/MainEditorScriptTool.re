let changeScriptEventFunction =
    (
      ~currentScript,
      ~currentScriptEventFunctionNodeIdOpt,
      ~targetScriptEventFunctionNodeId,
      /* ~uiState=TestTool.buildEmptyAppState(),
         ~dispatchFunc=TestTool.getDispatch(), */
      /* (), */


      ~editorState = StateEditorService.getState() ,
      ~engineState= StateEngineService.unsafeGetState() ,
      ()
    ) =>
  MainEditorScript.Method._changeScriptEventFunction(
    currentScript,
    currentScriptEventFunctionNodeIdOpt,
    targetScriptEventFunctionNodeId,
    (editorState, engineState),
  );