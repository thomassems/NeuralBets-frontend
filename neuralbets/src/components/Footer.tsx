import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mx-8 pb-10 pt-6 border-t border-white/[0.04]'>
            <p className='text-gray-500 text-sm'>© 2026 NeuralBets. All rights reserved.</p>
            <div className='flex flex-wrap justify-center gap-x-8 gap-y-2'>
                <Link to='/terms' className='text-gray-400 hover:text-cyan-400 transition-colors text-sm'>
                    Terms of Service
                </Link>
                <Link to='/privacy' className='text-gray-400 hover:text-cyan-400 transition-colors text-sm'>
                    Privacy Policy
                </Link>
                <Link to='/responsible-gaming' className='text-gray-400 hover:text-cyan-400 transition-colors text-sm'>
                    Responsible Gaming
                </Link>
                <Link to='/contact' className='text-gray-400 hover:text-cyan-400 transition-colors text-sm'>
                    Contact
                </Link>
            </div>
        </div>
    );
}

export default Footer;
