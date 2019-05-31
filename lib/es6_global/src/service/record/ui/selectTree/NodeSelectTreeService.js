


function getNodeId(node) {
  return node[0];
}

function getNodeName(node) {
  if (node.tag) {
    return node[1][/* name */1];
  } else {
    return node[1][/* name */0];
  }
}

export {
  getNodeId ,
  getNodeName ,
  
}
/* No side effect */
