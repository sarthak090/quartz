import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function ContactForm() {
  const [fullName, setFullName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fullName && companyName && email && phone && message) {
      setLoading(true);
      axios
        .post(`${process.env.API_URL}/api/contact`, {
          fullName,
          companyName,
          email,
          phone,
          message,
        })
        .then(() => {
          // setFullName('');
          // setCompanyName('');
          // setEmail('');
          // setPhone('');
          // setMessage('');
          setLoading(false);
          toast.success('Query Submitted Successfully!');
        })
        .catch(() => {
          setLoading(false);
          toast.error('Something went wrong!');
        });
    } else {
      toast.error('All Fields are required!');
    }
  };

  return (
    <div className='contact-form'>
      <h1>Contact US</h1>
      <div className='form-container'>
        <form onSubmit={_handleSubmit}>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label htmlFor='fullName' className='form-input-label'>
                  Full Name
                </label>
                <input
                  value={fullName}
                  type='text'
                  id='fullName'
                  className='form-control contact-form-input'
                  placeholder='Alex'
                  onChange={(event) => setFullName(event?.target.value)}
                  disabled={loading}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email' className='form-input-label'>
                  Email
                </label>
                <input
                  value={email}
                  type='email'
                  id='email'
                  className='form-control contact-form-input'
                  placeholder='Abc@gmail.com'
                  onChange={(event) => setEmail(event?.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label htmlFor='companyName' className='form-input-label'>
                  Company Name
                </label>
                <input
                  value={companyName}
                  type='text'
                  id='companyName'
                  className='form-control contact-form-input'
                  placeholder='Abc Ltd'
                  onChange={(event) => setCompanyName(event?.target.value)}
                  disabled={loading}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='phoneNumber' className='form-input-label'>
                  Phone Number
                </label>
                <input
                  value={phone}
                  type='text'
                  id='phoneNumber'
                  className='form-control contact-form-input'
                  placeholder='36473675637'
                  onChange={(event) => setPhone(event?.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <label htmlFor='message' className='form-input-label'>
                  Your Message
                </label>
                <textarea
                  value={message}
                  className='form-control contact-form-input'
                  id='message'
                  rows={3}
                  onChange={(event) => setMessage(event?.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          {/* <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <label htmlFor='capchta' className='form-input-label'>
                Which is bigger, 2 or 7?
              </label>
              <input type='text' id='capchta' className='form-control contact-form-input' />
              </div>
            </div>
          </div> */}
          <button className='btn btn-submit' type='submit' disabled={loading}>
            {loading ? 'Please wait...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
