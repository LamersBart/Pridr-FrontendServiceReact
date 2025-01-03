import AppAppBar from "./AppAppBar.jsx";

const Layout = ({ children, profile, isLoggedIn }) => {
    return (
        <>
            <header>
                <AppAppBar profile={profile} isLoggedIn={isLoggedIn} />
            </header>
            <main>
                {children}
            </main>
        </>
    )
};

export default Layout