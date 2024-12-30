import AppAppBar from "./AppAppBar.jsx";

const Layout = ({ children }) => {
    return (
        <>
            <header>
                <AppAppBar/>
            </header>
            <main>
                {children}
            </main>
        </>
    )
};

export default Layout