type state = {
  isSelectNav: bool,
  streamSubscription: option(WonderBsMost.Most.subscription),
};

type action =
  | SetSubscription(WonderBsMost.Most.subscription)
  | ToggleShowNav
  | BlurNav;

module Method = {
  let isCurrentNodeEqualRootNode = editorState =>
    switch (editorState |> CurrentNodeAssetEditorService.getCurrentNodeId) {
    | None => true
    | Some(currentNodeId) =>
      NodeAssetService.isIdEqual(
        currentNodeId,
        RootTreeAssetEditorService.getRootNode(editorState)
        |> NodeAssetService.getNodeId(~node=_),
      )
    };
  let addFolder = AssetHeaderAddFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let removeAssetNode = AssetHeaderRemoveNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let fileLoad = AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let addMaterial = AssetHeaderAddMaterialEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.reducerComponent("MainEditorAssetHeader");

let _renderSelectNav =
    (
      store: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <div className="item-content">
    <div
      className="content-section"
      onClick=(_e => Method.addFolder((store, dispatchFunc), (), ()))>
      <span className="section-header"> (DomHelper.textEl("Folder")) </span>
    </div>
    <div
      className="content-section"
      onClick=(_e => Method.addMaterial((store, dispatchFunc), (), ()))>
      <div className="section-header"> (DomHelper.textEl("Material")) </div>
    </div>
  </div>;

let _renderRemoveItem =
    (
      store: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <div
    className="asset-header-item"
    onClick=(
      _e =>
        Method.isCurrentNodeEqualRootNode |> StateLogicService.getEditorState ?
          () : Method.removeAssetNode((store, dispatchFunc), (), ())
    )>
    (
      Method.isCurrentNodeEqualRootNode |> StateLogicService.getEditorState ?
        <div className="item-notBeClick">
          <img src="./public/img/notRemove.png" />
        </div> :
        <div className="item-canBeClick">
          <img src="./public/img/remove.png" />
        </div>
    )
  </div>;

let render =
    (
      (store, dispatchFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) =>
  <article key="assetHeader" className="wonder-asset-header">
    <div className="asset-header-item" onClick=(_e => send(ToggleShowNav))>
      <div className="item-canBeClick">
        <img src="./public/img/add.png" />
      </div>
      (
        state.isSelectNav ?
          _renderSelectNav(store, dispatchFunc, self) : ReasonReact.null
      )
    </div>
    (_renderRemoveItem(store, dispatchFunc, self))
    <div className="asset-header-item">
      <div className="item-canBeClick">
        <img src="./public/img/load.png" />
        <input
          className="asset-fileLoad"
          _type="file"
          multiple=false
          onChange=(
            e =>
              Method.fileLoad(
                (store, dispatchFunc),
                WonderBsJszip.Zip.create,
                e,
              )
              |> ignore
          )
        />
      </div>
    </div>
  </article>;

let reducer = (action, state) =>
  switch (action) {
  | SetSubscription(subscription) =>
    ReasonReact.Update({...state, streamSubscription: Some(subscription)})
  | ToggleShowNav =>
    state.isSelectNav ?
      ReasonReact.Update({...state, isSelectNav: false}) :
      ReasonReact.Update({...state, isSelectNav: true})
  | BlurNav => ReasonReact.Update({...state, isSelectNav: false})
  };

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {isSelectNav: false, streamSubscription: None},
  reducer,
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventUtils.bindEventInDidMount(
      e => {
        let target = ReactEventRe.Form.target(e);
        let targetArray =
          DomHelper.getElementsByClassName("asset-header-item");

        DomUtils.isSpecificDomChildrenHasTargetDom(target, targetArray) ?
          () : send(BlurNav);
      },
      subscription => send(SetSubscription(subscription)),
    ),
  render: self => render((store, dispatchFunc), self),
  willUnmount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventUtils.unmountStreamSubscription(state.streamSubscription),
};