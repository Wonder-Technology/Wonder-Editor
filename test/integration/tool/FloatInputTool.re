let reducer =
    (
      ~onBlurFunc=None,
      ~onChangeFunc=None,
      ~canBeZero=false,
      ~action,
      ~state,
      (),
    ) =>
  FloatInput.reducer((onChangeFunc, onBlurFunc), canBeZero, action, state);

let buildState =
    (
      ~canBeZero=false,
      ~originValue="",
      ~inputValue=Some("0.0"),
      ~isDragStart=false,
      (),
    )
    : FloatInput.state => {
  inputValue,
  originValue,
  isDragStart,
  canBeZero,
};