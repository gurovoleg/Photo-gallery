import React from 'react'
import { withFormik, ErrorMessage } from 'formik'
import { Card, Form } from 'semantic-ui-react'
import * as Yup from 'yup'
import { Redirect } from 'react-router-dom'
// import { showLoading, resetLoading } from 'react-redux-loading-bar'
import { connect } from 'react-redux'
import { actions } from 'Reducers/auth'

const Message = props => <div style={{ color: 'red' }}>{props.children}</div>

const LoginFormComponent = (props) => {
  const { handleSubmit, isSubmitting, errors, touched, handleChange, values, user } = props

  if (user.token) {
    return <Redirect to="/" />
  }

  return (
    <Card>
      <Card.Content header="Авторизация" />
      <Card.Content>
        <Form onSubmit={handleSubmit} loading={isSubmitting} error>
          <Form.Group grouped>
            <Form.Input
              error={errors.email !== undefined && errors.email !== '' && touched.email}
              name="email"
              placeholder="test@test.ru"
              onChange={handleChange}
              value={values.email} />
            <ErrorMessage name="email" component={Message} />
          </Form.Group>
          <Form.Group grouped>
            <Form.Input
              error={errors.password !== undefined && errors.password !== '' && touched.password}
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={values.password} />
            <ErrorMessage name="password" component={Message} />
          </Form.Group>
          <Form.Button
            primary
            type="submit"
            disabled={values.email === '' || values.password === '' || isSubmitting}>
            Войти
          </Form.Button>
        </Form>
      </Card.Content>
    </Card>
  )
}

const LoginForm = withFormik({
  mapPropsToValues (props) {
    return {
      email: props.email || 'test@test.ru',
      password: props.password || 'password'
    }
  },
  handleSubmit ({ password, email }, formikBag) {
    formikBag.props.login({ password, email }, formikBag, true)
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Неверный формат email').required('Необходимо ввести email'),
    password: Yup.string().min(5, 'Пароль должен быть не менее 5 символов').required('Необходимо ввести пароль')
  })
})(LoginFormComponent)

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, actions)(LoginForm)
