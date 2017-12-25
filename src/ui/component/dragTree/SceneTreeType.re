type treeNone = {
  name: string,
  uid: int,
  children: array(treeNone)
};

type dragInfo = {
  targetId: int,
  dragedId: int
};