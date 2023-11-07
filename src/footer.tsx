const Footer = () => {
return <footer className="footer">
    <div className="container mx-auto footer-container">
    <ul className="footer-inner">
        <li  className="footer-item"><span className="label">Mitteilungen</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 23"><path fill="none" stroke="currentColor" stroke-linejoin="round" d="M23.999 10.383c0 5.181-5.148 9.383-11.5 9.383-1.418 0-2.775-.21-4.029-.593l-6.608 3.076 2.588-5.166C2.321 15.38 1 13.007 1 10.383.999 5.201 6.147 1 12.499 1s11.5 4.201 11.5 9.383z"></path></svg></span></li>
        <li  className="footer-item"><span className="label">Profile</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 19"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linejoin="round"><path d="M6.545 10.17v2.23l-4.299 1.54a2.575 2.575 0 0 0-1.7 2.437V18h16.363v-1.623a2.576 2.576 0 0 0-1.7-2.436l-4.3-1.54v-2.232"></path><path d="M13.033 5.712c0 2.856-1.929 5.172-4.306 5.172-2.379 0-4.306-2.316-4.306-5.172 0-2.853 1.927-5.167 4.306-5.167 2.378 0 4.306 2.314 4.306 5.167z"></path><path d="M13 5.248c-.145.02-.264.007-.409.036-1.467.282-2.408-.25-3.217-1.663-.483.93-1.997 1.663-3.242 1.663a3.44 3.44 0 0 1-1.667-.402"></path><g stroke-linecap="round"><path d="M15.273.545c2.378 0 4.306 2.314 4.306 5.167 0 2.856-1.93 5.172-4.306 5.172"></path><path d="M19.545 5.248c-.144.02-.263.007-.408.036-1.468.282-2.409-.25-3.217-1.663M19.67 18h3.785v-1.623a2.576 2.576 0 0 0-1.701-2.436l-4.3-1.54v-2.232"></path></g></g></svg></span></li>
        <li  className="footer-item"><span className="label">Produkte</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 25"><g fill="none" fill-rule="evenodd" stroke="currentColor" transform="translate(1 1)"><circle cx="5.5" cy="17.5" r="5.5"></circle><circle cx="11.5" cy="5.5" r="5.5"></circle><circle cx="18.5" cy="17.5" r="5.5"></circle></g></svg></span></li>
        <li  className="footer-item"><span className="label">Finanzen</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M.5 15.5h23m-19 0v-5h-3v5m9 0v-10h-3v10m9 0v-8h-3v8m9 0V.5h-3v15"></path></svg></span></li>
        <li  className="footer-item"><span className="label">Health Points</span><span className="icon"></span></li>

    </ul>
    </div>
</footer>
}

export default Footer;