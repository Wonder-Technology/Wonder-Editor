type state = {
  currentScript: Wonderjs.ScriptType.script,
  isShowScriptEventFunctionGroupForAdd: bool,
  isShowScriptEventFunctionGroupForChange: bool,
  lastScriptEventFunctionNodeIdForAdd: option(int),
  lastScriptEventFunctionNodeIdForChange: option(int),
  unUsedScriptEventFunctionNodeIds: array(NodeAssetType.nodeId),
};

type action =
  | ChangeScriptEventFunctionForAdd(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | ChangeScriptEventFunctionForChange(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | ShowScriptEventFunctionGroupForAdd(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | ShowScriptEventFunctionGroupForChange(
      NodeAssetType.nodeId,
      array(NodeAssetType.nodeId),
    )
  | HideScriptEventFunctionGroupForAdd
  | HideScriptEventFunctionGroupForChange;

module Method = {
  let _sendShowScriptEventFunctionGroupForChange =
      (
        currentScript,
        scriptEventFunctionNodeId,
        send,
        (editorState, engineState),
      ) =>
    send(
      ShowScriptEventFunctionGroupForChange(
        scriptEventFunctionNodeId,
        MainEditorScriptEventFunctionUtils.getUnUsedScriptEventFunctionNodeIds(
          currentScript,
          (editorState, engineState),
        ),
      ),
    );

  let _removeScriptEventFunction = ScriptRemoveScriptEventFunctionEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let renderScriptAllEventFunctions =
      (
        (uiState, dispatchFunc),
        languageType,
        {state, send}: ReasonReact.self('a, 'b, 'c),
      ) => {
    let {currentScript} = state;

    let unUsedScriptEventFunctionNodeIds =
      MainEditorScriptEventFunctionUtils.getUnUsedScriptEventFunctionNodeIds(
        currentScript,
      )
      |> StateLogicService.getStateToGetData;

    ScriptEngineService.getScriptAllEventFunctionEntries(currentScript)
    |> StateLogicService.getEngineStateToGetData
    |> Js.Array.map(((name, attribute)) => {
         let scriptEventFunctionNodeId =
           OperateTreeAssetLogicService.findNodeIdByName(name)
           |> StateLogicService.getStateToGetData
           |> OptionService.unsafeGet;

         <div
           key={DomHelper.getRandomKey()} className="wonder-script-function">
           <div className="component-header">
             <div className="header-title">
               {DomHelper.textEl("Script Function")}
             </div>
             <div className="header-close">
               <img
                 src="./public/img/close.png"
                 onClick={
                   _e =>
                     _removeScriptEventFunction(
                       (uiState, dispatchFunc),
                       (),
                       (currentScript, name),
                     )
                 }
               />
             </div>
           </div>
           <SelectAssetGroupBar
             headerText="Name"
             headerTitle={
               LanguageUtils.getInspectorLanguageDataByType(
                 "script-use-scriptEventFunction-describe",
                 languageType,
               )
             }
             assetText=name
             selectAssetFunc={
               send =>
                 _sendShowScriptEventFunctionGroupForChange(
                   currentScript,
                   scriptEventFunctionNodeId,
                   send,
                 )
                 |> StateLogicService.getStateToGetData
             }
             sendFunc=send
           />
         </div>;
       });
  };

  let sortScriptEventFunctionNodeIds = scriptEventFunctionNodeIds =>
    scriptEventFunctionNodeIds |> Js.Array.sortInPlace;

  let handleChangeScriptEventFunction = ScriptChangeScriptEventFunctionEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let addScriptEventFunction = ScriptAddScriptEventFunctionEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let getAllScriptEventFunctions =
      (currentScriptEventFunctionNodeId, unUsedScriptEventFunctionNodeIds) =>
    ArrayService.fastConcat(
      [|currentScriptEventFunctionNodeId |> OptionService.unsafeGet|],
      unUsedScriptEventFunctionNodeIds,
    )
    |> sortScriptEventFunctionNodeIds;

  let isScriptEventFunction =
      (currentScriptEventFunctionNodeId, scriptEventFunctionNodeId) =>
    MainEditorScriptUtils.isNodeIdEqual(
      currentScriptEventFunctionNodeId,
      scriptEventFunctionNodeId,
    );

  let getSelectScriptEventFunctionGroupWidgetText = scriptEventFunctionNodeId =>
    OperateTreeAssetLogicService.unsafeGetNodeNameById(
      scriptEventFunctionNodeId,
    )
    |> StateLogicService.getStateToGetData;
};

let component = ReasonReact.reducerComponent("MainEditorScriptEventFunction");

let reducer = (action, state) =>
  switch (action) {
  | ChangeScriptEventFunctionForAdd(
      targetScriptEventFunctionNodeId,
      unUsedScriptEventFunctionNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      lastScriptEventFunctionNodeIdForAdd:
        Some(targetScriptEventFunctionNodeId),
      unUsedScriptEventFunctionNodeIds,
    })
  | ChangeScriptEventFunctionForChange(
      targetScriptEventFunctionNodeId,
      unUsedScriptEventFunctionNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      lastScriptEventFunctionNodeIdForChange:
        Some(targetScriptEventFunctionNodeId),
      unUsedScriptEventFunctionNodeIds,
    })
  | ShowScriptEventFunctionGroupForAdd(
      lastScriptEventFunctionNodeIdForAdd,
      unUsedScriptEventFunctionNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      isShowScriptEventFunctionGroupForAdd: true,
      lastScriptEventFunctionNodeIdForAdd:
        Some(lastScriptEventFunctionNodeIdForAdd),
      unUsedScriptEventFunctionNodeIds,
    })
  | ShowScriptEventFunctionGroupForChange(
      lastScriptEventFunctionNodeIdForChange,
      unUsedScriptEventFunctionNodeIds,
    ) =>
    ReasonReact.Update({
      ...state,
      isShowScriptEventFunctionGroupForChange: true,
      lastScriptEventFunctionNodeIdForChange:
        Some(lastScriptEventFunctionNodeIdForChange),
      unUsedScriptEventFunctionNodeIds,
    })
  | HideScriptEventFunctionGroupForAdd =>
    ReasonReact.Update({
      ...state,
      isShowScriptEventFunctionGroupForAdd: false,
      lastScriptEventFunctionNodeIdForAdd: None,
    })
  | HideScriptEventFunctionGroupForChange =>
    ReasonReact.Update({
      ...state,
      isShowScriptEventFunctionGroupForChange: false,
      lastScriptEventFunctionNodeIdForChange: None,
    })
  };

let render =
    (
      (uiState, dispatchFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article
    key="MainEditorScriptFunction" className="wonder-inspector-scriptFunction">
    <div className="inspector-component">
      <div
        className="component-title"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "mesh-render-describe",
            languageType,
          )
        }>
        {DomHelper.textEl("Script Function Group")}
      </div>
      <hr />
      <div className="component-content">
        {
          ReasonReact.array(
            Method.renderScriptAllEventFunctions(
              (uiState, dispatchFunc),
              languageType,
              self,
            ),
          )
        }
        <button
          className="addable-btn"
          onClick={
            _e =>
              Method.addScriptEventFunction(
                (uiState, dispatchFunc),
                (
                  languageType,
                  (
                    lastScriptEventFunctionNodeIdForAdd,
                    unUsedScriptEventFunctionNodeIds,
                  ) =>
                    send(
                      ShowScriptEventFunctionGroupForAdd(
                        lastScriptEventFunctionNodeIdForAdd,
                        unUsedScriptEventFunctionNodeIds,
                      ),
                    ),
                ),
                state.currentScript,
              )
          }>
          {
            DomHelper.textEl(
              LanguageUtils.getInspectorLanguageDataByType(
                "script-add-scriptEventFunction",
                languageType,
              ),
            )
          }
        </button>
      </div>
    </div>
    {
      state.isShowScriptEventFunctionGroupForAdd ?
        <SelectAssetGroupWidget
          headerText="Add Script Event Function"
          sendFunc=send
          clickHideGroupButtonFunc={
            send => send(HideScriptEventFunctionGroupForAdd)
          }
          findAllAssetRelatedDataFunc={
            () =>
              Method.getAllScriptEventFunctions(
                state.lastScriptEventFunctionNodeIdForAdd,
                state.unUsedScriptEventFunctionNodeIds,
              )
          }
          isCurrentAssetFunc={
            scriptEventFunctionNodeId => {
              let currentScriptEventFunctionNodeId =
                state.lastScriptEventFunctionNodeIdForAdd;

              Method.isScriptEventFunction(
                currentScriptEventFunctionNodeId,
                scriptEventFunctionNodeId,
              );
            }
          }
          changeAssetFunc={
            (scriptEventFunctionNodeId, send) => {
              let currentScriptEventFunctionNodeId =
                state.lastScriptEventFunctionNodeIdForAdd;

              Method.handleChangeScriptEventFunction(
                (uiState, dispatchFunc),
                (
                  targetScriptEventFunctionNodeId,
                  unUsedScriptEventFunctionNodeIds,
                ) =>
                  send(
                    ChangeScriptEventFunctionForAdd(
                      targetScriptEventFunctionNodeId,
                      unUsedScriptEventFunctionNodeIds,
                    ),
                  ),
                (
                  state.currentScript,
                  currentScriptEventFunctionNodeId,
                  scriptEventFunctionNodeId,
                ),
              );
            }
          }
          getTextFunc=Method.getSelectScriptEventFunctionGroupWidgetText
        /> :
        ReasonReact.null
    }
    {
      state.isShowScriptEventFunctionGroupForChange ?
        <SelectAssetGroupWidget
          headerText="Change Script Event Function"
          sendFunc=send
          clickHideGroupButtonFunc={
            send => send(HideScriptEventFunctionGroupForChange)
          }
          findAllAssetRelatedDataFunc={
            () =>
              Method.getAllScriptEventFunctions(
                state.lastScriptEventFunctionNodeIdForChange,
                state.unUsedScriptEventFunctionNodeIds,
              )
          }
          isCurrentAssetFunc={
            scriptEventFunctionNodeId => {
              let currentScriptEventFunctionNodeId =
                state.lastScriptEventFunctionNodeIdForChange;

              Method.isScriptEventFunction(
                currentScriptEventFunctionNodeId,
                scriptEventFunctionNodeId,
              );
            }
          }
          changeAssetFunc={
            (scriptEventFunctionNodeId, send) => {
              let currentScriptEventFunctionNodeId =
                state.lastScriptEventFunctionNodeIdForChange;

              Method.handleChangeScriptEventFunction(
                (uiState, dispatchFunc),
                (
                  targetScriptEventFunctionNodeId,
                  unUsedScriptEventFunctionNodeIds,
                ) =>
                  send(
                    ChangeScriptEventFunctionForChange(
                      targetScriptEventFunctionNodeId,
                      unUsedScriptEventFunctionNodeIds,
                    ),
                  ),
                (
                  state.currentScript,
                  currentScriptEventFunctionNodeId,
                  scriptEventFunctionNodeId,
                ),
              );
            }
          }
          getTextFunc=Method.getSelectScriptEventFunctionGroupWidgetText
        /> :
        ReasonReact.null
    }
  </article>;
};

let make = (~uiState, ~dispatchFunc, ~script, _children) => {
  ...component,
  initialState: () => {
    currentScript: script,
    isShowScriptEventFunctionGroupForAdd: false,
    isShowScriptEventFunctionGroupForChange: false,
    lastScriptEventFunctionNodeIdForAdd: None,
    lastScriptEventFunctionNodeIdForChange: None,
    unUsedScriptEventFunctionNodeIds:
      WonderCommonlib.ArrayService.createEmpty(),
  },
  reducer,
  render: self => render((uiState, dispatchFunc), self),
};