// Așteaptă ca tot conținutul paginii (DOM) să fie încărcat
document.addEventListener('DOMContentLoaded', () => {

    // Identificăm secțiunea exercițiului după ID-ul ei
    const exercitiuSection = document.querySelector('#impins-haltera');
    
    // Dacă nu găsim secțiunea pe pagină, nu continuăm
    if (!exercitiuSection) {
        return;
    }

    // Selectăm elementele din interiorul secțiunii
    const inregistreazaBtn = exercitiuSection.querySelector('button');
    const feedbackMsg = exercitiuSection.querySelector('.feedback');
    const idExercitiu = exercitiuSection.id; // Va fi "impins-haltera"

    // Funcția pentru a SALVA datele
    const salveazaProgres = () => {
        // Creăm un obiect pentru a stoca datele
        const progres = {
            set1: { kg: document.querySelector('#impins-s1-kg').value, reps: document.querySelector('#impins-s1-reps').value },
            set2: { kg: document.querySelector('#impins-s2-kg').value, reps: document.querySelector('#impins-s2-reps').value },
            set3: { kg: document.querySelector('#impins-s3-kg').value, reps: document.querySelector('#impins-s3-reps').value },
            set4: { kg: document.querySelector('#impins-s4-kg').value, reps: document.querySelector('#impins-s4-reps').value },
        };

        // Salvăm obiectul în localStorage. Îl transformăm într-un text (JSON string) pentru a putea fi stocat.
        localStorage.setItem(idExercitiu, JSON.stringify(progres));

        // Afișăm un mesaj de confirmare
        feedbackMsg.textContent = 'Progres salvat cu succes!';
        setTimeout(() => { feedbackMsg.textContent = ''; }, 2000); // Șterge mesajul după 2 secunde
    };

    // Funcția pentru a ÎNCĂRCA datele
    const incarcaProgres = () => {
        // Căutăm în localStorage datele pentru acest exercițiu
        const progresSalvat = localStorage.getItem(idExercitiu);

        if (progresSalvat) {
            // Dacă găsim date, le transformăm înapoi într-un obiect
            const progres = JSON.parse(progresSalvat);

            // Populăm căsuțele de input cu datele salvate
            document.querySelector('#impins-s1-kg').value = progres.set1.kg;
            document.querySelector('#impins-s1-reps').value = progres.set1.reps;
            document.querySelector('#impins-s2-kg').value = progres.set2.kg;
            document.querySelector('#impins-s2-reps').value = progres.set2.reps;
            document.querySelector('#impins-s3-kg').value = progres.set3.kg;
            document.querySelector('#impins-s3-reps').value = progres.set3.reps;
            document.querySelector('#impins-s4-kg').value = progres.set4.kg;
            document.querySelector('#impins-s4-reps').value = progres.set4.reps;
        }
    };

    // Adăugăm event listener pentru click pe butonul de salvare
    inregistreazaBtn.addEventListener('click', salveazaProgres);

    // Încercăm să încărcăm progresul de fiecare dată când pagina este deschisă
    incarcaProgres();
});
