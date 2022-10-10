// Primer funcion a ejecutarse a cargar el Proyecto
function doGet() {
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('stkAgenda');
}



function obtenerContactos(){
    let hoja  = SpreadsheetApp.openById('1W4sBpAxAa8P1HYkLpmeFmyd3vVof_HL_OgCLKjybcmc').getActiveSheet();
    let datos = hoja.getDataRange().getValues();
    return datos;
}



// Funciones de uso comun
function include(archivo) {
    return HtmlService.createHtmlOutputFromFile(archivo).getContent();
}