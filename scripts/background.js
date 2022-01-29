 //SPEAK
 function fale(text) {
    var synth = window.speechSynthesis;

    var voices = [];

    function populateVoiceList() {
        voices = synth.getVoices().sort(function (a, b) {
            const aname = a.name.toUpperCase(),
                bname = b.name.toUpperCase();
            if (aname < bname) return -1;
            else if (aname == bname) return 0;
            else return +1;
        });
    }

    populateVoiceList();

    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    function speak() {
        if (synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }

        if (text !== '') {
            var utterThis = new SpeechSynthesisUtterance(text);

            utterThis.onend = function (event) {
                console.log('SpeechSynthesisUtterance.onend');
            }

            utterThis.onerror = function (event) {
                console.error('SpeechSynthesisUtterance.onerror');
            }

            var selectedOption = 'Google português do Brasil';

            for (i = 0; i < voices.length; i++) {
                if (voices[i].name === selectedOption) {
                    utterThis.voice = voices[i];
                    break;
                }
            }

            utterThis.pitch = 1;
            utterThis.rate = 1;
            synth.speak(utterThis);
        }
    }

    speak();
}

//KEY PRESS
let input = document.createElement('input');
input.id = 'list';
document.querySelector('body').prepend(input);

input.onkeydown = function (event) {
    console.log(event.key);

    let htmlContent = document.querySelector('meta[property="product:sku"]') ? 'skuId:' + document.querySelector('meta[property="product:sku"]').getAttribute('content') : 'productId:' + document.getElementById('___rc-p-id').getAttribute('value');

    if (event.key === '1') {
        fetch('/api/catalog_system/pub/products/search?fq=' + htmlContent, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(json => {
                let all = json[0];

                alert(all.productName);

                console.log('all', all);

                fale('Descrição do produto... ' + all.description);
            });
    }

    if (event.key === '2') {
        fale('Ouvir as especificações');

        fetch('/api/catalog_system/pub/products/search?fq=' + htmlContent, {
           method: 'GET',
       })
       .then(res => res.json())
       .then(json => {
           let all = json[0];

           alert(all.productName);

           console.log('all', all);

           fale('Descrição do produto... ' + all.specefication);
       });
    }

    if (event.key === '3') {
        fale('Ouvir as variações disponíveis');

        
    }

    if (event.key === '4') {
        fale('Calcular frete');
    }
};