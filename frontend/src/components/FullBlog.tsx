import { Blog } from "../hooks"
import Appbar from "./Appbar"
import { Avatar } from "./BlogCard"

function FullBlog({blog}:{blog:Blog}) {
  return (
    <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 PX-10 w-full pt-200 max-w-screen-2xl">
                <div className=" col-span-8 p-20">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-2xl p-2 pt-5">
                        {blog.content}
                    </div>
                </div>
                <div className=" col-span-4 flex mt-28 flex-col ">
                    Author
                   <div className="pt-2 font-semibold text-2xl flex ">
                        <div className="self-center mr-1 ">{Avatar(blog.author.name)}</div>
                        <div className="self-center">{blog.author.name || 'Anonymous'}</div>
                   </div>
                   <div className="text-slate-400">
                   Some random Data about the author
                   </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default FullBlog