const HOJA = SpreadsheetApp.openById('1W4sBpAxAa8P1HYkLpmeFmyd3vVof_HL_OgCLKjybcmc').getActiveSheet();
const CARPETA_IMAGENES = DriveApp.getFolderById('1OdH5NPRlnmMt-xVu2heHrNq7cdorj5yS');
const CABECERA_URL_IMAGEN_DRIVE = 'https://drive.google.com/uc?export=view&id=';


// Primer funcion a ejecutarse a cargar el Proyecto
function doGet() {
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('stkAgenda');
}

function doPost(datos) {
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('stkAgenda');
}

function obtenerDatos(){
    return HOJA.getDataRange().getValues();
}

// Funcion para Agregar Contacto
function insertarContacto(contacto, imagen) {
    if (imagen) {
        let blob = Utilities.newBlob(imagen.datos, imagen.tipo, imagen.nombre);
        let archivo = CARPETA_IMAGENES.createFile(blob);
        contacto.imagen = CABECERA_URL_IMAGEN_DRIVE+archivo.getId();
    }
    HOJA.appendRow([contacto.nombre, contacto.apellido, contacto.correo, contacto.telefono, contacto.imagen]);
}


// Funcion para Borrar el Contacto de la fila pasado como argumento
function borrarContacto(numFila) {
    HOJA.deleteRow(numFila);
}

// Funcion para Modificar el Contacto de la fila pasado como argumento, con los valores del Objeto datos
function modificarContacto(numFila, datos) {
    let celdas = HOJA.getRange('A'+numFila+':D'+numFila);
    celdas.setValues([[datos.nombre, datos.apellido, datos.correo, datos.telefono]]);
}


function importarContactos() {
    let url = 'https://randomuser.me/api/?results=5&inc=name,email,phone,picture';
    let respuesta = UrlFetchApp.fetch(url).getContentText();
    let datos = JSON.parse(respuesta);

    datos.results.forEach(insertarContactoJSON);

}

function insertarContactoJSON (contacto) {
    HOJA.appendRow([contacto.name.first, contacto.name.last, contacto.email, contacto.phone, contacto.picture.large]);
}



// Funciones de uso comun
function include(archivo) {
    return HtmlService.createHtmlOutputFromFile(archivo).getContent();
}