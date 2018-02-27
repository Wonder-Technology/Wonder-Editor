Css.importCss("./css/header.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* TODO use extension names instead of the name */
  let addExtension = (text) => AppExtensionView.setExtension(getStorageParentKey(), text);
  let addBox = (store: AppStore.appState, dispatch) => {
    let (newGameObject, stateTuple) =
      MainEditorStateView.prepareState() |> MainEditorSceneView.addBoxGameObject;
    stateTuple |> MainEditorStateView.finishState;
    dispatch(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            stateTuple
            |> MainEditorSceneTreeView.buildSceneGraphDataWithNewGameObject(
                 newGameObject,
                 store |> SceneGraphDataUtils.unsafeGetSceneGraphDataFromStore
               )
          )
        )
      )
    )
  };
  let disposeCurrentGameObject = (dispatch) => {
    switch (MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject) {
    | None =>
      WonderLog.Log.error(
        WonderLog.Log.buildErrorMessage(
          ~title="disposeCurrentGameObject",
          ~description={j|current gameObject should exist, but actual is None|j},
          ~reason="",
          ~solution={j|set current gameObject|j},
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
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            MainEditorStateView.prepareState()
            |> MainEditorSceneTreeView.getSceneGraphDataFromEngine
          )
        )
      )
    )
  };
};

let component = ReasonReact.statelessComponent("Header");

let render = (store: AppStore.appState, dispatch, _self) =>
  /* TODO event handle use functor: get stateTuple->operate->set stateTuple

     logic layer directly get stateTuple from param, no prepareState
     */
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
      <button onClick=((_e) => Method.addBox(store, dispatch))>
        (DomHelper.textEl("add box"))
      </button>
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