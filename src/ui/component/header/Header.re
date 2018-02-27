Css.importCss("./css/header.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* TODO use extension names instead of the name */
  let addExtension = (text) => AppExtensionView.setExtension(getStorageParentKey(), text);
  let addBox = (store, dispatch, stateTuple) => {
    let (newGameObject, stateTuple) = stateTuple |> MainEditorSceneView.addBoxGameObject;
    stateTuple
    |> DispatchActionUtils.dispatchAction(
         dispatch,
         (stateTuple) =>
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
  let disposeCurrentGameObject = (_store, dispatch, stateTuple) =>
    (
      switch (stateTuple |> MainEditorSceneView.getCurrentGameObject) {
      | None =>
        WonderLog.Log.error(
          WonderLog.Log.buildErrorMessage(
            ~title="disposeCurrentGameObject",
            ~description={j|current gameObject should exist, but actual is None|j},
            ~reason="",
            ~solution={j|set current gameObject|j},
            ~params={j||j}
          )
        );
        stateTuple
      | Some(gameObject) =>
        stateTuple
        |> MainEditorSceneView.disposeCurrentGameObject(gameObject)
        |> MainEditorSceneView.clearCurrentGameObject
      }
    )
    |> DispatchActionUtils.dispatchAction(
         dispatch,
         (stateTuple) =>
           AppStore.SceneTreeAction(
             SetSceneGraph(Some(stateTuple |> MainEditorSceneTreeView.getSceneGraphDataFromEngine))
           )
       );
};

let component = ReasonReact.statelessComponent("Header");

let render = (store: AppStore.appState, dispatch, _self) =>
  <article key="header" className="header-component">
    <div className="component-item">
      <button
        onClick=(
          (_e) =>
            OperateStateUtils.getAndSetState(StateHistoryView.undoHistoryState(store, dispatch))
        )>
        (DomHelper.textEl("undo"))
      </button>
    </div>
    <div className="component-item">
      <button
        onClick=(
          (_e) =>
            OperateStateUtils.getAndSetState(StateHistoryView.redoHistoryState(store, dispatch))
        )>
        (DomHelper.textEl("redo"))
      </button>
    </div>
    <div className="component-item">
      /* TODO refactor all component as setStateWithReduxData */

        <button onClick=((_e) => OperateStateUtils.getAndSetState(Method.addBox(store, dispatch)))>
          (DomHelper.textEl("add box"))
        </button>
      </div>
    <div className="component-item">
      <button
        onClick=(
          (_e) => OperateStateUtils.getAndSetState(Method.disposeCurrentGameObject(store, dispatch))
        )>
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