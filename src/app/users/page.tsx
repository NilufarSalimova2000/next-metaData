import Link from 'next/link'
import React from 'react'

const Users = () => {
  return (
    <div className='flex gap-[30px]'>
      <Link href={"/users/1"}>User1</Link>
      <Link href={"/users/2"}>User2</Link>
      <Link href={"/users/3"}>User3</Link>
      <Link href={"/users/4"}>User4</Link>
    </div>
  )
}

export default Users
