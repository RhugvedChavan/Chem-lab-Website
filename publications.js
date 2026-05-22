let publications = [];
let filteredData = [];

fetch('publications.json')
  .then(res => res.json())
  .then(data => {
    publications = data;
    populateYears(data);
    applyAll();
  });

function displayData(data) {
  const table = document.getElementById("pubTable");
  table.innerHTML = "";
  data.forEach(pub => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pub.title}</td>
      <td>${pub.year}</td>
      <td><a href="${pub.link}" target="_blank">View</a></td>
    `;
    table.appendChild(row);
  });
}

function populateYears(data) {
  const yearSet = new Set();
  data.forEach(pub => { if (pub.year) yearSet.add(pub.year); });
  const yearFilter = document.getElementById("yearFilter");
  [...yearSet].sort((a, b) => b - a).forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });
}

function applyAll() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const selectedYear = document.getElementById("yearFilter").value;
  const sortOption = document.getElementById("sortOption").value;

  let data = [...publications];

  if (searchText) {
    data = data.filter(pub => pub.title.toLowerCase().includes(searchText));
  }

  if (selectedYear !== "all") {
    data = data.filter(pub => pub.year == selectedYear);
  }

  switch (sortOption) {
    case "yearDesc":
      data.sort((a, b) => Number(b.year) - Number(a.year));
      break;

    case "yearAsc":
      data.sort((a, b) => Number(a.year) - Number(b.year));
      break;

    case "titleAsc":
      data.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "titleDesc":
      data.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  filteredData = data;
  displayData(filteredData);
}

function downloadCSV() {
  let csv = "Title,Year,Link\n";
  filteredData.forEach(pub => {
    csv += `"${pub.title}","${pub.year}","${pub.link}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "publications.csv";
  a.click();

  URL.revokeObjectURL(url);
}

document.getElementById("searchInput").addEventListener("input", applyAll);
document.getElementById("yearFilter").addEventListener("change", applyAll);
document.getElementById("sortOption").addEventListener("change", applyAll);
