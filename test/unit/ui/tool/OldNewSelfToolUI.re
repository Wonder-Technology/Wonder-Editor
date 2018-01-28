open ReasonReact;

let getUnsafeVal = () => (-1) |> Obj.magic;

let buildOldNewSelf = (oldRetainedProps, newRetainedProps) =>
  {
    oldSelf: {
      state: getUnsafeVal(),
      handle: getUnsafeVal(),
      reduce: getUnsafeVal(),
      enqueue: getUnsafeVal(),
      update: getUnsafeVal(),
      retainedProps: oldRetainedProps
    },
    newSelf: {
      state: getUnsafeVal(),
      handle: getUnsafeVal(),
      reduce: getUnsafeVal(),
      enqueue: getUnsafeVal(),
      update: getUnsafeVal(),
      retainedProps: newRetainedProps
    }
  }
  |> Obj.magic;