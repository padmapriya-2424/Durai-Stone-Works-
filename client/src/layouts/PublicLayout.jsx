import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default PublicLayout