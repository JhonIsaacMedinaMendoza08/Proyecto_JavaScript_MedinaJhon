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
// Diccionario de imágenes asociadas a cada raza
const raceImages = {
    "dragonborn": "assets/races/dragonborn.png",
    "dwarf": "assets/races/dwarf.png",
    "elf": "assets/races/elf.webp",
    "gnome": "assets/races/gnome.webp",
    "half-elf": "assets/races/half-elf.png",
    "half-orc": "assets/races/orc.png",
    "halfling": "assets/races/halfling.png",
    "human": "assets/races/human.webp",
    "tiefling": "assets/races/tiefling.webp",
    "default": "assets/races/default.png" // Imagen por defecto si no se reconoce la raza
};
// Función que escucha el cambio de raza y muestra información
document.getElementById("races").addEventListener("change", async (event) => {
    const raceIndex = event.target.value;
    const imageSrc = raceImages[raceIndex] || raceImages["default"];

    if (!raceIndex) return;

    try {
        const response = await fetch(`${URL}/races/${raceIndex}`);
        const data = await response.json();

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

// Función que escucha el cambio de raza y muestra información
document.getElementById("classes").addEventListener("change", async (event) => {
    const classesIndex = event.target.value;
    if (!classesIndex) return;

    try {
        const response = await fetch(`${URL}/classes/${classesIndex}`);
        const data = await response.json();

        // Formateamos la información que queremos mostrar
        const classInfoHTML = `
            <h2>${data.name}</h2>
            <p><strong>Hit Die:</strong> d${data.hit_die}</p>
            <p><strong>Proficiencies:</strong> ${data.proficiencies.map(p => p.name).join(", ")}</p>
            <p><strong>Saving Throws:</strong> ${data.saving_throws.map(s => s.name).join(", ")}</p>
        `;
        // Insertamos el contenido en la sección
        const infoSection = document.getElementById("infoCharacter");
        infoSection.innerHTML = classInfoHTML;

    } catch (error) {
        console.error("Error fetching race details: ", error);
    }
});

document.getElementById("armor").addEventListener("change", async (event) => {
    const armorIndex = event.target.value;
    if (!armorIndex) return;

    try {
        const response = await fetch(`${URL}/equipment/${armorIndex}`);
        const data = await response.json();

        const armorInfoHTML = `
            <h2>${data.name}</h2>
            <p><strong>Category:</strong> ${data.armor_category}</p>
            <p><strong>Base AC:</strong> ${data.armor_class.base}</p>
            <p><strong>Dex Bonus:</strong> ${data.armor_class.dex_bonus ? "Yes" : "No"}</p>
            <p><strong>Str Minimum:</strong> ${data.str_minimum}</p>
            <p><strong>Stealth Disadvantage:</strong> ${data.stealth_disadvantage ? "Yes" : "No"}</p>
        `;

        document.getElementById("infoCharacter").innerHTML = armorInfoHTML;
    } catch (error) {
        console.error("Error fetching armor details: ", error);
    }
});

document.getElementById("weapon").addEventListener("change", async (event) => {
    const weaponIndex = event.target.value;
    if (!weaponIndex) return;

    try {
        const response = await fetch(`${URL}/equipment/${weaponIndex}`);
        const data = await response.json();

        const weaponInfoHTML = `
            <h2>${data.name}</h2>
            <p><strong>Category:</strong> ${data.weapon_category}</p>
            <p><strong>Range:</strong> ${data.range}</p>
            <p><strong>Damage:</strong> ${data.damage?.damage_dice} (${data.damage?.damage_type.name})</p>
            <p><strong>Properties:</strong> ${data.properties?.map(p => p.name).join(", ") || "None"}</p>
        `;

        document.getElementById("infoCharacter").innerHTML = weaponInfoHTML;
    } catch (error) {
        console.error("Error fetching weapon details: ", error);
    }
});

