let getFileExtName = fileName =>
  switch ([%re {|/^.*(\.\w+)$/|}] |> Js.Re.exec(fileName)) {
  | None => None
  | Some(result) =>
    let resultArr = Js.Re.matches(result);

    resultArr[1] |. Some;
  };

let getBaseNameAndExtName = fileName =>
  switch ([%re {|/^(.*)(\.\w+)$/|}] |> Js.Re.exec(fileName)) {
  | None => (fileName, "")
  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    (resultArr[1], resultArr[2]);
  };

let getFolderPathAndFileName = filePath =>
  switch ([%re {|/^(.*[\/])(\w+\.\w+)$/|}] |> Js.Re.exec(filePath)) {
  | None => (filePath, "")
  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    (resultArr[1], resultArr[2]);
  };

let removePathPostfix = filePath =>
  switch ([%re {|/^(.*)[\/]$/|}] |> Js.Re.exec(filePath)) {
  | None => filePath
  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    resultArr[1];
  };

let buildFileTotalName = (baseName, extName) => baseName ++ extName;

let buildNameSucc = fileName =>
  switch ([%re {|/(.+)[\s](\d+)$/|}] |> Js.Re.exec(fileName)) {
  | None => fileName ++ " 1"

  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    let postfix = resultArr[2] |> int_of_string |> succ |> string_of_int;

    resultArr[1] ++ " " ++ postfix;
  };