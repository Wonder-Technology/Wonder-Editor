let reducer =
    (~onBlurFunc=None, ~onChangeFunc=None, ~canBeZero=false, ~action, ~state, ()) =>
  FloatInput.reducer((onChangeFunc, onBlurFunc), canBeZero, action, state);

let buildState =
    (
      ~canBeZero=false,
      ~originValue="",
      ~inputValue=None,
      ~isDragStart=false,
      (),
    )
    : FloatInput.state => {
  inputValue,
  originValue,
  isDragStart,
  canBeZero,
};