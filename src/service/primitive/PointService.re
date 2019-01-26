let projectPointToLine = (point, lineStartPos, lineDirection) =>
  Wonderjs.Vector3Service.add(
    Wonderjs.Vector3Type.Float,
    lineStartPos,
    Vector3Service.projectOnVector(
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        point,
        lineStartPos,
      ),
      lineDirection,
    ),
  );