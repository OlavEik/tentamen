let formValiderer = {
    styggeOrd: ['tiss', 'prump', 'bæsj', 'rumpe'], //4 ord får holde
    eposter: ['parasite@me.com','amichalo@icloud.com', 'tbeck@att.net', 'rnelson@att.net', 'rogerspl@com', 'cast.netoechslin@verizon.net', 'kspiteri@att.net', 'portscan@msn.com', 'aukjan@verizon.net', 'wilsonpm@mac.com', 'csilvers@mac.com', 'redingtn@sbcglobal.net'],
    passordMin: 5,
    passordMax: 15,
    validerForm() {
        let skjema = document.forms['skjema'];

        // Validerer brukernavn
        for (i = 0; i < this.styggeOrd.length; i++) {
            if (skjema['brukernavn'].value.toLowerCase().includes(this.styggeOrd[i]) == true) {
                skjema['brukernavn'].style.borderColor = 'red';
                alert('Ikke lov med upassende brukernavn');
                return false;
            }
            else {
                skjema['brukernavn'].style.borderColor = 'inherit';
            }
        }

        // Validerer passord
        if (skjema['passord'].value.length < this.passordMin || skjema['passord'].value.length > this-this.passordMax) {
            alert('Passordet må være mellom 5 - 15 tegn');
            skjema['passord'].style.borderColor = 'red';
            return false;
        }
        else {
            skjema['passord'].style.borderColor = 'inherit';
        }

        // Validerer epost
        if (skjema['epost'].value.match(/.@./gm) == null || skjema['epost'].value.match(/.\../gm) == null) {
            skjema['epost'].style.borderColor = 'red';
            alert('Ekte e-post adresse kreves');
            return false;
        }
        else {
            skjema['epost'].style.borderColor = 'inherit';
        }

        // Sjekker om e-posten finnes fra før
        if (this.eposter.includes(skjema['epost'].value) == true) {
            skjema['epost'].style.borderColor = 'red';
            alert('E-posten finnes fra før av');
            return false;
        }
        else {
            skjema['epost'].style.borderColor = 'inherit';
        }

        // Når alle kriteriene er møtt henter denne funskjonen inn dataene
        hentInnFormData();
    }
}

// Kjører funksjonen når skjemaet sendes inn
document.forms['skjema'].addEventListener('submit', function (evt) {
    evt.preventDefault()
    formValiderer.validerForm();
})

function hentInnFormData() {
    // Finner utskrifts-elementet som skal motta utskriften, og gjør det synelig
    let utskrift = document.getElementById('utskrift');
    utskrift.style.display = 'flex';

    // Setter brukernavnet som overskrift og legger det til i utskrifts-elementet
    let overskrift = document.createElement('h2');
    overskrift.innerHTML = document.getElementById('brukernavn').value;
    utskrift.appendChild(overskrift);

    // Sjekker hvilken radio-button som er valgt, og setter profilbilde sin kilde lik verdien av radio-knappen
    let profilbilde = document.createElement('img');
    let valgtProfilbilde = document.getElementById('profilbilder').querySelectorAll('input[type=radio]:checked');
    profilbilde.setAttribute('src', 'profilbilder/' + valgtProfilbilde[0].value + '.png');
    profilbilde.style.height = 200 + 'px';
    profilbilde.style.width = 200 + 'px';
    utskrift.appendChild(profilbilde);

    // Skriver ut e-posten
    let epost = document.createElement('p');
    epost.innerHTML = document.forms['skjema']['epost'].value;
    utskrift.appendChild(epost);

    // Finner checkbox-knappene som er checked, og skriver verdien ut til HTML
    let valgteInteresser = document.getElementById('interesser').querySelectorAll('input[type=checkbox]:checked')
    let interesserUtskrift = document.createElement('ul');
    utskrift.appendChild(interesserUtskrift);
    for (i = 0; i < valgteInteresser.length; i++) {
        let interesser = document.createElement('li');
        interesser.innerHTML = valgteInteresser[i].value;
        interesserUtskrift.appendChild(interesser);
    }

    // Lager 'send melding' knappen
    let sendMelding = document.createElement('button');
    sendMelding.innerHTML = 'Send melding'
    utskrift.appendChild(sendMelding);
    document.getElementById('skjema').remove(); // Legger til send melding knapp
}