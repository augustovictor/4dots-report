
var w = 650,
	h = 650;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Executado','Realizado'];

var currencyToNumber = function (currency) {
	return Number(currency.replace(/\.|,[0-9]{2}/g,""));
}

$.getJSON('https://gist.githubusercontent.com/brunojppb/9248a4778b4d874c92a4/raw/38e09dc344a1856462521ef636d3f6a50ec54a88/despesas_2015.json', function(data) {
	
	var despesas = data.despesas;
	var chartData = [];
	var d = [];
	var line = [];
	
	var totalExecutado = 0;
	var totalRealizado = 0;
	
	for(var i = 0; i < despesas[11].dezembro.length; i++) {
		var obj = despesas[11].dezembro[i];
		totalExecutado += currencyToNumber(obj.executada);
		console.log(totalExecutado);
	}
	console.log("============= ");
	for(var i = 0; i < despesas[11].dezembro.length; i++) {
		var obj = despesas[11].dezembro[i];
		totalRealizado += currencyToNumber(obj.realizada);
	}
	
	var test = 0;
	for(var i = 0; i < despesas[11].dezembro.length; i++) {
		var obj = despesas[11].dezembro[i];
		var percent = (100.0 * currencyToNumber(obj.executada)) / totalExecutado;

		test += percent;
		console.log(percent);
		line.push({
			axis: obj.descricao,
			value: percent/100
		});
	}
	console.log("TOTAL: " + test);
	d.push(line);
	
	// line = [];
	
	// for(var i = 0; i < despesas[11].dezembro.length; i++) {
	// 	var obj = despesas[11].dezembro[i];
	// 	var percent = (100.0 * currencyToNumber(obj.realizada)) / totalRealizado;
	// 	console.log(percent);
	// 	line.push({
	// 		axis: obj.descricao,
	// 		value: Math.floor(percent)
	// 	});
	// }
	
	// d.push(line);
	
	
	

	//Options for the Radar chart, other than default
	var mycfg = {
	  w: w,
	  h: h,
	  maxValue: 0.6,
	  levels: 5,
	  ExtraWidthX: 300
	}

	//Call function to draw the Radar chart
	//Will expect that data is in %'s
	RadarChart.draw("#chart", d, mycfg);

	////////////////////////////////////////////
	/////////// Initiate legend ////////////////
	////////////////////////////////////////////

	var svg = d3.select('#body')
		.selectAll('svg')
		.append('svg')
		.attr("width", w+300)
		.attr("height", h)

	//Create the title for the legend
	var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", w - 70)
		.attr("y", 10)
		.attr("font-size", "12px")
		.attr("fill", "#404040")
		.text("Porcentagem de gastos por setor.");
			
	//Initiate Legend	
	var legend = svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(90,20)') 
		;
		//Create colour squares
		legend.selectAll('rect')
		  .data(LegendOptions)
		  .enter()
		  .append("rect")
		  .attr("x", w - 65)
		  .attr("y", function(d, i){ return i * 20;})
		  .attr("width", 10)
		  .attr("height", 10)
		  .style("fill", function(d, i){ return colorscale(i);})
		  ;
		//Create text next to squares
		legend.selectAll('text')
		  .data(LegendOptions)
		  .enter()
		  .append("text")
		  .attr("x", w - 52)
		  .attr("y", function(d, i){ return i * 20 + 9;})
		  .attr("font-size", "11px")
		  .attr("fill", "#737373")
		  .text(function(d) { return d; })
		  ;	
});