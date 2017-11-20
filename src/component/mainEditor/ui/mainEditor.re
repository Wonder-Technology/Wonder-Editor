let component = ReasonReact.statelessComponent("mainEditor");

let make = (~state: StringStore.stringState, ~dispatch, ~appState: AppStore.appState, _children) => {
  ...component,
  render: (_self) =>
    <div>
      <div className="fck"> (DomHelper.textEl(state.text)) </div>
      <button onClick=((_) => dispatch(AppStore.StringAction(StringStore.A)))>
        (DomHelper.textEl("add a"))
      </button>
      <button onClick=((_) => dispatch(AppStore.StringAction(StringStore.B)))>
        (DomHelper.textEl("add b"))
      </button>
    </div>
};