/* let floatToString = (value: float) => JsTypeHelper.convertFloatToString(value); */
let floatToString = (value: float) => "" ++ Obj.magic(value);

let intToString = (value: int) => "" ++ Obj.magic(value);