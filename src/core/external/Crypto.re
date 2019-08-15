let getHashValue: Js.Typed_array.ArrayBuffer.t => Js.Promise.t(string) = [%raw
  buffer => {j|
      return crypto.subtle.digest("SHA-256", buffer)
      .then(hash => {
          let result = "";
          const view = new DataView(hash);
          for (let i = 0; i < hash.byteLength; i += 4) {
              result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
          }
          return result;
      });
      |j}
];