import { useState } from "react";
import "./styles.css";

function reverseStr(str) {
  // function to get the reverse string
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  // functin to check if the string is palindrome or not
  if (str === reverseStr(str)) return true;
  return false;
}

function dateToString(date) {
  // function to convert date to string
  let strDate = { day: "", month: "", year: "" };

  if (date.day < 10) {
    strDate.day = "0" + date.day;
  } else {
    strDate.day = date.day.toString();
  }

  if (date.month < 10) {
    strDate.month = "0" + date.month;
  } else {
    strDate.month = date.month.toString();
  }

  strDate.year = date.year.toString();
  return strDate;
}

function dateFormats(date) {
  // function to get the various date formats of the given date
  let ddmmyyyy = date.day + date.month + date.year;
  let mmddyyyy = date.month + date.day + date.year;
  let yyyymmdd = date.year + date.month + date.day;
  let ddmmyy = date.day + date.month + date.year.slice(-2);
  let mmddyy = date.month + date.day + date.year.slice(-2);
  let yymmdd = date.year.slice(-2) + date.month + date.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
  //function to check if any one of the date formats is a palindrome
  let arrOfDateFormats = dateFormats(date);
  for (let i = 0; i < arrOfDateFormats.length; i++) {
    if (isPalindrome(arrOfDateFormats[i])) {
      return true;
    }
  }
  return false;
}

function checkLeapYear(year) {
  // function to check if the year entered by the user is a leap year or not
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

function getNextDate(date) {
  // function to get the next date of the given date
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // array which stores the maximum days in the months from january to december

  if (month === 2) {
    if (checkLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  };
}

function nextPalindromeDate(date) {
  // function to the check if the next date of the given date is a palindrome
  let nextDate = getNextDate(date);
  let days = 0;
  while (1) {
    days++;
    let dateStr = dateToString(nextDate);
    if (checkPalindrome(dateStr)) {
      return [days, nextDate];
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPreviousDate(date) {
  // function to get the previous date of the given date
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (checkLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month = 2;
      }
    } else {
      if (day < 1) {
        day = 28;
        month = 2;
      }
    }
  } else {
    if (month === 1) {
      if (day < 1) {
        month = 12;
        day = daysInMonth[month - 1];
        year--;
      }
    } else {
      if (day < 1) {
        day = daysInMonth[month - 2];
        month--;
      }
    }
  }

  return { day: day, month: month, year: year };
}

function previousPalindromeDate(date) {
  // function to check if the previous date is a palindrome
  let previousDate = getPreviousDate(date);
  let days = 0;
  while (1) {
    days++;
    let strDate = dateToString(previousDate);
    if (checkPalindrome(strDate)) {
      return [days, previousDate];
    }
    previousDate = getPreviousDate(previousDate);
  }
}

export default function App() {
  const [birthdate, setBirthdate] = useState("");
  const [output, setOutput] = useState("");

  function setBdate(e) {
    // sets the birthdate input by the user to the view
    setBirthdate(e.target.value);
  }

  function clickHandler(e) {
    // function to the handle the click event on the check button
    if (birthdate === "") return alert("Enter a valid birthdate!"); // check if the input is not empty

    let bdate = birthdate.split("-");
    let dob = {
      day: Number(bdate[2]),
      month: Number(bdate[1]),
      year: Number(bdate[0])
    };
    let dobStr = dateToString(dob);
    let isPalindrome = checkPalindrome(dobStr);

    if (isPalindrome) {
      setOutput("Yay! Your Birthdate is Palindrome🥳"); // sets the output to the view
    } else {
      let [nextDays, nextDate] = nextPalindromeDate(dob);
      let [prevDays, prevDate] = previousPalindromeDate(dob);
      if (nextDays > prevDays) {
        setOutput(
          `The nearest Palindrome date was ${prevDate.day}-${prevDate.month}-${
            prevDate.year
          }, you missed by ${prevDays} ${prevDays > 1 ? "days!" : "day!"} 😔`
        );
      } else {
        setOutput(
          `The nearest Palindrome date is ${nextDate.day}-${nextDate.month}-${
            nextDate.year
          }, you missed by ${nextDays} ${nextDays > 1 ? "days!" : "day!"} 😔`
        );
      }
    }
  }

  return (
    <div className="App">
      <h1>
        <span>🎉</span>Palindrome Birthday!<span>🎉</span>
      </h1>
      <label htmlFor="bdate">Enter Your Birthdate</label>
      <input type="date" id="bdate" onChange={setBdate} />
      <button onClick={clickHandler}>Check</button>
      <div id="output">{output}</div>
    </div>
  );
}
