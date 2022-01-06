import { default as Update } from "./update";

describe("Service/Channel/Update", () => {
  it("Should Update Channel", async function () {
    const data = {
      name: "TEST",
      topic: "TEST-CHANNEL",
      position: 5,
      id: "00000000-0000-0000-0000-000000000000",
    };

    const res = await Update(data);
    expect(res).toEqual({
      id: expect.anything(),
      name: data.name,
      topic: data.topic,
      position: data.position,
      type: expect.anything(),
      latest_message_id: expect.anything(),
      created_at: expect.anything(),
      updated_at: expect.anything(),
      deleted_at: null,
      guildId: null,
    });
  });

  it("Should not Update Channel", async function () {
    const data = {
      name: "",
      topic: "",
      position: 0,
      id: "00000000-0000-0000-0000-000000000000",
    };

    const res = await Update(data);
    expect(res).toBeFalsy();
  });
});
