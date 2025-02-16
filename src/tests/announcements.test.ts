import { describe, expect, test } from "bun:test"

describe("/announcements tests", () => {
    test("GET / returns a 200", async () => {
        const resp = await fetch("http://localhost:3000/announcements")
        expect(resp.status).toBe(200)
    })
    test("Test invalid announcement id", async () => {
        const resp = await fetch("http://localhost:3000/announcements/-22")
        expect(resp.status).toBe(404)
    })
    test("Test invalid route", async () => {
        const resp = await fetch("http://localhost:3000/announcements/invalid/route/../route")
        expect(resp.status).toBe(404)
    })

})