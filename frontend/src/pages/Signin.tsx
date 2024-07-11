import Auth from '../components/Auth'
import Quote from '../components/Quote'

function Signin() {
  return (
    <div className="grid grid-cols-2">
        <div className="col-span-2 md:col-span-1">
            <Auth type="signin"/>
        </div>
        <div className=" invisible md:visible">
            <Quote/>
        </div>
    </div>
  )
}

export default Signin