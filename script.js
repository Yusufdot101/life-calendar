const gender = document.getElementById("gender");
const birthDate = document.getElementById("birthDate");
const view = document.getElementById("view");
const calendar = document.getElementById("calendar");
const age = document.getElementById("age");

const averageMaleLifeExpectancyDays = 71.2 * 365;
const averageFemaleLifeExpectancyDays = 76.4 * 365;

const calculateUserAge = () => {
    const today = new Date();
    const birth = new Date(birthDate.value);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    return [years, months, days];
};

let [years, months, days] = calculateUserAge();
age.textContent = `You are ${years} years and ${months > 0 ? `${months} months` : ""} old`;

const setupCalendar = () => {
    let numOfUnits;
    if (gender.value === "male") {
        numOfUnits = averageMaleLifeExpectancyDays;
    } else if (gender.value === "female") {
        numOfUnits = averageFemaleLifeExpectancyDays;
    } else {
        return;
    }

    userAge = years * 365 + months * 30.4167 + days;

    if (view.value === "week") {
        numOfUnits /= 7;
        userAge /= 7;
    } else if (view.value === "month") {
        numOfUnits /= 30.4167;
        userAge /= 30.4167;
    } else if (view.value === "year") {
        numOfUnits /= 365;
        userAge /= 365;
    }

    calendar.replaceChildren();
    for (let i = 0; i < numOfUnits; i++) {
        const unit = document.createElement("div");
        unit.classList.add("unit");
        if (i < userAge) {
            unit.classList.add("passed");
        }
        calendar.appendChild(unit);
    }
};

gender.addEventListener("change", () => {
    setupCalendar();
});

view.addEventListener("change", () => {
    setupCalendar();
});

birthDate.addEventListener("change", () => {
    [years, months, days] = calculateUserAge();
    age.textContent = `You are ${years} years and ${months > 0 ? `${months} months` : ""} old`;
    setupCalendar();
});

window.addEventListener("load", () => {
    setupCalendar();
});
