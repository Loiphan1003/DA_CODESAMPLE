import Footer from "../../components/footer/Footer";
function DefaultLayout({children}) {
    return (
        <div>
            {/* <Header style={{backgroundColor: "none"}} /> */}
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayout;