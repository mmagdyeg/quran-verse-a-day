var quotes = [];
// Get a reference to the container element
const container = document.getElementById('quotes-container');

// Loop through the array and generate HTML for each element
var html = '';

  const numbers = Array.from({length: 114}, (_, i) => i + 1);
  var all = [];
  numbers.forEach(function(number) {
    
    fetch(`/surah/surah_${number}.json`)
      .then(response => response.json())
        .then(data =>{                   
          all.push(data);   
          if(number==numbers.length-1){
            showVersesTemplate(all.flat());
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
                  <footer class="blockquote-footer">${list[i].name} - (${list[i].count})</footer>
              </blockquote>              
          </div>
        `;
        // Append the generated HTML to the container element
        container.innerHTML = html;                
    //  }
  }
  

  const button = document.getElementById("newVerseBtn");
      button.addEventListener("click", function() {
        html = '';
        showVersesTemplate(all.flat());
      });