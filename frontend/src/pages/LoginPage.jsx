import { useState } from 'react'

export default function LoginPage() {
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  const toggleRegisterForm = () => {setShowRegisterForm(!showRegisterForm)}


  return (
    <div className="w-full h-full flex justify-center pt-12">
      <div className="w-1/2 h-[496px] bg-[url('./assets/login.jpg')] bg-cover border border-green-400 rounded-l-xl" />
      <div className="w-1/2 flex items-center justify-center">
        {showRegisterForm ? (
          <div className="border border-green-400 rounded-xl">
            <h2>Register</h2>
            <p>Have an account? <button onClick={toggleRegisterForm}>Login</button></p>
          </div>
        ) : (
          <div className="border border-green-400 rounded-xl">
            <h2 className="text-xl font-bold text-center w-full bg-zinc-950 rounded-t-xl border-b border-green-400 py-2">Login</h2>
            <p className="text-sm text-gray-400">Don&apos;t have an account? <button className="text-gray-300" onClick={toggleRegisterForm}>Register</button></p>
          </div>
        )}
      </div>
    </div>
  )
}