open DomHelper;

let importCss = (css: string) => {};

importCss("./css/app.css");

let component = ReasonReact.statelessComponent("App");

let make = (~state as store: AppStore.appState, ~dispatch, _children) => {
  let storeInLocalStorage = (text) => {
    let name = "userExtend";
    LocalStorage.setLocalStorage(name, text)
  };
  {
    ...component,
    initialState: () => {
      let storageExtend = Js.Undefined.return(LocalStorage.getLocalStorage("userExtend"));
      switch (Js.Undefined.to_opt(storageExtend)) {
      | None => ()
      | Some(value) =>
        let componentsMap = ExtendParseSystem.createExtendMapAddToComponentMap(value);
        dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))))
      };
      dispatch(AppStore.IsDidMounted)
    },
    render: (_self) => {
      let storageExtend = Js.Undefined.return(LocalStorage.getLocalStorage("userExtend"));
      switch store.isDidMounted {
      | false => <div key="app" className="app-component" />
      | true =>
        <div key="app" className="app-component">
          <MainEditor store dispatch />
          (
            switch (Js.Undefined.to_opt(storageExtend)) {
            | None => ReasonReact.nullElement
            | Some(value) =>
              ReasonReact.arrayToElement(
                ExtendParseSystem.extendPanelComponent("App", value, store)
              )
            }
          )
          <FileInput buttonText="show Input" onSubmit=((value) => storeInLocalStorage(value)) />
        </div>
      }
    }
  }
};