let buildState =
    (
      ~currentScript,
      ~isShowScriptEventFunctionGroupForAdd=false,
      ~isShowScriptEventFunctionGroupForChange=false,
      ~lastScriptEventFunctionNodeIdForAdd=None,
      ~lastScriptEventFunctionNodeIdForChange=None,
      ~unUsedScriptEventFunctionNodeIds=[||],
      (),
    )
    : MainEditorScriptEventFunction.state => {
  currentScript,
  isShowScriptEventFunctionGroupForAdd,
  isShowScriptEventFunctionGroupForChange,
  lastScriptEventFunctionNodeIdForAdd,
  lastScriptEventFunctionNodeIdForChange,
  unUsedScriptEventFunctionNodeIds,
};

let reducer = (~action, ~state) =>
  MainEditorScriptEventFunction.reducer(action, state);

let getUpdateState = (~state, ~func) => {
  let actionRef = ref(Obj.magic(-1));

  func(~send=action => {
    actionRef := action;

    ();
  });

  reducer(~action=actionRef^, ~state) |> ReactTool.getUpdateState;
};

/* let changeScriptEventFunction =
     (
       ~currentScript,
       ~currentScriptEventFunctionNodeIdOpt,
       ~targetScriptEventFunctionNodeId,
       ~editorState=StateEditorService.getState(),
       ~engineState=StateEngineService.unsafeGetState(),
       (),
     ) =>
   MainEditorScriptEventFunction.Method._changeScriptEventFunction(
     currentScript,
     currentScriptEventFunctionNodeIdOpt,
     targetScriptEventFunctionNodeId,
     (editorState, engineState),
   ); */

let addScriptEventFunction =
    (
      ~script,
      ~send,
      ~languageType=LanguageType.EN,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorScriptEventFunction.Method.addScriptEventFunction(
    (uiState, dispatchFunc),
    (
      languageType,
      (lastScriptEventFunctionNodeIdForAdd, unUsedScriptEventFunctionNodeIds) =>
        send(
          MainEditorScriptEventFunction.ShowScriptEventFunctionGroupForAdd(
            lastScriptEventFunctionNodeIdForAdd,
            unUsedScriptEventFunctionNodeIds,
          ),
        ),
    ),
    script,
  );

let sendShowScriptEventFunctionGroupForChange =
    (
      ~send,
      ~script,
      ~scriptEventFunctionNodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  MainEditorScriptEventFunction.Method._sendShowScriptEventFunctionGroupForChange(
    script,
    scriptEventFunctionNodeId,
    send,
    (editorState, engineState),
  );

let getUnUsedScriptEventFunctionNodeIds =
    (script, (editorState, engineState)) =>
  MainEditorScriptEventFunctionUtils.getUnUsedScriptEventFunctionNodes(
    script,
    (editorState, engineState),
  )
  |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

let handleChangeScriptEventFunction =
    (
      ~script,
      ~send,
      ~currentScriptEventFunctionNodeId,
      ~targetScriptEventFunctionNodeId,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorScriptEventFunction.Method.handleChangeScriptEventFunction(
    (uiState, dispatchFunc),
    (targetScriptEventFunctionNodeId, unUsedScriptEventFunctionNodeIds) =>
      send(
        MainEditorScriptEventFunction.ChangeScriptEventFunctionForAdd(
          targetScriptEventFunctionNodeId,
          unUsedScriptEventFunctionNodeIds,
        ),
      ),
    (
      script,
      currentScriptEventFunctionNodeId,
      targetScriptEventFunctionNodeId,
    ),
  );

let removeScriptEventFunction =
    (
      ~script,
      ~eventFunctionName,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorScriptEventFunction.Method._removeScriptEventFunction(
    (uiState, dispatchFunc),
    (),
    (script, eventFunctionName),
  );