type state = {
  isShowScriptEventFunctionGroupForAdd: bool,
  isShowScriptEventFunctionGroupForChange: bool,
  currentScript: Wonderjs.ScriptType.script,
  lastScriptEventFunctionNodeIdForAdd: option(int),
  lastScriptEventFunctionNodeIdForChange: option(int),
  unUsedScriptEventFunctionNodeIds: array(NodeAssetType.nodeId),
};

type action =
  | ChangeScriptEventFunctionForAdd(NodeAssetType.nodeId)
  | ChangeScriptEventFunctionForChange(NodeAssetType.nodeId)
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

    let (targetName, targetEventFunctionData) =
      ScriptEventFunctionNodeAssetEditorService.getNameAndData(
        targetScriptEventFunctionNodeId,
        editorState,
      );

    switch (currentScriptEventFunctionNodeIdOpt) {
    | None =>
      ScriptEngineService.addScriptEventFunctionData(
        currentScript,
        targetName,
        targetEventFunctionData,
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
        targetEventFunctionData,
        engineState,
      );
    };
  };

  let _isNodeIdEqual = (currentNodeIdOpt, targetNodeId) =>
    switch (currentNodeIdOpt) {
    | None => false
    | Some(currentNodeId) =>
      NodeAssetService.isIdEqual(currentNodeId, targetNodeId)
    };

  let _getUnUsedScriptEventFunctionNodes =
      (script, (editorState, engineState)) => {
    let allScriptEventFunctionNodes =
      ScriptEventFunctionNodeAssetEditorService.findAllScriptEventFunctionNodes(
        editorState,
      );

    let allEventFunctionNames =
      ScriptEngineService.getScriptAllEventFunctionEntries(
        script,
        engineState,
      )
      |> Js.Array.map(((eventFunctionName, _)) => eventFunctionName);

    ArrayService.excludeWithFunc(
      ScriptEngineService.getScriptAllEventFunctionEntries(
        script,
        engineState,
      ),
      (scriptAllEventFunctionEntries, scriptEventFunctionNode) =>
        allEventFunctionNames
        |> Js.Array.includes(
             ScriptEventFunctionNodeAssetService.getNodeName(
               scriptEventFunctionNode,
             ),
           ),
      allScriptEventFunctionNodes,
    );
  };

  /* TODO refactor: extract select asset ui component(e.g. select scriptEventFunction/geometry) */
  let renderScriptAllEventFunctions =
      (languageType, {state, send}: ReasonReact.self('a, 'b, 'c)) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let {currentScript} = state;

    let unUsedScriptEventFunctionNodeIds =
      _getUnUsedScriptEventFunctionNodes(
        currentScript,
        (editorState, engineState),
      )
      |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

    ScriptEngineService.getScriptAllEventFunctionEntries(
      currentScript,
      engineState,
    )
    |> Js.Array.map(((name, eventFunctionData)) => {
         let scriptEventFunctionNodeId =
           OperateTreeAssetLogicService.findNodeIdByName(
             name,
             (editorState, engineState),
           )
           |> OptionService.unsafeGet;

         <div key={DomHelper.getRandomKey()} className="inspector-item">
           <div
             className="item-header"
             title={
               LanguageUtils.getInspectorLanguageDataByType(
                 "script-use-scriptEventFunction-describe",
                 languageType,
               )
             }>
             {DomHelper.textEl("ScriptEventFunction")}
           </div>
           <div className="item-content">
             <div className="inspector-select">
               <div
                 className="select-name"
                 onClick={
                   _e =>
                     send(
                       ShowScriptEventFunctionGroupForChange(
                         scriptEventFunctionNodeId,
                         unUsedScriptEventFunctionNodeIds,
                       ),
                     )
                 }>
                 {DomHelper.textEl(name)}
               </div>
               <div
                 className="select-img"
                 onClick={
                   _e =>
                     send(
                       ShowScriptEventFunctionGroupForChange(
                         scriptEventFunctionNodeId,
                         unUsedScriptEventFunctionNodeIds,
                       ),
                     )
                 }>
                 <img src="./public/img/select.png" />
               </div>
             </div>
           </div>
         </div>;
       });
  };

  let showScriptEventFunctionAssets =
      (
        unUsedScriptEventFunctionNodeIds,
        /* isNodeIdEqualFunc, */
        currentScriptEventFunctionNodeId,
        changeScriptEventFunctionFunc,
      ) =>
    unUsedScriptEventFunctionNodeIds
    |> Js.Array.map(scriptEventFunctionNodeId => {
         let className =
           _isNodeIdEqual(
             currentScriptEventFunctionNodeId,
             scriptEventFunctionNodeId,
           ) ?
             "select-item-content select-item-active" : "select-item-content";

         <div
           className
           key={DomHelper.getRandomKey()}
           onClick={
             _e =>
               changeScriptEventFunctionFunc(
                 currentScriptEventFunctionNodeId,
                 scriptEventFunctionNodeId,
               )
           }>
           {
             DomHelper.textEl(
               OperateTreeAssetLogicService.unsafeGetNodeNameById(
                 scriptEventFunctionNodeId,
               )
               |> StateLogicService.getStateToGetData,
             )
           }
         </div>;
       });

  let _handleChangeScriptEventFunction =
      (
        state,
        sendFunc,
        currentScriptEventFunctionNodeId,
        targetScriptEventFunctionNodeId,
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

    _isNodeIdEqual(
      currentScriptEventFunctionNodeId,
      targetScriptEventFunctionNodeId,
    ) ?
      () :
      {
        _changeScriptEventFunction(
          state.currentScript,
          currentScriptEventFunctionNodeId,
          targetScriptEventFunctionNodeId,
        )
        |> StateLogicService.getStateToGetData
        |> StateEngineService.setState;

        sendFunc(targetScriptEventFunctionNodeId);
      };
  };

  let renderScriptEventFunctionGroupForChange =
      ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    <div className="select-component-content">
      <div className="select-component-item">
        <div className="select-item-header">
          {DomHelper.textEl("Script Event Function")}
        </div>
        <div className="select-item-body">
          {
            ReasonReact.array(
              showScriptEventFunctionAssets(
                state.unUsedScriptEventFunctionNodeIds,
                state.lastScriptEventFunctionNodeIdForChange,
                _handleChangeScriptEventFunction(
                  state, targetScriptEventFunctionNodeId =>
                  send(
                    ChangeScriptEventFunctionForChange(
                      targetScriptEventFunctionNodeId,
                    ),
                  )
                ),
              ),
            )
          }
        </div>
      </div>
      <div
        className="select-component-bg"
        onClick={_e => send(HideScriptEventFunctionGroupForChange)}
      />
    </div>;

  let renderScriptEventFunctionGroupForAdd =
      ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    <div className="select-component-content">
      <div className="select-component-item">
        <div className="select-item-header">
          {DomHelper.textEl("Script Event Function")}
        </div>
        <div className="select-item-body">
          {
            ReasonReact.array(
              showScriptEventFunctionAssets(
                state.unUsedScriptEventFunctionNodeIds,
                state.lastScriptEventFunctionNodeIdForAdd,
                _handleChangeScriptEventFunction(
                  state, targetScriptEventFunctionNodeId =>
                  send(
                    ChangeScriptEventFunctionForAdd(
                      targetScriptEventFunctionNodeId,
                    ),
                  )
                ),
              ),
            )
          }
        </div>
      </div>
      <div
        className="select-component-bg"
        onClick={_e => send(HideScriptEventFunctionGroupForAdd)}
      />
    </div>;

  let addScriptEventFunction =
      (languageType, ({state, send}: ReasonReact.self('a, 'b, 'c)) as self) => {
    /* TODO test */

    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let {currentScript} = state;

    let unUsedScriptEventFunctionNodes =
      _getUnUsedScriptEventFunctionNodes(
        currentScript,
        (editorState, engineState),
      );

    unUsedScriptEventFunctionNodes |> Js.Array.length > 0 ?
      {
        let unUsedScriptEventFunctionNodeIds =
          unUsedScriptEventFunctionNodes
          |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

        let lastScriptEventFunctionNodeIdForAdd =
          unUsedScriptEventFunctionNodeIds |> ArrayService.unsafeGetFirst;

        let (name, data) =
          ScriptEventFunctionNodeAssetEditorService.getNameAndData(
            lastScriptEventFunctionNodeIdForAdd,
            editorState,
          );

        let engineState =
          ScriptEngineService.addScriptEventFunctionData(
            currentScript,
            name,
            data,
            engineState,
          );

        engineState |> StateEngineService.setState |> ignore;

        send(
          ShowScriptEventFunctionGroupForAdd(
            lastScriptEventFunctionNodeIdForAdd,
            unUsedScriptEventFunctionNodeIds,
          ),
        );
      } :
      ConsoleUtils.warn(
        LanguageUtils.getMessageLanguageDataByType(
          "need-add-scriptEventFunction",
          languageType,
        ),
      )
      |> StateLogicService.getEditorState;
  };
};

let component = ReasonReact.reducerComponent("MainEditorScript");

let reducer = ((uiState, dispatchFunc) as reduxTuple, action, state) =>
  switch (action) {
  | ChangeScriptEventFunctionForAdd(targetScriptEventFunctionNodeId) =>
    ReasonReact.Update({
      ...state,
      lastScriptEventFunctionNodeIdForAdd:
        Some(targetScriptEventFunctionNodeId),
    })
  | ChangeScriptEventFunctionForChange(targetScriptEventFunctionNodeId) =>
    ReasonReact.Update({
      ...state,
      lastScriptEventFunctionNodeIdForChange:
        Some(targetScriptEventFunctionNodeId),
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
    ReasonReactUtils.updateWithSideEffects(
      {
        ...state,
        isShowScriptEventFunctionGroupForAdd: false,
        lastScriptEventFunctionNodeIdForAdd: None,
      },
      _state =>
      dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
      |> ignore
    )
  | HideScriptEventFunctionGroupForChange =>
    ReasonReactUtils.updateWithSideEffects(
      {
        ...state,
        isShowScriptEventFunctionGroupForChange: false,
        lastScriptEventFunctionNodeIdForChange: None,
      },
      _state =>
      dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
      |> ignore
    )
  };

let render =
    (
      (uiState, dispatchFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="MainEditorScript" className="wonder-inspector-script">
    {
      state.isShowScriptEventFunctionGroupForAdd ?
        Method.renderScriptEventFunctionGroupForAdd(self) : ReasonReact.null
    }
    {
      state.isShowScriptEventFunctionGroupForChange ?
        Method.renderScriptEventFunctionGroupForChange(self) :
        ReasonReact.null
    }
    {
      ReasonReact.array(
        Method.renderScriptAllEventFunctions(languageType, self),
      )
    }
    <button
      className="addable-btn"
      onClick={_e => Method.addScriptEventFunction(languageType, self)}>
      {
        DomHelper.textEl(
          LanguageUtils.getInspectorLanguageDataByType(
            "script-add-scriptEventFunction",
            languageType,
          ),
        )
      }
    </button>
  </article>;
};

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~script,
      ~isShowScriptEventFunctionGroupForAdd=false,
      ~isShowScriptEventFunctionGroupForChange=false,
      _children,
    ) => {
  ...component,
  initialState: () => {
    currentScript: script,
    isShowScriptEventFunctionGroupForAdd,
    isShowScriptEventFunctionGroupForChange,
    lastScriptEventFunctionNodeIdForAdd: None,
    lastScriptEventFunctionNodeIdForChange: None,
    unUsedScriptEventFunctionNodeIds:
      WonderCommonlib.ArrayService.createEmpty(),
  },
  reducer: reducer((uiState, dispatchFunc)),
  render: self => render((uiState, dispatchFunc), self),
};