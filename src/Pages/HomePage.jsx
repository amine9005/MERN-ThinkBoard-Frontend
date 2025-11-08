import React, { useEffect,useState } from 'react'
import NavBar from '../Components/NavBar'
import RateLimitedUI from '../Components/RateLimitedUI'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import NoteCard from '../Components/NoteCard'
import NotesNotFound from '../Components/NotesNotFound'

const HomePage = () => {
  const [isRateLimited,setIsRateLimited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes')
        const data = response.data
        console.log(data)

        setNotes(data)
        setIsLoading(false)
        setIsRateLimited(false)
      } catch (error) {
        console.error('Error fetching notes:', error)
        if (error.response.status === 429) {
          setIsRateLimited(true)
        } else {
        toast.error("Failed to load data")
        setIsLoading(false)
        }
      }
    };
    fetchNotes()
  }, [])
  return (
    <div className='min-h-screen'>
      <NavBar/>
      {isRateLimited && <RateLimitedUI/>}

      {notes.length === 0 && !isRateLimited &&
      <NotesNotFound/>}

      {notes.length > 0 && !isRateLimited &&
      <div className='mx-auto max-w-7xl pt-6 p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      </div> }
    </div>
  )
}

export default HomePage