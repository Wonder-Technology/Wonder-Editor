open SplitType;

module Method = {};

let component = ReasonReact.statelessComponent("Split");

let render = _self => <article className="wonder-split" />;

let make =
    (
      ~size: option(int)=?,
      ~position: position,
      ~minPercent: float,
      ~maxPercent: float,
      ~dragMoveFunc: float => unit,
      ~dragDropFunc: unit => unit,
      _children,
    ) => {
  ...component,
  render: self => render(self),
};