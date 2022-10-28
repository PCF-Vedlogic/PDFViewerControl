Pre-requisite:


•	Two Single Line of Text on CRM form:

o	Name: PDF URL

	Display Name: PDF URL

	Logical Name: prefix_pdfurl

	Description: This field will be used to enter PDF URLs.


o	Name: PDF Preview

	Display Name: PDF Preview

	Logical Name: prefix_pdfpreview

	Description: PCF control will be added to this field which will preview the PDF.


•	Update the logical names of fields in the Web Resource file in the Web Resource folder

•	Upload this web resource file into your CRM solution. This web resource will copy the value from the ‘PDF URL’ field to the ‘PDF Preview’ field.


•	Add an event on the PDF URL field with the following properties:

o	Event Type: onChange

o	Library: Logical name of your web resource library.

o	Function: copyURL

o	Make sure you mark ‘Pass execution context as first parameter’ checkox.

• If you want to use the control without any customization, then just import the zip file in Dynamics 365 by navigating through the following path:

o "PDFViewerControl-master/PDFViewerControlSolution/bin/Debug/PDFViewerControlSolution.zip"

• If you want to make any changes in the control, then perform the following steps after you have completed making your changes in the code:

o Delete all the content in the "PDFViewerControl-master/PDFViewerControlSolution" folder.

o Open the terminal in the Visual Studio Code. (Ctrl + `)

o Write the following commands:

 npm install

 npm run build

o Go inside the "PDFViewerControl-master/PDFViewerControlSolution" folder by writing the following command:

 cd .\PDFViewerControlSolution\

o Now write the following command:

 pac solution init --publisher-name PCFPDFV --publisher-prefix pcfpdfv

 pac solution add-reference --path ..\

 dotnet build

o By implementing the above-mentioned steps, a new zip file will be generated that can be used for importing your newly customized solution into Dynamics 365.
