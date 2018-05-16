let handleFileName = (fileName) =>
  switch ([%re {|/(^.*)(\.\w+)$/|}] |> Js.Re.exec(fileName)) {
  | None => ("", "")
  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    (resultArr[1], resultArr[2])
  };