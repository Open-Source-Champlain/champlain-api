import { describe, expect, test } from "bun:test"

describe("/shuttles tests", () => {
    test("Check GET /", async () => {
        const resp = await fetch("http://localhost:3000/shuttles")
        expect(resp.status).toBe(200)
    })
    test("Valid updatedWithin parameter", async () => {
        const resp = await fetch("http://localhost:3000/shuttles?updatedWithin=22")
        expect(resp.status).toBe(200)
    })
    test("Invalid updatedWithin parameter", async () => {
        const resp = await fetch("http://localhost:3000/shuttles?updatedWithin=-22")
        expect(resp.status).toBe(400)
    })
    test("Test invalid id", async () => {
        const resp = await fetch("http://localhost:3000/shuttles/-2")
        expect(resp.status).toBe(404)
    })
    test("Test invalid route", async () => {
        const resp = await fetch("http://localhost:3000/shuttles/999")
        expect(resp.status).toBe(404)
    })
})

