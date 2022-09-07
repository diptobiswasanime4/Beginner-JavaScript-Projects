const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);
accordionItemHeaders.forEach((accordionHeader) => {
  accordionHeader.addEventListener("click", (e) => {
    accordionHeader.classList.toggle("active");
  });
});
const addRow = document.getElementById("add-row");
var tableBody = document.getElementById("table-body");
var i = 2;
addRow.addEventListener("click", (e) => {
  var newRow = document.createElement("tr");
  newRow.innerHTML = `
            <tr>
                <td>Row ${i}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            `;
  i++;
  tableBody.appendChild(newRow);
});
