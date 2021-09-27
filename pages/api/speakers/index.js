import { resolve } from "path"
import { readFile } from "fs/promises"

export default async function handler(_req, res) {
  try {
    const dbFile = resolve("./", "db.json")
    const dbData = await readFile(dbFile)
    const { speakers } = JSON.parse(dbData)

    if (!speakers)
      throw "Could not find speakers in db file."

    res.setHeader("Content-type", "application/json")
    res.status(200).send(JSON.stringify(speakers, null, 2))
    console.log("GET /api/speakers status: 200")
  } catch (reason) {
    console.error("GET /api/speakers status: 404", reason)
    res.status(404).send("Speakers database file not found.")
  }
}