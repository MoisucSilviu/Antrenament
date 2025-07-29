// Așteaptă ca tot conținutul paginii să fie încărcat
document.addEventListener('DOMContentLoaded', () => {

    // Găsește butonul din interiorul secțiunii interactive
    const inregistreazaBtn = document.querySelector('.exercitiu-interactiv button');

    // Verifică dacă butonul a fost găsit pe pagină
    if (inregistreazaBtn) {
        // Adaugă o funcție care se execută la click pe buton
        inregistreazaBtn.addEventListener('click', () => {
            alert('Progres înregistrat cu succes!');
        });
    }

});
