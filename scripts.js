const key = 'pYzqKPUTp6M7yDoS813%2BXU5ckTuMvKWKZsui9PSsmb7X49iophW18UtvCObQAo7tPt5EvdJZH6k%2FTgNSpWmWHA%3D%3D';

const areaBtn = document.querySelector('#areaBtn');
const container = document.querySelector('.container');
let detailDiv = document.createElement('div');

async function jsonData(url) {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    if (jsonData.response.body.totalCount > 0) {
      let data = jsonData.response.body.items.item;
      detailDiv.innerHTML = ''; // 기존의 내용 초기화

      let detailUl = document.createElement('ul');
      data.forEach((d) => {
        let detailLi = document.createElement('li');
        let src = d.firstimage ? d.firstimage2 : './img/tour.png';
        detailLi.innerHTML = `<img src=${src}> | ${d.title} | ${d.addr1}`;
        detailUl.appendChild(detailLi);
      });
      detailDiv.appendChild(detailUl);
    } else {
      detailDiv.innerHTML = '<p>정보가 없습니다.</p>';
    }
    container.appendChild(detailDiv);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 초기에 데이터를 불러오기 위한 URL 설정
  let url = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${key}&pageNo=1&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=A&_type=json`;
  jsonData(url);
});

areaBtn.addEventListener('click', () => {
  // 버튼 클릭 시 데이터를 다시 불러오기 위한 URL 설정
  let url = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${key}&pageNo=1&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=A&_type=json`;
  jsonData(url);
});


document.addEventListener('DOMContentLoaded', () => {
  loadDiaryEntries(); // 페이지 로딩 시 저장된 일기 목록을 로드

  const diaryForm = document.getElementById('diary-form');
  diaryForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const date = document.getElementById('date').value;
      const content = document.getElementById('content').value;

      // 날짜 또는 내용이 비어있을 경우 경고창 띄우기
      if (!date || !content) {
          alert('날짜와 내용을 모두 입력하세요.');
          return; // 함수 종료
      }

      saveDiaryEntry(date, content); // 일기 저장 함수 호출

      diaryForm.reset(); // 폼 초기화
      loadDiaryEntries(); // 저장 후 목록 갱신
  });
});

// 저장된 일기 목록을 로드하는 함수
function loadDiaryEntries() {
  const diaryList = document.querySelector('.diary-list');
  const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

  diaryList.innerHTML = ''; // 기존 목록 초기화

  entries.forEach((entry, index) => {
      const entryElement = createDiaryEntryElement(entry, index);
      diaryList.appendChild(entryElement);
  });

  // 삭제 버튼 이벤트 리스너 등록
  diaryList.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          deleteDiaryEntry(index); // 일기 삭제 함수 호출
          loadDiaryEntries(); // 삭제 후 목록 갱신
      });
  });
}

// 일기를 저장하는 함수
function saveDiaryEntry(date, content) {
  const entry = { date, content };
  let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  entries.push(entry);
  localStorage.setItem('diaryEntries', JSON.stringify(entries));
}

// 일기를 삭제하는 함수
function deleteDiaryEntry(index) {
  let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  entries.splice(index, 1); // 해당 인덱스의 일기 제거
  localStorage.setItem('diaryEntries', JSON.stringify(entries));
}

// 일기 항목을 생성하여 반환하는 함수
function createDiaryEntryElement(entry, index) {
  const entryElement = document.createElement('div');
  entryElement.classList.add('diary-entry');
  entryElement.innerHTML = `
      <h3>${entry.date}</h3>
      <p>${entry.content}</p>
      <button class="delete-btn" data-index="${index}">삭제</button>
  `;
  return entryElement;
}
