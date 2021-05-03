type state = {inputValue: string};

type action =
  | Blur
  | Change(string);

module Method = {
  let change = (event, sendFunc) =>
    sendFunc(
      Change(
        ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value,
      ),
    );

  let blur = sendFunc => sendFunc(Blur);
};

let component = ReasonReact.reducerComponent("TextAreaInput");

let reducer = (onBlurFunc, action, state) =>
  switch (action) {
  | Change(value) => ReasonReact.Update({...state, inputValue: value})
  | Blur => ReasonReactUtils.sideEffects(() => onBlurFunc(state.inputValue))
  };

let render = (label, {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-textAreaInput">
    <div className="content-field content-textarea">
      <div className="field-title"> {DomHelper.textEl(label)} </div>
      <div className="field-content">
        <textarea
          className="input-component"
          type_="text"
          value={state.inputValue}
          onChange={event => Method.change(event, send)}
          onBlur={event => Method.blur(send)}
        />
      </div>
    </div>
  </article>;

let make = (~label, ~defaultInputValue, ~onBlurFunc, _children) => {
  ...component,
  initialState: () => {inputValue: defaultInputValue},
  reducer: reducer(onBlurFunc),
  render: self => render(label, self),
};