type textureData = {
  domIndexArr: array(int),
  lastIndex: int,
};

type firstLayer = {
  length: int,
  folderDomIndexArr: array(int),
  jsonDomIndexArr: array(int),
  textureData,
};

type treeNodeIdData = {
  folderNodeIdArr: array(int),
  jsonNodeIdArr: array(int),
  textureNodeIdArr: array(int),
};

type assetTreeTwoLayerType = {
  root: int,
  firstLayer,
  treeNodeIdData,
};