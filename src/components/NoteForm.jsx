import useForm from '../hooks/useForm'
import FormField from './FormField'

const initial = { name: '', rating: '5', message: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Nama wajib diisi.'
  else if (v.name.trim().length < 3) e.name = 'Nama minimal 3 karakter.'
  if (!v.message.trim()) e.message = 'Catatan wajib diisi.'
  else if (v.message.trim().length < 10) e.message = 'Catatan minimal 10 karakter.'
  else if (v.message.length > 200) e.message = 'Catatan maksimal 200 karakter.'
  return e
}

export default function NoteForm({ onSubmit }) {
  const { values, errors, touched, isValid, handleChange, handleBlur, touchAll, reset } = useForm(initial, validate)

  const submit = (e) => {
    e.preventDefault()
    touchAll()
    if (!isValid) return
    onSubmit({ name: values.name.trim(), rating: Number(values.rating), message: values.message.trim() })
    reset()
  }

  return (
    <form className="note-form" onSubmit={submit} noValidate>
      <FormField label="Nama" name="name" error={errors.name} touched={touched.name}>
        <input id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Nama kamu" />
      </FormField>
      <FormField label="Rating" name="rating">
        <select id="rating" name="rating" value={values.rating} onChange={handleChange}>
          {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{'★'.repeat(r)} ({r})</option>)}
        </select>
      </FormField>
      <FormField label="Catatan / ulasan" name="message" error={errors.message} touched={touched.message}>
        <textarea id="message" name="message" rows="3" value={values.message} onChange={handleChange} onBlur={handleBlur} placeholder="Tulis catatan tentang produk ini…" />
        <small className="hint">{values.message.length}/200</small>
      </FormField>
      <button type="submit" className="btn btn-primary">Simpan catatan</button>
    </form>
  )
}
