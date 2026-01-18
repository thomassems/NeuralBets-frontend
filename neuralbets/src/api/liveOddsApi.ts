async function getLiveOdds() {
    const response = await fetch('http://localhost:8082/bets/getdefaultodds');
    // const response = await fetch('https://neuralbets-backend-663414512980.northamerica-northeast2.run.app');
    const data = await response.json();
    return data;
}

export { getLiveOdds };