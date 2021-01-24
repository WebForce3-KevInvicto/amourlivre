
let inputAddress = document.querySelector('#registration_form_address');
let inputPostalCode = document.querySelector('#registration_form_postal_code');
let inputCity = document.querySelector('#registration_form_city');
let inputLat =  document.querySelector('#registration_form_lat');
let inputLng =document.querySelector('#registration_form_lng');

if(inputAddress !== null ){
  let placesAutocomplete = places({
    appId: 'plEIJ5K5A1R6',
    apiKey: '0e522dd10f27c7144d7a2fde3de4b180',
    container: inputAddress
  });
  placesAutocomplete.on('change', e => {
    console.log(e)
    console.log(e.suggestion)
    inputPostalCode.setAttribute('value',  e.suggestion.postcode );
    inputCity.setAttribute('value',  e.suggestion.city );
    inputLat.setAttribute('value',  e.suggestion.latlng.lat );
    inputLng.setAttribute('value',  e.suggestion.latlng.lng );

})


}
