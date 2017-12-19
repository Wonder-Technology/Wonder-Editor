let getFirst = (arr) =>
  switch (arr |> Array.length) {
  | 0 => ExcepetionHandleSystem.throwMessage({j|getFirst:the array is empty|j})
  | _ => arr[0]
  };