import { Package } from "lucide-react"
import { Link } from "react-router-dom"
import Button from "../../../components/ui/Button/Button"

function GetStarted() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <div className="absolute right-0 top-0 h-full w-1/2  hidden md:block bg-blue-50" 
        style={{
          borderRadius: '0 0 0 100%',
        }}
      />
      
      <div className="flex flex-col justify-between h-full max-w-6xl px-8 py-8 bg-blue-50 md:bg-white">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-between rounded">
           <Package className="h-10 w-10 text-blue-600"/>
          </div>
          <span className="text-xl font-semibold text-blue-600">Bolt</span>
        </div>

        <div className="mt-32 max-w-2xl">
          <h1 className="text-[2.75rem] font-bold leading-tight tracking-tight sm:text-6xl text-blue-600">
            Proceed to create an organization
          </h1>
         <Button className="mt-10 border-2 border-blue-600 text-blue-600  hover:bg-blue-600 hover:text-white transition  ease-out">
         <Link 
            to="#"
            className="text-lg  decoration-2 underline-offset-4"
          >
            Click here
          </Link>
         </Button>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
