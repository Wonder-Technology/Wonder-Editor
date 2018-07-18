open ReasonReact;

let _getUnsafeVal = () => (-1) |> Obj.magic;

let buildOldNewSelf = (oldRetainedProps, newRetainedProps) =>
  {
    oldSelf: {
      state: _getUnsafeVal(),
      handle: _getUnsafeVal(),
      send: _getUnsafeVal(),
      retainedProps: oldRetainedProps,
      onUnmount: _getUnsafeVal(),
    },
    newSelf: {
      state: _getUnsafeVal(),
      handle: _getUnsafeVal(),
      send: _getUnsafeVal(),
      retainedProps: newRetainedProps,
      onUnmount: _getUnsafeVal(),
    },
  }
  |> Obj.magic;