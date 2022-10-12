const HOJA = SpreadsheetApp.openById('1W4sBpAxAa8P1HYkLpmeFmyd3vVof_HL_OgCLKjybcmc').getActiveSheet();

// Primer funcion a ejecutarse a cargar el Proyecto
function doGet() {
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('stkAgenda');
}

function doPost(datos) {
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('stkAgenda');
}

function obtenerContactos(){
    return HOJA.getDataRange().getValues();
}

// Funcion para Agregar Contacto
function insertarContacto(nombre, apellido, correo, telefono) {
    HOJA.appendRow([nombre,apellido,correo,telefono]);
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
    
}

// Funciones de uso comun
function include(archivo) {
    return HtmlService.createHtmlOutputFromFile(archivo).getContent();
}