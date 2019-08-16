open UserDataType;

let getUserId = ({userId}) => userId;

let setUserId = (userId, record) => {...record, userId};

let getUserName = ({userName}) => userName;

let setUserName = (userName, record) => {...record, userName};

let getHashCode = ({hashCode}) => hashCode;

let setHashCode = (hashCode, record) => {...record, hashCode};

let getEmail = ({email}) => email;

let setEmail = (email, record) => {...record, email};

let getCurrentRepo = ({currentRepo}) => currentRepo;

let setCurrentRepo = (currentRepo, record) => {...record, currentRepo};

let getUserRepos = ({userRepos}) => userRepos;

let setUserRepos = (userRepos, record) => {...record, userRepos};