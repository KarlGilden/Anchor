import { Link } from "react-router"
import { authPaths } from "./auth/Routes"

function App() {

  return (
    <div className="flex justify-center items-center">
      <h1 className="text-4xl">Hello world!</h1>
      <Link to={authPaths.LOGIN}><button>Login</button></Link>
      <Link to={authPaths.REGISTER}><button>Register</button></Link>
    </div>
  )
}

export default App
