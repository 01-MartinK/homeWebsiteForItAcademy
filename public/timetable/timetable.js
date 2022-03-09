let fetch = require('node-fetch');
var XMLHttpRequest = require('xhr2');


async function clickme() {
    var element = document.getElementById('peepo').value;
    var today = getFirstDayOfWeek(new Date());
    var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const dict = {
        'ITA19': 1433,
        'ITA20': 1529,
        'ITA21': 1583,
        'ITS20': 1508,
        'ITS21': 1582
    }

    queryurl = `https://siseveeb.voco.ee/veebilehe_andmed/tunniplaan?grupp=${dict[element]}&nadal=${today}`;
    console.log(queryurl)

    console.log(dict[element])
    console.log(today)
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
                        table[0].rows[compare].cells[cmp2].innerText = this.response['tunnid'][paev][paevaTund]['aine'];
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
