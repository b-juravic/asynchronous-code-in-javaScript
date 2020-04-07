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
  } catch(error) {
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
    let respArr = await axios.all([axios.get(`${BASE_URL}/99`), axios.get(`${BASE_URL}/-100`)])
  
    for (let response of respArr) {
      console.log(response.data);
      $("body").append(`<p>${response.data}</p>`)
    }
  } catch(e) {
    $("body").append(`<p>${e}</p>`)
  }
}

multipleFacts();