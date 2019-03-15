type navType =
  | None
  | GameObject;

type state = {
  isSelectNav: bool,
  currentSelectItem: navType,
  streamSubscription: option(WonderBsMost.Most.subscription),
};

type action =
  | SetSubscription(WonderBsMost.Most.subscription)
  | HoverItem(navType)
  | ToggleShowNav
  | BlurNav;

module Method = {
  let addGameObjectByType = LeftHeaderAddGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let disposeCurrentSceneTreeNode = LeftHeaderDisposeGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let cloneCurrentSceneTreeNode = LeftHeaderCloneGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.reducerComponent("MainEditorLeftHeader");

let reducer = (action, state) =>
  switch (action) {
  | SetSubscription(subscription) =>
    ReasonReact.Update({...state, streamSubscription: Some(subscription)})
  | ToggleShowNav =>
    state.isSelectNav ?
      ReasonReact.Update({
        ...state,
        isSelectNav: false,
        currentSelectItem: None,
      }) :
      ReasonReact.Update({
        ...state,
        isSelectNav: true,
        currentSelectItem: None,
      })

  | BlurNav =>
    ReasonReact.Update({
      ...state,
      isSelectNav: false,
      currentSelectItem: None,
    })

  | HoverItem(selectNav) =>
    ReasonReact.Update({...state, currentSelectItem: selectNav})
  };

let _renderSelectNav = ((uiState, dispatchFunc), state, send) =>
  <div className="item-content">
    <div
      className="content-section"
      onClick={
        _e =>
          Method.addGameObjectByType(
            (uiState, dispatchFunc),
            AddGameObjectType.EmptyGameObject,
            (),
          )
      }>
      <span className="section-header">
        {DomHelper.textEl("Create Empty")}
      </span>
    </div>
    <div
      className="content-section"
      onMouseOver={e => send(HoverItem(GameObject))}>
      <div className="section-header">
        {DomHelper.textEl("3D GameObject")}
      </div>
      <div className="section-tail"> <div className="tail-triangle" /> </div>
      {
        state.currentSelectItem === GameObject ?
          <div className="section-childLayer">
            <div
              className="content-section"
              onClick={
                _e =>
                  Method.addGameObjectByType(
                    (uiState, dispatchFunc),
                    AddGameObjectType.Cube,
                    (),
                  )
              }>
              <span className="section-header">
                {DomHelper.textEl("Cube")}
              </span>
            </div>
            <div
              className="content-section"
              onClick={
                _e =>
                  Method.addGameObjectByType(
                    (uiState, dispatchFunc),
                    AddGameObjectType.Sphere,
                    (),
                  )
              }>
              <span className="section-header">
                {DomHelper.textEl("Sphere")}
              </span>
            </div>
          </div> :
          ReasonReact.null
      }
    </div>
  </div>;

let _renderAddGameObjectComponent =
    ((uiState, dispatchFunc), state, send, languageType) =>
  <div className="sceneTree-header-item" onClick={_e => send(ToggleShowNav)}>
    <div
      className="item-canBeClick"
      title={
        LanguageUtils.getSceneTreeLanguageDataByType(
          "scene-tree-add",
          languageType,
        )
      }>
      <img src="./public/img/add.png" />
    </div>
    {
      state.isSelectNav ?
        _renderSelectNav((uiState, dispatchFunc), state, send) :
        ReasonReact.null
    }
  </div>;

let _renderRemoveGameObjectComponent =
    (reduxTuple, isCurrentSceneTreeNodeSceneChildren, languageType) =>
  <div
    className="sceneTree-header-item"
    title={
      LanguageUtils.getSceneTreeLanguageDataByType(
        "scene-tree-remove",
        languageType,
      )
    }
    onClick={
      _e =>
        isCurrentSceneTreeNodeSceneChildren ?
          Method.disposeCurrentSceneTreeNode(reduxTuple, (), ()) : ()
    }>
    {
      isCurrentSceneTreeNodeSceneChildren ?
        <div className="item-notBeClick">
          <img src="./public/img/remove.png" />
        </div> :
        <div className="item-canBeClick">
          <img src="./public/img/notRemove.png" />
        </div>
    }
  </div>;

let _renderCloneGameObjectComponent =
    (reduxTuple, isCurrentSceneTreeNodeSceneChildren, languageType) =>
  <div
    className="sceneTree-header-item"
    title={
      LanguageUtils.getSceneTreeLanguageDataByType(
        "scene-tree-clone",
        languageType,
      )
    }
    onClick={
      _e =>
        isCurrentSceneTreeNodeSceneChildren ?
          Method.cloneCurrentSceneTreeNode(reduxTuple, (), ()) : ()
    }>
    {
      isCurrentSceneTreeNodeSceneChildren ?
        <div className="item-notBeClick">
          <img src="./public/img/clone.png" />
        </div> :
        <div className="item-canBeClick">
          <img src="./public/img/notClone.png" />
        </div>
    }
  </div>;

let render =
    (reduxTuple, ({state, send}: ReasonReact.self('a, 'b, 'c)) as self) => {
  let isCurrentSceneTreeNodeSceneChildren =
    GameObjectLogicService.isCurrentSceneTreeNodeSceneChildren
    |> StateLogicService.getStateToGetData;
  let languageType =
    LanguageUtils.getLanguageType(WindowType.window##wonderLanguage);

  <article
    key="mainEditorScenetreeHeader" className="wonder-left-components-header">
    {_renderAddGameObjectComponent(reduxTuple, state, send, languageType)}
    {
      _renderRemoveGameObjectComponent(
        reduxTuple,
        isCurrentSceneTreeNodeSceneChildren,
        languageType,
      )
    }
    {
      _renderCloneGameObjectComponent(
        reduxTuple,
        isCurrentSceneTreeNodeSceneChildren,
        languageType,
      )
    }
  </article>;
};

let make = (~uiState: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    isSelectNav: false,
    currentSelectItem: None,
    streamSubscription: None,
  },
  reducer,
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventUtils.bindEventInDidMount(
      e => {
        let target = ReactEventRe.Form.target(e);
        let targetArray =
          DomHelper.getElementsByClassName("sceneTree-header-item");

        DomUtils.isSpecificDomChildrenHasTargetDom(target, targetArray) ?
          () : send(BlurNav);
      },
      subscription => send(SetSubscription(subscription)),
    ),
  render: self => render((uiState, dispatchFunc), self),
  willUnmount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventUtils.unmountStreamSubscription(state.streamSubscription),
};