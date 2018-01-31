Css.importCss("./css/header.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  let addExtension = (text) =>
    /* TODO use extension names instead of the name */
    AppExtensionView.setExtension(getStorageParentKey(), text);
  /* TODO check code */
  let addBox = (dispatch) => {
    MainEditorStateView.prepareState()
    |> MainEditorSceneView.addBoxGameObject
    |> MainEditorStateView.finishState;
    dispatch(
      AppStore.SceneTreeAction(SetSceneGraph(Some(SceneGraphDataUtils.getSceneGraphFromEngine())))
    )
  };
  let disposeCurrentGameObject = (dispatch) => {
    switch (MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject) {
    | None =>
      WonderLog.Log.error(
        WonderLog.Log.buildErrorMessage(
          ~title="disposeCurrentGameObject",
          ~description={j|current gameObject is None|j},
          ~reason="",
          ~solution={j|should set current gameObject|j},
          ~params={j||j}
        )
      )
    | Some(gameObject) =>
      MainEditorStateView.prepareState()
      |> MainEditorSceneView.disposeCurrentGameObject(gameObject)
      |> MainEditorSceneView.clearCurrentGameObject
      |> MainEditorStateView.finishState
    };
    dispatch(
      AppStore.SceneTreeAction(SetSceneGraph(Some(SceneGraphDataUtils.getSceneGraphFromEngine())))
    )
  };
};

let component = ReasonReact.statelessComponent("Header");

let render = (store, dispatch, _self) =>
  <article key="header" className="header-component">
    <div className="component-item">
      <button onClick=((_e) => StateHistoryView.undoHistoryState(store, dispatch))>
        (DomHelper.textEl("undo"))
      </button>
    </div>
    <div className="component-item">
      <button onClick=((_e) => StateHistoryView.redoHistoryState(store, dispatch))>
        (DomHelper.textEl("redo"))
      </button>
    </div>
    <div className="component-item">
      <button onClick=((_e) => Method.addBox(dispatch))> (DomHelper.textEl("add box")) </button>
    </div>
    <div className="component-item">
      <button onClick=((_e) => Method.disposeCurrentGameObject(dispatch))>
        (DomHelper.textEl("dispose"))
      </button>
    </div>
    <div className="component-item">
      <FileInput buttonText="show Input" onSubmit=((value) => Method.addExtension(value)) />
    </div>
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};