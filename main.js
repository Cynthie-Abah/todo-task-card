const editButton = document.querySelector(".edit");
const deleteButton = document.querySelector(".delete");
const statusIndicator = document.querySelector("#status-indicator");
const title = document.querySelector(".task-title");
const markAsDoneCheckbox = document.querySelector("#mark-as-done");
const todoCard = document.querySelector("#todo-card");
const editView = document.querySelector("#edit-view");
const cancelBtn = document.querySelector(".cancel-btn");
const titleInput = document.querySelector("#title-input");
const descriptionInput = document.querySelector("#description-input");
const dueDateInput = document.querySelector("#due-date-input");
const priorityInput = document.querySelector("#priority-input");
const saveButton = document.querySelector(".save-btn");
const statusButtons = document.querySelectorAll(".status-control button");
const descriptionToggleBtn = document.querySelector(".description-toggle-btn");
const description = document.querySelector(".task-description");
const overdueIndicator = document.querySelector(".overdue-indicator");
const todoData = {
  title: document.querySelector(".task-title").textContent.trim(),
  description: document.querySelector(".task-description").textContent.trim(),
  dueDate: document.querySelector("#due-date").textContent.trim(),
  priority: document
    .querySelector(".priority-badge")
    .textContent.trim()
    .split(" ")[0]
    .toLowerCase(),
};

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
  if (timeRemaininginHours <= 0) {
    overdueIndicator.style.display = "block";
  }
  timeRemainingText.textContent = statusIndicator.textContent
    .toLowerCase()
    .includes("done")
    ? "completed!"
    : timeRemainingInWeeks > 0
      ? `Due in ${timeRemainingInWeeks} weeks`
      : timeRemainingInDays == 1
        ? `Due tomorrow`
        : timeRemainingInDays > 0 && timeRemainingInWeeks == 0
          ? `Due in ${timeRemainingInDays} days`
          : timeRemaininginHours < 0 && timeRemainingInWeeks > 24
            ? `Overdue by ${overdueHours} hour${overdueHours > 1 ? "s" : ""}`
            : overdueHours > 24 && overdueHours < 48
              ? `Overdue by ${Math.ceil(overdueHours / 24)} day`
              : overdueHours > 48 && overdueHours < 7 * 24
                ? `Overdue by ${Math.ceil(overdueHours / 24)} days`
                : overdueHours > 7 * 24 && overdueHours < 8 * 24
                  ? `Overdue by ${Math.ceil(overdueHours / 24 / 7)} week`
                  : overdueHours > 8 * 24 && overdueHours < 7 * 24 * 4
                    ? `Overdue by ${Math.ceil(overdueHours / 24 / 7)} weeks`
                    : overdueHours > 7 * 24 * 4
                      ? `Overdue by ${Math.ceil(overdueHours / 24 / 7 / 4)} months`
                      : timeRemaining <= 0
                        ? "Due now!"
                        : `Due in ${timeRemaininginHours} hours`;
};
updateTimeRemaining();

// update the time remaining every minute
setInterval(() => {
  if (statusIndicator.textContent.toLowerCase() !== "done") {
    console.log("update happening");
    updateTimeRemaining();
  } else {
    return;
  }
}, 60 * 1000);

// functionality for mark as done checkbox
markAsDoneCheckbox.addEventListener("change", () => {
  setStatus(markAsDoneCheckbox.checked ? "done" : "pending");
});

// save todo data values as default values for the edit form
titleInput.value = todoData.title;
descriptionInput.value = todoData.description;
dueDateInput.value = new Date(todoData.dueDate).toISOString().slice(0, 16);
priorityInput.value = todoData.priority;

// onclick of edit button
editButton.addEventListener("click", () => {
  // When the edit button is clicked, the card should enter edit mode.
  todoCard.classList.add("hide-card");
  // show edit view
  editView.classList.remove("hide-card");
});

// onclick of cancel button
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // When the cancel button is clicked, the edit view should be hidden.
  editView.classList.add("hide-card");
  // show todo card
  todoCard.classList.remove("hide-card");
});

deleteButton.addEventListener("click", () => {
  console.log("delete clicked");
  alert("Delete button has been clicked.");
});

// save button functionality
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  // update the todo card with the new values from the edit form
  title.textContent = titleInput.value;
  document.querySelector(".task-description").textContent =
    descriptionInput.value;
  document.querySelector("#due-date").textContent = new Date(
    dueDateInput.value,
  ).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const priorityBadge = document.querySelector(".priority-badge");
  priorityBadge.textContent =
    priorityInput.value.charAt(0).toUpperCase() + priorityInput.value.slice(1);
  priorityBadge.className = `priority-badge ${priorityInput.value}`;
  updateTimeRemaining();
  // hide edit view and show todo card
  editView.classList.add("hide-card");
  todoCard.classList.remove("hide-card");
});

// status control buttons functionality
statusButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setStatus(btn.dataset.status);
    statusButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
  });
});

// exand /collapse functionality
const fullText = description.textContent.trim();
const shortText = fullText.split(" ").slice(0, 20).join(" ") + "…";
if (fullText.split(" ").length <= 20) {
  descriptionToggleBtn.style.display = "none";
} else if (fullText.split(" ").length > 20) {
  descriptionToggleBtn.style.display = "inline-block";
  description.textContent = shortText;
  descriptionToggleBtn.textContent = "Expand";
}

descriptionToggleBtn.addEventListener("click", () => {
  if (descriptionToggleBtn.textContent === "Collapse") {
    description.textContent = shortText;
    descriptionToggleBtn.textContent = "Expand";
    descriptionToggleBtn.setAttribute("aria-expanded", false);
  } else {
    description.textContent = fullText;
    descriptionToggleBtn.textContent = "Collapse";
    descriptionToggleBtn.setAttribute("aria-expanded", true);
  }
});

const setStatus = (status) => {
  statusIndicator.textContent = status.replace("-", " ");
  statusIndicator.classList.remove("pending", "in-progress", "done");
  statusIndicator.classList.add(status);

  if (status === "done") {
    markAsDoneCheckbox.checked = true;
    title.style.textDecoration = "line-through";
    title.style.color = "#6b7280";
  } else {
    markAsDoneCheckbox.checked = false;
    title.style.textDecoration = "none";
    title.style.color = "#000";
  }

  statusButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.status === status);
  });
  updateTimeRemaining();
};
