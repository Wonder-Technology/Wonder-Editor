let getProgram = (shaderIndex, engineState: Wonderjs.StateDataMainType.state) =>
  Wonderjs.AllProgramService.unsafeGetProgram(
    shaderIndex,
    engineState.programRecord,
  );