import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux'

const Index = () => {

  const { user } = useSelector((state) => state.user);
  const router = useRouter()
  // React.useEffect(() => {
  //   if (!user) {
  //     router.push("/Login")
  //   }
  // }, [])

  return (
    <div >
      <Navbar></Navbar>




      <div className="px-[20px] py-[20px] flex flex-wrap justify-center gap-5 ">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  )
}

export default Index