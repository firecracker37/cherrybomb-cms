import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RootLayout() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-zinc-900 text-gray-200">
        <Header />
        <main className="grow">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}