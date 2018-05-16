let handleFileName = (fileName) =>
  switch ([%re {|/(^.*)(\.\w+)$/|}] |> Js.Re.exec(fileName)) {
  | None => ("", "")
  | Some(result) =>
    let resultArr = Js.Re.matches(result) |> WonderLog.Log.print;
    (resultArr[1], resultArr[2])
  };