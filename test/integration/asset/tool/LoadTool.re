let buildFakeLoadImage = [%raw
  () => {|
        window.loadImageBase64_wonder = function(base64Str, resolve, reject){
            resolve(base64Str)
        }

        window.loadImageBlob_wonder = function(objectUrl, errorInfo, resolve, reject){
            resolve({src: objectUrl })
        }

    |}
];

let convertUint8ArrayToBuffer = [%raw
  uint8Array => {|
    {
         var buf = new Buffer(uint8Array.byteLength);

         for (var i = 0; i < buf.length; ++i) {
             buf[i] = uint8Array[i];
         }

         return buf;
     }
    |}
];

let buildFakeTextDecoder = [%raw
  convertUint8ArrayToBufferFunc => {|
      var TextDecoder = function(utfLabel){
      };

      TextDecoder.prototype.decode = (uint8Array) => {
        var buffer = convertUint8ArrayToBufferFunc(uint8Array);

        return buffer.toString("utf8");
      };

      window.TextDecoder = TextDecoder;
  |}
];

let buildFakeTextEncoder =
  [@bs]
  [%raw
    () => {|
       var TextEncoder = function(){
       };

       TextEncoder.prototype.encode = (str) => {
         var buffer = Buffer.from(str, "utf8");

         return buffer;
       };

       window.TextEncoder = TextEncoder;
   |}
  ];

let buildFakeURL = [%raw
  sandbox => {|
      var URL = {
        createObjectURL: sandbox.stub(),
        revokeObjectURL: sandbox.stub()
      };


      URL.createObjectURL.onCall(0).returns("object_url0");
      URL.createObjectURL.onCall(1).returns("object_url1");
      URL.createObjectURL.onCall(2).returns("object_url2");
      URL.createObjectURL.onCall(3).returns("object_url3");
      URL.createObjectURL.onCall(4).returns("object_url4");
      URL.createObjectURL.onCall(5).returns("object_url5");

      window.URL = URL;
  |}
];

let buildFakeAtob = [%raw
  () => {|
    window.atob = (a) => {
        return new Buffer(a, 'base64').toString('binary');
    }
    |}
];

let buildFakeBtoa = [%raw
  () => {|
    window.btoa = (b) => {
        return new Buffer(b).toString('base64');
    }
    |}
];