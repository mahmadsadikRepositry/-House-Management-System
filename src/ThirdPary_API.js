
fetch('https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple').
then(response => response.json()).
then(data => console.log("data",data.results[0])

)
