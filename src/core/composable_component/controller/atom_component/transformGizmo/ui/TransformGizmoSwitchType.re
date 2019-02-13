type type_ = SceneViewType.gizmo;

type onChangeFunc = type_ => unit;

type item = {
  type_,
  onChangeFunc,
};

type data = array(item);