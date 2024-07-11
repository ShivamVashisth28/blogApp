import { ChangeEvent } from "react"

interface LabelledInputType{
  title:string;
  placeholder:string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?:string
}


function Input(props:LabelledInputType) {
  
  return (
    <div>
        <div className="mt-4 p-2 pl-0"> {props.title} </div>
        <input type={props.type|| "text"} onChange={props.onChange} placeholder={props.placeholder || ""} className=" w-full font-thin p-2 rounded border-2 border-gray-300 "  />
    </div>
  )
}

export default Input