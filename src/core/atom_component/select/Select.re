open SelectType;
type state = {selectedKey: int};

type action =
  | Change(int);

module Method = {
  let change = event => {
    let inputVal: int =
      ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value
      |> int_of_string;
    Change(inputVal);
  };

  let renderContent = (options, state) =>
    options
    |> Js.Array.map(({key, value}) =>
         <option key=value value=(key |> string_of_int)>
           (DomHelper.textEl(value))
         </option>
       );
};

let component = ReasonReact.reducerComponent("Select");

let reducer = (onChange, action) =>
  switch (action) {
  | Change(selectedKey) => (
      state =>
        ReasonReactUtils.updateWithSideEffects(
          {...state, selectedKey}, _state =>
          onChange(selectedKey)
        )
    )
  };

let render = (label, options, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article key="Select" className="wonder-select">
    (
      switch (label) {
      | None => ReasonReact.nullElement
      | Some(label) => <span className=""> (DomHelper.textEl(label)) </span>
      }
    )
    <select
      onChange=(e => send(Method.change(e)))
      value=(state.selectedKey |> string_of_int)>
      (ReasonReact.arrayToElement(Method.renderContent(options, state)))
    </select>
  </article>;

let make =
    (
      ~label: option(string)=?,
      ~options: array(optionItem),
      ~selectedKey: int,
      ~onChange: int => unit,
      _children,
    ) => {
  ...component,
  initialState: () => {selectedKey: selectedKey},
  reducer: reducer(onChange),
  render: self => render(label, options, self),
};