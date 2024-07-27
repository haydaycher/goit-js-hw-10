import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let countdownInterval;
let selectedDate;
startButton.disabled = true;

const option = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      startButton.disabled = false;
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        titleColor: '#fff',
        iconColor: '#fff',
        overlayColor: '#fff',
        position: 'topRight',
      });
    }
  },
};

flatpickr('#datetime-picker', option);

function startCountdown() {
  startButton.disabled = true;
  const endDate = selectedDate.getTime();
  input.disabled = true;

  countdownInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const diffTime = endDate - currentDate;

    if (diffTime < 0) {
      clearInterval(countdownInterval);
      input.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diffTime);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}
startButton.addEventListener('click', startCountdown);

function updateTimerDisplay(days, hours, minutes, seconds) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
