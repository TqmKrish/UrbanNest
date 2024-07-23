import { UserInfo, demoUsers } from "../DB/users";

export const ifUserExists = (info: string) => {
  const credentials = JSON.parse(info);
  const user = demoUsers.find((user: UserInfo) => {
    return (
      (user.email === credentials.username ||
        user.username === credentials.username) &&
      user.password === credentials.password
    );
  });
  return user;
};
