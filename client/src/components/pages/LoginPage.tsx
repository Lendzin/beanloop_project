import React, {useState} from 'react'
import styled from 'styled-components'
import {Redirect} from 'react-router-dom'
import Card, {CardProps} from '@material-ui/core/Card'
import {TextField, Button, CardContent, Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import {signIn} from '../../actions/userActions'
import {showNotification} from '../../actions/appActions'

const StyledCard = styled(Card)`
  max-width: 350px;
  margin: 0 auto;
  margin-top: 250px;
` as React.ComponentType<CardProps>

const LoginPage = (props: any) => {
  const {signIn, isAuthenticated, showNotification} = props

  const [username, setUsername] = useState({
    value: 'login_unchanged_works',
    error: '',
  })
  const [password, setPassword] = useState({
    value: 'password_unchanged_works',
    error: '',
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    setUsername({
      ...username,
      error: !username.value.trim() ? 'Please enter username.' : '',
    })

    setPassword({
      ...password,
      error: !password.value.trim() ? 'Please enter password.' : '',
    })

    const correctCredentials = await signIn(username.value, password.value)

    if (!correctCredentials) {
      showNotification('Invalid Username or Password', 'error', 3000)
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/manage' />
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant='h4' align='center'>
          Login
        </Typography>

        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            id='username'
            error={Boolean(username.error)}
            helperText={username.error}
            value={username.value}
            label='Username'
            margin='normal'
            variant='outlined'
            fullWidth
            onChange={({target}) =>
              setUsername({...username, value: target.value})
            }
          />

          <TextField
            id='password'
            error={Boolean(password.error)}
            helperText={password.error}
            value={password.value}
            label='Password'
            margin='normal'
            type='password'
            variant='outlined'
            fullWidth
            onChange={({target}) =>
              setPassword({...password, value: target.value})
            }
          />

          <Button variant='contained' color='primary' fullWidth type='submit'>
            Login
          </Button>
        </form>
      </CardContent>
    </StyledCard>
  )
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.user.isAuthenticated,
})

const ConnectedComponent = connect(mapStateToProps, {signIn, showNotification})(
  LoginPage
)

export {ConnectedComponent as LoginPage}
