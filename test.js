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

chrome.commands.onCommand.addListener((command) => {
    if (command === "Alt+1") {
        chrome.tabs.query({
            active: true
        }, function (tabs) {
            // START SCRIPT
            chrome.tabs.executeScript(tabs[0].id, {
                code: `
                document.querySelector('meta[property="product:sku"]') ? 'skuId:' + document.querySelector('meta[property="product:sku"]').getAttribute('content') : 'productId:' + document.getElementById('___rc-p-id').getAttribute('value')
                `,
            }, function (results) {
                let htmlContent = results[0];

                let url = tabs[0].url.split('/')[2];

                fetch('https://' + url + '/api/catalog_system/pub/products/search?fq=' + htmlContent, {
                        method: 'GET',
                    })
                    .then(res => res.json())
                    .then(json => {
                        let all = json[0];

                        alert(all.productName);

                        console.log('all', all);

                        fale('Descrição do produto... ' + all.description);
                    });
            });
        });
    }

    if (command === "Alt+2") {
        fale('Ouvir as especificações');
    }

    if (command === "Alt+3") {
        fale('Ouvir as variações disponíveis');
    }

    if (command === "Alt+4") {
        fale('Calcular frete');
    }
});

let input = document.createElement('input');
input.id = 'list';
document.querySelector('body').prepend(input);

input.onkeydown = function (event) {
    console.log(event.key);

    // if (e.keyCode == 13) {
    //     alert('enter key pressed');
    // }
    // e.preventDefault();
};