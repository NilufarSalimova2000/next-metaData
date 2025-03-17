import Link from 'next/link'
import React from 'react'

const ProfileLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex'>
        <div className='h-[67vh] w-[300px] bg-pink-100 p-[30px]'>
            <Link className='block' href={"/profile/address"}>Address</Link>
            <Link href={"/profile/settings"}>Settings</Link>
        </div>
      {children}
    </div>
  )
}

export default ProfileLayout
