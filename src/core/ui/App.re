open DomHelper;

module Method = {
  /* let getStorageParentKey = () => "userExtension";
  let addExtension = text =>
    /* todo use extension names instead of the name */
    AppExtensionUtils.setExtension(getStorageParentKey(), text); */

  let showComponent =
      (
        uiState: AppStore.appState,
        dispatchFunc,
        {state, send}: ReasonReact.self('a, 'b, 'c),
      ) =>
    <article key="app" className="wonder-app-component">
      /* {
           AppExtensionUtils.getExtension(getStorageParentKey())
           |> (
             value =>
               switch (value) {
               | None => ReasonReact.null
               | Some(value) =>
                 ReasonReact.array(
                   ExtensionParseUtils.extensionPanelComponent(
                     "App",
                     value,
                     uiState,
                   ),
                 )
               }
           )
         } */

        {
          uiState.isInitEngine ?
            <>
              <Header uiState dispatchFunc />
              <Controller uiState dispatchFunc />
            </> :
            <AppShell />
        }
        <MainEditor uiState dispatchFunc />
      </article>;
};

let component = ReasonReact.statelessComponent("App");

let render =
    (
      (uiState: AppStore.appState, dispatchFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) =>
  Method.showComponent(uiState, dispatchFunc, self);

let make = (~state as uiState: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: self => render((uiState, dispatch), self),
  didMount: _self => {
    ServiceWorker.registerServiceWorker();

    WonderLog.Wonder_Console.makeObjInToWindow();
    /*
     AppExtensionUtils.getExtension(Method.getStorageParentKey())
     |> (
       value =>
         switch (value) {
         | None => ()
         | Some(value) =>
           let componentsMap = ExtensionParseUtils.createComponentMap(value);

           dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))));
         }
     ); */
  },
};