import { Code, Milestone } from 'lucide-react'

export default function Header() {
  return (
    <div className="w-full h-16 bg-slate-950/50 flex items-center justify-between shadow-lg px-5">
        <div className="flex gap-2 items-center">
            <Code className="w-10 h-10 bg-green-400 rounded-full border-2 border-slate-500 text-black p-1" />
            <h1 className="text-2xl font-bold tracking-widest">Blog Template</h1>
        </div>
        <button className="h-8 flex gap-2 bg-slate-600 items-center px-4 py-2 rounded-xl font-bold text-gray-300 hover:bg-gray-500 hover:text-gray-200">
            <Milestone />
            Sign In
        </button>        
    </div>
  )
}