import { useEffect, useState } from "react"
import delay from "../utils/delay"

const RequestStatus = Object.freeze({
  Loading: Symbol("loading"),
  Success: Symbol("success"),
  Failure: Symbol("failure"),
})

function useRequestDelay(delayTime, initialData = []) {
  const [data, setData] = useState([])
  const [requestStatus, setRequestStatus] = useState(RequestStatus.Loading)
  const [error, setError] = useState("")

  useEffect(async () => {
    try {
      await delay(delayTime)
      setData(initialData)
      setRequestStatus(RequestStatus.Success)
    } catch (reason) {
      setError(reason)
      setRequestStatus(RequestStatus.Failure)
    }
  }, [])

  async function setDataWithDelay(newData, doneCallback) {
    const backup = [...data]

    try {
      setData(newData)
      await delay(delayTime)
      typeof doneCallback === "function" && doneCallback()
    } catch (reason) {
      setData(backup)
      alert(reason)
    }
  }

  async function updateRecord(recordUpdated, doneCallback) {
    const newData = data.map(record =>
      record.id === recordUpdated.id ? recordUpdated : record
    )
    await setDataWithDelay(newData, doneCallback)
  }

  async function insertRecord(newRecord, doneCallback) {
    await setDataWithDelay([newRecord, ...data], doneCallback)
  }

  async function deleteRecord(recordToDelete, doneCallback) {
    const newData = data.filter(record =>
      record.id !== recordToDelete.id
    )
    await setDataWithDelay(newData, doneCallback)
  }

  return {
    data,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  }
}

export default useRequestDelay
export { RequestStatus }