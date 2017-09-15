function pobierzDane(event) {
    event.preventDefault;

    $.ajax({
        url: "https://akademia108.pl/kurs-front-end/ajax/1-pobierz-dane-programisty.php",
        dataType: 'json',
        success: function (resultJSON) {
            console.log(resultJSON);
            $("#dane-programisty").append("<p> Imie: " + resultJSON.imie + "</p>");
            $("#dane-programisty").append("<p> Nazwisko: " + resultJSON.nazwisko + "</p>");
            $("#dane-programisty").append("<p> Zawód: " + resultJSON.zawod + "</p>");
            $("#dane-programisty").append("<p> Firma: " + resultJSON.firma + "</p>");
        },
        onerror: function (msg) {
            alert("brak połączenia");
            console.log(msg);
        }
    });

}