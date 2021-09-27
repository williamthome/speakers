import { useEffect, useState } from "react"
import axios from "axios"
import genShortId from "../utils/genShortId"

const RequestStatus = Object.freeze({
  Loading: Symbol("loading"),
  Success: Symbol("success"),
  Failure: Symbol("failure"),
})

const restUrl = "api/speakers"
const restUrlById = (id) => `${restUrl}/${id}`

function useRequestRest() {
  const [data, setData] = useState([])
  const [requestStatus, setRequestStatus] = useState(RequestStatus.Loading)
  const [error, setError] = useState("")

  useEffect(async () => {
    try {
      const result = await axios.get(restUrl)
      if (result.status > 299) throw result.data
      setData(result.data)
      setRequestStatus(RequestStatus.Success)
    } catch (reason) {
      setError(reason)
      setRequestStatus(RequestStatus.Failure)
    }
  }, [])

  async function updateRecord(recordUpdated, doneCallback) {
    const backup = [...data]

    const newData = data.map(record =>
      record.id === recordUpdated.id ? recordUpdated : record
    )

    try {
      setData(newData)
      const result = await axios.put(restUrlById(recordUpdated.id), recordUpdated)
      if (result.status > 299) throw result.data
      typeof doneCallback === "function" && doneCallback()
    } catch (reason) {
      setData(backup)
      alert(reason)
    }
  }

  async function insertRecord(newRecord, doneCallback) {
    const backup = [...data]

    newRecord.id = genShortId()

    const newData = [newRecord, ...data]

    try {
      setData(newData)
      const result = await axios.post(restUrl, newRecord)
      if (result.status > 299) throw result.data
      typeof doneCallback === "function" && doneCallback()
    } catch (reason) {
      setData(backup)
      alert(reason)
    }
  }

  async function deleteRecord(recordToDelete, doneCallback) {
    const newData = data.filter(record =>
      record.id !== recordToDelete.id
    )

    try {
      setData(newData)
      const result = await axios.delete(restUrlById(recordToDelete.id))
      if (result.status > 299) throw result.data
      typeof doneCallback === "function" && doneCallback()
    } catch (reason) {
      setData(backup)
      alert(reason)
    }
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

export default useRequestRest
export { RequestStatus }