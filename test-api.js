const axios = require('axios');

const BASE_URL = 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon';

async function testApi() {
    try {
        const userId = '65888ffb-ed2a-4446-89c7-31723970c612'; // kleber

        console.log("Testing Team Update Add...");
        const res = await axios.put(`${BASE_URL}/pokemon/v1/team?user-id=${userId}`, {
            newPokemon: 1
        });
        console.log("Team Update Success:", res.status);

    } catch (e) {
        console.log("Error Status:", e.response ? e.response.status : 'No response');
        console.log("Error Data:", e.response ? e.response.data : e.message);
    }
}
testApi();
