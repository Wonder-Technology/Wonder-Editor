let component = ReasonReact.statelessComponent("mainEditor");

let make = (~state: StringStore.stringState, ~dispatch, _children) => {
  ...component,
  didMount: (_self) => {
    MainEditorView.start();

    ReasonReact.NoUpdate;
  },
  render: (_self) =>
    <div>
      <div className="fck"> (DomHelper.textEl("what the fck: " ++ state.text)) </div>
      <button onClick=((_) => dispatch(AppStore.StringAction(StringStore.A)))>
        (DomHelper.textEl("add a"))
      </button>
      <button onClick=((_) => dispatch(AppStore.StringAction(StringStore.B)))>
        (DomHelper.textEl("add b"))
      </button>
    </div>
    /* todo why? */
    /* <canvas id="webgl"></canvas> */
};