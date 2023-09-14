const monthNameElement = document.getElementById("month-name");
const calendarElement = document.getElementById("calendar");
const selectedDayElement = document.getElementById("meeting-day");
const selectedDayAppointmentsP = document.getElementsByClassName(
  "selected-cell-appointments-p"
);
//const selectedNameElement = document.getElementById("selected-name");
const appointmentsElement = document.getElementById("appointments");

let selectedDay = null;
const appointments = [];

function createCalendar() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  monthNameElement.textContent = new Date(year, month, 1)
    .toLocaleString("default", { month: "long" })
    .toUpperCase();

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("calendar-cell");
    const cellText = document.createElement("h3");
    cellText.textContent = day;
    cell.appendChild(cellText);
    cell.addEventListener("click", () => selectDay(day, cell));
    calendarElement.appendChild(cell);
    appointments.push([]);
  }
}

function selectDay(day, cell) {
  selectedDay = day;
  const previousSelected =
    document.getElementsByClassName("selected-cell")[0] !== undefined
      ? document.getElementsByClassName("selected-cell")[0]
      : null; //se esiste una cella selezionata, "previousSelected" orebderà quell'elemento. altrimenti, sarà null.
  if (previousSelected !== null && previousSelected.textContent != day) {
    //per evitare che rimuove e aggiunge la classe alla stessa cella se ci clicchi più volte
    previousSelected.classList.remove("selected-cell");
  }
  selectedDayElement.textContent = `${selectedDay}`;
  cell.classList.add("selected-cell");
  showAppointments();
}

function showAppointments() {
  let dayAppointments = false;

  if (selectedDay !== null) {
    const appointmentsForDay = appointments[selectedDay - 1];
    if (appointmentsForDay.length > 0) {
      dayAppointments = true;
      appointmentsElement.innerHTML = "<h2>Appointments for the day</h2>";

      appointmentsForDay.forEach((appointment) => {
        const newP = document.createElement("p");
        newP.classList.add("selected-cell-appointments-p");
        newP.textContent = `${appointment.name}, ${appointment.time}`;
        appointmentsElement.appendChild(newP);
        console.log("creato P", appointment);
        // if (appointmentsForDay.length === 1) {
        //   selectedDayAppointmentsP[0].textContent += ` ${appointment.name}, ${appointment.time}...`;
        //   //selectedNameElement.textContent = ` ${appointment.name},`;
        // } else {
        //   const newP = document.createElement("p");
        //   newP.classList.add("selected-cell-appointments-p");
        //   newP.textContent = ` ${appointment.name}, ${appointment.time}`;
        //   appointmentsElement.appendChild(newP);
        // }
      });
    }
  }
  if (dayAppointments) {
    appointmentsElement.style.display = "block";
  } else {
    appointmentsElement.style.display = "none";
  }
}

function saveMeeting() {
  if (selectedDay !== null) {
    const time = document.getElementById("meeting-time").value;
    const name = document.getElementById("meeting-name").value;
    const appointment = { time, name };
    console.log("appointment", appointment);
    console.log("appointmentS: ", appointments[selectedDay - 1]);
    const meetingAlreadyExist = appointments[selectedDay - 1].some(
      (appointmentI) => {
        return (
          appointmentI.time === appointment.time &&
          appointmentI.name === appointment.name
        );
      }
    );
    if (meetingAlreadyExist) {
      alert("esiste già.");
    } else {
      appointments[selectedDay - 1].push(appointment);
      showAppointments();
      document.querySelector(".selected-cell").innerHTML +=
        '<span class="dot"></span>'; //aggiunge il punto, non ho avuto tempo di testarlo bene ma dovrebbe funzionare.
    }
  }
}

createCalendar();
