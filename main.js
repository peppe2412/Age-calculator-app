const input = document.querySelectorAll("input");
const submitResults = document.querySelector("#submit-results");
const alertsError = document.querySelectorAll(".alert-error");
const linesInitial = document.querySelectorAll(".line-initial");
const yearResult = document.querySelector("#year-result");
const monthResult = document.querySelector("#month-result");
const dayResult = document.querySelector("#day-result");

const today = new Date();
const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

submitResults.addEventListener("click", () => {
  input.forEach((input, index) => {
    clearAlertError(input, index);
    checkIfError(input, index);
  });
  calculate();
});

input.forEach((singleInput) => {
  singleInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      input.forEach((input, index) => {
        clearAlertError(input, index);
        checkIfError(input, index);
      });
      calculate();
    }
  });
});

function calculate() {
  const dayValue = parseInt(input[0].value);
  const monthValue = parseInt(input[1].value);
  const yearValue = parseInt(input[2].value);

  const hasError = [...alertsError].some((alert) => {
    return !alert.classList.contains("display-none");
  });

  if (hasError || isNaN(dayValue) || isNaN(monthValue) || isNaN(yearValue))
    return;

  let dayInsert = day - dayValue;
  let monthInsert = month - monthValue;
  let yearInsert = year - yearValue;

  if (dayInsert < 0) {
    monthInsert--;
    const monthBefore = new Date(today.getFullYear(), today.getMonth(), 0);
    dayInsert += monthBefore.getDate();
  }

  if (monthInsert < 0) {
    yearInsert--;
    monthInsert += 12;
  }

  linesInitial.forEach((line) => {
    line.classList.add("display-none");
  });

  yearResult.textContent = yearInsert;
  monthResult.textContent = monthInsert;
  dayResult.textContent = dayInsert;
}

function checkIfError(input, index) {
  if (input.value.trim() === "") {
    getAlertError("empty", input, index);
  }
  if (input.name === "day-input" && Number(input.value) > 31) {
    getAlertError("invalid-day", input, index);
  }
  if (input.name === "month-input" && Number(input.value) > 12) {
    getAlertError("invalid-month", input, index);
  }
  if (input.name === "year-input" && Number(input.value) > year) {
    getAlertError("invalid-year", input, index);
  }
}

function getAlertError(typeError, input, index) {
  alertsError[index].classList.remove("display-none");
  input.parentElement.classList.add("error");
  switch (typeError) {
    case "empty":
      alertsError[index].textContent = "This field is required";
      break;
    case "invalid-day":
      alertsError[index].textContent = "Must be a valid day";
      break;
    case "invalid-month":
      alertsError[index].textContent = "Must be a valid month";
      break;
    case "invalid-year":
      alertsError[index].textContent = "Must be in the past";
      break;
    default:
      console.error("Si è verificato un errore!");
      break;
  }
}

function clearAlertError(input, index) {
  alertsError[index].textContent = "";
  alertsError[index].classList.add("display-none");
  input.parentElement.classList.remove("error");
}
