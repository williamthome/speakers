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

  useEffect(() => {
    async function setDataWithDelay() {
      try {
        await delay(delayTime)
        setData(initialData)
        setRequestStatus(RequestStatus.Success)
      } catch (reason) {
        setError(reason)
        setRequestStatus(RequestStatus.Failure)
      }
    }

    setDataWithDelay()
  }, [])

  function updateRecord(recordUpdated, doneCallback) {
    const originalRecords = [...data]

    const dataUpdated = data.map(record =>
      record.id === recordUpdated.id ? recordUpdated : record
    )

    async function setDataWithDelay() {
      try {
        setData(dataUpdated)
        await delay(delayTime)
        typeof doneCallback === "function" && doneCallback()
      } catch (reason) {
        setData(originalRecords)
        alert(reason)
      }
    }

    setDataWithDelay()
  }

  return {
    data,
    requestStatus,
    error,
    updateRecord,
  }
}

export default useRequestDelay
export { RequestStatus }