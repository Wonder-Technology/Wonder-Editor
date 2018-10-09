type state = {isShowNav: bool};

type action =
  | ToggleNav;

module Method = {};

let component = ReasonReact.reducerComponent("Nav");

let reducer = (onChange, action, state) =>
  switch (action) {
  | ToggleNav =>
    ReasonReact.NoUpdate
  };

let render = (title, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article key="Nav" className="wonder-nav">
    <div className="nav-title">
        (DomHelper.textEl(title))
    </div>
    <div className="nav-content">
        
    </div>
  </article>;

let make =
    (
      ~title,
      ~onChange: int => unit,
      _children,
    ) => {
  ...component,
  initialState: () => {isShowNav: false},
  reducer: reducer(onChange),
  render: self => render(title, self),
};