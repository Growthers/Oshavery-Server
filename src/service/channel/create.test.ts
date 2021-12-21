import { default as Create } from "./create";

describe("Service/Channel/Create", () => {
  it("should create channel", async function () {
    const data = {
      name: "Test Channel",
      topics: "Testing",
      type: "TEXT",
      position: 0,
      guildId: "00000000-0000-0000-0000-000000000000",
    };

    const res = await Create(data);
    expect(res).toEqual({
      id: expect.anything(),
      name: data.name,
      type: data.type,
      topic: data.topics,
      position: data.position,
      latest_message_id: expect.anything(),
      created_at: expect.anything(),
      updated_at: expect.anything(),
      deleted_at: null,
      guildId: data.guildId,
    });
  });

  it("should not create channel", async () => {
    const data = {
      name: "Test Channel",
      topics: "Testing",
      type: "a",
      position: 0,
      guildId: "00000000-0000-0000-0000-000000000000",
    };

    const res = await Create(data);
    expect(res).toBeFalsy();
  });
});
