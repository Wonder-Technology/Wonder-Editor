let component = ReasonReact.statelessComponent("Text");

let render = ((headerText, headerTitle), bodyText) =>
  <div className="inspector-item">
    <div className="item-header" title=headerTitle>
      {DomHelper.textEl(headerText)}
    </div>
    <div className="item-content">
      <span> {DomHelper.textEl(bodyText)} </span>
    </div>
  </div>;

let make = (~headerText, ~headerTitle, ~bodyText, _children) => {
  ...component,
  render: _self => render((headerText, headerTitle), bodyText),
};