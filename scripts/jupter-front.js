var lis = (function () {
    var utils = {
        falar: function (text) {
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
        },

        id: function () {
            return document.querySelector('meta[property="product:sku"]') ? 'skuId:' + document.querySelector('meta[property="product:sku"]').getAttribute('content') : 'productId:' + document.getElementById('___rc-p-id').getAttribute('value');
        }
    };

    // SAUDAÇÃO INICIAL
    utils.falar(
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

    var html = {
        html: function () {
            let content = `
               <button class="lis_toggle">Lis</button>
           
               <div class="lis_content">
                   <span class="lis_toggle lis_close">x</span>
                   <p>Olá, eu sou a Lis!</p>
                   <input type="text" autofocus />
               </div>
           `;


            let box = document.createElement('div');
            box.id = 'lis';
            box.classList.add('_open');
            box.innerHTML = content;

            document.querySelector('body').appendChild(box);

            // TOGGLE
            document.addEventListener('click', function (event) {
                if (!event.target.matches('#lis .lis_toggle')) return;

                let div = event.target.closest('#lis');
                div.classList.toggle('_open');

                let input = document.querySelector('#lis input');
                input.focus();
            });
        },

        style: function () {
            var style = document.createElement('style');

            style.innerHTML = `
               #lis._open button {
                   display:none;
               }

               #lis:not(._open) .lis_content {
                   display:none;
               }

               #lis {
                  width: auto;
                  height: auto;
                  right: 15px;
                  bottom: 15px;
                  position: fixed;
              }
              
              #lis .lis_content {
                  padding: 10px;
                  border-radius: 5px;
                  text-align: center;
                  position: relative;
                  background-color: #DDAA5E;
              }
          
              #lis .lis_content .lis_close {
                  top: -4px;
                  right: -4px;
                  width: 20px;
                  height: 20px;
                  cursor: pointer;
                  position: absolute;
                  border-radius: 50px;
                  background-color: #fff;
                  border: 1px solid #dcdcdc;
              }
          
              #lis .lis_content p {
                  margin: 0 0 10px;
              }
          
              #lis .lis_content input {
                  border: none;
                  min-width: 200px;
                   min-height: 30px;
              }
          
              #lis button {    
                  width: 3.5rem;
                  border: none;
                  height: 3.5rem;
                   cursor: pointer;
                   border-radius: 50%;
                   background-color: #DDAA5E;
                   box-shadow: 3px 3px 5px 0px rgb(50 50 50 / 47%);
              }
          `;

            document.querySelector('head').append(style);
        }
    };

    html.html();
    html.style();

    var input = {
        keydown: function () {
            document.querySelector('#lis input').onkeydown = function (event) {
                switch (event.key) {
                    case '1':
                        utils.falar(event.key);

                        setTimeout(() => {
                            fetch('/api/catalog_system/pub/products/search?fq=' + utils.id(), {
                                    method: 'GET',
                                })
                                .then(res => res.json())
                                .then(json => {
                                    let all = json[0];
   
                                    utils.falar('Descrição do produto: ' + all.description);
                                });
                        }, 3000);
                        break;

                    case '2':
                        utils.falar(event.key);
                        setTimeout(() => {
                            fetch('/api/catalog_system/pub/products/search?fq=' + utils.id(), {
                                    method: 'GET',
                                })
                                .then(res => res.json())
                                .then(json => {
                                    let all = json[0];

                                    let specifications = Object.values(all.allSpecifications);

                                    let text = '';

                                    specifications.forEach(function (key, value) {
                                        text += key + ' ' + json[0][key];
                                    });

                                    console.log(text);

                                    utils.falar(text);
                                });
                        }, 1000);
                        break;
                    case '3':
                        utils.falar(event.key);
                        setTimeout(() => {
                            fetch('/api/catalog_system/pub/products/search?fq=' + utils.id(), {
                                    method: 'GET',
                                })
                                .then(res => res.json())
                                .then(json => {
                                    let all = json[0];

                                    let items = all.items;

                                    if (items.length === 1) {
                                        utils.falar('Este produto não possui variações');
                                    } else {
                                        let text = '';

                                        items.forEach(function (item, index) {
                                            text += item.name;
                                        });

                                        utils.falar(text);
                                    }
                                });
                        }, 3000);
                        break;
                    case '4':
                        utils.falar(event.key);
                        break;
                    case '5':
                        utils.falar('5 Adicionando o produto ao carrinho.');

                        setTimeout(() => {
                            fetch('/api/catalog_system/pub/products/search?fq=' + utils.id(), {
                                    method: 'GET',
                                })
                                .then(res => res.json())
                                .then(json => {
                                    let all = json[0];
                                    window.location.href = all.items[0].sellers[0].addToCartLink;
                                });
                        }, 3000);
                        break;
                    case '6':
                        utils.falar(event.key);

                        document.getElementById('lis').classList.remove('_open');
                        break;
                    default:
                        // DEFAULT
                        break;
                }
            };
        }
    };

    input.keydown();
})();