open Js.Promise;

open WonderBsJszip;

let loadIndexJsData = zip =>
  Fetch.fetch("./test.html")
  |> then_(response =>
       response
       |> Fetch.Response.arrayBuffer
       |> then_(arrayBuffer =>
            zip
            |. Zip.write(
                 ~options=Options.makeWriteOptions(~binary=true, ()),
                 "index.min.js",
                 `str(arrayBuffer |> TypeArrayType.arrayBufferToString),
               )
            |> resolve
          )
     );

let loadIndexHtmlData = zip =>
  Fetch.fetch("./test.html")
  |> then_(response =>
       response
       |> Fetch.Response.arrayBuffer
       |> then_(arrayBuffer =>
            zip
            |. Zip.write(
                 ~options=Options.makeWriteOptions(~binary=true, ()),
                 "index.html",
                 `str(arrayBuffer |> TypeArrayType.arrayBufferToString),
               )
            |> resolve
          )
     );