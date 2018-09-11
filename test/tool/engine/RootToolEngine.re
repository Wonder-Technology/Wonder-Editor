let setRoot = (~width=100, ~height=200, ()) => {
  Wonderjs.Root.root##innerWidth#=width;
  Wonderjs.Root.root##innerHeight#=height;
  (width, height);
};