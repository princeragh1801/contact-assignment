import { CircularProgress } from '@mui/material'
import React from 'react'

function Loader({message = "Loading...", className}) {
  return (
    <div className='w-full flex-col flex items-center justify-center'>
        <CircularProgress className={className} color='success' variant='indeterminate' />
        <p className='text-green-800'>{message}</p>
    </div>
  )
}

export default Loader