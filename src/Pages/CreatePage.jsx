import {useState} from 'react'
import { Link,useNavigate } from 'react-router'
import {ArrowLeftIcon} from 'lucide-react'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const CreatePage = () => {
  const navigate = useNavigate();
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      if (!title.trim() || !content.trim()) {
        toast.error("all fields are required")
        return
      }

      await api.post('/notes',{title,content})
      toast.success("Note created successfully")
      setIsLoading(true)
      navigate("/")

    }catch(error){
      if (error.response.status === 429) {
        toast.error("Too many requests ",{
          duration:4000,
          icon:"🚫"
        })
      } else{
      toast.error("Unable to create note")

      }
      console.log("Error creating note: ",error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5'/><span>Back to notes</span>
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>

                <div className="form-control mb-4">
                  <div className="label">
                    <span className='label-text'>Title</span>
                  </div>
                  <input type='text' className='input input-bordered' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>

                <div className="form-control mb-4">
                  <div className="label">
                    <span className='label-text'>Content</span>
                  </div>
                  <textarea placeholder='Write your note here...' className='textarea textarea-bordered h-32' value={content} onChange={(e)=>setContent(e.target.value)}/>
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary ' disabled={isLoading}>
                    {isLoading ? "Creating...":"Create Note"}

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

export default CreatePage