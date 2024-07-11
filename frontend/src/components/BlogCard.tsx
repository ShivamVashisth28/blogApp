import { Link } from "react-router-dom";

interface BlogCardInputs {
    authorName : string;
    title: string;
    content : string;
    publishedDate : string;
    id:number
}
function BlogCard({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardInputs) {
  return (
    <Link to={`/blog/${id}`}>
    <div className="border-b-2 border-slate-300 cursor-pointer">
        <div className="flex">
            {Avatar(authorName[0])}
            <div className=" font-extralight pl-1">
                {authorName} . {publishedDate}</div>
        </div>

        <div className="font-bold text-xl pt-2 ">
            {title}
        </div>

        <div>
            {content.slice(0,100) + "..."}
        </div>

        <div className="font-light pb-4 pt-2">
            {`${Math.ceil(content.length/100)} minutes read`}
        </div>

    </div>
    </Link>
  )
}


export function Avatar(initials:string){
    return(
        <div>
            <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="text-xs text-gray-600 dark:text-gray-300">{initials!==null ? initials : 'A'}</span>
            </div>
        </div>
    )
}

export default BlogCard