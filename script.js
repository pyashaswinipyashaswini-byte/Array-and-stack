const CAPACITY = 5;

let researchers = [
  {id:"R101", name:"Aarav Kumar", zone:"Lab A"},
  {id:"R102", name:"Diya Sharma", zone:"Lab B"},
  {id:"R103", name:"Rahul Nair", zone:"Lab A"}
];
let actionStack = [];

const $ = id => document.getElementById(id);

function render() {
  $("records").innerHTML = researchers.map((r,i) =>
    `<tr><td>${r.id}</td><td>${r.name}</td><td>${r.zone}</td>
    <td><button class="smallbtn" data-remove="${i}">Remove</button></td></tr>`
  ).join("");

  $("count").textContent = `${researchers.length} / ${CAPACITY}`;
  $("storage").textContent = `${researchers.length / CAPACITY * 100}%`;
  $("stackCount").textContent = actionStack.length;
  $("stack").innerHTML = actionStack.length
    ? [...actionStack].reverse().map((a,i) =>
      `<div>${i===0 ? "TOP · " : ""}${a}</div>`).join("")
    : "<p>No actions in stack.</p>";
}

$("addForm").addEventListener("submit", e => {
  e.preventDefault();
  const id = $("rid").value.trim().toUpperCase();
  const name = $("rname").value.trim();
  const zone = $("zone").value;

  if (researchers.some(r => r.id === id)) {
    $("arrayMessage").textContent = "This researcher ID already exists.";
    return;
  }
  if (researchers.length >= CAPACITY) {
    $("arrayMessage").textContent =
      "LIMIT REACHED: Fixed array capacity is 5. Cannot add another record.";
    return;
  }

  researchers.push({id,name,zone});
  $("arrayMessage").textContent = "Researcher added to the array.";
  $("addForm").reset();
  render();
});

$("records").addEventListener("click", e => {
  const index = e.target.dataset.remove;
  if (index === undefined) return;
  researchers.splice(Number(index),1);
  $("arrayMessage").textContent =
    "Record removed. Later array elements shifted to fill the gap.";
  render();
});

$("push").addEventListener("click", () => {
  const action = $("actionText").value.trim();
  if (!action) {
    $("stackMessage").textContent = "Enter an action first.";
    return;
  }
  actionStack.push(action);
  $("actionText").value = "";
  $("stackMessage").textContent = "PUSH: action placed on top of stack.";
  render();
});

$("pop").addEventListener("click", () => {
  if (!actionStack.length) {
    $("stackMessage").textContent = "UNDERFLOW: Stack is empty.";
    return;
  }
  $("stackMessage").textContent = "POP removed: " + actionStack.pop();
  render();
});

render();
