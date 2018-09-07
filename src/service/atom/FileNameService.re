let getBaseNameAndExtName = fileName =>
  switch ([%re {|/^(.*)(\.\w+)$/|}] |> Js.Re.exec(fileName)) {
  | None => (fileName, "")
  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    (resultArr[1], resultArr[2]);
  };

let buildNameSucc = fileName =>
  switch ([%re {|/(.+)[\s](\d+)$/|}] |> Js.Re.exec(fileName)) {
  | None => fileName ++ " 1"

  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    let postfix = resultArr[2] |> int_of_string |> succ |> string_of_int;

    resultArr[1] ++ " " ++ postfix;
  };