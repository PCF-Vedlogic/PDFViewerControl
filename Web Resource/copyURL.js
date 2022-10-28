function copyURL(executionContext) {
    var formContext = executionContext.getFormContext();
    formContext.getAttribute("pcf_pdfpreview").setValue(formContext.getAttribute("pcf_pdfurl").getValue());
}