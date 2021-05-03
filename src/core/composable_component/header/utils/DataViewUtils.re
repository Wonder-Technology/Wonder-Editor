open Js.Typed_array;

let create = arrayBuffer => DataView.make(arrayBuffer);

let getFloat =
  (. offset, dataView) => (
    DataView.getFloat32LittleEndian(dataView, offset),
    offset + 4,
  );

let getUint32_1 =
  (. offset, dataView) => (
    DataView.getUint32LittleEndian(dataView, offset),
    offset + 4,
  );

let getUint8_1 = (offset, dataView) => (
  DataView.getUint8(dataView, offset),
  offset + 1,
);

let writeUint8_1 =
  (. value, offset, dataView) => {
    DataView.setUint8(dataView, offset, value);

    offset + 1;
  };

let writeUint32_1 = (value, offset, dataView) => {
  DataView.setUint32LittleEndian(dataView, offset, value);

  offset + 4;
};