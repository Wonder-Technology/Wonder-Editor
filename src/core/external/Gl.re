open WonderWebgl.GlType;

[@bs.get] external getBlend : webgl1Context => int = "BLEND";

[@bs.get] external getSrcAlpha : webgl1Context => int = "SRC_ALPHA";

[@bs.get]
external getOneMinusSrcAlpha : webgl1Context => int = "ONE_MINUS_SRC_ALPHA";

[@bs.send.pipe: webgl1Context] external blendFunc : (int, int) => unit = "";