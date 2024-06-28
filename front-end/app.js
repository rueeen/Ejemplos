document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    const data = {
        name: name,
        age: parseInt(age)
    };

    fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerHTML = '<p>Data submitted successfully: ' + JSON.stringify(data) + '</p>';
        loadData();  // Reload data after submitting
    })
    .catch(error => {
        document.getElementById('response').innerHTML = '<p>Error submitting data: ' + error.message + '</p>';
    });
});

document.getElementById('loadDataBtn').addEventListener('click', loadData);

function deleteData(id) {
    fetch(`http://localhost:3000/api/data/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerHTML = '<p>' + data.message + '</p>';
        loadData();  // Reload data after deleting
    })
    .catch(error => {
        document.getElementById('response').innerHTML = '<p>Error deleting data: ' + error.message + '</p>';
    });
}

function loadData() {
    fetch('http://localhost:3000/api/data')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = '';  // Clear existing table data

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                            <td>${item._id}</td>
                            <td>${item.name}</td>
                            <td>${item.age}</td>
                            <td><button onclick="deleteData('${item._id}')">Delete</button></td>`;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        document.getElementById('response').innerHTML = '<p>Error loading data: ' + error.message + '</p>';
    });
}

// Load data on page load
window.onload = loadData;
