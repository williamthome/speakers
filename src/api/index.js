import { resolve } from "path"
import { readFile, writeFile } from "fs/promises"

function dbFile() {
  return resolve("./", "db.json")
}

async function getDbData() {
  const data = await readFile(dbFile())
  return JSON.parse(data, null, 2)
}

async function setDbData(data) {
  await writeFile(
    dbFile(),
    JSON.stringify(data, null, 2)
  )
}

export async function restoreDbFromBackup() {
  const backupFile = resolve("./", "db_backup.json")
  const backup = await readFile(backupFile)
  const backupData = JSON.parse(backup, null, 2)
  await setDbData(backupData)
  return backupData
}

export async function getDbSpeakersData() {
  const { speakers } = await getDbData()
  return speakers
}

export async function setDbSpeakersData(speakers) {
  await setDbData({ speakers })
}