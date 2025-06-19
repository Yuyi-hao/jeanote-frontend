import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NoteNotFound from "../components/NoteNotFound";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes");
        setNotes(res.data.data.notes);
        setIsRateLimited(false);
        if(res.data.data.notes){
          toast.success(`Fetched ${res.data.data.notes.length} ${res.data.data.notes.length<2?"note":"notes"}`);
        }
      }catch(error){
        console.error("ERROR: Couldn't fetch the notes", error);
        if(error.response?.status === 429){
          setIsRateLimited(true);
        }
        else{
          toast.error("Failed to fetch the notes");
        }
      }
      finally{
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
    <Navbar/>
    {isRateLimited && <RateLimitedUI/>}
    <div className="max-w-7xl mx-auto p-4 mt-6">
      {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
      {notes.length === 0 && !isRateLimited && <NoteNotFound/>}
      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))
          }
        </div>
      )}
    </div>
    </div>
  )
}

export default HomePage;
