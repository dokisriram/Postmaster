// initialize number of parameters
let addedparams = 0;

//Utility functions
//1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}




//Hide the parameters box initially
let parametersbox = document.getElementById('parametersbox');
parametersbox.style.display = 'none';

//if the user clicks on params box hide the json box
let paramsradio = document.getElementById('paramsradio');
paramsradio.addEventListener('click', () => {
    document.getElementById('requestjsonbox').style.display = 'none';
    document.getElementById('parametersbox').style.display = 'block';
})

//if the user clicks on json box, hide the params box
let jsonsradio = document.getElementById('jsonradio');
jsonsradio.addEventListener('click', () => {
    document.getElementById('requestjsonbox').style.display = 'block';
    document.getElementById('parametersbox').style.display = 'none';
})

//if the user clicks on + button, add more parameters
let addparam = document.getElementById('addparam');
addparam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addedparams + 2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterkey${addedparams + 2}" placeholder="Enter Parameter ${addedparams + 2} Key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parametervalue${addedparams + 2}"
                        placeholder="Enter Parameter ${addedparams + 2} Value">
                </div>
                <button id="addparam" class="btn btn-primary deleteparam">-</button>
                </div>`;

    //convert the element string to DOM node
    let paramelement = getElementFromString(string);
    params.appendChild(paramelement);

    //Add an event listener to remove the parameter on clicking - button
    let deleteparam = document.getElementsByClassName('deleteparam');
    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addedparams++;
})


//if the user clicks on submit button
let submit = document.getElementById('submit');
submit = addEventListener('click', () => {
    //show please wait in the response box to request patience from the user
    // document.getElementById('responsejsontext').value = 'please wait.... Fetching Response';
    document.getElementById('responseprism').innerHTML = 'please wait.... Fetching Response';
    Prism.highlightAll();

    //fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requesttype = document.querySelector("input[name='requesttype']:checked").value;
    let contenttype = document.querySelector("input[name='contenttype']:checked").value;



    //if user has used params option instead of json, collect all the parameters in an object
    if (contenttype == 'params') {
        data = {};
        for (let i = 0; i < addedparams + 1; i++) {
            if (document.getElementById('parameterkey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterkey' + (i + 1)).value;
                let value = document.getElementById('parametervalue' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data);
        }
    }
    else {
        data = document.getElementById('requestjsontext').value;
    }

    //log all the values in the console for debugging 
    console.log('url is ', url);
    console.log('request type is ', requesttype);
    console.log('content type is ', contenttype);
    console.log('data is ', data);

    // if the request type is post invoke fetch api to create a get request
    if (requesttype == 'GET') {
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responsejsontext').value=text;
                document.getElementById('responseprism').innerHTML = text;
                Prism.highlightAll();
            });
    }

    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responsejsontext').value=text;
                document.getElementById('responseprism').innerHTML = text;
                Prism.highlightAll();
            });

    }



})





