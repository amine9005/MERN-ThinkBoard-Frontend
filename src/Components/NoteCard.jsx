import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { fromDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note,setNotes}) => {
    const handleDelete = (e,id) =>{
        e.preventDefault()
        api.delete(`/notes/${id}`).then(()=>{
          toast.success("Note deleted successfully")
          setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        }).catch(err=>
          {
          console.log(err)
          toast.error("Unable to delete note")
        })
    }
    console.log("From note Card: ",note)
  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#6efbbc]'>
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/80 line-clamp-3'>{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
            <div className='text-sm text-base-content/60'>
                <span>{fromDate(new Date(note.createdAt))}</span>
            </div>
            <div className='flex items-center gap-1'>
                <PenSquareIcon className='size-4'/>
                <button className='btn btn-ghost text-error btn-xs' onClick={(e)=>handleDelete(e,note._id)}>
                    <Trash2Icon className='size-4'/>
                </button>

            </div>

        </div>
      </div>
    </Link>

  )
}

export default NoteCard
