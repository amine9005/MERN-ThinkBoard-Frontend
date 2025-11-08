import {useEffect, useState} from 'react'
import { Link,useNavigate, useParams } from 'react-router'
import {ArrowLeftIcon, LoaderPinwheel, Trash2Icon} from 'lucide-react'
import api from '../lib/axios'
import toast from 'react-hot-toast'


const NotesDetailsPage = () => {
  const navigate = useNavigate();
  const {id} = useParams()

  const [note,setNote] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const [isSubmitting,setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`)
        const data = response.data
        setNote(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching note:', error)
        toast.error("Failed to load data")
        setIsLoading(false)
      }
    };
    fetchNote()
  }, [id])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      if (!note.title.trim() || !note.content.trim()) {
        toast.error("all fields are required")
        return
      }

      await api.put(`/notes/${id}`,note)
      toast.success("Note Updated successfully")
      setIsSubmitting(true)
      navigate("/")

    }catch(error){
      if (error.response.status === 429) {
        toast.error("Too many requests ",{
          duration:4000,
          icon:"🚫"
        })
      } else{
      toast.error("Unable to Update note")

      }
      console.log("Error Updating note: ",error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handelDelete = async () =>{
    if (!window.confirm("Are you sure you want to delete this note?")){
      return
    }

    await api.delete(`/notes/${id}`).then(()=>{
      toast.success("Note deleted successfully")
      navigate("/")
    }).catch(
      err=>{
        console.log(err)
        toast.error("Unable to delete note")
      }
    )
  }

  if(isLoading) {
    return (<div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderPinwheel className='size-10 text-primary animate-spin'/>
    </div>)
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex justify-between mx-auto'>
            <Link to={'/'} className='btn btn-ghost mb-6'>
              <ArrowLeftIcon className='size-5'/><span>Back to notes</span>
            </Link>

            <button className='btn btn-ghost text-error' onClick={handelDelete}>
              <Trash2Icon className='size-5' />
              <span>Delete Note</span>
            </button>

          </div>


          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Edit Note</h2>
              <form onSubmit={handleSubmit}>

                <div className="form-control mb-4">
                  <div className="label">
                    <span className='label-text'>Title</span>
                  </div>
                  <input type='text' className='input input-bordered' value={note.title} onChange={(e)=>setNote({...note,title:e.target.value})}/>
                </div>

                <div className="form-control mb-4">
                  <div className="label">
                    <span className='label-text'>Content</span>
                  </div>
                  <textarea placeholder='Write your note here...' className='textarea textarea-bordered h-32' value={note.content} onChange={(e)=>setNote({...note,content:e.target.value})}/>
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary ' disabled={isSubmitting}>
                    {isLoading ? "Saving...":"Update Note"}

                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default NotesDetailsPage