document.addEventListener('DOMContentLoaded', () => {

    // Găsește TOATE secțiunile de exerciții marcate ca interactive
    const exercitiiInteractive = document.querySelectorAll('.exercitiu-interactiv');

    // Treci prin fiecare exercițiu găsit și aplică-i logica
    exercitiiInteractive.forEach(exercitiuSection => {
        const idExercitiu = exercitiuSection.id;
        const numarSeturi = parseInt(exercitiuSection.dataset.sets, 10); // Citim nr. de seturi din atributul data-sets

        if (!idExercitiu || !numarSeturi) return; // Treci la următorul dacă datele sunt incomplete

        // Generează dinamic input-urile pentru seturi
        for (let i = 1; i <= numarSeturi; i++) {
            const setDiv = document.createElement('div');
            setDiv.className = 'set-input';
            setDiv.innerHTML = `
                <label>Set ${i}:</label>
                <input type="number" id="${idExercitiu}-s${i}-kg" placeholder="Greutate (kg)">
                <input type="number" id="${idExercitiu}-s${i}-reps" placeholder="Repetări">
            `;
            exercitiuSection.appendChild(setDiv);
        }

        // Generează dinamic butonul și mesajul de feedback
        const buton = document.createElement('button');
        buton.textContent = 'Înregistrează Progres';
        const feedback = document.createElement('p');
        feedback.className = 'feedback';
        exercitiuSection.appendChild(buton);
        exercitiuSection.appendChild(feedback);


        // --- Funcțiile de Salvare și Încărcare (acum generice) ---

        const salveazaProgres = () => {
            const progres = {};
            for (let i = 1; i <= numarSeturi; i++) {
                progres[`set${i}`] = {
                    kg: document.querySelector(`#${idExercitiu}-s${i}-kg`).value,
                    reps: document.querySelector(`#${idExercitiu}-s${i}-reps`).value
                };
            }
            localStorage.setItem(idExercitiu, JSON.stringify(progres));
            feedback.textContent = 'Progres salvat!';
            setTimeout(() => { feedback.textContent = ''; }, 2000);
        };

        const incarcaProgres = () => {
            const progresSalvat = localStorage.getItem(idExercitiu);
            if (progresSalvat) {
                const progres = JSON.parse(progresSalvat);
                for (let i = 1; i <= numarSeturi; i++) {
                    if (progres[`set${i}`]) {
                        document.querySelector(`#${idExercitiu}-s${i}-kg`).value = progres[`set${i}`].kg;
                        document.querySelector(`#${idExercitiu}-s${i}-reps`).value = progres[`set${i}`].reps;
                    }
                }
            }
        };

        buton.addEventListener('click', salveazaProgres);
        incarcaProgres(); // Încarcă datele imediat ce scriptul a construit elementele
    });
});
