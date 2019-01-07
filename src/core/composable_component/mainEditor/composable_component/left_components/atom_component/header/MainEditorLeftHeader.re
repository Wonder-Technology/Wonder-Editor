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

let _renderSelectNav =
    (
      store: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <div className="item-content">
    <div
      className="content-section"
      onClick=(
        _e =>
          Method.addGameObjectByType(
            (store, dispatchFunc),
            AddGameObjectType.EmptyGameObject,
            (),
          )
      )>
      <span className="section-header">
        (DomHelper.textEl("Create Empty"))
      </span>
    </div>
    <div
      className="content-section"
      onMouseOver=(e => send(HoverItem(GameObject)))>
      <div className="section-header">
        (DomHelper.textEl("3D GameObject"))
      </div>
      <div className="section-tail"> <div className="tail-triangle" /> </div>
      (
        state.currentSelectItem === GameObject ?
          <div className="section-childLayer">
            <div
              className="content-section"
              onClick=(
                _e =>
                  Method.addGameObjectByType(
                    (store, dispatchFunc),
                    AddGameObjectType.Box,
                    (),
                  )
              )>
              <span className="section-header">
                (DomHelper.textEl("Cube"))
              </span>
            </div>
            <div
              className="content-section"
              onClick=(
                _e =>
                  Method.addGameObjectByType(
                    (store, dispatchFunc),
                    AddGameObjectType.EmptyGameObject,
                    (),
                  )
              )>
              <span className="section-header">
                (DomHelper.textEl("Sphere"))
              </span>
            </div>
          </div> :
          ReasonReact.null
      )
    </div>
  </div>;

let render =
    (
      store: AppStore.appState,
      dispatchFunc,
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) =>
  <article
    key="mainEditorScenetreeHeader" className="wonder-left-components-header">
    <div
      className="sceneTree-header-item" onClick=(_e => send(ToggleShowNav))>
      <div className="item-canBeClick">
        <img src="./public/img/add.png" />
      </div>
      (
        state.isSelectNav ?
          _renderSelectNav(store, dispatchFunc, self) : ReasonReact.null
      )
    </div>
    <div
      className="sceneTree-header-item"
      onClick=(
        _e =>
          SceneTreeEditorService.getCurrentSceneTreeNode
          |> StateLogicService.getEditorState
          |> Js.Option.isNone ?
            () :
            Method.disposeCurrentSceneTreeNode((store, dispatchFunc), (), ())
      )>
      (
        SceneTreeEditorService.getCurrentSceneTreeNode
        |> StateLogicService.getEditorState
        |> Js.Option.isNone ?
          <div className="item-notBeClick">
            <img src="./public/img/notRemove.png" />
          </div> :
          <div className="item-canBeClick">
            <img src="./public/img/remove.png" />
          </div>
      )
    </div>
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
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
  render: self => render(store, dispatchFunc, self),
  willUnmount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventUtils.unmountStreamSubscription(state.streamSubscription),
};