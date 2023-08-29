import { ErrorMessage, Field } from 'formik'
import Error from './Error'

const Input = ({ label, name, password, ...rest }) => {
  return (
    <div className="mb-3 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest}>
        {({ field, form }) => {
          return (
            <input
              className={`focus:border-accent mb-1 border-b-2 bg-transparent px-3 py-2 outline-none ${
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
