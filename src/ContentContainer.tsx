import React from 'react'

type ContentProps = {
    children: React.ReactNode
}

export const ContentContainer: React.FC<ContentProps> = ({children}) => {
  return (
    <div className='content-container'>
        {children}
    </div>
  )
}
