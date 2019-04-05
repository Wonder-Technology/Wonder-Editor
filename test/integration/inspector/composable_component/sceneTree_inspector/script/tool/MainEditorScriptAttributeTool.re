let buildState =
    (
      ~currentScript,
      ~isShowScriptAttributeGroupForAdd=false,
      ~isShowScriptAttributeGroupForChange=false,
      ~lastScriptAttributeNodeIdForAdd=None,
      ~lastScriptAttributeNodeIdForChange=None,
      ~unUsedScriptAttributeNodeIds=[||],
      (),
    )
    : MainEditorScriptAttribute.state => {
  currentScript,
  isShowScriptAttributeGroupForAdd,
  isShowScriptAttributeGroupForChange,
  lastScriptAttributeNodeIdForAdd,
  lastScriptAttributeNodeIdForChange,
  unUsedScriptAttributeNodeIds,
};

let reducer = (~action, ~state) =>
  MainEditorScriptAttribute.reducer(action, state);

let getUpdateState = (~state, ~func) => {
  let actionRef = ref(Obj.magic(-1));

  func(~send=action => {
    actionRef := action;

    ();
  });

  reducer(~action=actionRef^, ~state) |> ReactTool.getUpdateState;
};

let changeScriptAttribute =
    (
      ~currentScript,
      ~currentScriptAttributeNodeIdOpt,
      ~targetScriptAttributeNodeId,
      ~editorState=StateEditorService.getState(),
      ~engineState=StateEngineService.unsafeGetState(),
      (),
    ) =>
  MainEditorScriptAttribute.Method._changeScriptAttribute(
    currentScript,
    currentScriptAttributeNodeIdOpt,
    targetScriptAttributeNodeId,
    (editorState, engineState),
  );

let addScriptAttribute = (~script, ~send, ~languageType=LanguageType.EN, ()) =>
  MainEditorScriptAttribute.Method.addScriptAttribute(
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
  MainEditorScriptAttribute.Method._sendShowScriptAttributeGroupForChange(
    script,
    scriptAttributeNodeId,
    send,
    (editorState, engineState),
  );

let handleChangeScriptAttribute =
    (
      ~script,
      ~send,
      ~currentScriptAttributeNodeId,
      ~targetScriptAttributeNodeId,
    ) =>
  MainEditorScriptAttribute.Method.handleChangeScriptAttribute(
    script,
    (targetScriptAttributeNodeId, unUsedScriptAttributeNodeIds) =>
      send(
        MainEditorScriptAttribute.ChangeScriptAttributeForAdd(
          targetScriptAttributeNodeId,
          unUsedScriptAttributeNodeIds,
        ),
      ),
    currentScriptAttributeNodeId,
    targetScriptAttributeNodeId,
  );

let removeScriptAttribute =
    (~script, ~attributeName, ~dispatchFunc=TestTool.getDispatch(), ()) =>
  MainEditorScriptAttribute.Method._removeScriptAttribute(
    script,
    attributeName,
    dispatchFunc,
  );

let changeScriptAttributeFieldDefaultValue =
    (script, attributeName, fieldName, attribute, defaultValue, engineState) =>
  MainEditorScriptAttribute.Method._changeScriptAttributeFieldDefaultValue(
    script,
    attributeName,
    fieldName,
    attribute,
    defaultValue,
    engineState,
  );