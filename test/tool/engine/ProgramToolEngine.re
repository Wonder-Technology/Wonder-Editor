let getProgram = (shaderIndex, engineState: Wonderjs.StateDataMainType.state) =>
  Wonderjs.ProgramService.unsafeGetProgram(
    shaderIndex,
    engineState.programRecord,
  );