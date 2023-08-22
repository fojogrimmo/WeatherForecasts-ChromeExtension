const apiKey = "163dbad5aa3b4fbfb49164654231608";

// http://api.weatherapi.com/v1/current.json?key=163dbad5aa3b4fbfb49164654231608&q=London

const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`;

fetch(query)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
