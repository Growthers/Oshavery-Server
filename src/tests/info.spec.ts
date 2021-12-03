import { build } from "../main";
import supertest from "supertest";

describe("Check: Info Router", () => {
  it("/versionが正しいレスポンスを返すか", async () => {
    const fastify = build();
    await fastify.ready();

    const res = await supertest(fastify.server).get("/version");
    await expect(res.statusCode).toBe(200);
    await expect(res.body).toStrictEqual({
      version: "Oshavery v.0.1.3",
      revision: "",
    });
  });

  it("インスタンス情報を登録できるか", async function () {
    const fastify = build();
    await fastify.ready();

    const res = await supertest(fastify.server)
      .post("/server-info")
      .type("application/json")
      .send({
        name: "string",
        admin: {
          account: "string",
          mail: "string",
        },
        tos: "string",
        privacy_policy: "string",
      });

    await expect(res.statusCode).toBe(201);
    expect(res.body).toStrictEqual({
      name: "string",
      admin: {
        account: "string",
        mail: "string",
      },
      tos: "string",
      privacy_policy: "string",
      user_count: 0,
      message_count: 0,
    });
  });
});
