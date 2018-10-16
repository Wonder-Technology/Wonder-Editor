let reducer =
    (~onBlurFunc=None, ~onChangeFunc=None, ~canBeZero, ~action, ~state, ()) =>
  FloatInput.reducer((onChangeFunc, onBlurFunc), canBeZero, action, state);