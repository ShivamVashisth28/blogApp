import { Link, useNavigate } from "react-router-dom"
import Input from "./Input"
import { useState } from "react"
import { SignupInput } from '@svashisth/medium-common'
import axios from "axios"
import { BACKEND_URL } from "../config"


function Auth({type}:{type:"signup" | "signin"}) {
  
  const navigate = useNavigate()
  const [postInputs,setPostInputs] = useState<SignupInput>({
    email: "",
    name: "",
    password:""
  })

  const sendRequest = async ()=>{
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`, postInputs)
      const jwt = response.data.jwt;
      console.log(jwt)
      localStorage.setItem('token',jwt)
      // const abc = localStorage.getItem('token');
      // console.log(typeof abc);
      navigate('/blogs')
    }catch(error){
      // alert the uesr that the req failed
      alert("Error while signing up")
    }
  }

  return (
    
    <div className="flex flex-col h-screen justify-center ">
        {/* {JSON.stringify(postInputs)} */}
        <div className="self-center text-xl w-1/2 ">
            
            <div className="text-4xl font-bold text-center ">{type=='signup' ? 'Create an account': "Login Here" }</div>
            <div className="text-1xl text-center mb-2">
                {type=='signup' ? "Already have an account":"New User :" }
                <Link className="ml-2 underline" to={type =='signup' ?'/signin':'/signup'}>
                    {type === "signup" ? "Login" : "SingUp"}
                </Link>
            </div>
            
            <div className="">
                {type==='signup' ? <Input  title= "Name" placeholder='Enter your Name' onChange={(e)=>{
                  setPostInputs(c => ({
                    ...c,
                    name:e.target.value
                  }))
                }}/>
              : null
              }
                <Input title= "Email" placeholder='Enter your Email' onChange={(e)=>{
                  setPostInputs(c=>({
                    ...c,
                    email:e.target.value
                  }))
                }}/>
                <Input title= "Password" type="password" placeholder="Enter your password" onChange={(e)=>{
                  setPostInputs(c=>({
                    ...c,
                    password:e.target.value
                  }))
                }}/>
            </div>

            <div
              onClick={sendRequest} 
              className="font-bold text-center mt-5 p-3 bg-slate-900 text-white border-black rounded border-2  hover:bg-slate-400 hover:text-black" >
              {type === "signup"? "Sign Up" : "Log in"}
              </div>
            

        </div>
    </div>
  )
}

export default Auth