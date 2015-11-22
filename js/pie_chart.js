Chart.defaults.global.responsive = true;

var chartColors = [
	"#D24D57",
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

var currencyFormat = function (num) {
    return "R$ " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

var compareValues = function(a, b){
	if(a.value < b.value) {
		return 1;
	}
	if(a.value > b.value) {
		return -1;
	}
	return 0;
	
}

var currencyToNumber = function (currency) {
	return Number(currency.replace(/\.|,[0-9]{2}/g,""));
}

var populateRankingTable = function(objects) {
	var $table = $("#table-body");
	$table.empty();
	var despesaTotal = 0;
	
	for(var i = 0; i < objects.length; i++) {
		var	$tr = $("<tr>");
		var $td = $("<td>")
		
		$td.html(i+1);
		$tr.append($td);
		
		$td = $("<td>");
		$td.html(objects[i].label);
		$tr.append($td);
		
		$td = $("<td>");
		$td.html("R$ " + objects[i].currency);
		$tr.append($td);
		
		$td = $("<td>", { class: "text-center" });
		var $label = $("<span>", { class: "badge bg-red my-badge" });
		$label.html(objects[i].value + "%");
		$td.append($label);
		$tr.append($td);
		// $tr.css("background-color", chartColors[i]);
		$table.append($tr);
		despesaTotal += objects[i].number;
	}
	
	// add valor total de despesas no final da tabela
	var	$tr = $("<tr>");
	var $td = $("<td>");
	$tr.append($td);
	
	$td = $("<td>");
	$td.html("<strong>TOTAL</strong>");
	$tr.append($td);
	
	$td = $("<td>", { colspan: '2' });
	$td.html("<strong>" + currencyFormat(despesaTotal) + "</strong>");
	$tr.append($td);
	
	$table.append($tr);

};

var myPieChart = null;
var myLineChart = null;
var dados = null;

var createCharts = function(year) {
	var chartData = [];
	var line = [];
	
	var totalExecutado = 0;
	var totalRealizado = 0;
	
	for(var i = 0; i < dados.despesas[year][11].length; i++) {
		var obj = dados.despesas[year][11][i];
		totalExecutado += currencyToNumber(obj.executada);
		// console.log(totalExecutado);
	}
	// console.log("============= ");
	for(var i = 0; i < dados.despesas[year][11].length; i++) {
		var obj = dados.despesas[year][11][i];
		totalRealizado += currencyToNumber(obj.realizada);
	}
	
	var test = 0;
	for(var i = 0; i < dados.despesas[year][11].length; i++) {
		var obj = dados.despesas[year][11][i];
		var percent = (100.0 * currencyToNumber(obj.executada)) / totalExecutado;
		test++;
		// console.log(Math.floor(percent * 100) / 100);
		line.push({
			value: Math.floor(percent * 100) / 100,
			currency: obj.executada,
			number: currencyToNumber(obj.executada),
			label: obj.descricao,
			color: chartColors[i],
        	highlight: "#F62459"
		});
	}
	// console.log("TOTAL: " + test);
	

    var options = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,
    
        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",
    
        //Number - The width of each segment stroke
        segmentStrokeWidth : 0,
    
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 0, // This is 0 for Pie charts
    
        //Number - Amount of animation steps
        animationSteps : 100,
    
        //String - Animation easing effect
        animationEasing : "easeOutBounce",
    
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,
    
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : true,
    
        //String - A legend template
        tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>"
    
    };
	
	// Get the context of the canvas element we want to select
    var context = document.getElementById("pie-chart").getContext("2d");
    if (myPieChart != null) {
    	myPieChart.destroy();
    }
    
    myPieChart = new Chart(context).Pie(line, options);
	
	var sortedValues = line.sort(compareValues);
	
	populateRankingTable(sortedValues);
	
	
	//==================================================
	// LINE CHART
	//==================================================
	var despesas_bruta = dados.despesas_bruta[year];
	var receitas_bruta = dados.receitas_bruta[year];
	
	var lineChartContext = context = document.getElementById("line-chart").getContext("2d");
	
	var data = {
	    labels: ["Janeiro", "fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
	    datasets: [
	        {
	            label: "Receita",
	            fillColor: "rgba(46, 204, 113,0.2)",
	            strokeColor: "rgba(46, 204, 113,1.0)",
	            pointColor: "rgba(46, 204, 113,1.0)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(46, 204, 113,1.0)",
	            data: receitas_bruta
	        },
	        {
	            label: "Despesa",
	            fillColor: "rgba(231, 76, 60,0.2)",
	            strokeColor: "rgba(231, 76, 60,1.0)",
	            pointColor: "rgba(231, 76, 60,1.0)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(231, 76, 60,1.0)",
	            data: despesas_bruta
	        }
	    ]
	};
	
	var options = {

	    ///Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,
	
	    //String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",
	
	    //Number - Width of the grid lines
	    scaleGridLineWidth : 1,
	
	    //Boolean - Whether to show horizontal lines (except X axis)
	    scaleShowHorizontalLines: true,
	
	    //Boolean - Whether to show vertical lines (except Y axis)
	    scaleShowVerticalLines: true,
	
	    //Boolean - Whether the line is curved between points
	    bezierCurve : true,
	
	    //Number - Tension of the bezier curve between points
	    bezierCurveTension : 0.4,
	
	    //Boolean - Whether to show a dot for each point
	    pointDot : true,
	
	    //Number - Radius of each point dot in pixels
	    pointDotRadius : 4,
	
	    //Number - Pixel width of point dot stroke
	    pointDotStrokeWidth : 1,
	
	    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	    pointHitDetectionRadius : 20,
	
	    //Boolean - Whether to show a stroke for datasets
	    datasetStroke : true,
	
	    //Number - Pixel width of dataset stroke
	    datasetStrokeWidth : 2,
	
	    //Boolean - Whether to fill the dataset with a colour
	    datasetFill : true,
	    
	    multiTooltipTemplate: "<%if (label){%><%=datasetLabel %>: <%}%><%= currencyFormat(value) %>",
	
	    //String - A legend template
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	
	};
	
	if (myLineChart != null) {
    	myLineChart.destroy();
    }
	myLineChart = new Chart(lineChartContext).Line(data, options);
	
	
	

}

var observeYearChanges = function(year) {
	$.getJSON('https://gist.githubusercontent.com/brunojppb/92df7faf8f94a87651e5/raw/75a0e0dec76e4dc6f77e128ab0a290c0914e2d32/despesas', function(data) {
	dados = data;
	createCharts(year);
	});	
};

observeYearChanges("2015");