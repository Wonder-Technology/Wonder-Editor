type state = {
  isSelectNav: bool,
  streamSubscription: option(WonderBsMost.Most.subscription),
};

type action =
  | SetSubscription(WonderBsMost.Most.subscription)
  | ToggleShowNav
  | BlurNav;

module Method = {
  let isCurrentNodeIdEqualRootId = editorState =>
    switch (
      editorState |> CurrentNodeDataAssetEditorService.getCurrentNodeData
    ) {
    | None => true
    | Some({currentNodeId}) =>
      TreeAssetEditorService.isIdEqual(
        currentNodeId,
        editorState |> TreeRootAssetEditorService.getRootTreeNodeId,
      )
    };
  let addFolder = AssetHeaderAddFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let removeAssetNode = AssetHeaderRemoveNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let fileLoad = AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let addMaterial = AssetHeaderAddMaterialEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.reducerComponent("MainEditorAssetHeader");

let render =
    ((store, dispatchFunc), {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article key="assetHeader" className="wonder-asset-header">
    <div className="asset-header-item" onClick=(_e => send(ToggleShowNav))>
      <div className="item-canBeClick">
        <img src="./public/img/add.png" />
      </div>
      (
        state.isSelectNav ?
          <div className="item-content">
            <div
              className="content-section"
              onClick=(_e => Method.addFolder((store, dispatchFunc), (), ()))>
              <span className="section-header">
                (DomHelper.textEl("Folder"))
              </span>
            </div>
            <div
              className="content-section"
              onClick=(
                _e => Method.addMaterial((store, dispatchFunc), (), ())
              )>
              <div className="section-header">
                (DomHelper.textEl("Material"))
              </div>
            </div>
          </div> :
          ReasonReact.null
      )
    </div>
    <div
      className="asset-header-item"
      onClick=(
        _e =>
          Method.isCurrentNodeIdEqualRootId |> StateLogicService.getEditorState ?
            () : Method.removeAssetNode((store, dispatchFunc), (), ())
      )>
      (
        Method.isCurrentNodeIdEqualRootId |> StateLogicService.getEditorState ?
          <div className="item-notBeClick">
            <img src="./public/img/notRemove.png" />
          </div> :
          <div className="item-canBeClick">
            <img src="./public/img/remove.png" />
          </div>
      )
    </div>
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