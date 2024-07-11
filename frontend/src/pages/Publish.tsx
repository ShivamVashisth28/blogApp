import {  useNavigate } from "react-router-dom"
import Appbar from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"

function Publish() {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("")
    const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
        <Appbar/>
        <div className="w-1/2 self-center ">
            <label  className="block mb-2 text-sm font-medium text-gray-900">Title</label>
            <input onChange={(e)=> setTitle(e.target.value) } type="text" placeholder="Enter title" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg text-base"/>
        </div>
        <div className="w-1/2 self-center ">
            <label  className="block mb-2 text-sm font-medium text-gray-900">Content</label>
            <textarea onChange={(e)=> setDescription(e.target.value) } placeholder="Enter Content" className="block w-full p-4 h-72  text-gray-900 border border-gray-300 rounded-lg text-base"/>
        </div>

        <div className="w-1/2 self-center ">
   
            <button  onClick={ async ()=>{
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content:description
                },{
                    headers:{
                        Authorization: localStorage.getItem('token')
                    }
                })
                navigate(`/blog/${response.data.id}`)
            }}
            type="button"  className="text-white  self-center bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publish</button>
  
        </div>

    </div>
  )
}

export default Publish