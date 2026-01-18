const Footer = () => {
    return (
        <div className='flex justify-between items-center mx-8 pb-10'>
            <p className='text-gray-500'>© 2025 Neural Bets. All Rights reserved.</p>
            <div className='flex justify-between space-x-8'>
            <button onClick={() => console.log('Terms of Service')} className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer bg-transparent border-none">
              Terms of Service
            </button>
            <button onClick={() => console.log('Privacy Policy')} className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer bg-transparent border-none">
              Privacy Policy
            </button>
            <button onClick={() => console.log('Responsible Gaming')} className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer bg-transparent border-none">
              Responsible Gaming
            </button>
            <button onClick={() => console.log('Contact')} className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer bg-transparent border-none">
              Contact
            </button>
            </div>
        </div>
    );
}

export default Footer;