document.addEventListener('DOMContentLoaded', () => {

    const exercitiiInteractive = document.querySelectorAll('.exercitiu-interactiv');

    // Funcție ajutătoare pentru a obține data curentă în format YYYY-MM-DD
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Lunile sunt 0-11
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    exercitiiInteractive.forEach(exercitiuSection => {
        const idExercitiu = exercitiuSection.id;
        const numarSeturi = parseInt(exercitiuSection.dataset.sets, 10);

        if (!idExercitiu || !numarSeturi) return;

        // Generează dinamic elementele HTML necesare
        const dataIncarcataP = document.createElement('p');
        dataIncarcataP.className = 'data-incarcata';
        exercitiuSection.appendChild(dataIncarcataP);

        for (let i = 1; i <= numarSeturi; i++) {
            const setDiv = document.createElement('div');
            setDiv.className = 'set-input';
            
            let placeholderKg = "Greutate (kg)";
            let placeholderReps = "Repetări";
            
            if (idExercitiu === 'abdomene-plank') {
                placeholderKg = "Timp (secunde)";
                placeholderReps = "N/A";
            }
            
            setDiv.innerHTML = `
                <label>Set ${i}:</label>
                <input type="number" id="${idExercitiu}-s${i}-kg" placeholder="${placeholderKg}">
                <input type="number" id="${idExercitiu}-s${i}-reps" placeholder="${placeholderReps}">
            `;
            exercitiuSection.appendChild(setDiv);
        }

        const buton = document.createElement('button');
        buton.textContent = 'Înregistrează Progres';
        const feedback = document.createElement('p');
        feedback.className = 'feedback';
        exercitiuSection.appendChild(buton);
        exercitiuSection.appendChild(feedback);

        // --- Funcțiile de Salvare și Încărcare (Versiunea pe Termen Lung) ---

        const salveazaProgres = () => {
            const today = getTodayDate();
            let istoric = JSON.parse(localStorage.getItem(idExercitiu)) || [];

            const progresCurent = { seturi: {} };
            for (let i = 1; i <= numarSeturi; i++) {
                progresCurent.seturi[`set${i}`] = {
                    kg: document.querySelector(`#${idExercitiu}-s${i}-kg`).value,
                    reps: document.querySelector(`#${idExercitiu}-s${i}-reps`).value
                };
            }

            // Verifică dacă există deja o intrare pentru azi
            const indexAzi = istoric.findIndex(entry => entry.data === today);

            if (indexAzi > -1) {
                // Actualizează intrarea de azi
                istoric[indexAzi].progres = progresCurent;
            } else {
                // Adaugă o intrare nouă
                istoric.push({ data: today, progres: progresCurent });
            }

            localStorage.setItem(idExercitiu, JSON.stringify(istoric));
            feedback.textContent = `Progres salvat pentru ${today}!`;
            setTimeout(() => { feedback.textContent = ''; }, 2000);
        };

        const incarcaProgres = () => {
            const istoric = JSON.parse(localStorage.getItem(idExercitiu)) || [];

            if (istoric.length > 0) {
                // Sortează pentru a găsi cea mai recentă intrare
                istoric.sort((a, b) => new Date(b.data) - new Date(a.data));
                const ultimulProgres = istoric[0];
                const progres = ultimulProgres.progres;
                
                dataIncarcataP.textContent = `Date încărcate din: ${ultimulProgres.data}`;

                for (let i = 1; i <= numarSeturi; i++) {
                    if (progres.seturi[`set${i}`]) {
                        document.querySelector(`#${idExercitiu}-s${i}-kg`).value = progres.seturi[`set${i}`].kg;
                        document.querySelector(`#${idExercitiu}-s${i}-reps`).value = progres.seturi[`set${i}`].reps;
                    }
                }
            } else {
                dataIncarcataP.textContent = 'Niciun antrenament înregistrat încă.';
            }
        };

        buton.addEventListener('click', salveazaProgres);
        incarcaProgres();
    });
});
