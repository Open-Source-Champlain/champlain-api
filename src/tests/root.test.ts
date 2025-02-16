import { describe, expect, test } from "bun:test"

describe("/ tests", () => {
    test("GET / returns 200", async () => {
        const resp = await fetch("http://localhost:3000/")
        expect(resp.status).toBe(200)
    })
    test("Test invalid route", async () => {
        const resp = await fetch("http://localhost:3000/invalid-route")
        expect(resp.status).toBe(404)
    })
})

