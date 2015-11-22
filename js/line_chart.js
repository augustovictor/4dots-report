var chartColors = [
	"rgba(210, 77, 87, 0.2)",
	"#D91E18",
	"#96281B",
	"#446CB3",
	"#F1A9A0",
	"#D2527F",
	"#DCC6E0",
	"#F7CA18",
	"#FDE3A7",
	"#F89406",
	"#663399",
	"#913D88",
	"#BE90D4",
	"#446CB3",
	"#81CFE0",
	"#22A7F0",
	"#A2DED0",
	"#87D37C",
	"#26A65B",
	"#65C6BB",
	"#36D7B7",
	"#86E2D5",
	"#D35400",
	"#ECECEC",
	"#6C7A89",
	"#95A5A6",
	"#BFBFBF",
	"#9B59B6",
	"#22A7F0"
];

var currencyToNumber = function (currency) {
	return Number(currency.replace(/\.|,[0-9]{2}/g,""));
}

$.getJSON('https://gist.githubusercontent.com/brunojppb/3da2415d52a0ff0db15b/raw/69461a7717c8ba058c451806bd89ae19fbfbe9da/despesas', function(data) {
	
	var despesas = data.despesas['2015'];
	var mesesTxt = ["Janeiro", "fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
	
	var dataset = [];
	console.log("Despesas: " + JSON.stringify(despesas[0], null, 2));
	for(var i=0; i< despesas[1].length; i++) {
		var instituicao = {
			id: despesas[1][i].codigo,
			label: despesas[1][i].descricao,
            strokeColor: chartColors[i],
            pointColor: chartColors[i],
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: chartColors[i],
            data: []
		};
		console.log("Instituicao: " + instituicao);
		for(var j=0; j < despesas[i].length; j++){
			var institute = $.grep(despesas[j][i], function(e){ return e.con == id; });
			instituicao.data.push(currencyToNumber(despesas[j][i].executada));
		}
		
		dataset.push(instituicao);
	}
	
	console.log("My DATA!: " + dataset);
	
	var data = {
	    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
	    datasets: dataset
	};
    
    
	var options = {
        

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1.2,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.3,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1.5,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,
    
    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,
    
     // String - Template string for single tooltips
    multiTooltipTemplate: "<%if (label){%><%=datasetLabel %>: <%}%><%= 'R$' + value %>",

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};
	// Get the context of the canvas element we want to select
    var context = document.getElementById("line-chart").getContext("2d");
    // And for a doughnut chart
    var myLineChart = new Chart(context).Line(data, options);
    
    function prettyNumber(number) {
        var size = number.length;
        var formattedNumber;
        switch (size) {
            case 4:
                formattedNumber = number.split[''][0] + number.split[''][1] + ' mil';
            break;
            
            case 7:
                formattedNumber = number.split[''][0] + number.split[''][1] + ' milhão';
            break;
            
            case 10:
                formattedNumber = number.split[''][0] + number.split[''][1] + ' bilhão';
            break;
            
            default:
                formattedNumber = ' none';
        }
        return formattedNumber;
    }
	
    $('#addLegislacaoToLine').click(function() {
        myLineChart.addData([12314123], "Janeiro");
    });
});
