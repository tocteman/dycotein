import { Link, Route } from "wouter";
import AddContactPage from './pages/AddContactPage'
import DirectoryPage from './pages/DirectoryPage'
import LoginPage from './pages/LoginPage'
import Toast from './components/Toast'

function App() {

  return (
  <main className="bg-gray-900 text-neutral-50 min-h-screen overflow-x-hidden">
  <Toast/>
   <section className="p-8">
     <Route path="/" component={DirectoryPage}/>
     <Route path="/login" component={LoginPage}/>
     <Route path="/add_contact" component={AddContactPage}/>
   </section>
  </main>
  )
}

export default App
