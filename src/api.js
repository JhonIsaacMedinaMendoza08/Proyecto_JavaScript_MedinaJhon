// URL base de la API de D&D 5e
const URL = "https://www.dnd5eapi.co/api";

// Importación de imágenes y funciones desde otros módulos
import { raceImages, classImages } from './dictionaries.js';
import { loadAllArmors, filterArmorsByClass, showArmorDetails } from './armor.js';
import { loadWeaponOptions, filterWeaponsByClass, showWeaponDetails } from './weapon.js';

// Evento principal: cuando el DOM está listo, se cargan las opciones en los select
document.addEventListener("DOMContentLoaded", () => {
    loadOptions("races", "races");         // Carga razas
    loadOptions("classes", "classes");     // Carga clases
    loadOptions("spells", "ability");      // Carga hechizos
    loadAllArmors("armor");                // Carga lista de armaduras desde armor.js
    loadWeaponOptions("weapon");           // Carga lista de armas desde weapon.js
    loadAccesoriesOptions("accessories");  // Carga lista de accesorios
});


// Función genérica para cargar datos desde un endpoint de la API y llenar un <select>
async function loadOptions(endpoint, selectId) {
    try {
        const response = await fetch(`${URL}/${endpoint}`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        // Llenamos el select con las opciones devueltas por la API
        data.results.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error loading ${selectId}: `, error);
    }
}


// Carga accesorios desde el endpoint 'adventuring-gear'
async function loadAccesoriesOptions(selectId) {
    try {
        const response = await fetch(`${URL}/equipment-categories/adventuring-gear`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        data.equipment.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error loading Accesories: `, error);
    }
}


// Evento: al seleccionar una raza, se muestra su información
document.getElementById("races").addEventListener("change", async (event) => {
    const raceIndex = event.target.value;
    const imageSrc = raceImages[raceIndex] || raceImages["default"];

    if (!raceIndex) return;

    try {
        const response = await fetch(`${URL}/races/${raceIndex}`);
        const data = await response.json();

        // HTML con la información de la raza seleccionada
        const raceInfoHTML = `
            <img src="${imageSrc}" alt="${data.name}" class="race-image" />
            <h2>${data.name}</h2>
            <p><strong>Speed:</strong> ${data.speed}</p>
            <p><strong>Alignment:</strong> ${data.alignment}</p>
            <p><strong>Age:</strong> ${data.age}</p>
            <p><strong>Size:</strong> ${data.size}</p>
            <p><strong>Size Description:</strong> ${data.size_description}</p>
            <p><strong>Language Desc:</strong> ${data.language_desc}</p>
        `;

        document.getElementById("infoCharacter").innerHTML = raceInfoHTML;

    } catch (error) {
        console.error("Error fetching race details: ", error);
    }
});


// Evento: al seleccionar una clase, se muestra su información y se filtran armas y armaduras
document.getElementById("classes").addEventListener("change", async (event) => {
    const classesIndex = event.target.value;
    const imageSource = classImages[classesIndex] || classImages["default"];

    if (!classesIndex) return;

    try {
        const response = await fetch(`${URL}/classes/${classesIndex}`);
        const data = await response.json();

        // HTML con la información de la clase seleccionada
        const classInfoHTML = `
            <img src="${imageSource}" alt="${data.name}" class="race-image" />
            <h2>${data.name}</h2>
            <p><strong>Hit Die:</strong> d${data.hit_die}</p>
            <p><strong>Proficiencies:</strong> ${data.proficiencies.map(p => p.name).join(", ")}</p>
            <p><strong>Saving Throws:</strong> ${data.saving_throws.map(s => s.name).join(", ")}</p>
        `;

        document.getElementById("infoCharacter").innerHTML = classInfoHTML;

        // Se filtran las armaduras y armas según la clase elegida
        filterArmorsByClass(classesIndex);
        filterWeaponsByClass(classesIndex);

    } catch (error) {
        console.error("Error fetching class details: ", error);
    }
});


// Evento: al seleccionar una armadura, se muestra su detalle
document.getElementById("armor").addEventListener("change", async (event) => {
    const armorIndex = event.target.value;
    showArmorDetails(armorIndex);  // Muestra la info detallada de la armadura
});


// Evento: al seleccionar un arma, se muestra su detalle
document.getElementById("weapon").addEventListener("change", async (event) => {
    const weaponIndex = event.target.value;
    showWeaponDetails(weaponIndex); // Muestra la info detallada de la arma
});
