import AppAppBar from "./AppAppBar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
    return (
        <>
            <header>
                <AppAppBar/>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
};

export default Layout