open DomHelper;

open MainEditorSceneTreeStore;

Css.importCss("./css/app.css");

module Method = {
  let addExtension = (text) =>
    /* todo use extension names instead of the name */
    AppExtensionView.setExtension(AppExtensionView.getStorageParentKey(), text);
};

let make = (~state as store: AppStore.appState, ~dispatch, _children) => {
  ...ReasonReact.statelessComponent("App"),
  initialState: () => {
    AppExtensionView.getExtension(AppExtensionView.getStorageParentKey())
    |> (
      (value) =>
        switch value {
        | None => ()
        | Some(value) =>
          let componentsMap = ExtensionParseSystem.createComponentMap(value);
          dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))))
        }
    );
    dispatch(AppStore.IsDidMounted)
  },
  render: (_self) =>
    switch store.isDidMounted {
    | false => <article key="app" className="app-component" />
    | true =>
      <article key="app" className="wonder-app-component">
        (
          AppExtensionView.getExtension(AppExtensionView.getStorageParentKey())
          |> (
            (value) =>
              switch value {
              | None => ReasonReact.nullElement
              | Some(value) =>
                ReasonReact.arrayToElement(
                  ExtensionParseSystem.extensionPanelComponent("App", value, store)
                )
              }
          )
        )
        <FileInput buttonText="show Input" onSubmit=((value) => Method.addExtension(value)) />
        <MainEditor store dispatch />
      </article>
    }
};