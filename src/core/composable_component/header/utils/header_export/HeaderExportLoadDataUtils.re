open Js.Promise;

open WonderBsJszip;

let loadIndexJsData = (fetchFunc, zip) =>
  fetchFunc("./test.html")
  |> then_(response =>
       response
       |> Fetch.Response.text
       |> then_(jsStr =>
            zip |. Zip.write("Index.min.js", `str(jsStr)) |> resolve
          )
     );

let loadIndexHtmlData = (fetchFunc, zip) =>
  fetchFunc("./test.html")
  |> then_(response =>
       response
       |> Fetch.Response.text
       |> then_(htmlStr =>
            zip |. Zip.write("Index.html", `str(htmlStr)) |> resolve
          )
     );