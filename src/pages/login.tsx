import React, { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

interface State {
  email: string;
  password: string;
  isLoading: boolean;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [state, setState] = React.useState<State>({
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
    const { email, password } = state;
    if (email && password) {
      setState({
        ...state,
        isLoading: true,
      });
      axios
        .post(`${process.env.API_URL}/api/customers/token`, {
          username: email,
          password,
        })
        .then((response) => {
          localStorage.setItem('qsd-auth-data', JSON.stringify(response.data.data));
          toast.success('Login Successful!');
          router.push('/');
        })
        .catch(() => {
          setState({
            ...state,
            isLoading: false,
          });
          toast.error('Email/Password Invalid!');
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
            <h4>LOG IN</h4>
          </div>
          <form onSubmit={handleSubmit}>
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
              value={state.isLoading ? 'Please wait...' : 'Log in'}
            />
          </form>

          <div id='formFooter'>
            <Link href='/register'>
              <a className='underlineHover'>SIGN UP</a>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
