module Method = {
  let changeInputValue = (event, changeInputValueFunc) =>
    changeInputValueFunc(
      ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value,
    );
};

let component = ReasonReact.statelessComponent("UserInputJs");

let render = (label, defaultInputValue, changeInputValueFunc) =>
  <article className="wonder-userInputJs">
    <div className="content-field content-textarea">
      <div className="field-title"> {DomHelper.textEl(label)} </div>
      <div className="field-content">
        <textarea
          className="input-component"
          type_="text"
          value=defaultInputValue
          onChange={e => Method.changeInputValue(e, changeInputValueFunc)}
        />
      </div>
    </div>
  </article>;

let make = (~label, ~defaultInputValue, ~changeInputValueFunc, _children) => {
  ...component,
  render: _ => render(label, defaultInputValue, changeInputValueFunc),
};