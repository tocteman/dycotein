import { Link, Route } from "wouter";
import AddContactPage from './pages/AddContactPage'
import DirectoryPage from './pages/DirectoryPage'
import LoginPage from './pages/LoginPage'
import ContactPage from './pages/ContactPage'
import Toast from './components/Toast'

function App() {


  return (
  <main className="bg-neutral-900 text-neutral-50 min-h-screen overflow-x-hidden">
  <Toast/>
   <section className="p-8 flex flex-col justify-center max-w-xl mx-auto">
     <Route path="/" component={DirectoryPage}/>
     <Route path="/login" component={LoginPage}/>
     <Route path="/add_contact" component={AddContactPage}/>
     <Route path="/contacts/:id" component={ContactPage}/>
   </section>
  </main>
  )
}

export default App
