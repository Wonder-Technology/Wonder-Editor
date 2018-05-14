open FileType;

type fileReader;

[@bs.new] external createFileReader : unit => fileReader = "FileReader";

[@bs.send] external readAsDataURL : (fileReader, file) => unit = "";

[@bs.send] external readAsText : (fileReader, file) => unit = "";

let onload = [%bs.raw
  {|
        function (reader,handleFunc) {
            reader.onload = function() {
                handleFunc(this.result)
            }
        }
    |}
];
/* fileLoad(xxx, {
     "target": {
       "files":
     }
   }) */
/* let _buildFakeFileReader = [%bs.raw{|
     function (onloadStub){
       window.FileReader = function(){
         this.onload = function() {
           return xxx
         }
         this.result = "123";
         this.readAsText
       }
     }
     |}];

     let onload = Sinon.createEmptyStubWithJsObjSandbox(sandbox);

   _buildFakeFileReader(onload); */