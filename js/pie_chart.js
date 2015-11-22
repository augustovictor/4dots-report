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

// var formatter = new Intl.NumberFormat('pt-BR', {
//   style: 'currency',
//   currency: 'BRL',
//   minimumFractionDigits: 2,
// });

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


$.getJSON('https://gist.githubusercontent.com/brunojppb/3da2415d52a0ff0db15b/raw/69461a7717c8ba058c451806bd89ae19fbfbe9da/despesas', function(data) {
	
	var despesas = data.despesas;
	var chartData = [];
	var line = [];
	
	var totalExecutado = 0;
	var totalRealizado = 0;
	
	for(var i = 0; i < despesas["2015"][11].length; i++) {
		var obj = despesas["2015"][11][i];
		totalExecutado += currencyToNumber(obj.executada);
		console.log(totalExecutado);
	}
	console.log("============= ");
	for(var i = 0; i < despesas["2015"][11].length; i++) {
		var obj = despesas["2015"][11][i];
		totalRealizado += currencyToNumber(obj.realizada);
	}
	
	var test = 0;
	for(var i = 0; i < despesas["2015"][11].length; i++) {
		var obj = despesas["2015"][11][i];
		var percent = (100.0 * currencyToNumber(obj.executada)) / totalExecutado;
		test++;
		console.log(Math.floor(percent * 100) / 100);
		line.push({
			value: Math.floor(percent * 100) / 100,
			currency: obj.executada,
			number: currencyToNumber(obj.executada),
			label: obj.descricao,
			color: chartColors[i],
        	highlight: "#F62459"
		});
	}
	console.log("TOTAL: " + test);
	

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
    // And for a doughnut chart
    var myPieChart = new Chart(context).Pie(line, options);
	
	var sortedValues = line.sort(compareValues);
	
	populateRankingTable(sortedValues);
});