 // Example API URL (replace with your actual API URL)
 const apiUrl = 'https://expo.iran.liara.run/scores-memory';

    // Function to fetch data from the API
    async function fetchData() {
        const loadingElement = document.getElementById('loading');
        loadingElement.style.display = 'block'; // Show loading indicator

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log('Fetched data:', data); // Log the fetched data
          populateTable(data.scores);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          loadingElement.style.display = 'none'; // Hide loading indicator
        }
      }

      // Function to populate the table with data
      function populateTable(scores) {
        const tableBody = document.getElementById('scoreTableBody');
        tableBody.innerHTML = ''; // Clear existing data

        if (!Array.isArray(scores)) {
          console.error('Expected scores to be an array:', scores);
          return;
        }

        scores.forEach(item => {
          // Check if the sum of score and score2 is not equal to 0
          if (item.score + item.score2 !== 0) {
            const row = document.createElement('tr');
            console.log(item);
      
            const nameCell = document.createElement('td');
            nameCell.textContent = item.fullname;
            row.appendChild(nameCell);
      
            const scoreCell = document.createElement('td');
            scoreCell.textContent = item.score;
            row.appendChild(scoreCell);
      
            tableBody.appendChild(row);
          }
        });
      
      }

      // Fetch data when the page loads
      window.onload = fetchData;