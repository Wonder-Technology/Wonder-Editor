open DomHelper;

let importCss = (css: string) => {};

importCss("./css/app.css");

let component = ReasonReact.statelessComponent("App");

let make = (~state as store: AppStore.appState, ~dispatch, _children) => {
  {
    ...component,
    didMount: (_self) => {
      let componentsMap = ComponentMapConfig.createComponentMap();
      dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))));
      dispatch(AppStore.DidMountAction);
      ReasonReact.NoUpdate
    },
    render: (_self) =>
      if (store.isDidMount) {
        <div key="app" className="app-component">
          <MainEditor store dispatch />
          (ReasonReact.arrayToElement(ExtendParseSystem.extendComponent("App", store)))
        </div>
      } else {
        <div key="app" className="app-component" />
      }
  }
};