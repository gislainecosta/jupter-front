CODEBY.PAGES.product=(()=>{var e={set_cookie:(e,t,o)=>{var n=new Date;n.setTime(n.getTime()+24*o*60*60*1e3);var i="expires="+n.toUTCString();document.cookie=e+"="+t+";"+i+";path=/"},rafAsync:()=>new Promise(e=>{requestAnimationFrame(e)}),checkElement:t=>null===document.querySelector(t)?e.rafAsync().then(()=>e.checkElement(t)):Promise.resolve(!0)},t={debug:!1,sliderFinished:!1,init:()=>{t.debug&&console.log("debug mode"),t.getSellerRemoveBenefts(),t.get_colors(skuJson.dimensions),t.getSellerInfo(),t.share(),t.orderSizes(),t.carouselFix(),t.makeSlider(),t.flagDiscount(),t.productCare(),t.productQuantity(),t.productPickedSize(),t.complementName(skuJson.skus[0].sku),t.productOutStock(),t.dropDown(),t.addLastSeen(),t.checkEmptySpecs(),t.customBreadcrumbs(),t.boxZoomMobile(),t.unavailable(),t.blockIcon(),t.buttonFixed(),t.seeMoreSku(),t.breadcrumbs(),t.favorite(skuJson.productId),t.alert_age(vtxctx.categoryId),window.alert=function(){t.validateDimensions()},isMobileWidth()&&t.descriptionDrops()},breadcrumbs:()=>{$("span.last-breadcrumb").html($("span.last-breadcrumb").text().split(" ")[0])},seeMoreSku:()=>{["Cor","Corsku","Cor925"].forEach(e=>{if(skuJson.dimensionsMap[""+e]){if(skuJson.dimensionsMap[""+e].length>6){let t=document.querySelector(".skuList.item-dimension-"+e),o=document.createElement("button");o.classList.add("see-more"),o.innerText="Ver todas +",t.appendChild(o),document.querySelector(".see-more").addEventListener("click",(function(e){let t=e.target.closest(".skuList");t.classList.contains("expand")?(t.classList.remove("expand"),e.target.innerText="Ver mais +"):(t.classList.add("expand"),e.target.innerText="Ver menos -")}))}}})},blockIcon:()=>{$(window).on("load",(function(){$(".group_0").children("label").each((function(){$(this).hasClass("inStock")||$(this).addClass("block-icon")}))}))},share:()=>{isMobileWidth()&&document.querySelector("#share .open")&&document.querySelector("#share .open").addEventListener("click",(function(){let e=document.title,t=window.location.href,o=$('meta[name="description"]').attr("content");void 0!==navigator.share&&navigator.share({title:e,text:o,url:t}).then(()=>console.log("Successful share")).catch(e=>console.log("Error sharing",e))}))},dropDown:()=>{["Sabor","Grau"].forEach(e=>{document.addEventListener("click",(function(t){if(!t.target.matches(`.topic.${e} .specification`))return;t.target.closest(".topic").classList.toggle("open")})),document.addEventListener("click",(function(t){if(!t.target.matches(`.topic.${e} .select label`))return;let o=t.target.closest(".topic");o.classList.remove("open");let n=t.target.innerText;o.querySelector(".specification").innerText=n}))})},orderSizes:()=>{let e=[];$(".topic.Tamanho .skuList label").map((t,o)=>{e.push([o.outerHTML,o.innerText])}),e=e.sort((function(e,t){return e[1]<t[1]||e[1].length>=2&&"PP"!==e[1]?1:e[1]>t[1]||"PP"===e[1]?-1:0})),e.map((e,t)=>{$("["+e[0].match(/for="(.*?)"/gi)+"]").css("order",String(t))})},carouselFix:()=>{document.querySelectorAll(".helperComplement").forEach(e=>e.parentNode.removeChild(e))},makeSlider:()=>{let t=document.getElementById("show"),o=document.getElementById("image-main");if(isMobileWidth()){function n(){setTimeout(()=>{mainSlider=tns({items:1,nav:!0,controls:!1,lazyload:!1,container:".apresentacao .thumbs"})},1e3)}t.style.height=window.screenWidth+"px",n(),document.querySelectorAll(".sku-selector-container .topic input").forEach(e=>{e.addEventListener("click",t=>{e.classList.contains("sku-picked")||(mainSlider&&mainSlider.destroy(),n())})})}else e.checkElement(".zoomPad #image-main").then(e=>{e&&(t.style.height=o.offsetHeight+"px")})},boxZoomMobile:()=>{isMobileWidth()&&($("#zoomMobile").on("click",(function(e){e.preventDefault();let t=$(".tns-item.tns-slide-active img").attr("src");$("#boxZoomMobile .box .image").html('<img src="'+t+'" />'),$("#boxZoomMobile").addClass("open")})),$("#boxZoomMobile .close").on("click",(function(){$("#boxZoomMobile").removeClass("open")})))},customBreadcrumbs:()=>{$("li.last").after($(".last-breadcrumb")).removeClass("last"),$(".last-breadcrumb").wrap('<li class="last"></li>'),$(".last-breadcrumb").text(skuJson_0.name)},unavailable:()=>{isMobileWidth()&&($(document).on("click",".product-unavailable .open",(function(e){e.preventDefault(),$(".unavailable-btns").hide(),$(".product-unavailable .portal-notify-me-ref").show()})),$(document).on("click",".notifymetitle.notifyme-title",(function(){$(".unavailable-btns").show(),$(".product-unavailable .portal-notify-me-ref").hide()})))},addLastSeen:()=>{var e=JSON.parse(localStorage.getItem("cbyLastSeenWL"));null==e&&(e=[]);for(var t=e,o={sku:skuJson.productId,name:skuJson.name,link:window.location.pathname,image:skuJson.skus[0].image,date:new Date},n=!1,i="",s=0;s<t.length;s++)t[s].sku===o.sku&&(t[s].date=new Date,n=!0,i=s);n?function(e,t,o){let n=1;const i=e.splice(t,n)[0];n=0,e.splice(o,n,i)}(t,i,0):t.unshift(o),t.length>8&&t.pop(),localStorage.setItem("cbyLastSeenWL",JSON.stringify(t))},alert_age:t=>{if("667"===t){var o=document.getElementById("alert_age");Cookies.get("maioridade")||o&&o.classList.remove("_dn"),document.querySelector("#alert_age button").addEventListener("click",(function(){o.remove(),e.set_cookie("maioridade",!1,1)})),document.querySelector("#alert_age .alert_close").addEventListener("click",(function(){o.remove()}))}},favorite:e=>{document.querySelector("._details_buttons .cby-list-icon").id="cby-list-product-"+e},validateDimensions:()=>{const e=skuJson.dimensions;if(Object.values(skuJson.dimensionsInputType).filter(e=>"Radio"===e).length){const t=document.querySelector(".buy-button");let o=document.querySelectorAll(".sku-selector-container .topic"),n=document.querySelectorAll(".sku-selector-container .topic input.checked");o.forEach(e=>{e.classList.remove("sku-not-picked"),t.classList.remove(e.classList[1])}),e.length!=n.length&&o.forEach(e=>{e.querySelector(".checked")||(e.classList.add("sku-not-picked"),t.classList.add(e.classList[1]))})}},getSellerRemoveBenefts:()=>{let e=skuJson.skus.filter((function(e){return"ALSOTECH LTDA"!=e.seller}));if(e){let o=["Cobasi","Fast Shop","Polishop","MMplace"];for(var t=0;t<o.length;t++)o[t]===e[0].seller&&(document.querySelector("._details_info_seller").style.display="none",document.querySelector(".benefits_seller_mobile").style.display="none")}},getSellerInfo:()=>{let e=skuJson.skus.filter((function(e){return"ALSOTECH LTDA"!=e.seller}));e&&(document.querySelector(".box_price .icon_price figcaption span").innerHTML=e[0].seller,fetch("/api/dataentities/SL/search?_fields=imageIcon,sellerName,link&sellerId="+e[0].sellerId,{method:"GET",headers:{"REST-Range":"resources=0-100",Accept:"application/json; charset=utf-8","Content-Type":"application/json; charset=utf-8"}}).then(e=>e.json()).then(e=>{if(e.length){let t=e[0];t.imageIcon&&(document.querySelector(".box_price .icon_price img").setAttribute("alt",t.sellerName),document.querySelector(".box_price .icon_price img").setAttribute("src","/arquivos/"+t.imageIcon)),document.querySelector(".box_price .icon_price a").setAttribute("alt",t.sellerName),document.querySelector(".box_price .icon_price a").setAttribute("href",t.link?t.link:"#")}}))},buttonFixed:()=>{if(window.innerWidth<960){var e=document.querySelector("._details_buttons");let o=document.querySelector(".box_name").cloneNode(!0),n=document.querySelector(".box_price").cloneNode(!0);e.prepend(n),e.prepend(o);const i=(t="._details_qtty_row",document.querySelector(t).getBoundingClientRect().top+window.scrollY);window.addEventListener("scroll",(function(){e&&(window.scrollY>i+50?(e.classList.add("_fixed"),document.getElementById("chat-also")&&(document.getElementById("chat-also").style.bottom="195px")):(e.classList.remove("_fixed"),document.getElementById("chat-also")&&(document.getElementById("chat-also").style.bottom="20px")))}))}var t},flagDiscount:function(){let e=document.querySelector(".plugin-preco .productPrice .descricao-preco .valor-de strong"),t=document.querySelector(".plugin-preco .productPrice .descricao-preco .valor-por strong");if(e&&t){let o=e.innerText.replace(/\D/g,""),n=t.innerText.replace(/\D/g,""),i=Math.round(100-Number(n)/Number(o)*100);document.querySelector(".discount-percent").innerText=0!=i?i+"% off":""}},selectedToBuy:()=>{if($(".sku-picked").length){let e=$(".sku-picked").map((e,t)=>t.value).get(),t=skuJson.skus.filter((function(t){return JSON.stringify(t.values)==JSON.stringify(e)&&1==t.available}));return t=t.length?t[0].sku:[],t}},complementName:e=>{skuJson&&(document.getElementById("sku-id").innerText="SKU: "+e,document.querySelectorAll(".topic").length&&document.querySelectorAll(".topic label.checked").forEach((function(e,t){document.querySelector(".productName").innerHTML=skuJson.name,setTimeout(()=>{document.querySelector(".productName").innerText+=" - "+e.innerText},300)})))},get_colors:function(t){if(JSON.stringify(t).includes("Cor")){function o(e){e.forEach((function(e,t){if(document.querySelector('.skuList input[specification="'+e.cor+'"]')){document.querySelector('.skuList input[specification="'+e.cor+'"] + label').style.background=e.hexadecimal}if(document.querySelector('.skuList input[value="'+e.cor+'"]')){document.querySelector('.skuList input[value="'+e.cor+'"] + label').style.background=e.hexadecimal}}))}if(Cookies.get("colors")){o(JSON.parse(localStorage.getItem("colors")))}else fetch("/api/dataentities/CO/search?_fields=cor,hexadecimal",{method:"GET",headers:{"REST-Range":"resources=0-1000",Accept:"application/json; charset=utf-8","Content-Type":"application/json; charset=utf-8"}}).then(e=>e.json()).then(t=>{t.length&&(o(t),e.set_cookie("colors","in_local_storage",1),localStorage.setItem("colors",JSON.stringify(t)))})}},productPickedSize:()=>{JSON.stringify(skuJson.dimensionsInputType).includes("Combo")&&document.querySelectorAll(".sku-selector").forEach((function(e,t){e.querySelector("option:first-child").innerText=e.getAttribute("specification")})),$(".topic").each((function(){$(this).find(".specification").append('<span id="selected"></span>')})),$(".topic .skuList input").change((function(){var e=$(this).val();if($(this).next().attr("title",e),e.indexOf("-")){var o=e.split("-");e=o[0]}$(this).parents(".topic").find("#selected").text(": "+e),t.flagDiscount(),t.validateDimensions(),t.complementName(t.selectedToBuy())}))},productQuantity:()=>{var e=$("._details_qtty_row input"),t=parseInt(e.val());function o(o){(t=parseInt(e.val())+o)>=1&&(e.val(t).change(),$(".buy-button").trigger("quantityChanged.vtex",[skuJson.productId,t]))}$(document).on("click","._details_qtty_row .plus",(function(){o(1)})),$(document).on("click","._details_qtty_row .minus",(function(){o(-1)}))},productCare:()=>{var e=$(".Cuidados tr");e.first().addClass("_is-active"),e.each((function(){var t=$(this);t.click((function(o){o.preventDefault(),e.removeClass("_is-active"),t.addClass("_is-active")}))}))},productOutStock:()=>{if("object"==typeof window.skuJson||"object"==typeof window.skuJson_0){var e,t,o,n,i=window.skuJson||window.skuJson_0;$("._details_spec");$.each(i.skus,(function(i,s){(e=s.available)&&s.values&&(t=s.values[0],$(".topic .skuList").each((function(){(o=$(this).find(".skuselector-specification-label").first().attr("dimension"))&&(n=$(this).find('input[dimension="'+o+'"][data-value="'+t+'"]'),$.each(n,(function(){e?($(this).addClass("inStock"),$(this).next().addClass("inStock")):($(this).addClass("outStock"),$(this).next().addClass("outStock"),$(this).next().append("<i>x</i>"))})))})))}))}},descriptionDrops:()=>{document.querySelectorAll("._details_description-header, ._details_specification-header").forEach(e=>{e.onclick=()=>{e.parentNode.classList.toggle("_is-open")}})},checkEmptySpecs:()=>{""==document.querySelector("._description .productDescription").textContent&&(document.querySelector("._description ._details_description").style.display="none"),""==document.querySelector("._description #caracteristicas").textContent&&(document.querySelector("._description ._details_specification").style.display="none")}};return t})(); 
 
 
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

    }
 };