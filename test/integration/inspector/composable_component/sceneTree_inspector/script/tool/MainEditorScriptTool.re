let buildState =
    (
      ~currentScript,
      ~isShowScriptEventFunctionGroupForAdd=false,
      ~isShowScriptEventFunctionGroupForChange=false,
      ~lastScriptEventFunctionNodeIdForAdd=None,
      ~lastScriptEventFunctionNodeIdForChange=None,
      ~unUsedScriptEventFunctionNodeIds=[||],
      ~isShowScriptAttributeGroupForAdd=false,
      ~isShowScriptAttributeGroupForChange=false,
      ~lastScriptAttributeNodeIdForAdd=None,
      ~lastScriptAttributeNodeIdForChange=None,
      ~unUsedScriptAttributeNodeIds=[||],
      (),
    )
    : MainEditorScript.state => {
  currentScript,
  isShowScriptEventFunctionGroupForAdd,
  isShowScriptEventFunctionGroupForChange,
  lastScriptEventFunctionNodeIdForAdd,
  lastScriptEventFunctionNodeIdForChange,
  unUsedScriptEventFunctionNodeIds,
  isShowScriptAttributeGroupForAdd,
  isShowScriptAttributeGroupForChange,
  lastScriptAttributeNodeIdForAdd,
  lastScriptAttributeNodeIdForChange,
  unUsedScriptAttributeNodeIds,
};

let reducer = (~action, ~state) => MainEditorScript.reducer(action, state);

let getUpdateState = (~state, ~func) => {
  let actionRef = ref(Obj.magic(-1));

  func(~send=action => {
    actionRef := action;

    ();
  });

  reducer(~action=actionRef^, ~state) |> ReactTool.getUpdateState;
};

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

let addScriptEventFunction =
    (~script, ~send, ~languageType=LanguageType.EN, ()) =>
  MainEditorScript.Method.addScriptEventFunction(
    languageType,
    (buildState(~currentScript=script, ()), send),
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
  MainEditorScript.Method.handleChangeScriptEventFunction(
    script,
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

let removeScriptEventFunction =
    (~script, ~eventFunctionName, ~dispatchFunc=TestTool.getDispatch(), ()) =>
  MainEditorScript.Method._removeScriptEventFunction(
    script,
    eventFunctionName,
    dispatchFunc,
  );

let changeScriptAttribute =
    (
      ~currentScript,
      ~currentScriptAttributeNodeIdOpt,
      ~targetScriptAttributeNodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  MainEditorScript.Method._changeScriptAttribute(
    currentScript,
    currentScriptAttributeNodeIdOpt,
    targetScriptAttributeNodeId,
    (editorState, engineState),
  );

let addScriptAttribute = (~script, ~send, ~languageType=LanguageType.EN, ()) =>
  MainEditorScript.Method.addScriptAttribute(
    languageType,
    (buildState(~currentScript=script, ()), send),
  );

let sendShowScriptAttributeGroupForChange =
    (
      ~send,
      ~script,
      ~scriptAttributeNodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  MainEditorScript.Method._sendShowScriptAttributeGroupForChange(
    script,
    scriptAttributeNodeId,
    send,
    (editorState, engineState),
  );

let getUnUsedScriptAttributeNodeIds = (script, (editorState, engineState)) =>
  MainEditorScript.Method._getUnUsedScriptAttributeNodes(
    script,
    (editorState, engineState),
  )
  |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

let getScriptAllAttributeNodeIds = (script, (editorState, engineState)) =>
  ScriptEngineService.getScriptAllAttributeEntries(script, engineState)
  |> Js.Array.map(((name, attributeData)) =>
       OperateTreeAssetLogicService.findNodeIdByName(
         name,
         (editorState, engineState),
       )
       |> OptionService.unsafeGet
     );

let handleChangeScriptAttribute =
    (
      ~script,
      ~send,
      ~currentScriptAttributeNodeId,
      ~targetScriptAttributeNodeId,
    ) =>
  MainEditorScript.Method.handleChangeScriptAttribute(
    script,
    (targetScriptAttributeNodeId, unUsedScriptAttributeNodeIds) =>
      send(
        MainEditorScript.ChangeScriptAttributeForAdd(
          targetScriptAttributeNodeId,
          unUsedScriptAttributeNodeIds,
        ),
      ),
    currentScriptAttributeNodeId,
    targetScriptAttributeNodeId,
  );

let removeScriptAttribute =
    (~script, ~attributeName, ~dispatchFunc=TestTool.getDispatch(), ()) =>
  MainEditorScript.Method._removeScriptAttribute(
    script,
    attributeName,
    dispatchFunc,
  );

let changeScriptAttributeFieldDefaultValue =
    (script, attributeName, fieldName, attribute, defaultValue, engineState) =>
  MainEditorScript.Method._changeScriptAttributeFieldDefaultValue(
    script,
    attributeName,
    fieldName,
    attribute,
    defaultValue,
    engineState,
  );