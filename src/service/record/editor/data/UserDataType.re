type repoRecord = {
  id: int,
  name: string,
  description: string,
  filePath: string,
};

/* type userDataRecord = {
     userId: option(int),
     userName: option(string),
     hashCode: option(string),
     email: option(string),
     currentRepo: option(repoRecord),
     userRepos: option(array(repoRecord)),
   }; */

type userDataRecord = {
  userId: int,
  userName: string,
  hashCode: string,
  email: string,
  currentRepo: repoRecord,
  userRepos: array(repoRecord),
};