const Footer = () => {
    return (
        <div className='flex justify-between items-center mx-8 pb-10'>
            <p className='text-gray-500'>© 2025 Neural Bets. All Rights reserved.</p>
            <div className='flex justify-between space-x-8'>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Responsible Gaming
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Contact
            </a>
            </div>
        </div>
    );
}

export default Footer;