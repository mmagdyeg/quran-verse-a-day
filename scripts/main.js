var quran = [];
// Get a reference to the container element
const container = document.getElementById('quotes-container');

// Loop through the array and generate HTML for each element
  var html = '';
  var surah = [];
  fetch(`index/surah.json`)
      .then(response => response.json())
        .then(data =>{   
          surah.push(data);
          showSurahTemplate(data,document.getElementById('surahTableBody'));                  
        }).catch(error => console.error(error));   

  const numbers = Array.from({length: 114}, (_, i) => i + 1);
  
  numbers.forEach(function(number) {    
    fetch(`surah/surah_${number}.json`)
      .then(response => response.json())
        .then(data =>{                   
          quran.push(data);   
          if(number==numbers.length-1){
            showVersesTemplate(quran.flat());
          }            
        }).catch(error => console.error(error));          
    }
  );


  function showVersesTemplate(list){
    const i = Math.floor(Math.random() * list.length);
    //for (var i = 0;i<list.length;i++) {
       var verse = list[i].verse;       
       var x = Math.floor(Math.random() * Object.keys(list[i].verse).length);
       html += `
          <div class="col-md-8 mx-auto">
              <blockquote class="blockquote">
                  <p class="mb-0 rounded grad text-white center">"${verse['verse_'+x]}"</p>
                  <footer class="blockquote-footer">${surah[0].filter(x=>x['index']==list[i]['index'])[0].titleAr} - (اية رقم ${x})</footer>
              </blockquote>              
          </div>
        `;
        // Append the generated HTML to the container element
        container.innerHTML = html;                
    //  }
  }
  function showSurahTemplate(list,toElement){
    toElement.innerHTML = '';
    //const i = Math.floor(Math.random() * list.length);
    for (var i = 0;i<list.length;i++) {
       //var verse = list[i].verse;       
       //var x = Math.floor(Math.random() * Object.keys(list[i].verse).length);
       toElement.innerHTML += `              
              <tr>
                <th scope="row">${i+1}</th>
                <td>${list[i].titleAr}</td>
                <td>${list[i].count}</td>
                <td>${list[i].typeAr}</td>
              </tr>              
        `;
                     
     }
  }
  

  const button = document.getElementById("newVerseBtn");
      button.addEventListener("click", function() {
        html = '';
        showVersesTemplate(quran.flat());
      });