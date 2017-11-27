let importCss = (css: string) => {};

importCss("./css/app.css");


let component = ReasonReact.statelessComponent("App");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  let _isDidMount = (state: AppStore.appState) => state.isDidMount;
  {
    ...component,
    didMount: (_self) => {
      let componentsMap = ComponentMapConfig.createComponentMap(dispatch);
      dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))));
      dispatch(AppStore.DidMountAction);
      ReasonReact.NoUpdate
    },
    render: (_self) =>
      if (_isDidMount(state)) {
        <div key="app" className="app-component">
          (
            ReasonReact.arrayToElement(
              ParseSystem.buildSpecificComponents(
                "app",
                state,
                BuildAppComponent.buildComponentByName
              )
            )
          )
        </div>
      } else {
        <div key="app" className="app-component" />
      }
  }
};