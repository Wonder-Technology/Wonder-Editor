let _isNameEqual = (name1, name2, isDefaultNameFunc) =>
  isDefaultNameFunc(name1) && isDefaultNameFunc(name2) ?
    true : name1 == name2;

let isNameEqual =
    (name1, component2, (getNameFunc, isDefaultNameFunc), engineState) =>
  switch (name1, getNameFunc(component2, engineState)) {
  | (Some(name1), Some(name2)) =>
    _isNameEqual(name1, name2, isDefaultNameFunc)
  | (None, None) => true
  | _ => false
  };