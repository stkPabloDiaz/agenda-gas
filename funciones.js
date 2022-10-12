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
    if (imagen) contacto.imagen = guardarImagen(imagen);
    HOJA.appendRow([contacto.nombre, contacto.apellido, contacto.correo, contacto.telefono, contacto.imagen]);
}


// Funcion para Modificar el Contacto de la fila pasado como argumento, con los valores del Objeto datos
function modificarContacto(contacto, imagen) {
    if (imagen) contacto.imagen = guardarImagen(imagen);

    let celdas = HOJA.getRange('A'+contacto.fila+':E'+contacto.fila);
    celdas.setValues([[contacto.nombre, contacto.apellido, contacto.correo, contacto.telefono, contacto.imagen]]);
}

function guardarImagen(imagen) {
    let blob = Utilities.newBlob(imagen.datos, imagen.tipo, imagen.nombre);
    let archivo = CARPETA_IMAGENES.createFile(blob);
    return CABECERA_URL_IMAGEN_DRIVE+archivo.getId();
}


// Funcion para Borrar el Contacto de la fila pasado como argumento
function borrarContacto(numFila) {
    HOJA.deleteRow(numFila);
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