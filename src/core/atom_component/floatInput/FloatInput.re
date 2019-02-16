type state = {
  inputValue: option(string),
  originValue: string,
  isDragStart: bool,
  canBeZero: bool,
};

type action =
  | DragStart
  | Change(option(string))
  | Blur;

module Method = {
  let _change = event => {
    let inputVal = ReactDOMRe.domElementToObj(
                     ReactEventRe.Form.target(event),
                   )##value;

    switch (inputVal) {
    | "" => Change(Some(""))
    | "-" => Change(Some("-"))
    | value =>
      switch (
        [%re {|/^-?(0|[1-9][0-9]*)(\.[0-9]{0,6})?$/|}] |> Js.Re.test(value)
      ) {
      | false => Change(None)
      | true => Change(Some(value))
      }
    };
  };

  let triggerOnChange = (value, onChangeFunc) =>
    switch (onChangeFunc) {
    | None => ()
    | Some(onChange) => onChange(float_of_string(value))
    };

  let triggerOnBlur = (value, onBlurFunc) =>
    switch (onBlurFunc) {
    | None => ()
    | Some(onBlur) => onBlur(float_of_string(value))
    };

  let handleSpecificFuncByCanBeZero =
      (state, value, canBeZero, (canBeZeroFunc, canNotBeZeroFunc)) =>
    canBeZero ? canBeZeroFunc(value) : canNotBeZeroFunc(value);

  let handleChangeAction = (state, onChangeFunc, canBeZero, value) =>
    switch (value) {
    | None => ReasonReact.NoUpdate
    | Some("-") => ReasonReact.Update({...state, inputValue: Some("-")})
    | Some("") => ReasonReact.Update({...state, inputValue: None})
    | Some("0") =>
      handleSpecificFuncByCanBeZero(
        state,
        "0",
        canBeZero,
        (
          value =>
            ReasonReactUtils.updateWithSideEffects(
              {...state, inputValue: Some(value)}, _state =>
              triggerOnChange(value, onChangeFunc)
            ),
          value => ReasonReact.Update({...state, inputValue: Some(value)}),
        ),
      )
    | Some("0.") =>
      handleSpecificFuncByCanBeZero(
        state,
        "0.",
        canBeZero,
        (
          value =>
            ReasonReactUtils.updateWithSideEffects(
              {...state, inputValue: Some(value)}, _state =>
              triggerOnChange(value, onChangeFunc)
            ),
          value => ReasonReact.Update({...state, inputValue: Some(value)}),
        ),
      )
    | Some(value) =>
      ReasonReactUtils.updateWithSideEffects(
        {...state, inputValue: Some(value)}, _state =>
        triggerOnChange(value, onChangeFunc)
      )
    };

  let _markDragDrop = state => {...state, isDragStart: false};

  let handleBlurAction = (state, (onChangeFunc, onBlurFunc), canBeZero) =>
    switch (state.inputValue) {
    | None
    | Some("-")
    | Some("") =>
      handleSpecificFuncByCanBeZero(
        state,
        "0",
        canBeZero,
        (
          value =>
            ReasonReactUtils.updateWithSideEffects(
              {...state, inputValue: Some(value)} |> _markDragDrop,
              _state => {
                triggerOnChange(value, onChangeFunc);
                triggerOnBlur(value, onBlurFunc);
              },
            ),
          value =>
            ReasonReact.Update(
              {...state, inputValue: Some(state.originValue)}
              |> _markDragDrop,
            ),
        ),
      )
    | Some("0")
    | Some("0.") =>
      handleSpecificFuncByCanBeZero(
        state,
        "0",
        canBeZero,
        (
          value =>
            ReasonReactUtils.updateWithSideEffects(
              {...state, inputValue: Some(value)} |> _markDragDrop, _state =>
              triggerOnBlur(value, onBlurFunc)
            ),
          _value => {
            ConsoleUtils.warn("the value can't be 0 !")
            |> StateLogicService.getEditorState;

            ReasonReact.Update({
              ...state,
              inputValue: Some(state.originValue),
            });
          },
        ),
      )
    | Some(value) =>
      ReasonReactUtils.updateWithSideEffects(
        {...state, originValue: value} |> _markDragDrop, _state =>
        triggerOnBlur(value, onBlurFunc)
      )
    };

