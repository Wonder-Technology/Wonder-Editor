open BlobType;

let slice: (int, int, blob) => blob = [%raw
  (start, end_, blob) => {|
   return blob.slice( start, end_)
  |}
];

let newBlobFromArrayBuffer = [%raw
  (arrayBuffer, type_) => {|
    return new Blob([arrayBuffer], {type: type_})
  |}
];

let createObjectURL: blob => string = [%raw
  blob => {|
     return URL.createObjectURL( blob )
    |}
];

let revokeObjectURL = [%raw
  blob => {|
     URL.revokeObjectURL( blob );
    |}
];