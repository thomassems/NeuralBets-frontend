const Header = () => {
    return (
        <>
        <div className='bg-black text-white flex justify-between items-center px-8 py-2'>
            <h1 className='bg-gradient-to-r from-[#22d3ee] to-[#c084fc] text-70px font-bold text-transparent
            bg-clip-text text-[20px]'>
                Neural Bets
            </h1>
            <div>
                <button className='rounded-[50px] p-4 text-white font-bold hover:cursor-pointer mx-1'>Login</button>
                <button className='rounded-[50px] bg-gradient-to-r from-[#22d3ee] to-[#c084fc] text-black 
                font-bold py-2 px-4 shadow-lg hover:cursor-pointer'>Register</button>
            </div>
        </div>
        {/* <div className="w-full h-[0.2px] bg-gray-600 my-4 rounded-lg p-0"></div> */}
        </>
    );
}

export default Header;