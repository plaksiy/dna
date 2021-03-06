(function (window) {

  var json2csv = {};

  json2csv.convert = function (JSONData, ReportTitle, ShowLabel) {
    console.log("Start json2csv.convert");
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';

    function replaceAllDoubleQuotes(str) {
        if (str)
          return str.replace(new RegExp("\"", 'g'), "'");
        else
          return str;
    }

    if (ShowLabel) {
        var label = "";
        for (var col in arrData[0]) {
            label += col + ',';
        }
        label = label.slice(0, -1);
        CSV += label + '\r\n';
    }

    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            row += '"' + replaceAllDoubleQuotes(arrData[i][index]) + '",';
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }

    if (CSV === '') {
        alert("Invalid data");
        return;
    }

    var fileName = ReportTitle;
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  window.json2csv = json2csv;

})(window);
