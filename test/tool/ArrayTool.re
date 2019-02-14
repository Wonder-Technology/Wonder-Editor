let truncate = (digit, array) =>
  array
  |> Js.Array.map(value => FloatService.truncateFloatValue(value, digit));