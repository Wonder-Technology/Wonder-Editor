open Ant;

let importCss = (css: string) => {};

importCss("./css/app.css");

let component = ReasonReact.statelessComponent("App");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  let fck = () => Js.log(AppConfig.appRecord);
  let fck2 = (value) => Js.log(value);
  let redo = (_) => dispatch(HistoryStore.TravelForward);
  let undo = (_) => dispatch(HistoryStore.TravelBackward);
  let buildReactComponent = () => <div> (DomHelper.textEl("hehe")) </div>;
  {
    ...component,
    didMount: (_self) => {
      MainEditorView.start();
      ReasonReact.NoUpdate
    },
    render: (_self) =>
      <div className="app">
        (buildReactComponent())
        <Button _type="primary" size="small" onClick=fck> (DomHelper.textEl("xne")) </Button>
        <NumberInput label="X" onChange=fck2 />
        <MainEditor state=state.stringState dispatch />
        <button onClick=undo> (DomHelper.textEl("undo")) </button>
      </div>
    /* <button onClick=redo> (DomHelper.textEl("redo")) </button> */
  }
};