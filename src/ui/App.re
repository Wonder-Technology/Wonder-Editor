open DomHelper;

let importCss = (css: string) => {};

importCss("./css/app.css");

let component = ReasonReact.statelessComponent("App");

let make = (~state as store: AppStore.appState, ~dispatch, _children) => {
  let test = () => dispatch(AppStore.DidMountAction);
  {
    ...component,
    didMount: (_self) => {
      let componentsMap = ComponentMapConfig.createComponentMap(dispatch);
      dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))));
      dispatch(AppStore.DidMountAction);
      ReasonReact.NoUpdate
    },
    render: (_self) =>
      if (store.isDidMount) {
        <div key="app" className="app-component">
          <button onClick=((_) => test())> (textEl("xme")) </button>
          <MainEditor store dispatch />
          /* <Maketest.haha /> */
          <TempCom record=Maketest.res store />
          <TempCom record=Maketest.res store />
        </div>
      } else {
        <div key="app" className="app-component" />
      }
  }
};