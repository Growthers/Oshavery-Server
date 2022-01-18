import { default as getChannels } from "./get";

describe("Service/Channel/Get", () => {
  it("should get channels", async function () {
    const res = await getChannels("00000000-0000-0000-0000-000000000000");
    expect(res).toBeTruthy();
  });

  it("should not get channel", async () => {
    const res = await getChannels("");
    expect(res).toBeFalsy();
  });
});
