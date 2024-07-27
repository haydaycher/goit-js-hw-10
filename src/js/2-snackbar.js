import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delayform = document.querySelector('.form');
delayform.addEventListener('submit', handlerForm);

function handlerForm(event) {
  event.preventDefault();

  const delay = event.target.elements.delay.value;
  let checked = document.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (checked === 'fulfilled') {
        res('fulfilled');
      } else {
        rej('rejected');
      }
    }, `${delay}`);
  });

  promise
    .then(res => {
      iziToast.show({
        title: '✅ Ok',
        message: `Fulfilled promise in ${delay} ms`,
        backgroundColor: '#59a10d',
        messageColor: '#fff',
        titleColor: '#fff',
        icon: '',
        position: 'topLeft',
      });
    })
    .catch(rej => {
      iziToast.show({
        title: '❌ Error',
        message: `Rejected promise in ${delay} ms`,
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        titleColor: '#fff',
        icon: '',
        position: 'topRight',
      });
    });
}
