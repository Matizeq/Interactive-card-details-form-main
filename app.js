"use strict";

const form = document.querySelector("form");
const complete = document.querySelector(".complete");
const number = document.querySelector(".number");
const personName = document.querySelector(".name");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const cvc = document.querySelector(".cvc");
const inputs = document.querySelectorAll("input");
const confirmButton = document.querySelector(".confirm");
const continueButton = document.querySelector(".continue");

let properFormat;

const letters = /^[A-Za-z ]+$/;
const numbers = /^[0-9]+$/;

inputs.forEach(function (item) {
  function errorClassRemove() {
    if (item.classList.contains("error--input")) {
      item.classList.remove("error--input");
    }
  }

  function correctClassRemove() {
    if (item.classList.contains("correct")) {
      item.classList.remove("correct");
    }
  }

  function emptyInput(name, content) {
    if (item.value === "") {
      name.textContent = content;
    }
  }

  item.addEventListener("input", function () {
    // These statements are checking if values typed to the inputs are correct.
    // If value of input is correctly typed then input receive 'correct' class.
    if (item.classList.contains("name--input")) {
      if (this.value.match(letters) && this.value.length < 29) {
        personName.textContent = item.value;
        item.classList.add("correct");
        errorClassRemove();
      } else {
        emptyInput(personName, "Jane Appleseed");
        item.classList.add("error--input");
        correctClassRemove();
        if (this.value === "") {
          errorClassRemove();
        }
      }
    }

    if (item.classList.contains("number--input")) {
      if (this.value.match(numbers)) {
        if (this.value.length <= 16) {
          const deleteNumberSpace = item.value.replaceAll(" ", "");
          const formated = deleteNumberSpace.replace(/(.{4})/g, "$1 ");
          number.textContent = formated;
          if (this.value.length === 16) {
            item.classList.add("correct");
            errorClassRemove();
          } else if (this.value.length < 16) {
            item.classList.add("error--input");
            correctClassRemove();
          }
        } else if (this.value.length > 16) {
          item.classList.add("error--input");
          correctClassRemove();
        }
      } else {
        emptyInput(number, "0000 0000 0000 0000");
        item.classList.add("error--input");
        correctClassRemove();
        if (this.value === "") {
          errorClassRemove();
        }
      }
    }

    if (item.classList.contains("month--input")) {
      if (this.value >= 0) {
        if (this.value.length <= 2 && this.value <= 12) {
          month.textContent = item.value;
          item.classList.add("correct");
          errorClassRemove();
        } else {
          item.classList.add("error--input");
          correctClassRemove();
        }
      }
      emptyInput(month, "00");
      if (this.value === "") {
        correctClassRemove();
      }
    }

    if (item.classList.contains("year--input")) {
      if (this.value >= 0) {
        if (this.value.length <= 2) {
          year.textContent = item.value;
          item.classList.add("correct");
          errorClassRemove();
        } else {
          item.classList.add("error--input");
          correctClassRemove();
        }
      }
      emptyInput(year, "00");
      if (this.value === "") {
        correctClassRemove();
      }
    }

    if (item.classList.contains("cvc--input")) {
      if (this.value.length <= 3) {
        cvc.textContent = item.value;
        if (this.value.length === 3) {
          item.classList.add("correct");
          errorClassRemove();
        } else if (this.value.length < 3) {
          item.classList.add("error--input");
          correctClassRemove();
        }
      } else if (this.value.length > 3) {
        item.classList.add("error--input");
        correctClassRemove();
      }
      emptyInput(cvc, "000");
      if (this.value === "") {
        errorClassRemove();
      }
    }

    // Checking if all inputs have 'correct' class. If all of them have then set properFormat to 'true'.
    const allInputsValidation = Array.from(inputs).every((child) =>
      child.classList.contains("correct")
    );

    if (allInputsValidation) {
      properFormat = true;
    } else {
      properFormat = false;
    }
  });
});

confirmButton.addEventListener("click", function () {
  let checkError;
  let emptyError;
  let wrongFormatError;

  // If properFormat is 'true' and inputs don't have any errors,
  // then inputs values are approved and displayed on cards.
  // Also notification is displayed.
  if (properFormat) {
    form.classList.add("hidden");
    complete.classList.remove("hidden");
    if (document.querySelectorAll(".error--empty")) {
      document.querySelectorAll(".error--empty").forEach(function (item) {
        item.remove();
      });
    }
    if (document.querySelectorAll(".error--format")) {
      document.querySelectorAll(".error--format").forEach(function (item) {
        item.remove();
      });
    }
  } else {
    inputs.forEach(function (item, index) {
      // This function add error. Depending on their parameters,
      // return empty error if input is empty or format error if input has wrong format.
      function addError(className, text, errorType, errorClass, selector) {
        item.classList.add(className);
        errorType = document.createElement("h2");
        errorType.textContent = `${text}`;
        errorType.classList.add(errorClass);
        checkError = selector.querySelector(`.${errorClass}`);

        if (!checkError) {
          selector.appendChild(errorType);
        }
      }

      // This function remove error if input field is filled or we fix format of input
      function removeError(className, errorType, errorClass, selector) {
        item.classList.remove(className);
        errorType = selector.querySelector(`.${errorClass}`);
        if (errorType) {
          errorType.remove();
        }
      }

      const label = item.parentElement;
      const labelContainer = label.parentElement;

      // Adding empty errors
      if (index === 0 || index === 1 || index === 4) {
        if (item.value === "") {
          addError(
            "empty",
            `Can't be empty`,
            emptyError,
            "error--empty",
            label
          );
        } else {
          removeError("empty", emptyError, "error--empty", label);
        }
      } else {
        if (index === 2 || index === 3) {
          if (item.value === "") {
            addError(
              "empty",
              `Can't be empty`,
              emptyError,
              "error--empty",
              labelContainer
            );
          } else {
            removeError("empty", emptyError, "error--empty", labelContainer);
          }
        }
      }

      // Adding wrong format errors
      if (index === 0 || index === 1) {
        if (index === 0) {
          if (!item.value.match(letters) && item.value !== "") {
            addError(
              "wrong",
              "Wrong format, only letters",
              wrongFormatError,
              "error--format",
              label
            );
          } else if (item.value.match(letters) || item.value === "") {
            removeError("wrong", wrongFormatError, "error--format", label);
          }
        }

        if (index === 1) {
          if (!item.value.match(numbers) && item.value !== "") {
            addError(
              "wrong",
              "Wrong format, only numbers",
              wrongFormatError,
              "error--format",
              label
            );
          } else if (item.value.match(numbers) || item.value === "") {
            removeError("wrong", wrongFormatError, "error--format", label);
          }
        }
      }
    });
  }
});

// Reseting inputs and card fields
continueButton.addEventListener("click", function () {
  form.classList.remove("hidden");
  complete.classList.add("hidden");
  inputs.forEach(function (item) {
    item.value = "";
    item.classList.remove("correct");
    item.classList.remove("empty");
  });
  number.textContent = "0000 0000 0000 0000";
  personName.textContent = "Jane Appleseed";
  month.textContent = "00";
  year.textContent = "00";
  cvc.textContent = "000";
  properFormat = false;
});
