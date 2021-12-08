let ordSjekker = {
    faktor3: 'Cowabunga!',
    faktor5: 'Hadouken!',
    faktor15: 'Cowabunga! ' + 'Hadouken!', //Ønsket å bruke this.faktor3 og this.faktor5, men virket ikke av en eller annen grunn
    sjekkTall(tall) {
        if (Math.floor(tall / 15) == tall / 15) {
            return this.faktor15;
        }
        if (Math.floor(tall / 3) == tall / 3) {
            return this.faktor3;
        }
        else if (Math.floor(tall / 5) == tall / 5) {
            return this.faktor5;
        }
        else {
            return tall;
        }
    }
} //Oppretter object med ordene som skal byttes ut og en metode for å sjekke om tallene er delelige

let liste = document.getElementById('utskrift'); //Finner listen som skal skrives ut til

function genererListe() {
    for (i = 1; i <= 100; i++) {
        element = document.createElement('li');
        element.innerHTML = ordSjekker.sjekkTall(i);
        liste.appendChild(element);
        console.log(ordSjekker.sjekkTall(i));
    }
} //Genererer listen og skriver den ut til HTML

genererListe()
