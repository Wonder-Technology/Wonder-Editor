let convertFieldTypeToJsObjStr = type_ =>
  Wonderjs.(
    ScriptAttributeType.(
      switch (type_) {
      | Int => "int"
      | Float => "float"
      | type_ =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="convertFieldTypeToJsObjStr",
            ~description={j|unknown type: $type_|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        )
      }
    )
  );

let getTypeFromJsObj = [%bs.raw jsObj => {|
      return jsObj.type;
      |}];