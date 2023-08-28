import { ErrorMessage, Field } from 'formik'
import Error from './Error'

const Input = ({ label, name, password, ...rest }) => {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest}>
        {({ field, form }) => {
          return (
            <input
              className={`bg-transparent focus:border-accent outline-none py-2 px-3 mb-1 border-b-2 ${
                form.errors[name] && form.touched[name]
                  ? 'border-red-300'
                  : 'border-text/10'
              } placeholder:text-text/30`}
              type={password ? 'password' : 'text'}
              {...rest}
              {...field}
            />
          )
        }}
      </Field>
      <ErrorMessage name={name} component={Error} />
    </div>
  )
}

export default Input
