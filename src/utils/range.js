const range = (min, max) => Array.from(
  { length: max },
  (_, i) => i + min
)

export default range
