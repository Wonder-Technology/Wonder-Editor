open DomHelper;

open WonderBsMost;

open UserDataType;

let component = ReasonReact.statelessComponent("App");

let render =
    (
      (uiState: AppStore.appState, dispatchFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) =>
  <article key="app" className="wonder-app-component">
    <div className="wonder-app-message" id="appMessage" />
    {
      uiState.isInitEngine ?
        <>
          <Header uiState dispatchFunc />
          <Controller uiState dispatchFunc />
        </> :
        <AppShell />
    }
    <MainEditor uiState dispatchFunc />
    <Progress key="main-progress" />
    <canvas id="img-canvas" key="imgCanvas" width="50" height="50" />
  </article>;

let make = (~state as uiState: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: self => render((uiState, dispatch), self),
  didMount: _self => {
    WonderLog.Wonder_Console.makeObjInToWindow();

    ServiceWorker.registerServiceWorker();
  },
};