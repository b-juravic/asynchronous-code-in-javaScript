const BASE_URL = "http://numbersapi.com";

async function getNumberFact(number) {
  console.log("starting request");
  try {
    let response = await axios.get(`${BASE_URL}/${number}/trivia`,
      params= {
        "JSON": "true"
      } )
    console.log(response);
  }
  catch(error) {
    console.log("error");
  }
}

getNumberFact(12);

