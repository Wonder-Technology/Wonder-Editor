open InputType;

let changeInput = (inputRegEx, event) => {
  let inputVal =
    ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;

  switch (inputVal) {
  | "" => Change(Some(""))
  | "-" => Change(Some("-"))
  | value =>
    switch (inputRegEx |> Js.Re.test(value)) {
    | false => Change(None)
    | true => Change(Some(value))
    }
  };
};
