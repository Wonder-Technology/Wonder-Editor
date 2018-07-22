open ReasonReact;

let _getUnsafeVal = () => (-1) |> Obj.magic;

let buildNewSelf = newRetainedProps =>
  {
    oldSelf: {
      state: _getUnsafeVal(),
      handle: _getUnsafeVal(),
      send: _getUnsafeVal(),
      retainedProps: _getUnsafeVal(),
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