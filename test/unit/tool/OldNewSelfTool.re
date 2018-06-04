open ReasonReact;

let getUnsafeVal = () => (-1) |> Obj.magic;

let buildOldNewSelf = (oldRetainedProps, newRetainedProps) =>
  {
    oldSelf: {
      state: getUnsafeVal(),
      handle: getUnsafeVal(),
      send: getUnsafeVal(),
      retainedProps: oldRetainedProps,
      onUnmount: getUnsafeVal()
    },
    newSelf: {
      state: getUnsafeVal(),
      handle: getUnsafeVal(),
      send: getUnsafeVal(),
      retainedProps: newRetainedProps,
      onUnmount: getUnsafeVal()
    },
  }
  |> Obj.magic;