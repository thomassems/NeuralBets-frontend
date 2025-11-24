const WelcomeBanner = () => {
    return (
        <div className="relative overflow-hidden border-b border-cyan-500/10">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            <div className="container mx-auto px-6 pt-20 relative"></div>
            <div className='text-white px-8 pb-20 bg-mainblue'>
                <h1 className='text-[50px]'><span className='leading-7 tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>LIVE</span> SPORTS ODDS</h1>
                <h3 className='text-gray-500 text-[22px]'>Simulate Bets with virtual currency on live games.</h3>
            </div>
        </div>
    );
}

export default WelcomeBanner;
