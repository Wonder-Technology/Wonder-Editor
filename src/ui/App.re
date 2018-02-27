open DomHelper;

open MainEditorSceneTreeStore;

Css.importCss("./css/app.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  let addExtension = (text) =>
    /* todo use extension names instead of the name */
    AppExtensionView.setExtension(getStorageParentKey(), text);
};

let component = ReasonReact.statelessComponent("App");

let render = (store: AppStore.appState, dispatch, _self) =>
  switch store.isDidMounted {
  | false => <article key="app" className="app-component" />
  | true =>
    <article key="app" className="wonder-app-component">
      (
        AppExtensionView.getExtension(Method.getStorageParentKey())
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
      (store.isEditorAndEngineStart ? <Header store dispatch /> : ReasonReact.nullElement)

      <MainEditor store dispatch />
    </article>
  };

let make = (~state as store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  didMount: (_self) => {
    AppExtensionView.getExtension(Method.getStorageParentKey())
    |> (
      (value) =>
        switch value {
        | None => ()
        | Some(value) =>
          let componentsMap = ExtensionParseSystem.createComponentMap(value);
          dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))))
        }
    );
    dispatch(AppStore.IsDidMounted);
    ReasonReact.NoUpdate
  },
  render: (self) => render(store, dispatch, self)
};