let _isEmpty = msg => msg |> Js.String.length === 0;

let _isNotEmpty = msg => msg |> Js.String.length > 0;

let _buildMessage = (description, reason, solution, params) => {
  let message = "";

  let message =
    _isNotEmpty(description)
    && _isEmpty(reason)
    && _isEmpty(solution)
    && _isEmpty(params) ?
      message ++ description :
      {
        let message =
          _isNotEmpty(description) ?
            message ++ {j|description
    $description|j} : message;

        let message =
          _isNotEmpty(reason) ?
            message ++ {j|
    reason
    $reason|j} : message;

        let message =
          _isNotEmpty(solution) ?
            message ++ {j|
    solution
    $solution|j} : message;
        let message =
          _isNotEmpty(params) ?
            message ++ {j|
    params
    $params|j} : message;

        message;
      };

  message;
};

let buildFatalMessage = (~description, ~reason, ~solution, ~params) =>
  _buildMessage(description, reason, solution, params);

let buildErrorMessage = (~description, ~reason, ~solution, ~params) =>
  _buildMessage(description, reason, solution, params);