open DomHelper;

module Method = {
  let getStorageParentKey = () => "userExtension";
  let addExtension = text =>
    /* todo use extension names instead of the name */
    AppExtensionUtils.setExtension(getStorageParentKey(), text);

  let showComponent = (uiState, dispatchFunc) =>
    <article key="app" className="wonder-app-component">
      (
        AppExtensionUtils.getExtension(getStorageParentKey())
        |> (
          value =>
            switch (value) {
            | None => ReasonReact.null
            | Some(value) =>
              ReasonReact.array(
                ExtensionParseUtils.extensionPanelComponent(
                  "App",
                  value,
                  uiState,
                ),
              )
            }
        )
      )
      (
        uiState.isEditorAndEngineStart ?
          <Header uiState dispatchFunc /> : ReasonReact.null
      )
      (
        uiState.isEditorAndEngineStart ?
          <Controller uiState dispatchFunc /> : ReasonReact.null
      )
      <MainEditor uiState dispatchFunc />
    </article>;
};

let component = ReasonReact.statelessComponent("App");

let render = ((uiState: AppStore.appState, dispatchFunc), _self) =>
  uiState.isDidMounted ?
    Method.showComponent(uiState, dispatchFunc) :
    <article key="app" className="app-component" />;

let make = (~state as uiState: AppStore.appState, ~dispatch, _children) => {
  ...component,
  didMount: _self => {
    ServiceWorker.registerServiceWorker();

    WonderLog.Wonder_Console.makeObjInToWindow();

    AppExtensionUtils.getExtension(Method.getStorageParentKey())
    |> (
      value =>
        switch (value) {
        | None => ()
        | Some(value) =>
          let componentsMap = ExtensionParseUtils.createComponentMap(value);

          dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))));
        }
    );
    dispatch(AppStore.IsDidMounted);
  },
  render: self => render((uiState, dispatch), self),
};