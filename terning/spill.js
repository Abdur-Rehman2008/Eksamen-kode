var poengsum, rundePoeng, aktivSpiller, spill;
 
// Funksjon for å starte / nullstille spillet
function startSpill() {
  // Initialiser spilltilstand
  poengsum = [0, 0];
  rundePoeng = 0;
  aktivSpiller = 0;
  spill = true;
 
  // Oppdater UI: totalpoeng og rundepoeng
  document.getElementById('poeng-0').textContent = '0';
  document.getElementById('poeng-1').textContent = '0';
  document.getElementById('sum-0').textContent = '0';
  document.getElementById('sum-1').textContent = '0';
 
  // Sett navnene tilbake
  document.getElementById('navn-0').textContent = 'Spiller 1';
  document.getElementById('navn-1').textContent = 'Spiller 2';
 
  // Fjern vinner-klasser hvis noen har dem fra tidligere spill
  document.querySelector('.spiller-0-panel').classList.remove('vinner');
  document.querySelector('.spiller-1-panel').classList.remove('vinner');
 
  // Fjern aktiv fra begge, og sett aktiv på spiller 1
  document.querySelector('.spiller-0-panel').classList.remove('aktiv');
  document.querySelector('.spiller-1-panel').classList.remove('aktiv');
  document.querySelector('.spiller-0-panel').classList.add('aktiv');
 
  // Skjul terningen ved start
  var terningImg = document.querySelector('.terning');
  if (terningImg) {
    terningImg.style.display = 'none';
  }
}
 
// Bytt til neste spiller (brukes ved kast = 1 eller hold)
function nesteSpiller() {
  // Bytt aktiv spiller
  aktivSpiller = aktivSpiller === 0 ? 1 : 0;
 
  // Nullstill rundePoeng
  rundePoeng = 0;
 
  // Oppdater rundepoeng i UI
  document.getElementById('sum-0').textContent = '0';
  document.getElementById('sum-1').textContent = '0';
 
  // Toggle aktiv-klasse i GUI
  document.querySelector('.spiller-0-panel').classList.toggle('aktiv');
  document.querySelector('.spiller-1-panel').classList.toggle('aktiv');
}
 
// Event listener: KAST TERNING
document.querySelector('.btn-kast').addEventListener('click', function() {
  if (spill) {
    // 1. Tilfeldig nummer 1..6
    var terning = Math.floor(Math.random() * 6) + 1;
 
    // 2. Vis resultatet (vis terningbilde)
    var terningImg = document.querySelector('.terning');
    if (terningImg) {
      terningImg.style.display = 'block';
      // forventet filnavn: img/terning-1.png ... img/terning-6.png
      terningImg.src = 'img/terning-' + terning + '.png';
    }
 
    // 3. Oppdater rundePoeng hvis ikke 1
    if (terning !== 1) {
      // Legg til poeng i runden
      rundePoeng += terning;
      // Oppdater rundepoeng i UI for aktiv spiller
      document.querySelector('#sum-' + aktivSpiller).textContent = rundePoeng;
    } else {
      // Hvis kastet 1 -> tap rundepoeng og neste spiller
      nesteSpiller();
    }
  }
});
 
// Event listener: HOLD
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (spill) {
    // Legg rundePoeng til totalen for aktiv spiller
    poengsum[aktivSpiller] += rundePoeng;
 
    // Oppdater GUI med totalpoeng
    document.getElementById('poeng-' + aktivSpiller).textContent = poengsum[aktivSpiller];
 
    // Sjekk om aktiv spiller vant (mål: 100 eller mer)
    if (poengsum[aktivSpiller] >= 100) {
      // Aktiv spiller vinner
      document.querySelector('#navn-' + aktivSpiller).textContent = 'Vinner!';
      // Skjul terningen
      var terningImg = document.querySelector('.terning');
      if (terningImg) terningImg.style.display = 'none';
      // Legg på vinner-klasse og fjern aktiv-klasse
      document.querySelector('.spiller-' + aktivSpiller + '-panel').classList.add('vinner');
      document.querySelector('.spiller-' + aktivSpiller + '-panel').classList.remove('aktiv');
 
      // Sett spill til false for å stoppe ytterligere handling
      spill = false;
    } else {
      // Hvis ingen vinner, gå til neste spiller
      nesteSpiller();
    }
  }
});
 
// Event listener: NYTT SPILL
document.querySelector('.btn-ny').addEventListener('click', startSpill);
 
// Start spillet første gang når skriptet lastes
startSpill();
 
 