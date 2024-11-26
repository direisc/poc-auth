import { FC } from 'react'

interface IdleModalProps {
  open: boolean
  remaining: number
  handleStillHere: () => void
}

export const IdleModal: FC<IdleModalProps> = ({
  open,
  remaining,
  handleStillHere,
}) => {
  return (
    <>
      <div
        style={{
          display: open ? 'block' : 'none' /* Hidden by default */,
          position: 'fixed' /* Stay in place */,
          zIndex: 1 /* Sit on top */,
          left: 0,
          top: 0,
          width: '100%' /* Full width */,
          height: '100%' /* Full height */,
          overflow: 'auto' /* Enable scroll if needed */,
          // backgroundColor: 'rgb(0,0,0)', /* Fallback color */
          // backgroundColor: 'rgb(0,0,0,0.4)',
          backgroundColor: 'rgb(var(--drop-rgb))' /* Black w/ opacity */,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgb(var(--background-end-rgb))',
            margin: '15% auto' /* 15% from the top and centered */,
            // padding: '14px 20px',
            // // border: '1px solid #888',
            width: '80%',
            // borderRadius: 4,
            // color: 'rgb(var(--foreground-rgb))',
            padding: '1rem 1.2rem',
            borderRadius: 'var(--border-radius)',
            // background: 'rgba(var(--card-rgb), 1)',
            border: '1px solid rgba(var(--card-border-rgb), 1)',
          }}
        >
          {/* <span className='close'>&times;</span> */}
          <p>Your session will expire in {remaining} seconds. Do you want to continue?</p>
          <button onClick={handleStillHere}>Im still here</button>
        </div>
      </div>
    </>
  )
}
