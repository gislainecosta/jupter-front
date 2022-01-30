 //KEY PRESS
 let input = document.createElement('input');
 input.id = 'list';
 input.autofocus = true;
 document.querySelector('body').prepend(input);

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

 fale(
     `
        Olá, eu sou a Lis.
        Aperte 1 para Ouvir a descrição do produto
        Aperte 2 para Ouvir as especificações
        Aperte 3 para Ouvir as variações disponíveis
        Aperte 4 para Calcular o frete
        Aperte 5 para Adicionar ao carrinho
        Aperte 6 para Desligar assistente  
     `
);

 input.onkeydown = function (event) {
     console.log(event.key);

     let htmlContent = document.querySelector('meta[property="product:sku"]') ? 'skuId:' + document.querySelector('meta[property="product:sku"]').getAttribute('content') : 'productId:' + document.getElementById('___rc-p-id').getAttribute('value');

     if (event.key === '1') {
        fale(event.key);
         fetch('/api/catalog_system/pub/products/search?fq=' + htmlContent, {
                 method: 'GET',
             })
             .then(res => res.json())
             .then(json => {
                 let all = json[0];

                 fale('Descrição do produto: ' + all.description);
             });
     }

     if (event.key === '2') {
        fale(event.key);
         setTimeout(() => {
             fetch('/api/catalog_system/pub/products/search?fq=' + htmlContent, {
                     method: 'GET',
                 })
                 .then(res => res.json())
                 .then(json => {
                     let all = json[0];
    
                     let specifications = Object.values(all.allSpecifications);
    
                     let text = '';
    
                     specifications.forEach(function(key, value) {
                         text += key + ' ' + json[0][key];
                     });
    
                     console.log(text);
    
                     fale(text);
                 });
         }, 3000);
     }

     if (event.key === '3') {
        fale(event.key);
         setTimeout(() => {
             fetch('/api/catalog_system/pub/products/search?fq=' + htmlContent, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(json => {
                let all = json[0];
    
                let items = all.items;

                if (items.length === 1) {
                    fale('Este produto não possui variações');
                } else {
                    let text = '';
        
                    items.forEach(function (item, index) {
                        text += item.name;
                    });
    
                    fale(text);
                }
            });
         }, 3000);
     }

     if (event.key === '4') {
        fale(event.key);
     }

     if (event.key === '5') {
        fale('5 Adicionando o produto ao carrinho.');

        setTimeout(() => {
            fetch('/api/catalog_system/pub/products/search?fq=' + htmlContent, {
                method: 'GET',
                })
                .then(res => res.json())
                .then(json => {
                    let all = json[0];
                    window.location.href = all.items[0].sellers[0].addToCartLink;
                });
        }, 3000);       
     }

     if (event.key === '6') {
        fale(event.key);

        document.getElementById('list').remove();
    }
 };