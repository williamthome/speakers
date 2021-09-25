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

  async function setDataWithDelay(newData) {
    try {
      await delay(delayTime)
      setData(newData)
      setRequestStatus(RequestStatus.Success)
    } catch (reason) {
      setError(reason)
      setRequestStatus(RequestStatus.Failure)
    }
  }

  useEffect(() => setDataWithDelay(initialData), [])

  function updateRecord(recordUpdated) {
    const dataUpdated = data.map(record =>
      record.id === recordUpdated.id ? recordUpdated : record
    )

    setDataWithDelay(dataUpdated)
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