import { prisma } from "./client";

export async function revokeUserToken(token: string) {
  console.log(token, token.length);
  return await prisma.revokedtokens.create({
    data: {
      token: token,
    },
  });
}

// トークンが無効化されていないかチェックするlen(0)が帰ってくるとそのトークンは有効->trueを返す
export async function checkUserTokenNotRevoked(
  token: string
): Promise<boolean> {
  const find = await prisma.revokedtokens.findMany({
    where: {
      token: token,
    },
  });

  if (find.length == 0) {
    return true;
  } else {
    return false;
  }
}
