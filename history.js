async function history() {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');

    let api_call = `http://history.muffinlabs.com/date/${mm}/${dd}`

    let result = await fetch(api_call);
    let json = await result.json();


    let $history = $('.dayInHistory');
    let event = document.createElement('div');
    event.className='events';
    let x = json.data.Events.length;
    
    let randomEvent = Math.floor(Math.random() * x);
    let curr = json.data.Events[randomEvent];

    event.innerHTML = `
            <h6 class="card-subtitle mb-2 text-muted"><strong>Year: </strong>${curr.year}</h6>
            <p class="card-text">${curr.text}</p>
    
    `

    $history.append(event);
    
    


    return json;
}

history();