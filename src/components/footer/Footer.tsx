import "./footer.css"

function Footer() {

    const currentYear = new Date().getFullYear().toString()
    
    return (
        <footer className="footer">
            <p> &copy; Copyright {currentYear} </p>
            Designed & built by <a className="footer__copyright-owner" href="https://www.google.com/" target="_blank" rel="noopener noreferrer">EL MOKHTAR FKHARZ</a>
        </footer>
    )
}

export default Footer