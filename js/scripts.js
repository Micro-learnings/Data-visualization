let pages = 2, urls = []

for (let i = 1; i <= pages; i++) {
    urls.push(`https://swapi.co/api/people/?page=${i}`)
}

Promise.all(urls.map(url =>
    fetch(url)
        .then(res => res.json())
        .catch(err => console.log("Error Getting Data From Star Wars API:", err))))
    .then(allResults => allResults.map(eachResult => eachResult.results).flat())
    .then(allCharacters => printCharacters(allCharacters))




const printCharacters = data => {
    drawBarChart('q1', data, 200)
    drawDoughnutChart('q2', data, 200)
    drawPolarChart('q3', data, 200)
    drawMixedChart('q4', data, 200)
}



const drawBarChart = (id, data, height) => {
    height ? document.getElementById(id).height = height : null

    new Chart(id, {
        type: 'horizontalBar',
        data: {
            labels: data.map(eachCharacter => eachCharacter.name),
            datasets: [{
                label: 'Movies made',
                data: data.map(eachCharacter => eachCharacter.films.length),
                borderWidth: 1,
                borderColor: 'rgba(0,50,250,.7)',
                backgroundColor: 'rgba(0,250,50,.2)'
            }]
        }
    })
}






const drawDoughnutChart = (id, data, height) => {
    height ? document.getElementById(id).height = height : null


    new Chart(id, {
        type: 'doughnut',
        data: {
            labels: ['Male characters', 'Female characters'],
            datasets: [{
                label: 'Gender rate',
                data: [
                    data.filter(character => character.gender === 'male').length,
                    data.filter(character => character.gender === 'female').length,
                ],
                borderColor: [
                    'rgba(0, 50, 250, .7)',
                    'rgba(0, 250, 50, .7)'
                ],
                borderWidth: 1,
                backgroundColor: [
                    'rgba(0, 50, 250, .2)',
                    'rgba(0, 250, 50, .2)']
            }]
        },
        options: {
            legend: {
                position: 'left'
            }
        }
    })
}



const drawPolarChart = (id, data, height) => {
    height ? document.getElementById(id).height = height : null
    new Chart(id, {
        type: 'polarArea',
        data: {
            labels: ['Orange eyes', 'Brown eyes', 'Yellow eyes', 'Red eyes', 'Black eyes'],
            datasets: [{
                data: [
                    data.filter(character => character.eye_color.includes('orange')).length,
                    data.filter(character => character.eye_color.includes('brown')).length,
                    data.filter(character => character.eye_color.includes('yellow')).length,
                    data.filter(character => character.eye_color.includes('red')).length,
                    data.filter(character => character.eye_color.includes('black')).length
                ],
                borderColor: 'white',
                borderWidth: 2,
                backgroundColor: [
                    'rgba(0, 50, 250, .2)',
                    'rgba(0, 250, 50, .2)',
                    'rgba(0, 50, 250, .2)',
                    'rgba(0, 250, 50, .2)',
                    'rgba(0, 50, 250, .2)']
            }]
        },
        options: {
            legend: {
                position: 'left'
            }
        }
    })
}





const drawMixedChart = (id, data, height) => {
    height ? document.getElementById(id).height = height : null
    new Chart(id, {
        type: 'bar',
        data: {
            labels: data.map(character => character.name),
            datasets: [{
                label: 'Height',
                data: data.map(character => character.height),
                borderColor: 'rgba(0, 50, 250, .7)',
                borderWidth: 1,
                backgroundColor: 'rgba(0, 250, 50, .2)'
            },
            {
                label: 'Mass',
                data: data.map(character => character.mass),
                borderColor: 'rgba(0, 50, 250, .7)',
                borderWidth: 1,
                type: 'line'
            }]
        }
    })
}