import { useState } from "react";

function useTheme(initialTheme) {
  const [theme, setTheme] = useState(initialTheme)

  function validateTheme(payload) {
    if (!["light", "dark"].includes(payload))
      throw new Error("Invalid theme value")

    setTheme(payload)
  }

  return {
    theme,
    setTheme: validateTheme
  }
}

export default useTheme
