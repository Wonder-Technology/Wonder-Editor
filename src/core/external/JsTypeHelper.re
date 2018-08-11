[@bs.send] external toFixed : (float, int) => string = "";

/* TODO rename convertXXX */
[@bs.val] external makeStringToInt : string => int = "Number";

[@bs.val] external makeFloatToString : float => string = "String";

[@bs.val] external makeStringToFloat : string => float = "Number";

