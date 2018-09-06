let getBaseNameAndExtName = fileName =>
  switch ([%re {|/^(.*)(\.\w+)$/|}] |> Js.Re.exec(fileName)) {
  | None => (fileName, "")
  | Some(result) =>
    let resultArr = Js.Re.matches(result);
    (resultArr[1], resultArr[2]);
  };

let buildNameSucc = name =>{
  let index = 
  name 
  |> Js.String.lastIndexOf(" ");

  /* WonderLog.Log.print(("index", index)) |> ignore; */

  index === (-1) ? name : {
    name
    /* |> Js.String.slice() */
  }
}