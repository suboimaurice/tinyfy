import footerImage from '../assets/images/footer-logo.png'

function Footer() {

    return(
        <>
    {/* Footer for main UI */}
    <footer className="w-full bg-gray-900 text-gray-300 flex flex-col md:flex-row items-center justify-between px-6 py-4 mt-0">
        <p className="text-sm">Copyright &copy; {new Date().getFullYear()} Tinyfy. All rights reserved</p>
        <img src={footerImage} width="48" height="48" className="h-12 w-auto" alt="Tinyfy Logo" />
    </footer>
        </>
    );
}

export default Footer