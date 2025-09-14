import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"

const authPaths = {
    LOGIN: "login",
    REGISTER: "register"
}

const authRoutes = [
    { path: authPaths.LOGIN, Component: LoginPage },
    { path: authPaths.REGISTER, Component: RegisterPage },
]

export { authPaths, authRoutes };