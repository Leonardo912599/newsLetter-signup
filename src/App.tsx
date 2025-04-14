import { Container, Box, Typography, useMediaQuery, useTheme, TextField, Button } from '@mui/material'
import React, { useState } from 'react';

const App = () => {

  type ErrorState = {
    error: boolean;
    message: string;
  };

  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<ErrorState>({
    error: false,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState<Boolean>(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const emailValidation = (email: string) => {

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailValidation(email)) {
      setError({
        error: true,
        message: "Valid email required",
      });
      return;
    } else {
      setIsSuccess(true)
    }
    console.log('email')
    setError({
      error: false,
      message: "",
    });
  }

  return (

    <Container disableGutters maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '100vw', backgroundColor: 'hsl(235, 18%, 26%)' }}>
      {
        isSuccess === false ? (
          <Box sx={{
            display: 'flex',
            justifyContent: { xs: 'start', sm: 'center' },
            alignItems: 'center',
            flexDirection: {
              xs: 'column-reverse',
              sm: 'row'
            },
            minHeight: {
              xs: '100vh',
              sm: 500,
            },
            width: {
              xs: '100%',
              sm: 700
            },
            backgroundColor: 'hsl(0, 0%, 100%)',
            borderRadius: {
              xs: 0,
              sm: 7
            },
            p: {
              xs: 0,
              sm: 2
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center', flexDirection: 'column', pl: 2, pr: 4, py: { xs: 4, sm: 0 } }}>
              <Typography my={2} color='hsl(234, 29%, 20%)' fontSize={40} fontWeight={'bold'} variant='h4' component={'h6'}>Stay updated!</Typography>
              <Typography variant='body1'>Join 60,000+ product managers receiving monthly updates on:</Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'start', my: { xs: 5, sm: 3 } }}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Box component={'img'} src='/icon-list.svg' />
                  <Typography variant='body2'>Product discovery and building what matters</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Box component={'img'} src='/icon-list.svg' />
                  <Typography variant='body2'>Measuring to ensure updates are a success</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Box component={'img'} src='/icon-list.svg' />
                  <Typography variant='body2'>And much more!</Typography>
                </Box>
              </Box>
              <Box onSubmit={handleSubmit} component={'form'} sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography mb={1} variant='body2'>Email address</Typography>
                  {error.error && <Typography variant='body2' color='hsl(4, 100%, 67%)'>Valid email required</Typography>}
                </Box>
                <TextField onChange={(e) => setEmail(e.target.value)} error={error.error} variant='outlined' label='email@company.com' sx={{ width: '100%',
                  backgroundColor: error.error ? 'hsl(4, 100%, 93%)' : 'transparent'
                 }}></TextField>
                <Button type='submit' sx={{
                  mt: 3, p: 2, width: '100%', backgroundColor: 'hsl(234, 29%, 20%)',
                  '&:hover': {
                    backgroundColor: 'hsl(234, 29%, 30%)',
                  },
                  '&:active': {
                    backgroundColor: 'hsl(4, 100%, 67%)',
                  }
                }} variant='contained'>Subscribe to monthly newsletter</Button>
              </Box>
            </Box>
            <Box
              component="img"
              src={isMobile ? '/illustration-sign-up-mobile.svg' : '/illustration-sign-up-desktop.svg'}
              sx={{
                width: {
                  xs: '100%',
                  sm: 300
                },
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        ) : (
          <Box sx={{ backgroundColor: 'hsl(0, 0%, 100%)', p: 5, height: { xs: '100vh', sm: 'auto' }, width: { xs: '100%', sm: 400 }, borderRadius: { xs: 0, sm: 5 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ width: 50, height: 50, objectFit: 'contain' }} component={'img'} src='icon-success.svg'></Box>
                <Typography color='hsl(234, 29%, 20%)' fontSize={40} fontWeight={'bold'} variant='h4' component={'h4'}>Thanks for subscribing!</Typography>
                <Typography variant="body2">
                  A confirmation email has been sent to <strong style={{ color: 'hsl(234, 29%, 20%)' }}>{email}</strong>. Please open it and click the button inside to confirm your subscription.
                </Typography>
              </Box>
              <Button onClick={() => setIsSuccess(false)} sx={{
                p: 1.5, backgroundColor: 'hsl(234, 29%, 20%)',
                '&:hover': {
                  backgroundColor: 'hsl(234, 29%, 30%)',
                },
                '&:active': {
                  backgroundColor: 'hsl(4, 100%, 67%)',
                }
              }} variant='contained'>Dismiss message</Button>
            </Box>
          </Box>
        )
      }
    </Container>
  )
}

export default App