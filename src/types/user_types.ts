export type User = {
  id: string;
  name: string;
  avatar: string;
  bot: boolean;
  state: number;
};

export type Register = {
  name: string;
  password: string;
};

export type userIdParams = {
  id: string;
};

export type updateMeAccountInfo = {
  name: string;
};
