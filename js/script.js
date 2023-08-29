const form = document.querySelector("form");
const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const textYear = document.querySelector("#ano-mudar");
const textMonth = document.querySelector("#mes-mudar");
const textDay = document.querySelector("#dia-mudar");

form.addEventListener('submit', function(e) {
    e.preventDefault();
    var status = true;

    const presentDate = new Date();
    const userDate = new Date(inputYear.value, inputMonth.value - 1, inputDay.value);
    const daysInMonth = new Date(inputYear.value, inputMonth.value, 0);

    if (inputDay.value === "") {
        setError(inputDay, "This field is required");
        status = false;
    } else if (inputDay.value > 31 || inputDay.value < 1) {
        setError(inputDay, "Must be a valid day");
        status = false;
    } else if (inputDay.value > daysInMonth.getDate()) {
        setError(inputDay, "Must be a valid date");
        status = false;
    } else {
        removeError(inputDay);
    }

    if (inputMonth.value === "") {
        setError(inputMonth, "This field is required");
        status = false;
    } else if (inputMonth.value > 12 || inputMonth.value < 1) {
        setError(inputMonth, "Must be a valid month");
        status = false;
    } else {
        removeError(inputMonth);
    }
    if (inputYear.value === "") {
        setError(inputYear, "This field is required");
        status = false;
    } else if (inputYear.value < 1900) {
        setError(inputYear, "Must be a valid year"); 
        status = false;
    } else {
        removeError(inputYear);
    }

    if (status) {
        var years = presentDate.getFullYear() - userDate.getFullYear();
        var months = presentDate.getMonth() - userDate.getMonth();
        var days = presentDate.getDate() - userDate.getDate();
        const daysPreviousMonth = new Date(presentDate.getFullYear(), presentDate.getMonth(), 0).getDate();
        const daysPreviousPreviousMonth = new Date(presentDate.getFullYear(), presentDate.getMonth() - 1, 0).getDate();

        if (days < 0) {
            months--;
            days = daysPreviousMonth + days;
        }
        if (days < 0) {
            months--;
            days = daysPreviousPreviousMonth + days;
        }
        if (months < 0) {
            years--;
            months = 12 + months;
        }
        print(days, months, years);
    }
});

function print(days, months, years) {
    var d = 0;
    var m = 0;
    var y = 0;

    const myInterval = setInterval(function() {
        if (y <= years) {
            textYear.innerText = y; 
            y++;
        }
        if (m <= months) {
            textMonth.innerText = m; 
            m++;
        }
        if (d <= days) {
            textDay.innerText = d;
            d++;
        }
        if ((y == years) && (m == months) && (d == days)) {
            clearInterval(myInterval);
        }
    }, 25);
}

function setError(errorElement, message) {
    const parentElement = errorElement.parentElement;
    parentElement.classList.add('error');
    parentElement.querySelector('small').innerText = message;
}

function removeError(errorElement) {
    const parentElement = errorElement.parentElement;
    parentElement.classList.remove('error');
    parentElement.querySelector('small').innerText = "";
}
