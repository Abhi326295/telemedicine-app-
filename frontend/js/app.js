// frontend/js/app.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/api/patients')
        .then(response => response.json())
        .then(data => {
            populatePatientTable(data);
            generateAnalytics(data);
            generateRecommendations(data);
        })
        .catch(error => console.error('Error fetching patient data:', error));
});

function populatePatientTable(data) {
    const tableBody = document.querySelector('#patient-table tbody');
    data.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.condition}</td>
            <td>${patient.lastCheckUp.split('T')[0]}</td>
            <td>${patient.nextAppointment.split('T')[0]}</td>
        `;
        tableBody.appendChild(row);
    });
}

function generateAnalytics(data) {
    const insightsDiv = document.getElementById('insights');
    // Example analytic: average age of patients
    const averageAge = data.reduce((sum, patient) => sum + patient.age, 0) / data.length;
    const averageAgeElement = document.createElement('p');
    averageAgeElement.textContent = `Average Age of Patients: ${averageAge.toFixed(2)}`;
    insightsDiv.appendChild(averageAgeElement);
    // More analytics can be added here
}

function generateRecommendations(data) {
    const recommendationsDiv = document.getElementById('recommendations-list');
    // Example recommendation: patients due for a check-up
    const dueForCheckUp = data.filter(patient => {
        const lastCheckUpDate = new Date(patient.lastCheckUp);
        const nextAppointmentDate = new Date(patient.nextAppointment);
        return nextAppointmentDate - lastCheckUpDate > 6 * 30 * 24 * 60 * 60 * 1000; // 6 months
    });

    const dueForCheckUpElement = document.createElement('p');
    dueForCheckUpElement.textContent = `Patients due for check-up: ${dueForCheckUp.length}`;
    recommendationsDiv.appendChild(dueForCheckUpElement);
    // More recommendations can be added here
}
