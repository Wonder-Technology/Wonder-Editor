type state = {isSelectNav: bool};

type action =
  | ToggleShowNav
  | BlurNav

module Method = {
  let isCurrentNodeIdEqualRootId = editorState =>
    switch (
      editorState |> AssetCurrentNodeDataEditorService.getCurrentNodeData
    ) {
    | None => true
    | Some({currentNodeId}) =>
      AssetUtils.isIdEqual(
        currentNodeId,
        editorState |> AssetTreeRootEditorService.getRootTreeNodeId,
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
          multiple=true
          onChange=(e => Method.fileLoad((store, dispatchFunc), (), e))
        />
      </div>
    </div>
  </article>;

let reducer = (action, state) =>
  switch (action) {
  | ToggleShowNav =>
    state.isSelectNav ?
      ReasonReact.Update({...state, isSelectNav: false}) :
      ReasonReact.Update({...state, isSelectNav: true})

  | BlurNav => ReasonReact.Update({...state, isSelectNav: false})
  };

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {isSelectNav: false},
  reducer,
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    DomHelper.addEventListener(
      DomHelper.document,
      "click",
      e => {
        let target = ReactEventRe.Form.target(e);
        let targetArray =
          DomHelper.getElementsByClassName("asset-header-item");

        DomUtils.isSpecificDomChildrenHasTargetDom(target, targetArray) ?
          () : send(BlurNav);
      },
    ),
  render: self => render((store, dispatchFunc), self),
};