  let _getReplacedZero = () => 0.001;

  let _isNearlyZero = value => value |> Js.Math.abs_float <= 0.001;

  let computeNewValue = (currentValue, canBeZero, (movementX, movementY)) => {
    let factor = 100.0;

    let newValue =
      currentValue
      +. NumberType.convertIntToFloat(movementX)
      /. factor
      -. NumberType.convertIntToFloat(movementY)
      /. factor;

    canBeZero ?
      newValue : _isNearlyZero(newValue) ? _getReplacedZero() : newValue;
  };

  let isDragStart = ({isDragStart}) => isDragStart;

  let handleDragStart = (event, send) => {
    let e = ReactEventType.convertReactMouseEventToJsEvent(event);

    Wonderjs.DomExtend.requestPointerLock(e##target);

    send(DragStart);

    ();
  };

  let handleDragDrop = ((send, state)) =>
    isDragStart(state) ?
      {
        Wonderjs.DomExtend.exitPointerLock();

        send(Blur);

        ();
      } :
      ();

  let handleDragOver = (event, (send, state)) =>
    isDragStart(state) ?
      {
        let e = ReactEventType.convertReactMouseEventToJsEvent(event);

        send(
          Change(
            Some(
              computeNewValue(
                state.inputValue |> OptionService.unsafeGet |> float_of_string,
                state.canBeZero,
                MouseEventService.getMovementDeltaWhenPointerLocked(e),
              )
              |> string_of_float,
            ),
          ),
        );

        ();
      } :
      ();

  let renderLabel = ((send, state), label, onDragDrop) =>
    switch (label) {
    | None => ReasonReact.null
    | Some(label) =>
      <div
        className="item-header component-label"
        onMouseDown=(event => handleDragStart(event, send))
        onMouseMove=(event => handleDragOver(event, (send, state)))
        onMouseUp=(
          event => {
            handleDragDrop((send, state));

            onDragDrop(event);
          }
        )>
        (DomHelper.textEl(label))
      </div>
    };

  let renderContent = ((send, state)) =>
    <div className="item-content">
      <input
        className="input-component float-input"
        _type="text"
        value=(
          switch (state.inputValue) {
          | None => ""
          | Some(value) => value
          }
        )
        onChange=(_e => send(_change(_e)))
        onBlur=(_e => send(Blur))
      />
    </div>;
};

let component = ReasonReact.reducerComponent("FloatInput");

let reducer = ((onChangeFunc, onBlurFunc), canBeZero, action, state) =>
  switch (action) {
  | DragStart => ReasonReact.Update({...state, isDragStart: true})
  | Change(value) =>
    Method.handleChangeAction(state, onChangeFunc, canBeZero, value)
  | Blur =>
    Method.handleBlurAction(state, (onChangeFunc, onBlurFunc), canBeZero)
  };

let render =
    (
      label,
      (onBlurFunc, onDragDrop),
      {state, handle, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="inspector-item wonder-float-input">
    (Method.renderLabel((send, state), label, onDragDrop))
    (Method.renderContent((send, state)))
  </article>;

let make =
    (
      ~canBeZero: bool=true,
      ~onDragDrop=e => (),
      ~defaultValue: option(string)=?,
      ~label: option(string)=?,
      ~onChange: option(float => unit)=?,
      ~onBlur: option(float => unit)=?,
      _children,
    ) => {
  ...component,
  initialState: () =>
    switch (defaultValue) {
    | None => {
        inputValue: Some("0"),
        originValue: "0",
        isDragStart: false,
        canBeZero,
      }
    | Some(value) => {
        inputValue: Some(value),
        originValue: value,
        isDragStart: false,
        canBeZero,
      }
    },
  reducer: reducer((onChange, onBlur), canBeZero),
  render: self => render(label, (onBlur, onDragDrop), self),
};