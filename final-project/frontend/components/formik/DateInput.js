import { ErrorMessage, Field } from 'formik'
import Error from './Error'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateInput = ({ label, name, password, ...rest }) => {
  return (
    <div className="mb-3 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest}>
        {({ field, form }) => {
          return (
            <DatePicker
              todayButton="Today"
              showTimeSelect
              showTimeInput
              showPopperArrow={false}
              dateFormat="MMMM d, yyyy h:mm aa"
              className={`focus:border-accent mb-1 w-full border-b-2 bg-transparent px-3 py-2 outline-none ${
                form.errors[name] && form.touched[name]
                  ? 'border-red-500'
                  : 'border-text/10'
              } placeholder:text-text/30`}
              {...rest}
              {...field}
              selected={(field.value && new Date(field.value)) || null}
              onChange={val => {
                form.setFieldValue(name, val)
              }}
            />
          )
        }}
      </Field>
      <ErrorMessage name={name} component={Error} />
    </div>
  )
}

export default DateInput
