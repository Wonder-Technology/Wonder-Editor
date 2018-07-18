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

type secondLayer ={
  layerRoot:int,
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

type assetTreeThreeLayerType = {
  root: int,
  firstLayer,
  secondLayer,
  treeNodeIdData,
};