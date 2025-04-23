// Importa el objeto que contiene las proficiencias de armadura por clase desde el archivo dictionaries.js
import { classArmorProficiencies } from './dictionaries.js';

// URL base de la API de D&D 5e
const URL = "https://www.dnd5eapi.co/api";

// Variable para almacenar todas las armaduras cargadas desde la API
let allArmors = [];

// Carga todas las armaduras y las guarda en allArmors
export async function loadAllArmors(selectId) {
    try {
        // Hace la solicitud a la API para obtener la categoría de equipo "armor"
        const response = await fetch(`${URL}/equipment-categories/armor`);
        const data = await response.json();

        // Obtiene el elemento <select> por ID para insertar las opciones
        const select = document.getElementById(selectId);

        // Guarda la lista de armaduras en la variable global
        allArmors = data.equipment;

        // Limpia el <select> y deja una opción vacía por defecto
        select.innerHTML = '<option value=""></option>';
    } catch (error) {
        // Muestra un error en consola si falla la carga de armaduras
        console.error(`Error loading armor: `, error);
    }
}

// Filtra las armaduras por clase seleccionada
export async function filterArmorsByClass(classIndex) {
    // Obtiene el <select> donde se mostrarán las armaduras
    const armorSelect = document.getElementById("armor");

    // Limpia el contenido actual del <select>
    armorSelect.innerHTML = '<option value=""></option>';

    // Si no hay clase seleccionada, se detiene la ejecución
    if (!classIndex) return;

    // Obtiene las categorías de armadura permitidas para la clase seleccionada
    const allowedCategories = classArmorProficiencies[classIndex] || [];

    // Si la clase no puede usar ninguna armadura, se desactiva el <select> y se termina
    if (allowedCategories.length === 0) {
        armorSelect.disabled = true;
        return;
    }

    // Habilita el <select> si hay categorías permitidas
    armorSelect.disabled = false;

    // Lista de armaduras que cumplen con los requisitos
    const filteredArmors = [];

    // Recorre todas las armaduras cargadas
    for (const armor of allArmors) {
        try {
            // Solicita los detalles individuales de cada armadura
            const response = await fetch(`${URL}/equipment/${armor.index}`);
            const armorDetails = await response.json();

            // Obtiene la categoría de armadura (ej: light, medium, heavy)
            const armorCategory = armorDetails.armor_category?.toLowerCase();

            // Verifica si el ítem es un escudo
            const isShield = armorDetails.equipment_category?.index === "shield";

            // Si la armadura pertenece a una categoría permitida, o es un escudo permitido, se agrega a la lista
            if (allowedCategories.includes(armorCategory) || (allowedCategories.includes("shield") && isShield)) {
                filteredArmors.push(armor);
            }
        } catch (error) {
            // Muestra un error si falla la solicitud de detalles
            console.error(`Error fetching armor details for ${armor.index}: `, error);
        }
    }

    // Agrega las armaduras filtradas como opciones en el <select>
    filteredArmors.forEach(armor => {
        const option = document.createElement("option");
        option.value = armor.index;
        option.textContent = armor.name;
        armorSelect.appendChild(option);
    });
}

// Muestra detalles de la armadura seleccionada
export async function showArmorDetails(armorIndex) {
    // Si no hay armadura seleccionada, no hace nada
    if (!armorIndex) return;

    try {
        // Solicita los detalles de la armadura desde la API
        const response = await fetch(`${URL}/equipment/${armorIndex}`);
        const data = await response.json();

        // Crea el HTML con la información de la armadura
        const armorInfoHTML = `
            <h2>${data.name}</h2>
            <p><strong>Category:</strong> ${data.armor_category}</p>
            <p><strong>Base AC:</strong> ${data.armor_class.base}</p>
            <p><strong>Dex Bonus:</strong> ${data.armor_class.dex_bonus ? "Yes" : "No"}</p>
            <p><strong>Str Minimum:</strong> ${data.str_minimum || "None"}</p>
            <p><strong>Stealth Disadvantage:</strong> ${data.stealth_disadvantage ? "Yes" : "No"}</p>
        `;

        // Inserta el HTML generado en el contenedor con id="infoCharacter"
        document.getElementById("infoCharacter").innerHTML = armorInfoHTML;
    } catch (error) {
        // Muestra un error si falla la solicitud
        console.error("Error fetching armor details: ", error);
    }
}
