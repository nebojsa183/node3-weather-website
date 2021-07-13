console.log("This is wired up js file from public/js folder");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
console.log(messageOne);
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageTwo.textContent = data.error;
        } else {
          console.log(data.location);
          messageOne.textContent = data.forcast;
        }
      });
    }
  );
});
