import Header from "../components/header/Header"
import Widgets from "../components/widgets/Widgets"
import ProjectManager from "../components/projectManager/ProjectManager"
import Footer from "../components/footer/Footer"

function Home() {

    return (
        <main className="main">
            <Header />
            <Widgets />
            <ProjectManager />
            <Footer />
        </main>
    )
}

export default Home