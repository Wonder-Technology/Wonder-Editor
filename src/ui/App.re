let importCss = (css: string) => {};

importCss("./css/app.css");

let component = ReasonReact.statelessComponent("App");

let make = (~state as store: AppStore.appState, ~dispatch, _children) => {
  let _isDidMount = (store: AppStore.appState) => store.isDidMount;
  {
    ...component,
    didMount: (_self) => {
      let componentsMap = ComponentMapConfig.createComponentMap(dispatch);
      dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))));
      dispatch(AppStore.DidMountAction);
      ReasonReact.NoUpdate
    },
    render: (_self) =>
      if (_isDidMount(store)) {
        <div key="app" className="app-component">
          (
            ReasonReact.arrayToElement(
              ParseSystem.buildSpecificComponents(
                "app",
                store,
                BuildAppComponent.buildComponentByName
              )
            )
          )
          <MainEditor store dispatch />
        </div>
      } else {
        <div key="app" className="app-component" />
      }
  }
};