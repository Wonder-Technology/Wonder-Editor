type basicMaterialData = {
  color: array(float),
  map: option(int),
};

type lightMaterialData = {
  diffuseColor: array(float),
  diffuseMap: option(int),
  shininess: float,
};