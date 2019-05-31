


function convertFieldTypeToJsObjStr(type_) {
  if (type_) {
    return "float";
  } else {
    return "int";
  }
}

function getTypeFromJsObj (jsObj){
      return jsObj.type;
      };

export {
  convertFieldTypeToJsObjStr ,
  getTypeFromJsObj ,
  
}
/* No side effect */
