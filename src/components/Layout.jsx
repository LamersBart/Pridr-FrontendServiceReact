import AppAppBar from "./AppAppBar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
    return (
        <>
            <AppAppBar/>
            <main>
                {children}
            </main>
            {/*<Footer/> */}
        </>
        )
};

export default Layout