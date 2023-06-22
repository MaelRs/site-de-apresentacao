const votingForm = document.getElementById('votingForm');
const candidateImages = document.getElementsByClassName('candidateImage');
const confirmButton = document.getElementById('confirmButton');
const resultChart = document.getElementById('resultChart');

let voteCount = 0;
let candidateVotes = [0, 0, 0];

function selectCandidate(candidate) {
  for (let i = 0; i < candidateImages.length; i++) {
    candidateImages[i].classList.remove('selectedCandidate');
  }

  candidateImages[candidate - 1].classList.add('selectedCandidate');
  confirmButton.style.display = 'block';
}

function castVote(event) {
  event.preventDefault();

  const selectedCandidate = document.querySelector('.selectedCandidate');

  if (!selectedCandidate) {
    return;
  }

  voteCount++;
  const candidate = Array.prototype.indexOf.call(candidateImages, selectedCandidate) + 1;
  candidateVotes[candidate - 1]++;

  if (voteCount === 1) {
    createResultChart();
  } else {
    updateResultChart();
  }

  if (voteCount === 3) {
    disableVoting();
  }
}

function createResultChart() {
  for (let i = 0; i < candidateVotes.length; i++) {
    const candidateName = `Candidato ${i + 1}`;
    const progressBar = `<div class="progressBar" id="progress${i + 1}"></div>`;
    const result = `<p class="candidateName">${candidateName}</p> ${progressBar}`;
    resultChart.innerHTML += result;
  }
}

function updateResultChart() {
  for (let i = 0; i < candidateVotes.length; i++) {
    const progressBar = document.getElementById(`progress${i + 1}`);
    const percentage = (candidateVotes[i] / voteCount) * 100;
    progressBar.style.width = `${percentage}%`;
  }
}

function disableVoting() {
  for (let i = 0; i < candidateImages.length; i++) {
    candidateImages[i].removeAttribute('onclick');
  }

  votingForm.reset();
  confirmButton.style.display = 'none';
}
