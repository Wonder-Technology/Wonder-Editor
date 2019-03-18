


function buildFakeLoadImage (param){
        window.loadImageBase64_wonder = function(base64Str, resolve, reject){
            resolve(base64Str)
        }

        window.loadImageBlob_wonder = function(objectUrl, errorInfo, resolve, reject){
            resolve({src: objectUrl })
        }

    };

function convertUint8ArrayToBuffer (uint8Array){
    {
         var buf = new Buffer(uint8Array.byteLength);

         for (var i = 0; i < buf.length; ++i) {
             buf[i] = uint8Array[i];
         }

         return buf;
     }
    };

function buildFakeTextDecoder (convertUint8ArrayToBufferFunc){
      var TextDecoder = function(utfLabel){
      };

      TextDecoder.prototype.decode = (uint8Array) => {
        var buffer = convertUint8ArrayToBufferFunc(uint8Array);

        return buffer.toString("utf8");
      };

      window.TextDecoder = TextDecoder;
  };

function buildFakeTextEncoder (param){
       var TextEncoder = function(){
       };

       TextEncoder.prototype.encode = (str) => {
         var buffer = Buffer.from(str, "utf8");

         return buffer;
       };

       window.TextEncoder = TextEncoder;
   };

function buildFakeURL (sandbox){
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
  };

function buildFakeAtob (param){
    window.atob = (a) => {
        return new Buffer(a, 'base64').toString('binary');
    }
    };

function buildFakeBtoa (param){
    window.btoa = (b) => {
        return new Buffer(b).toString('base64');
    }
    };

function buildFakeBlob (param){
var Blob = function(arrayBufferArr, param){
if( typeof window.blobData_wonder_forTest === "undefined"){
window.blobData_wonder_forTest = [
[arrayBufferArr[0], param]
];
} else{
window.blobData_wonder_forTest.push(
[arrayBufferArr[0], param]
);
}
};

window.Blob = Blob;
};

function getBlobData (param){
return window.blobData_wonder_forTest;
};

function clearBlobData (param){
delete window.blobData_wonder_forTest;
};

export {
  buildFakeLoadImage ,
  convertUint8ArrayToBuffer ,
  buildFakeTextDecoder ,
  buildFakeTextEncoder ,
  buildFakeURL ,
  buildFakeAtob ,
  buildFakeBtoa ,
  buildFakeBlob ,
  getBlobData ,
  clearBlobData ,
  
}
/* No side effect */
