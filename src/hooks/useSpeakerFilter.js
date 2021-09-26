import { useState } from "react";

const EventYears = Object.freeze([
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
])

function useSpeakerFilter(initialShowSessions, initialEventYear) {
  const [showSessions, setShowSessions] = useState(initialShowSessions)
  const [eventYear, setEventYear] = useState(initialEventYear)
  const [searchQuery, setSearchQuery] = useState("")

  function validateEventYear(year) {
    if (year !== "all" && !EventYears.includes(year))
      throw new Error("Invalid event year")

    setEventYear(year)
  }

  return {
    showSessions, setShowSessions,
    eventYear, setEventYear: validateEventYear,
    searchQuery, setSearchQuery,
  }
}

export default useSpeakerFilter
export { EventYears }