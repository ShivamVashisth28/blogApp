import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks"
import Skeleton from "./Skeleton"

function Blogs() {
  const {loading , blogs} = useBlogs()   

  if(loading){
    return <div >
        <Appbar/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
    </div>
  }
  if(blogs){
  console.log("blogs aa gye")
  }else{
    console.log('blogs nahi aye')

  }
  
  return (
    <div>
      <Appbar/>
      <div className="flex justify-center">
      <div className="w-1/2">
        
        {
          
          
          blogs.map(blog=>
                <BlogCard 
                key={blog.id}
              authorName={blog.author.name || 'Anonymous'}
              title={blog.title}
              content={blog.content}
              id={blog.id}
              publishedDate="20 june 2024"
            />
          )
        }

        

        

      </div>
    </div>
    </div>
  )
}

export default Blogs