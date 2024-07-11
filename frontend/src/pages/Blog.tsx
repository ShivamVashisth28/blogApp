import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog"
import Appbar from "../components/Appbar"
import Spinner from "./Spinner"

function Blog() {
  const {id} = useParams()
  const {loading, blog} = useBlog({
      id: id || ''
    })

  if(loading){
    return <div>
      <Appbar/>
      <div className="flex justify-center h-screen">
        <div className="self-center">
          <Spinner/>
        </div>
      </div>
    </div>
  }

  if(!blog){
    console.log(blog)
    return <div>blog nahi aya</div>
  }
  return (
      <div>
  
        <FullBlog blog={blog}/>
  
      </div>
    )
  

  
}

export default Blog