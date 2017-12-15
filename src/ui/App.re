open DomHelper;

let importCss = (css: string) => {};

importCss("./css/app.css");

let component = ReasonReact.statelessComponent("App");

let make = (~state as store: AppStore.appState, ~dispatch, _children) => {
  let _isComponentMapExist = (store: AppStore.appState) =>
    switch store.mapState.componentsMap {
    | None => false
    | _ => true
    };
  {
    ...component,
    initialState: () => {
      let componentsMap = ComponentMapConfig.createComponentMap();
      dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))))
    },
    render: (_self) => {
      let isMapExist = _isComponentMapExist(store);
      switch isMapExist {
      | false => <div key="app" className="app-component" />
      | true =>
        <div key="app" className="app-component">
          <MainEditor store dispatch />
          (ReasonReact.arrayToElement(ExtendParseSystem.extendComponent("App", store)))
        </div>
      }
    }
  }
};

