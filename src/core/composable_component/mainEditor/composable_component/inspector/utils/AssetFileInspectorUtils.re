let handleFileName = (fileName) =>
  switch ([%re {|/(^.*)(\.\w+)$/|}] |> Js.Re.exec(fileName)) {
  | None => (fileName, "")
  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    (resultArr[1], resultArr[2])
  };