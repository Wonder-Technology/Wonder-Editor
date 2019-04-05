let component = ReasonReact.statelessComponent("Text");

let render = ((headerText, headerTitle), bodyText) =>
  <div className="text">
    <span className="text-header" title=headerTitle>
      {DomHelper.textEl(headerText)}
    </span>
    <span className="text-body"> {DomHelper.textEl(bodyText)} </span>
  </div>;

let make = (~headerText, ~headerTitle, ~bodyText, _children) => {
  ...component,
  render: _self => render((headerText, headerTitle), bodyText),
};