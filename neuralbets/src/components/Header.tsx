import styles from "./Header.module.css";

const Header = () => {
    return (
        <div className='bg-black text-white flex justify-between items-center p-5'>
            <h1 className='bg-gradient-to-r from-[#22d3ee] to-[#c084fc] text-70px font-bold text-transparent
            bg-clip-text'>
                Neural Bets
            </h1>
            <div>
                <button className='rounded-[50px] p-4 text-white font-bold hover:cursor-pointer mx-1'>Login</button>
                <button className='rounded-[50px] bg-gradient-to-r from-[#22d3ee] to-[#c084fc] text-black 
                font-bold py-2 px-4 shadow-lg hover:cursor-pointer'>Register</button>
            </div>
        </div>
    );
}

export default Header;