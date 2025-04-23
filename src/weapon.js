// Importa las proficiencias de armas por clase desde otro archivo
import { classWeaponProficiencies } from './dictionaries.js';

// URL base de la API de D&D 5e
const URL = "https://www.dnd5eapi.co/api";

// Variable para almacenar todas las armas obtenidas de la API
let allWeapons = [];

// Función para cargar únicamente las armas desde la categoría 'weapon'
export async function loadWeaponOptions(selectId) {
    try {
        // Realiza la solicitud para obtener las armas de la categoría "weapon"
        const response = await fetch(`${URL}/equipment-categories/weapon`);
        const data = await response.json();

        // Selecciona el elemento <select> donde se mostrarán las armas
        const select = document.getElementById(selectId);

        // Guarda todas las armas para futuros filtros
        allWeapons = data.equipment;

        // Limpia el <select> dejando solo una opción vacía
        select.innerHTML = '<option value=""></option>';

    } catch (error) {
        // Muestra un error en consola si algo sale mal
        console.error(`Error loading weapon: `, error);
    }
}

// Función para filtrar armas según la clase seleccionada
export async function filterWeaponsByClass(classIndex) {
    const weaponSelect = document.getElementById("weapon");

    // Limpia el <select> dejando solo la opción vacía
    weaponSelect.innerHTML = '<option value=""></option>';

    // Si no hay clase seleccionada, sale de la función
    if (!classIndex) return;

    // Obtiene las categorías de armas permitidas para esa clase
    const allowedCategories = classWeaponProficiencies[classIndex] || [];

    // Si no hay categorías permitidas, desactiva el <select>
    if (allowedCategories.length === 0) {
        weaponSelect.disabled = true;
        return;
    }

    // Activa el <select> si hay categorías permitidas
    weaponSelect.disabled = false;
    // weaponSelect.nextElementSibling.textContent = "Weapon:"; // Comentado: para mostrar etiqueta

    // Lista que contendrá las armas filtradas
    const filteredWeapons = [];

    // Recorre todas las armas para obtener sus detalles individuales
    for (const weapon of allWeapons) {
        try {
            // Obtiene detalles individuales de cada arma
            const response = await fetch(`${URL}/equipment/${weapon.index}`);
            const weaponDetails = await response.json();

            // Obtiene la categoría del arma en minúsculas
            const weaponCategory = weaponDetails.weapon_category?.toLowerCase();

            // Verifica si hay armas específicas permitidas por nombre (como las de bardos o pícaros)
            const isSpecificWeaponAllowed = allowedCategories.some(cat =>
                weaponDetails.name.toLowerCase().includes(cat)
            );

            // Si la categoría está permitida o el nombre coincide con una arma específica, se guarda
            if (allowedCategories.includes(weaponCategory) || isSpecificWeaponAllowed) {
                filteredWeapons.push(weapon);
            }
        } catch (error) {
            // Muestra error si falla la obtención de detalles de un arma
            console.error(`Error fetching weapon details for ${weapon.index}: `, error);
        }
    }

    // Agrega las armas filtradas al <select>
    filteredWeapons.forEach(weapon => {
        const option = document.createElement("option");
        option.value = weapon.index;
        option.textContent = weapon.name;
        weaponSelect.appendChild(option);
    });
}

// Función para mostrar los detalles del arma seleccionada
export async function showWeaponDetails(weaponIndex) {
    if (!weaponIndex) return;

    try {
        // Realiza la solicitud para obtener detalles del arma
        const response = await fetch(`${URL}/equipment/${weaponIndex}`);
        const data = await response.json();

        // Crea el HTML con los detalles del arma
        const weaponInfoHTML = `
            <h2>${data.name}</h2>
            <p><strong>Category:</strong> ${data.weapon_category}</p>
            <p><strong>Range:</strong> ${data.range}</p>
            <p><strong>Damage:</strong> ${data.damage?.damage_dice} (${data.damage?.damage_type.name})</p>
            <p><strong>Properties:</strong> ${data.properties?.map(p => p.name).join(", ") || "None"}</p>
        `;

        // Inserta el HTML en el contenedor correspondiente
        document.getElementById("infoCharacter").innerHTML = weaponInfoHTML;
    } catch (error) {
        // Muestra error si falla la solicitud
        console.error("Error fetching weapon details: ", error);
    }
}
