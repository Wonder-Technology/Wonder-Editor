let registerNoWorkerInitJob = Wonderjs.JobAPI.registerNoWorkerInitJob;

let registerNoWorkerLoopJob = Wonderjs.JobAPI.registerNoWorkerLoopJob;

let execDisposeJob = engineState =>
  engineState |> Wonderjs.DisposeJob.execJob(None);

let execUpdateTransformJob = engineState =>
  engineState |> Wonderjs.UpdateTransformJob.execJob(None);