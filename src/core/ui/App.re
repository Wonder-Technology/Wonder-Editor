open DomHelper;

open MainEditorSceneTreeStore;

Css.importCss("./css/app.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  let addExtension = (text) =>
    /* todo use extension names instead of the name */
    AppExtensionUtils.setExtension(getStorageParentKey(), text);
};

let component = ReasonReact.statelessComponent("App");

let render = (store: AppStore.appState, dispatchFunc, _self) =>
  switch store.isDidMounted {
  | false => <article key="app" className="app-component" />
  | true =>
    <article key="app" className="wonder-app-component">
      (
        AppExtensionUtils.getExtension(Method.getStorageParentKey())
        |> (
          (value) =>
            switch value {
            | None => ReasonReact.nullElement
            | Some(value) =>
              ReasonReact.arrayToElement(
                ExtensionParseUtils.extensionPanelComponent("App", value, store)
              )
            }
        )
      )
      (store.isEditorAndEngineStart ? <Header store dispatchFunc /> : ReasonReact.nullElement)

      <MainEditor store dispatchFunc />
    </article>
  };

let make = (~state as store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  didMount: (_self) => {
    AppExtensionUtils.getExtension(Method.getStorageParentKey())
    |> (
      (value) =>
        switch value {
        | None => ()
        | Some(value) =>
          let componentsMap = ExtensionParseUtils.createComponentMap(value);
          dispatchFunc(AppStore.MapAction(StoreMap(Some(componentsMap))))
        }
    );
    dispatchFunc(AppStore.IsDidMounted);
    ReasonReact.NoUpdate
  },
  render: (self) => render(store, dispatchFunc, self)
};