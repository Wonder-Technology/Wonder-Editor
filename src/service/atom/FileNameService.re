let getExtName = fileName => {
  let lastIndex = fileName |> Js.String.lastIndexOf(".");

  lastIndex === (-1) ?
    "" : fileName |> Js.String.substringToEnd(~from=lastIndex);
};

let getBaseName = [%bs.raw
  fileName => {|
var base = new String(fileName).substring(fileName.lastIndexOf('/') + 1);
    if(base.lastIndexOf(".") !== -1)
        base = base.substring(0, base.lastIndexOf("."));
   return base;
  |}
];

let _getPathAndFileName = (filePath, regex) =>
  switch (regex |> Js.Re.exec(filePath)) {
  | None => (filePath |> Js.Undefined.return, "")
  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    (resultArr[1] |> Js.Undefined.return, resultArr[2]);
  };

let getFolderPathAndFileName = filePath =>
  _getPathAndFileName(filePath, [%re {|/^(.*[\/])?(\w+\.\w+)$/|}]);

let getTextureFolderPathAndName = filePath =>
  _getPathAndFileName(filePath, [%re {|/^(.*[\/])?(\w+)$/|}]);

let removePathPostfix = filePath =>
  switch ([%re {|/^(.*)[\/]$/|}] |> Js.Re.exec(filePath)) {
  | None => filePath
  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    resultArr[1];
  };

let buildFileTotalName = (baseName, extName) => baseName ++ extName;
