open BlobType;

let newBlobFromArrayBuffer = [%raw
  (arrayBuffer, type_) => {|
return new Blob([arrayBuffer], {type: type_})
  |}
];

let createObjectURL = [%raw
  blob => {|
     return URL.createObjectURL( blob )
    |}
];

let revokeObjectURL = [%raw
  blob => {|
     URL.revokeObjectURL( blob );
    |}
];