'use strict';

//const searchTerm = $('#js-search-term').val();

function displayResults(responseJson) {
  const searchTerm = $('#js-search-term').val();
  console.log(responseJson);
  $('#results-list').empty();
  $('#results-list').append(`<h3>${searchTerm}'s Repos</h3>`)
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li>
      <p>${responseJson[i].name}</p>
      <p><a href=${responseJson[i].html_url}>${responseJson[i].html_url}<a></p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getResults(searchTerm){
  fetch('https://api.github.com/users/'.concat(searchTerm,'/repos'))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    })
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getResults(searchTerm);
  });
}

$(watchForm);