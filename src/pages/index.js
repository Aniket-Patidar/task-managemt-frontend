import Card from '@/components/Card';
import TaskModal from '@/components/CreateModel';
import EditModel from '@/components/EditModel';
import Navbar from '@/components/Navbar';
import { deleteTaskById, fetchAllTasks } from '@/redux/action/task';
import { authenticateJWT } from '@/redux/action/user';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import animationData from '../../public/g1.json'; // Import your JSON animation
import Pagination from '@/components/Paggination';

const Index = () => {

  const { user, loading } = useSelector((state) => state.user);
  const router = useRouter()
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState()

  const { tasks, loading: l2, paginationData } = useSelector((e) => e.task)

  console.log(paginationData);

  useEffect(() => {
    if (paginationData) {
      setTotalPages(paginationData.totalPages);
      setCurrentPage(paginationData.currentPage);
    }
  }, [tasks]);


  useEffect(() => {
    dispatch(fetchAllTasks("", parseInt(currentPage)));
  }, [currentPage]);



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    dispatch(authenticateJWT())
    if (!user && !loading) {
      router.push("/login")
    }
  }, [])


  const handelSearch = () => {
    if (search.trim() !== '') {
      setCurrentPage(1);
      dispatch(fetchAllTasks(search, 1));
    }
  }



  useEffect(() => {
    dispatch(fetchAllTasks())
  }, [])

  function handelDelete(id, index) {
    dispatch(deleteTaskById(id))
  }


  const [isOpen, onClose] = useState(false);
  const [editData, setEditData] = useState({});
  function handelEdit(data) {
    setEditData(data)
    onClose(true)
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar ></Navbar>
      {loading ? <>Loading....</> :
        <div >
          <EditModel editData={editData} setEditData={setEditData} isOpen={isOpen} onClose={onClose} ></EditModel>
          <div class="flex items-center max-w-sm mx-auto">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search branch name..."
                required
                value={search}
                onChange={(e) => dispatch(fetchAllTasks(e.target.value))}
              />
            </div>
            <button
              type="submit"
              onClick={handelSearch}
              class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>

          <div className=''>
            <div className="px-[20px] py-[20px] flex flex-wrap justify-center gap-5 ">
              {l2 ? <>
                Loading...
              </> : tasks.map((e, index) => {
                return <Card {...e} key={index} index={index} handelDelete={handelDelete} handelEdit={handelEdit}></Card>
              })}
            </div>
          </div>

          <div className='flex items-center justify-center '>
            {!loading && !l2 && tasks.length == 0 && <Lottie className=' md:w-[30vw] w-[50vw]' animationData={animationData} />}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

        </div>
      }
    </div>
  )
}

export default Index