const BASE_URL = "http://numbersapi.com";

async function getNumberFact(number) {
  console.log("starting request");
  try {
    let response = await axios.get(`${BASE_URL}/${number}`, {
      params: {
        json: undefined
      }
    });
    console.log(response);
  }
  catch(error) {
    console.log("error");
  }
}

// getNumberFact(12);


async function multipleRequests(){
  let resp = await axios.get(`${BASE_URL}/15..25`)
  for (fact in resp.data) {
    $("body").append(`<p>${resp.data[fact]}</p>`)
  }
}

//multipleRequests();


async function multipleFacts(){ 
  try {
    let resp_arr = await axios.all([axios.get(`${BASE_URL}/99`), axios.get(`${BASE_URL}/-100`)])
  
    for (let response of resp_arr) {
      console.log(response.data);
      $("body").append(`<p>${response.data}</p>`)
    }
  } catch(e) {
    $("body").append(`<p>${e}</p>`)
  }
}

multipleFacts();

// multipleRequests();

// async function multipleFacts(num, factsnum) {
//   let facts = [];
  
//   for (let i = 0; i < factsnum; i++) {
//     resp = await axios.get(`${BASE_URL}/${num}`);
//     facts.push(resp.data); 
//   }
//   for (let fact of facts) {
//     $("body").append(`<p>${fact}</p>`)
//   }
// }

// multipleFacts(19, 4);