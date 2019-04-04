let changeScriptEventFunction =
    (
      ~currentScript,
      ~currentScriptEventFunctionNodeIdOpt,
      ~targetScriptEventFunctionNodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  MainEditorScript.Method._changeScriptEventFunction(
    currentScript,
    currentScriptEventFunctionNodeIdOpt,
    targetScriptEventFunctionNodeId,
    (editorState, engineState),
  );

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
    : MainEditorScript.state => {
  isShowScriptEventFunctionGroupForAdd,
  isShowScriptEventFunctionGroupForChange,
  currentScript,
  lastScriptEventFunctionNodeIdForAdd,
  lastScriptEventFunctionNodeIdForChange,
  unUsedScriptEventFunctionNodeIds,
};

let reducer = (~action, ~state) => MainEditorScript.reducer(action, state);

let addScriptEventFunction =
    (~script, ~send, ~languageType=LanguageType.EN, ()) =>
  MainEditorScript.Method.addScriptEventFunction(
    languageType,
    (buildState(~currentScript=script, ()), send),
  );

let getUpdateState = (~state, ~func) => {
  let actionRef = ref(Obj.magic(-1));

  func(~send=action => {
    actionRef := action;

    ();
  });

  reducer(~action=actionRef^, ~state) |> ReactTool.getUpdateState;
};

let sendShowScriptEventFunctionGroupForChange =
    (
      ~send,
      ~script,
      ~scriptEventFunctionNodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  MainEditorScript.Method._sendShowScriptEventFunctionGroupForChange(
    script,
    scriptEventFunctionNodeId,
    send,
    (editorState, engineState),
  );

let getUnUsedScriptEventFunctionNodeIds =
    (script, (editorState, engineState)) =>
  MainEditorScript.Method._getUnUsedScriptEventFunctionNodes(
    script,
    (editorState, engineState),
  )
  |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

let getScriptAllEventFunctionNodeIds = (script, (editorState, engineState)) =>
  ScriptEngineService.getScriptAllEventFunctionEntries(script, engineState)
  |> Js.Array.map(((name, eventFunctionData)) =>
       OperateTreeAssetLogicService.findNodeIdByName(
         name,
         (editorState, engineState),
       )
       |> OptionService.unsafeGet
     );

let handleChangeScriptEventFunction =
    (
      ~script,
      ~send,
      ~currentScriptEventFunctionNodeId,
      ~targetScriptEventFunctionNodeId,
    ) =>
  MainEditorScript.Method._handleChangeScriptEventFunction(
    script,
    /* send, */
    (targetScriptEventFunctionNodeId, unUsedScriptEventFunctionNodeIds) =>
      send(
        MainEditorScript.ChangeScriptEventFunctionForAdd(
          targetScriptEventFunctionNodeId,
          unUsedScriptEventFunctionNodeIds,
        ),
      ),
    currentScriptEventFunctionNodeId,
    targetScriptEventFunctionNodeId,
  );