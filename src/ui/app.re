open DomHelper;

open Ant;

let importCss = (css: string) => {};

importCss("./css/app.css");

let component = ReasonReact.statelessComponent("App");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  /* let fck = () => AppParseSystem.appComponents(); */
  let fck2 = (value) => Js.log(state.stringState);
  let redo = (_) => dispatch(HistoryStore.TravelForward);
  let undo = (dispatch, _) => dispatch(HistoryStore.TravelBackward);
  {
    ...component,
    didMount: (_self) => {
      MainEditorView.start();
      ReasonReact.NoUpdate
    },
    render: (_self) => {
      let map = ComponentMapConfig.createComponentMap(state, dispatch);
      <div className="app">
        (ComponentParseSystem.appComponents())
        /* <Button _type="primary" size="small" onClick=fck> (textEl("xne")) </Button> */
        /* (buildMainEditor(Some("x"), None, None)) */
        <NumberInput label="X" onChange=fck2 />
        <MainEditor state=state.stringState dispatch />
        <button onClick=(undo(dispatch))> (textEl("undo")) </button>
      </div>
      /* <button onClick=redo> (textEl("redo")) </button> */
    }
  }
};