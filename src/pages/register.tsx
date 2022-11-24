import React, { Fragment } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isLoading: boolean;
}

const SignUp: React.FC = () => {
  const [state, setState] = React.useState<State>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isLoading: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = state;
    if (firstName && lastName && email && password) {
      if (password.length < 8) {
        toast.error('Password must be contain atleast 8 characters!');
        return;
      }
      setState({
        ...state,
        isLoading: true,
      });
      axios
        .post(`${process.env.API_URL}/api/customers`, {
          data: { firstName, lastName, email, password },
        })
        .then(() => {
          setState({
            ...state,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            isLoading: false,
          });
          toast.success('Registered Successfully. Please Login!');
        })
        .catch((error) => {
          setState({
            ...state,
            isLoading: false,
          });
          if (error.response.status) {
            toast.error('An account is already registered with your email address!');
          } else {
            toast.error('Something went wrong!');
          }
        });
    } else {
      toast.error('All fields are Required!');
    }
  };

  return (
    <Fragment>
      <div className='wrapper fadeInDown'>
        <div id='formContent'>
          <div className='fadeIn first'>
            <h4>SIGN UP</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              required
              type='text'
              id='firstName'
              className='fadeIn second'
              name='firstName'
              placeholder='Enter First Name'
              onChange={handleChange}
            />
            <input
              required
              type='text'
              id='lastName'
              className='fadeIn second'
              name='lastName'
              placeholder='Enter Last Name'
              onChange={handleChange}
            />
            <input
              required
              type='email'
              id='email'
              className='fadeIn second'
              name='email'
              placeholder='Enter Email'
              onChange={handleChange}
            />
            <input
              required
              type='password'
              id='password'
              className='fadeIn third'
              name='password'
              placeholder='Enter Password'
              onChange={handleChange}
            />
            <input
              type='submit'
              className='fadeIn fourth'
              value={state.isLoading ? 'Please wait...' : 'Sign up'}
            />
          </form>

          <div id='formFooter'>
            <Link href='/login'>
              <a className='underlineHover'>LOG IN</a>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
