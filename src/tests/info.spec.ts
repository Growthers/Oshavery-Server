import { build } from "../main";
import supertest from "supertest";

describe("Check: Info Router", () => {
  it("/versionが正しいレスポンスを返すか", async () => {
    const fastify = build()
    await fastify.ready()

    const res = await supertest(fastify.server).get("/version");
    await expect(res.statusCode).toBe(200);
    await expect(res.body).toStrictEqual({
      "version": "Oshavery v.0.1.1",
      "revision": ""
    });

  });

  it("うえー", async function() {
    const fastify = build()
    await fastify.ready()

    const res = await supertest(fastify.server).get("/version");
    await expect(res.statusCode).toBe(200);
    await expect(res.body).toStrictEqual({
      "version": "Oshavery v.0.1.1",
      "revision": ""
    });
  });
});

