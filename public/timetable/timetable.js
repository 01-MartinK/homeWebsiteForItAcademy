let fetch = require('node-fetch');
var XMLHttpRequest = require('xhr2');


async function clickme() {
    var selectorWeek = document.getElementById('week').value;
    console.log(parseInt(selectorWeek.slice(-2)))
    console.log(parseInt(selectorWeek.substring(-4)))
    var pickerDate = getDateOfWeek(parseInt(selectorWeek.slice(-2)) + 1, parseInt(selectorWeek.substring(-4)))
    console.log(new Date(pickerDate).toISOString())
    var element = document.getElementById('peepo').value;

    var dd = String(pickerDate.getDate()).padStart(2, '0');
        var mm = String(pickerDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = pickerDate.getFullYear();
    pickerDate = yyyy + '-' + mm + '-' + dd;
    console.log(pickerDate)

    const dict = {
        'ITA19': 1433,
        'ITA20': 1529,
        'ITA21': 1583,
        'ITS20': 1508,
        'ITS21': 1582
    }

    queryurl = `https://siseveeb.voco.ee/veebilehe_andmed/tunniplaan?grupp=${dict[element]}&nadal=${pickerDate}`;
    console.log(queryurl)

    console.log(dict[element])
    let body
    var oReq = new XMLHttpRequest();
    oReq.open("GET", queryurl);
    oReq.responseType = 'json';
    oReq.onload = function(e) {
        if (this.status == 200) {
            console.log(this.response['tunnid'])
            console.log(typeof(this.response))
            var table = document.getElementsByTagName("tbody");
            console.log(table);
            for (var i = 1; i < Object.keys(this.response['ajad']).length; i++){
                var obj = this.response['ajad'][i];
                table[0].rows[i].cells[0].innerText = obj;
                }
            let compare
            let cmp2 = 0
            for (var i = 1; i < 6; i++) {
                Object.keys(this.response['tunnid']).forEach(paev => {
                    cmp2++;
                    console.log(cmp2)
                    Object.keys(this.response['tunnid'][paev]).forEach(paevaTund => {
                        compare = parseInt(this.response['tunnid'][paev][paevaTund]['tund'])
                        var instring = ''
                        instring += this.response['tunnid'][paev][paevaTund]['aine']
                        //instring += `\n\n${this.response['tunnid'][paev][paevaTund]['opetaja']}`
                        //instring += `\n\n${this.response['tunnid'][paev][paevaTund]['ruum']}`

                        table[0].rows[compare].cells[cmp2].innerText = instring;
                        })
                    })
                }

                }

        };
    oReq.send();
};


function getFirstDayOfWeek(d) {
    // 👇️ clone date object, so we don't mutate it
    const date = new Date(d);
    const day = date.getDay(); // 👉️ get day of week

    // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
}

function getDateOfWeek(w, y) {
    let date = new Date(y, 0, (1 + (w - 1) * 7)); // Elle's method
    date.setDate(date.getDate() + (1 - date.getDay())); // 0 - Sunday, 1 - Monday etc
    return date
}