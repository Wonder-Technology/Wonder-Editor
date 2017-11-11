open UiTool;

let component = ReasonReact.statelessComponent("mainEditor");

let make = (~state: StringStore.stringState, ~dispatch, _children) => {
  ...component,
  render: (_self) =>
    <div>
      <div className="fck"> (textEl("what the fck: " ++ state.text)) </div>
      <button onClick=((_) => dispatch(AppStore.StringAction(StringStore.A)))>
        (textEl("add a"))
      </button>
      <button onClick=((_) => dispatch(AppStore.StringAction(StringStore.B)))>
        (textEl("add b"))
      </button>
    </div>
};