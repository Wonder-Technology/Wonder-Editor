let stubCrypto = [%bs.raw
  {|
    function(){
      window.crypto = {
          subtle:{
              digest: function(value, buffer){
                return Promise.resolve(new ArrayBuffer(32))
              }
          }
      }
    }
 |}
];