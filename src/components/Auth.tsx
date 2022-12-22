import { superbase } from "../api/api"
import "../static/Auth.css"
import { Ref, useRef, useState } from "react"

export default function Auth() {
	const [isLogin, changeIsLogin] = useState(true)
	const [error, setError] = useState("")
	const passRef: Ref<HTMLInputElement> = useRef(null)
	const emailRef: Ref<HTMLInputElement> = useRef(null)
	const handleLogin = async () => {
		const email = emailRef.current?.value ?? ""
		const password = passRef.current?.value ?? ""
		changeIsLogin(true)
		const { data, error } = await superbase.auth.signInWithPassword({ email, password })

		if (error) {
			console.log(error)
			setError(error.message)
		} else {
			console.log(data)
		}
	}
	const handleSignUp = async () => {
		const email = emailRef.current?.value ?? ""
		const password = passRef.current?.value ?? ""
		console.log(email + ": " + password)
		changeIsLogin(false)
		const { data, error } = await superbase.auth.signUp({ email, password })

		if (error) {
			console.log(error)
			setError(error.message)
		}
	}
	return (
		<div
			className=" d-flex flex-column justify-content-center align-content-center form-container glow"
			style={{ width: "400px" }}
		>
			<div className="content-container">
				<div className="p-3">
					{isLogin ? (
						<h1 className="display-3 align-self-center">LOGIN</h1>
					) : (
						<h1 className="display-3 align-self-center">SIGN UP</h1>
					)}
					<form>
						<div>
							<label className="form-label">Email</label>
							<input
								type="email"
								className="form-control"
								placeholder="Enter your Email"
								name="email"
								ref={emailRef}
							/>
						</div>
						<div className="pt-3">
							<label className="form-label">Password</label>
							<input
								type="password"
								className="form-control"
								placeholder="Enter your password"
								name="password"
								ref={passRef}
							/>
						</div>
						<div className="form-text text-danger">{error}</div>
					</form>
					<button
						type="button"
						className="btn btn-outline-light mt-3 me-3"
						style={{ justifySelf: "center" }}
						onClick={handleLogin}
					>
						Login
					</button>
					<button
						type="button"
						className="btn btn-outline-light mt-3"
						style={{ justifySelf: "center" }}
						onClick={handleSignUp}
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	)
}
