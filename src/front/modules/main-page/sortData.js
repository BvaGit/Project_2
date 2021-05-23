export default function sortData () {
    const thead = document.getElementById('thead');
    const thTd = Array.from(thead.querySelectorAll('th')); 
    const sortTextContent = document.getElementById('sort');
    const sortDropdown = document.querySelector('.table__sortDropdown');
    sortDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        let tempTextContent = e.target.textContent
        sortTextContent.textContent = tempTextContent;
    })
    sortTableByColumn(1, !(thTd[0].classList.contains('th-sort-asc')))
    const fnamesort = document.getElementById('firstNameSort');
    const lnameSort = document.getElementById('lastnameSort');
    const ageSort = document.getElementById('ageSort');
    const citySort = document.getElementById('citySort');
    const phonenumberSort = document.getElementById('phonenumberSort');
    const emailSort = document.getElementById('emailSort');
    const companynameSort = document.getElementById('companynameSort');
    
    fnamesort.addEventListener('click', () => {
        sortTableByColumn(1, !(thTd[0].classList.contains('th-sort-asc')));
    })
    lnameSort.addEventListener('click', () => {
        sortTableByColumn(2, !(thTd[1].classList.contains('th-sort-asc')));
    })
    ageSort.addEventListener('click', () => {
        sortAgeByColumn(3, !(thTd[2].classList.contains('th-sort-asc')));
    })
    citySort.addEventListener('click', () => {
        sortTableByColumn(4, !(thTd[3].classList.contains('th-sort-asc')));
    })
    phonenumberSort.addEventListener('click', () => {
        sortAgeByColumn(5, !(thTd[4].classList.contains('th-sort-asc')));
    })
    emailSort.addEventListener('click', () => {
        sortTableByColumn(6, !(thTd[5].classList.contains('th-sort-asc')));
    })
    companynameSort.addEventListener('click', () => {
        sortTableByColumn(7, !(thTd[6].classList.contains('th-sort-asc')));
    })

    function sortTableByColumn (column, asc = true) {
        const table = document.getElementById('table');
        const tbody = document.getElementById('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const dirModifier = asc ? 1 : -1;

        const sortedRows = rows.sort((a,b) => {
            const aColText = a.querySelector(`td:nth-child(${column})`).textContent.trim();
            const bColText = b.querySelector(`td:nth-child(${column})`).textContent.trim();
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        })
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        tbody.append(...sortedRows);

        table.querySelectorAll('th').forEach(t => {
            t.classList.remove('th-sort-asc', 'th-sort-desc');
        });
        table.querySelector(`th:nth-child(${column})`).classList.toggle('th-sort-asc', asc);
        table.querySelector(`th:nth-child(${column})`).classList.toggle('th-sort-desc', !asc);
    }
    function sortAgeByColumn (column, asc = true) {
        const table = document.getElementById('table');
        const tbody = document.getElementById('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const dirModifier = asc ? 1 : -1;

        const sortedRows = rows.sort((a,b) => {
            const aColText = Number(a.querySelector(`td:nth-child(${column})`).textContent.trim());
            const bColText = Number(b.querySelector(`td:nth-child(${column})`).textContent.trim());
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        })
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        tbody.append(...sortedRows);

        table.querySelectorAll('th').forEach(t => {
            t.classList.remove('th-sort-asc', 'th-sort-desc');
        });
        table.querySelector(`th:nth-child(${column})`).classList.toggle('th-sort-asc', asc);
        table.querySelector(`th:nth-child(${column})`).classList.toggle('th-sort-desc', !asc);
    }
}