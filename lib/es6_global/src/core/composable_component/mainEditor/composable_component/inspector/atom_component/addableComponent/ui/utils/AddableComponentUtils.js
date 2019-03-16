


function isNeedUpdateSceneTree(type_) {
  if (type_ === /* CameraGroup */4) {
    return true;
  } else {
    return type_ === /* Light */5;
  }
}

export {
  isNeedUpdateSceneTree ,
  
}
/* No side effect */
