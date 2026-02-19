const input = document.querySelectorAll("input");
const submitResults = document.querySelector("#submit-results");
const alertsError = document.querySelectorAll(".alert-error");

const year = new Date().getFullYear();

submitResults.addEventListener("click", () => {
  input.forEach((input, index) => {
    clearAlertError(input, index);
    checkIfError(input, index);
  });
});

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
