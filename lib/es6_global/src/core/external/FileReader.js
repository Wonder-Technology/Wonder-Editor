


var onload = (
      function (reader,handleFunc) {
          reader.onload = function() {
              handleFunc(this.result)
          }
      }
  );

function makeSureCanLoadSameNameFileAgain(targetDom) {
  targetDom.value = "";
  return /* () */0;
}

function convertFileJsObjectToFileInfoRecord(fileObject) {
  return /* record */[
          /* name */fileObject.name,
          /* type_ */fileObject.type,
          /* file */fileObject
        ];
}

export {
  onload ,
  makeSureCanLoadSameNameFileAgain ,
  convertFileJsObjectToFileInfoRecord ,
  
}
/* onload Not a pure module */
