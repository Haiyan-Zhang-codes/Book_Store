import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams()

  useEffect(()=>{
    setLoading(true)
    axios
    .get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      setBook(response.data)
      setLoading(false)
    })
    .catch((error)=>{
      console.log(error)
      setLoading(false)
    })
  },[])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl m-4'>Show Book</h1>
      {loading? (<Spinner />):(
        <div className='flex flex-col border-2 border-sky-400 p-4 rounded-lg w-fit'>
          <div className='my-4'>
            <span className='mr-4 text-gray-500 text-xl'>ID</span>
            <span className='text-gray-500 text-xl'>{book.id}</span>
          </div>
          <div className='my-4'>
            <span className='mr-4 text-gray-500 text-xl'>Title</span>
            <span className='text-gray-500 text-xl'>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='mr-4 text-gray-500 text-xl'>Author</span>
            <span className='text-gray-500 text-xl'>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='mr-4 text-gray-500 text-xl'>Publish Year</span>
            <span className='text-gray-500 text-xl'>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='mr-4 text-gray-500 text-xl'>Create Time</span>
            <span className='text-gray-500 text-xl'>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='mr-4 text-gray-500 text-xl'>Last Update Time</span>
            <span className='text-gray-500 text-xl'>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook