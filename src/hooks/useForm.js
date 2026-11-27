import { useState } from 'react'

// Custom hook form: controlled values + validasi + touched state.
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))
  const touchAll = () => setTouched(Object.fromEntries(Object.keys(initialValues).map((k) => [k, true])))
  const reset = () => { setValues(initialValues); setTouched({}) }

  return { values, errors, touched, isValid, handleChange, handleBlur, touchAll, reset }
}
