open NodeAssetType;

type state = {
  style: ReactDOMRe.Style.t,
  isShowAssetGroup: bool,
  currentAssetDataOpt: option(int),
};

type action =
  | Nothing
  | DragEnter
  | DragLeave
  | SetAssetToEngine(TreeAssetType.tree)
  | ShowAssetGroup
  | HideAssetGroup;

module Method = {
  let isWidget = startWidget =>
    switch (startWidget) {
    | None => false
    | Some(widget) => widget == AssetWidgetService.getWidget()
    };

  let isTypeValid = (startNodeId, editorState) =>
    switch (startNodeId) {
    | None => false
    | Some(id) =>
      OperateTreeAssetEditorService.isNodeExistById(id, editorState)
    };

  let _isTriggerAction = (isWidgetFunc, isTypeValidFunc) => {
    let (widget, startNodeId) =
      StateEditorService.getState()
      |> CurrentDragSourceEditorService.getCurrentDragSource;

    isWidgetFunc(widget)
    && isTypeValidFunc(startNodeId, StateEditorService.getState());
  };

  let handleDragEnter = (isWidgetFunc, isTypeValidFunc, _event) =>
    _isTriggerAction(isWidgetFunc, isTypeValidFunc) ? DragEnter : Nothing;

  let handleDragLeave = (isWidgetFunc, isTypeValidFunc, event) => {
    ReactEventType.convertReactMouseEventToJsEvent(event)
    |> EventHelper.stopPropagation;

    _isTriggerAction(isWidgetFunc, isTypeValidFunc) ? DragLeave : Nothing;
  };

  let handleDragOver = event =>
    ReactEventType.convertReactMouseEventToJsEvent(event)
    |> EventHelper.preventDefault;

  let handleDragDrop = (isWidgetFunc, isTypeValidFunc, event) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);
    let startNodeId = e |> DragUtils.getDragedId;

    EventHelper.preventDefault(e);

    _isTriggerAction(isWidgetFunc, isTypeValidFunc) ?
      SetAssetToEngine(
        OperateTreeAssetEditorService.unsafeFindNodeById(startNodeId)
        |> StateLogicService.getEditorState,
      ) :
      DragLeave;
  };

  let showAssetImage = (currentAssetDataOpt, getAssetImageSrcFromEngineFunc) =>
    switch (currentAssetDataOpt) {
    | None => ReasonReact.null
    | Some(currentAssetData) =>
      <img
        src={
          getAssetImageSrcFromEngineFunc(
            currentAssetData,
            StateEngineService.unsafeGetState(),
          )
        }
      />
    };

  let _sortByName = (getAssetNodeNameByNodeFunc, engineState, allAssetNodes) =>
    allAssetNodes
    |> Js.Array.sortInPlaceWith((node1, node2) =>
         Js.String.localeCompare(
           getAssetNodeNameByNodeFunc(node2, engineState)
           |> Js.String.charAt(0),
           getAssetNodeNameByNodeFunc(node1, engineState)
           |> Js.String.charAt(0),
         )
         |> NumberType.convertFloatToInt
       );

  let _buildAssetUIComponent =
      (
        (node, className),
        getAssetImageSrcFromEditorFunc,
        getAssetNodeNameByNodeFunc,
        sendFunc,
        (editorState, engineState),
      ) =>
    <div
      className
      key={DomHelper.getRandomKey()}
      onClick={_e => sendFunc(SetAssetToEngine(node))}>
      <img
        src={getAssetImageSrcFromEditorFunc(node, editorState)}
        className="imgContent-img"
      />
      <div className="imgContent-text">
        {DomHelper.textEl(getAssetNodeNameByNodeFunc(node, engineState))}
      </div>
    </div>;

  let showAssets =
      (
        state,
        isCurrentAssetFunc,
        getAssetImageSrcFromEditorFunc,
        getAssetNodeNameByNodeFunc,
        sendFunc,
        findAllAssetNodesFunc,
      ) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    findAllAssetNodesFunc(editorState)
    |> _sortByName(getAssetNodeNameByNodeFunc, engineState)
    |> Js.Array.map(node =>
         switch (state.currentAssetDataOpt) {
         | None =>
           _buildAssetUIComponent(
             (node, "select-item-imgContent"),
             getAssetImageSrcFromEditorFunc,
             getAssetNodeNameByNodeFunc,
             sendFunc,
             (editorState, engineState),
           )
         | Some(currentAssetData) =>
           let className =
             isCurrentAssetFunc(currentAssetData, node) ?
               "select-item-imgContent select-item-active" :
               "select-item-imgContent";

           _buildAssetUIComponent(
             (node, className),
             getAssetImageSrcFromEditorFunc,
             getAssetNodeNameByNodeFunc,
             sendFunc,
             (editorState, engineState),
           );
         }
       );
  };
};

let component = ReasonReact.reducerComponent("SelectAssetNode");

let _handleSetAssetToEngine =
    (node, getCurrentAssetDataFromNodeFunc, onDropFunc, state) =>
  switch (state.currentAssetDataOpt) {
  | None =>
    ReasonReactUtils.updateWithSideEffects(
      {
        ...state,
        currentAssetDataOpt: Some(getCurrentAssetDataFromNodeFunc(node)),
      },
      _state =>
      onDropFunc(node)
    )
  | Some(sourceAssetData) =>
    let currentAssetData = getCurrentAssetDataFromNodeFunc(node);

    sourceAssetData === currentAssetData ?
      ReasonReact.NoUpdate :
      ReasonReactUtils.updateWithSideEffects(
        {...state, currentAssetDataOpt: Some(currentAssetData)}, _state =>
        onDropFunc(node)
      );
  };

