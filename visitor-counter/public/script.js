document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/visitor-count')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const visitorCountElement = document.getElementById('footer-visitor-count');
            visitorCountElement.textContent = `Visitor count: ${data.count}`;
        })
        .catch(error => {
            console.error('Error fetching visitor count:', error);
        });
});
