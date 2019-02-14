type coordinateSystem = SceneViewType.coordinateSystem;

type onChangeFunc = coordinateSystem => unit;

type item = {
  coordinateSystem,
  onChangeFunc,
};

/* type data = array(item); */