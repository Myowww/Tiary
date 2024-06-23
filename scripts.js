document.getElementById('diary-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const date = document.getElementById('date').value;
    const content = document.getElementById('content').value;

    const diaryEntry = {
        date: date,
        content: content
    };

    const diaryList = document.querySelector('.diary-list');
    const entryElement = document.createElement('div');
    entryElement.innerHTML = `<h3>${diaryEntry.date}</h3><p>${diaryEntry.content}</p>`;
    diaryList.appendChild(entryElement);

    document.getElementById('diary-form').reset();
});
