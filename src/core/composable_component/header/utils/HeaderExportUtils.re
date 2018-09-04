open WonderBsJszip;

let exportPackage = () => {
  let zip = Zip.create();

  Zip.write(zip, "fck.txt", `str("hehe, sb"))
  |. Zip.generateAsyncBlob(Zip.makeAsyncBlobOptions())
  |> Js.Promise.then_(content =>
       FileSaver.saveAs(content, "aaa.zip" ) |> Js.Promise.resolve
     )
  |> ignore;
};