async function getLiveOdds() {
    const response = await fetch('http://localhost:8082/bets/getdefaultodds');
    const data = await response.json();
    return data;
}

export { getLiveOdds };