function doGet() {
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('stkAgenda');
}



function include(archivo) {
    return HtmlService.createHtmlOutputFromFile(archivo).getContent();
}