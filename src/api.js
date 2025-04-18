// URL base de la API de D&D 5e
const URL = "https://www.dnd5eapi.co/api";

// Cuando el DOM está completamente cargado, se ejecutan las funciones de carga
document.addEventListener("DOMContentLoaded", () => {
    loadOptions("races", "races");               // Carga las razas en el select con id="races"
    loadOptions("classes", "classes");           // Carga las clases en el select con id="classes"
    loadOptions("spells", "ability");            // Carga las habilidades en el select con id="ability"
    loadArmorOptions("armor");                   // Carga solo las armaduras en el select con id="armor"
    loadWeaponOptions("weapon");                 // Carga solo las armas en el select con id="weapon"
    loadAccesoriesOptions("accessories");        // Carga equipo de aventura como accesorios en el select con id="accessories"
});


// Función genérica para cargar datos desde un endpoint y llenar un <select>
async function loadOptions(endpoint, selectId) {
    try {
        // Hacemos la petición a la API
        const response = await fetch(`${URL}/${endpoint}`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        // Recorremos los resultados y creamos opciones en el <select>
        data.results.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;          // Usamos el índice como valor (para futuras búsquedas)
            option.textContent = item.name;     // Mostramos el nombre al usuario
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error loading ${selectId}: `, error);
    }
}


// Función para cargar únicamente las armaduras desde la categoría 'armor'
async function loadArmorOptions(selectId) {
    try {
        const response = await fetch(`${URL}/equipment-categories/armor`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        // Recorremos los elementos de armadura y los agregamos al <select>
        data.equipment.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error loading armor: `, error);
    }
}


// Función para cargar únicamente las armas desde la categoría 'weapon'
async function loadWeaponOptions(selectId) {
    try {
        const response = await fetch(`${URL}/equipment-categories/weapon`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        data.equipment.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error loading weapon: `, error);
    }
}


// Función para cargar accesorios desde la categoría 'adventuring-gear'
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
