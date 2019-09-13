var today = new Date();
var currentYear = today.getFullYear();
var currentMonth = today.getMonth();
var currentDate = today.getDate();
var m = currentMonth;
var yearnow = currentYear;    
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

calendar(currentMonth,currentYear);

function calendar(month,year){
    today.setFullYear(year);
    today.setMonth(month);
    today.setDate(1);
    let day = today.getDay();

    let numOfDays = new Date(year, month+1, 0).getDate();
    let calendar = document.getElementById("mytable");
    let num = 0;
    let caldate =1;
    let id = 0;

    let displayMonthYear = document.createElement("h1");
    displayMonthYear.textContent= months[month] + " " + year;
    monthDisplay.appendChild(displayMonthYear);

    while (num < 42){
        let row = document.createElement("tr");
        row.setAttribute("id", ++id);
        for (var i=num; i < 42; ++i){
            var td = document.createElement("td");
            td.setAttribute("id",++id);
            if (num < day || caldate > numOfDays) {
                td.textContent= "";

            }else if (num >= day){
                if (caldate == currentDate && month == currentMonth && year== currentYear){
                    td.style.cssText ="background-color: green";
                }
                td.textContent = caldate++;
            }
            ++num; 
            row.appendChild(td);
            if (num % 7 == 0){
                    break;
            }
        }
        calendar.appendChild(row);
    }
    $(document).ready(function(){
        $('td').click(function () {
            var theCSSprop = window.getComputedStyle(this, null).getPropertyValue("background-color");
            if ("rgb(0, 128, 0)" != theCSSprop.toString()){
                if ("rgb(255, 0, 0)" != theCSSprop.toString()) {
                    $(this).css("background-color", "red");
                } else {
                    $(this).css("background-color", "white");
                }
            }                    
        })
    });
    $(document).ready(function(){
        $("td").mouseover(function(){
            var theCSSprop = window.getComputedStyle(this, null).getPropertyValue("background-color");
            if ("rgb(0, 128, 0)" != theCSSprop.toString()){
                if ("rgb(255, 0, 0)" != theCSSprop.toString()) {
                    $(this).css("background-color", "gray");
                }
            } 
        });
        $("td").mouseout(function(){
            var theCSSprop = window.getComputedStyle(this, null).getPropertyValue("background-color");
            if ("rgb(0, 128, 0)" != theCSSprop.toString()){
                if ("rgb(255, 0, 0)" != theCSSprop.toString()) {
                    $(this).css("background-color", "white");
                }
            }
        });
    });

}

function previous(){
    monthDisplay.innerHTML="";
    deleteMonth();
    --m;
    if (m < 0){
        m = 11;
        --yearnow;
    }    
    calendar(m,yearnow);
    console.log(m);
   // success.innerHTML="";
}

function next(){
    monthDisplay.innerHTML="";
    deleteMonth();
    ++m;
       if (m > 11){
            m %= 12;
       		++yearnow;
    }
    calendar(m,yearnow);
    console.log(m);
    //success.innerHTML="";

}

function deleteMonth() {
    count = 48;
    while (count > 0) {
        var elem = document.getElementById(count);
        elem.parentNode.removeChild(elem);
        count--;
    }
}
function jump(){
    monthDisplay.innerHTML="";
    var Month = month.value;
    var Year= year.value;
    calendar(Month,Year);
    deleteMonth();
}

$(document).ready(function(){
    $('#ajax').click(function(){
     var proxy = 'https://cors-anywhere.herokuapp.com/';
      var apiLinkDS = 'https://api.darksky.net/forecast/e2c8b7bba44a193f5ef7d56f5cc0ede3/10.3539171,123.9114687';
      $.get({ 
        url: proxy + apiLinkDS,
        success: function( data ) {
          alert("The Temperature today:\xa0\xa0" + data.currently.temperature +"\xa0\xa0Fahrenheit");
        }
      });
    });
});



