external toObject : Js.Dict.t('a) => Js.t({..}) = "%identity";

let getDispatch = () => Reductive.Store.dispatch(IndexStore.store);

let componentsMap = ExtensionParseSystem.createExtensionMapAddToComponentMap(ExtensionTool.extensionText);

let buildFakeAppState = () => {
  let state = AppStore.state;
  state.mapState.componentsMap = Some(componentsMap);
  state
};

let initMainEditor = (sandbox) =>
  MainEditorViewTool.init(sandbox) |> MainEditorStateView.finishState;

let execComponentEvent = (component, execEventFunc) => {
  let json = ReactTestRenderer.toJSON(component);
  switch (Js.Json.decodeObject(json)) {
  | None => ()
  | Some(dict) => execEventFunc(toObject(dict)##children)
  }
};

let execChangeEvent = [%bs.raw
  {| function(dom,value) {
    dom.props.onChange({
      target:{
        value:value
      }
    })
  }
  |}
];