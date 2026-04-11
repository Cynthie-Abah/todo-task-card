const editButton = document.querySelector(".edit");
const deleteButton = document.querySelector(".delete");
const statusIndicator = document.querySelector("#status-indicator");
const title = document.querySelector(".task-title");
const markAsDoneCheckbox = document.querySelector("#mark-as-done");
// function to update the time remaining until the due date
const updateTimeRemaining = () => {
  const dueDate = document.querySelector("#due-date").textContent;
  const currentDate = new Date();
  const timeRemaining = new Date(dueDate) - currentDate;
  const timeRemainingText = document.querySelector("#timeRemaining");

  const timeRemainingInWeeks = Math.floor(
    timeRemaining / (1000 * 60 * 60 * 24 * 7),
  );
  const timeRemainingInDays = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const timeRemaininginHours = Math.floor(timeRemaining / (1000 * 60 * 60));
  //   const timeRemaininginSeconds = Math.floor(timeRemaining / 1000);
  const overdueHours = Math.abs(timeRemaininginHours);

  timeRemainingText.textContent =
    timeRemainingInWeeks > 0
      ? `Due in ${timeRemainingInWeeks} weeks`
      : timeRemainingInDays == 1
        ? `Due tomorrow`
        : timeRemainingInDays > 0 && timeRemainingInWeeks == 0
          ? `Due in ${timeRemainingInDays} days`
          : timeRemaininginHours < 0
            ? `Overdue by ${overdueHours} hour${overdueHours > 1 ? "s" : ""}`
            : timeRemaining <= 0
              ? "Due now!"
              : `Due in ${timeRemaininginHours} hours`;
};
updateTimeRemaining();
// update the time remaining every minute
setInterval(updateTimeRemaining, 60 * 1000);
markAsDoneCheckbox.addEventListener("change", () => {
  if (markAsDoneCheckbox.checked) {
    statusIndicator.textContent = "Done";
    statusIndicator.classList.remove("pending");
    title.style.textDecoration = "line-through";
    statusIndicator.classList.add("done");
  } else {
    statusIndicator.textContent = "Pending";
    title.style.textDecoration = "none";
    statusIndicator.classList.remove("done");
    statusIndicator.classList.add("pending");
  }
});

editButton.addEventListener("click", () => {
  console.log("edit clicked");
  alert("Edit button has been clicked.");
});

deleteButton.addEventListener("click", () => {
  console.log("delete clicked");
  alert("Delete button has been clicked.");
});
