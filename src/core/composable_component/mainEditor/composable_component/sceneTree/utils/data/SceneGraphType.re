type sceneTreeNodeType = {
  name: string,
  uid: int,
  isShowChildren:bool,
  children: array(sceneTreeNodeType)
};