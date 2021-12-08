let klimaGass = {
    kjøtt: 0,
    fisk: 0,
    vegetar: 0,
    utenlandsreiser: 0,
    grunnavtrykk: 1,
    totaltCO2: 0,

    // Metode for å regne ut totaltCO2
    kalkulerKlimagassUtslipp () {
        this.totaltCO2 = this.kjøtt * 0.17 + this.fisk * 0.09 + this.vegetar * 0.08 + this.utenlandsreiser * 1.1 + this.grunnavtrykk;
        this.oppdaterKlimagassUtslipp();
    },

    // Oppdaterer utskriften av klimasgass utslipp, og statusen som enten klimaengel, normal nordmann og klimasvin
    oppdaterKlimagassUtslipp() {

        let status = document.getElementById('resultat');
        let CO2 = document.getElementById('CO2');

        CO2.innerHTML = 'Du slipper ut ' + this.totaltCO2.toPrecision(3) + ' tonn CO2 årlig';

        if (this.totaltCO2 < 6) {
            status.innerHTML = 'Du er en klimaengel!';
        }
        else if (this.totaltCO2 > 6 && this.totaltCO2 < 8) {
            status.innerHTML = 'Du er en normal nordmann';
        }
        else if (this.totaltCO2 > 8) {
            status.innerHTML = 'Du er et klimasvin!';
        }
    }
}

// Sjekker at summen av input-feltene ikke går over 7
function begrensMåltider(evt) {
    let andreMåltider = document.getElementById('måltider').querySelectorAll('input');
    andreMåltider = Array.from(andreMåltider);
    andreMåltider.splice(andreMåltider.indexOf(evt.currentTarget), 1);
    if (evt.currentTarget.value < 0) {
        evt.currentTarget.value = 0;
    }
    else if (evt.currentTarget.value > 7 - (Number(andreMåltider[0].value) + Number(andreMåltider[1].value))) {
        evt.currentTarget.value = 7 - (Number(andreMåltider[0].value) + Number(andreMåltider[1].value));
    }
    switch (evt.currentTarget.id) {
        case 'kjøtt':
            klimaGass.kjøtt = evt.currentTarget.value;
            break;
        case 'fisk':
            klimaGass.fisk = evt.currentTarget.value;
            break;
        case 'vegetar':
            klimaGass.vegetar = evt.currentTarget.value;
            break;
    }
    klimaGass.kalkulerKlimagassUtslipp();
}

// Legger til eventListeners på alle input-element som trigger begrensMåltider() funksjonen
function addEventListeners() {
    let inputElementer = document.getElementById('måltider').querySelectorAll('input');
    for (i = 0; i < inputElementer.length; i++) {
        inputElementer[i].addEventListener('input', begrensMåltider);
    }
}
addEventListeners();

// Tar inn antall utenlandsreiser. Passer også på at tallet ikke kan være negativt
document.getElementById('utenlandsreiser').addEventListener('input', function (evt) {
    if (evt.currentTarget.value < 0) {
        evt.currentTarget.value = 0;
    }
    klimaGass.utenlandsreiser = evt.currentTarget.value;
    klimaGass.kalkulerKlimagassUtslipp();
});