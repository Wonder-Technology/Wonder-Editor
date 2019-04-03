let buildSortByNameFunc = (name1, name2) =>
  Js.String.localeCompare(
    name1 |> Js.String.charAt(0),
    name2 |> Js.String.charAt(0),
  )
  |> NumberType.convertFloatToInt;