let reducer = (getCurrentAssetDataFromNodeFunc, onDropFunc, action, state) =>
  switch (action) {
  | DragEnter =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp("border", "2px solid coral", state.style),
    })
  | DragLeave =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp(
          "border",
          "2px solid rgb(167,165,165)",
          state.style,
        ),
    })
  | SetAssetToEngine(node) =>
    _handleSetAssetToEngine(
      node,
      getCurrentAssetDataFromNodeFunc,
      onDropFunc,
      state,
    )
  | Nothing => ReasonReact.NoUpdate
  | ShowAssetGroup => ReasonReact.Update({...state, isShowAssetGroup: true})
  | HideAssetGroup => ReasonReact.Update({...state, isShowAssetGroup: false})
  };

let _renderDragableImage =
    (
      {state, send}: ReasonReact.self('a, 'b, 'c),
      getAssetImageSrcFromEngineFunc,
    ) =>
  <div
    className="img" onClick={_e => send(ShowAssetGroup)} style={state.style}>
    <div
      className="img-dragBg"
      onDragEnter={
        _e =>
          send(
            Method.handleDragEnter(Method.isWidget, Method.isTypeValid, _e),
          )
      }
      onDragLeave={
        _e =>
          send(
            Method.handleDragLeave(Method.isWidget, Method.isTypeValid, _e),
          )
      }
      onDragOver=Method.handleDragOver
      onDrop={
        _e =>
          send(
            Method.handleDragDrop(Method.isWidget, Method.isTypeValid, _e),
          )
      }
    />
    {
      Method.showAssetImage(
        state.currentAssetDataOpt,
        getAssetImageSrcFromEngineFunc,
      )
    }
  </div>;

let _renderAssetGroup =
    (
      assetGroupHeader,
      state,
      isCurrentAssetFunc,
      getAssetImageSrcFromEditorFunc,
      getAssetNodeNameByNodeFunc,
      sendFunc,
      findAllAssetNodesFunc,
    ) =>
  <div className="select-component-content">
    <div className="select-component-item">
      <div className="select-item-header">
        {DomHelper.textEl(assetGroupHeader)}
      </div>
      <div className="select-item-imgBody">
        <div className="imgBody-content">
          {
            ReasonReact.array(
              Method.showAssets(
                state,
                isCurrentAssetFunc,
                getAssetImageSrcFromEditorFunc,
                getAssetNodeNameByNodeFunc,
                sendFunc,
                findAllAssetNodesFunc,
              ),
            )
          }
        </div>
      </div>
    </div>
    <div
      className="select-component-bg"
      onClick={_e => sendFunc(HideAssetGroup)}
    />
  </div>;

let render =
    (
      (label, title, assetGroupHeader),
      (
        getAssetImageSrcFromEngineFunc,
        getAssetImageSrcFromEditorFunc,
        isCurrentAssetFunc,
        getAssetNodeNameByNodeFunc,
        renderAssetNameFunc,
        removeAssetFunc,
        findAllAssetNodesFunc,
      ),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article className="selectAssetNode-item">
    <div className="item-header" title> {DomHelper.textEl(label)} </div>
    <div className="item-content">
      {_renderDragableImage(self, getAssetImageSrcFromEngineFunc)}
      {
        renderAssetNameFunc(state.currentAssetDataOpt)
        |> StateLogicService.getEngineStateToGetData
      }
      <button className="remove" onClick={e => removeAssetFunc()}>
        {DomHelper.textEl("Remove")}
      </button>
    </div>
    {
      state.isShowAssetGroup ?
        _renderAssetGroup(
          assetGroupHeader,
          state,
          isCurrentAssetFunc,
          getAssetImageSrcFromEditorFunc,
          getAssetNodeNameByNodeFunc,
          send,
          findAllAssetNodesFunc,
        ) :
        ReasonReact.null
    }
  </article>;
};

let make =
    (
      ~label,
      ~assetGroupHeader,
      ~currentAssetDataOpt,
      ~getCurrentAssetDataFromNodeFunc,
      ~onDropFunc,
      ~getAssetImageSrcFromEngineFunc,
      ~getAssetImageSrcFromEditorFunc,
      ~isCurrentAssetFunc,
      ~getAssetNodeNameByNodeFunc,
      ~renderAssetNameFunc,
      ~removeAssetFunc,
      ~findAllAssetNodesFunc,
      ~isShowAssetGroup,
      ~title,
      _children,
    ) => {
  ...component,
  initialState: () => {
    style: ReactDOMRe.Style.make(~opacity="1", ()),
    isShowAssetGroup,
    currentAssetDataOpt,
  },
  reducer: reducer(getCurrentAssetDataFromNodeFunc, onDropFunc),
  render: self =>
    render(
      (label, title, assetGroupHeader),
      (
        getAssetImageSrcFromEngineFunc,
        getAssetImageSrcFromEditorFunc,
        isCurrentAssetFunc,
        getAssetNodeNameByNodeFunc,
        renderAssetNameFunc,
        removeAssetFunc,
        findAllAssetNodesFunc,
      ),
      self,
    ),
};